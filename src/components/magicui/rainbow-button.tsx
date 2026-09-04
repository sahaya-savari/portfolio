import React from "react";

interface RainbowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function RainbowButton({
  children,
  className,
  ...props
}: RainbowButtonProps) {
  return (
    <button
      className={`
        group relative inline-flex min-h-[48px] overflow-hidden cursor-pointer items-center justify-center rounded-full px-8 py-4 text-sm font-body font-medium text-white transition-all hover:scale-105 active:scale-95 gap-2 border border-white/10 shadow-lg focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50
        ${className || ""}
      `}
      {...props}
    >
      <span
        aria-hidden="true"
        className="absolute inset-[-100%] animate-rainbow-spin bg-[conic-gradient(from_0deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)),hsl(var(--color-1)))] opacity-70 pointer-events-none"
      />
      <span
        aria-hidden="true"
        className="absolute inset-[1.5px] rounded-full bg-[#121213] pointer-events-none"
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
