// Handles all localStorage operations for module progress
// This mirrors the PHP session/localStorage logic from the original app

const PREFIX = "vw_progress_";

export interface ModuleProgress {
  seenCardIds: string[];
  correctAnswers: number;
  totalQuestions: number;
  quizComplete: boolean;
  badgeEarned: boolean;
}

export function getProgress(moduleId: string): ModuleProgress {
  if (typeof window === "undefined") return empty();
  try {
    const raw = localStorage.getItem(PREFIX + moduleId);
    return raw ? JSON.parse(raw) : empty();
  } catch {
    return empty();
  }
}

export function saveSeenCard(moduleId: string, cardId: string): void {
  if (typeof window === "undefined") return;
  const p = getProgress(moduleId);
  if (!p.seenCardIds.includes(cardId)) {
    p.seenCardIds.push(cardId);
    save(moduleId, p);
  }
}

export function saveQuizResult(
  moduleId: string,
  correctAnswers: number,
  totalQuestions: number,
): boolean {
  if (typeof window === "undefined") return false;
  const badgeEarned = correctAnswers === totalQuestions;
  save(moduleId, {
    ...getProgress(moduleId),
    correctAnswers,
    totalQuestions,
    quizComplete: true,
    badgeEarned,
  });
  return badgeEarned;
}

export function resetQuizProgress(moduleId: string): void {
  if (typeof window === "undefined") return;
  save(moduleId, {
    ...getProgress(moduleId),
    correctAnswers: 0,
    totalQuestions: 0,
    quizComplete: false,
    badgeEarned: false,
  });
}

export function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let sid = localStorage.getItem("vw_session_id");
  if (!sid) {
    sid = crypto.randomUUID();
    localStorage.setItem("vw_session_id", sid);
  }
  return sid;
}

function empty(): ModuleProgress {
  return { seenCardIds: [], correctAnswers: 0, totalQuestions: 0, quizComplete: false, badgeEarned: false };
}

function save(moduleId: string, p: ModuleProgress): void {
  localStorage.setItem(PREFIX + moduleId, JSON.stringify(p));
}