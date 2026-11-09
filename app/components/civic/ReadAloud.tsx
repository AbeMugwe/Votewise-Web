"use client";
import { useEffect, useRef, useState } from "react";
import { Volume2, Pause, Play, Square } from "lucide-react";

/**
 * Text-to-speech control for a specific passage.
 *
 * The previous implementation spoke `document.body.innerText`, which read the
 * navigation, the footer and every button label before reaching the content.
 * This one takes the exact text to speak, so "read this page aloud" produces
 * something a low-literacy or low-vision user can actually follow.
 */
export default function ReadAloud({
  text,
  label = "Listen to this page",
}: {
  text: string;
  label?: string;
}) {
  const [speaking, setSpeaking] = useState(false);
  const [paused, setPaused] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    // Cancel any in-flight speech when navigating away, otherwise it keeps
    // talking over the next page.
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const start = () => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-KE";
    utterance.rate = 0.95;
    utterance.onend = () => {
      setSpeaking(false);
      setPaused(false);
    };
    utterance.onerror = () => {
      setSpeaking(false);
      setPaused(false);
    };
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setSpeaking(true);
    setPaused(false);
  };

  const pause = () => {
    window.speechSynthesis.pause();
    setPaused(true);
  };

  const resume = () => {
    window.speechSynthesis.resume();
    setPaused(false);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
    setPaused(false);
  };

  return (
    <div className="flex flex-wrap items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-sm">
      <span className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <Volume2 size={18} className="text-green-700" />
        {label}
      </span>

      <div className="flex items-center gap-2 ml-auto">
        {!speaking && (
          <button
            onClick={start}
            className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition text-sm font-medium"
          >
            <Play size={16} /> Play
          </button>
        )}

        {speaking && !paused && (
          <button
            onClick={pause}
            className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
          >
            <Pause size={16} /> Pause
          </button>
        )}

        {speaking && paused && (
          <button
            onClick={resume}
            className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition text-sm font-medium"
          >
            <Play size={16} /> Resume
          </button>
        )}

        {speaking && (
          <button
            onClick={stop}
            aria-label="Stop reading"
            className="flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition text-sm font-medium"
          >
            <Square size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
