"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export interface AccordionItem {
  q: string;
  a: string;
}

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-gray-200 border border-gray-200 rounded-xl bg-white overflow-hidden">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.q}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 hover:bg-gray-50 transition"
            >
              <span className="font-semibold text-gray-900">{item.q}</span>
              <ChevronDown
                size={20}
                className={`shrink-0 text-gray-400 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-5 -mt-1">
                <p className="text-gray-600 leading-relaxed">{item.a}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
