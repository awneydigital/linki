type AwneyLogoProps = {
  compact?: boolean;
  inverse?: boolean;
  className?: string;
};

export default function AwneyLogo({ compact = false, inverse = false, className = "" }: AwneyLogoProps) {
  const foreground = inverse ? "text-white" : "text-[#071a2f]";

  if (compact) {
    return (
      <span
        aria-label="Awney"
        className={`inline-flex h-8 w-8 items-center justify-center rounded-xl bg-[#146ef5] text-[15px] font-extrabold tracking-[-0.08em] text-white shadow-[0_6px_18px_rgba(20,110,245,0.28)] ${className}`}
      >
        A
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} aria-label="Awney Digital">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#146ef5] text-base font-extrabold tracking-[-0.08em] text-white shadow-[0_7px_20px_rgba(20,110,245,0.25)]">
        A
      </span>
      <span className={`font-heading text-lg font-extrabold tracking-[-0.055em] ${foreground}`}>
        AWNEY
      </span>
    </span>
  );
}
