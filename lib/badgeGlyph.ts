/**
 * `modules.badgeIcon` is free text set from the admin side. It has held emoji
 * ("🗳️") and short words ("VOTE", "RIGHTS") at different times, and a word
 * rendered at emoji size looks like a mistake. This decides which treatment a
 * given value should get so the UI never has to assume.
 */

/** True when the value is a pictograph we can safely render large. */
export function isEmojiGlyph(value: string | undefined | null): boolean {
  if (!value) return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  // Emoji sequences are short and contain no ASCII letters or digits.
  return trimmed.length <= 8 && !/[A-Za-z0-9]/.test(trimmed);
}

/** A short uppercase label, for when the value is a word rather than an emoji. */
export function glyphLabel(value: string | undefined | null): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed || isEmojiGlyph(trimmed)) return null;
  return trimmed.toUpperCase().slice(0, 12);
}
