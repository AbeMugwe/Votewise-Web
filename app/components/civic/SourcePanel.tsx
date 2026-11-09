import { ExternalLink, Info } from "lucide-react";

export type SourceLink = { label: string; url: string; description?: string };

/**
 * The "we have nothing here, and here is who does" surface.
 *
 * Several sections of this app deliberately ship no data — candidate profiles,
 * county office holders, gazetted polling stations, manifesto scorecards. The
 * repo's integrity rule is that an unverified claim is worse than an absence,
 * so every absence has to be useful: say plainly that we have nothing, explain
 * why in one line, and hand the reader the authoritative source instead.
 */
export default function EmptyState({
  heading,
  body,
  links,
}: {
  heading: string;
  body: string;
  links: SourceLink[];
}) {
  return (
    <div className="vw-card p-6 sm:p-7 border-dashed">
      <h3 className="flex items-center gap-2 font-bold text-gray-900 text-lg">
        <Info size={18} className="text-green-700 shrink-0" />
        {heading}
      </h3>
      <p className="mt-2 text-gray-600 leading-relaxed">{body}</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-xl border border-gray-200 bg-gray-50 p-4 hover:border-green-400 hover:bg-white transition"
          >
            <span className="flex items-start justify-between gap-3">
              <span className="font-semibold text-gray-900 group-hover:text-green-800 transition">
                {link.label}
              </span>
              <ExternalLink size={15} className="shrink-0 text-gray-400 mt-0.5" />
            </span>
            {link.description && (
              <span className="block text-sm text-gray-600 mt-1.5 leading-relaxed">
                {link.description}
              </span>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}

/** The same link grid without the empty-state framing, for "check the source". */
export function SourceGrid({ links }: { links: SourceLink[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {links.map((link) => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group vw-card vw-card-hover p-5"
        >
          <span className="flex items-start justify-between gap-3">
            <span className="font-semibold text-gray-900 group-hover:text-green-800 transition">
              {link.label}
            </span>
            <ExternalLink size={16} className="shrink-0 text-gray-400 mt-1" />
          </span>
          {link.description && (
            <span className="block text-sm text-gray-600 mt-2 leading-relaxed">
              {link.description}
            </span>
          )}
        </a>
      ))}
    </div>
  );
}
