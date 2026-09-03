/**
 * A botanical sprig — the brand's sensory seal rendered as a mark. Used as the
 * bullet/eyebrow motif so the scent shows up even where a photograph can't.
 */
export function Sprig({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 24"
      fill="none"
      className={className}
      aria-hidden
      focusable="false"
    >
      <path
        d="M8 23V7"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M8 15c-2.4-.3-3.8-1.6-4-3.6 2.2-.3 3.7.8 4 3.6ZM8 15c2.4-.3 3.8-1.6 4-3.6-2.2-.3-3.7.8-4 3.6Z"
        fill="currentColor"
        opacity="0.55"
      />
      <path
        d="M8 10c-2-.3-3.2-1.4-3.4-3.1 1.9-.3 3.2.7 3.4 3.1ZM8 10c2-.3 3.2-1.4 3.4-3.1-1.9-.3-3.2.7-3.4 3.1Z"
        fill="currentColor"
        opacity="0.75"
      />
      <ellipse cx="8" cy="3.6" rx="1.7" ry="3.1" fill="currentColor" />
    </svg>
  );
}
