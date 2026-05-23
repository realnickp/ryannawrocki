import { cn } from "@/lib/cn";

/**
 * Custom line icons, 1.25px stroke, md-ink-deep — used only functionally
 * (external link, mail, phone, arrow). No decoration.
 */
type IconProps = {
  className?: string;
  size?: number;
  "aria-label"?: string;
};

const stroke = "var(--ink-deep)";
const strokeWidth = 1.25;

export function ArrowIcon({ className, size = 16 }: IconProps) {
  return (
    <svg
      aria-hidden
      className={cn(className)}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ExternalIcon({ className, size = 14 }: IconProps) {
  return (
    <svg
      aria-hidden
      className={cn(className)}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1h5"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MailIcon({ className, size = 18 }: IconProps) {
  return (
    <svg
      aria-hidden
      className={cn(className)}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="1"
        stroke={stroke}
        strokeWidth={strokeWidth}
      />
      <path
        d="M3 7l9 6 9-6"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PhoneIcon({ className, size = 18 }: IconProps) {
  return (
    <svg
      aria-hidden
      className={cn(className)}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M5 4h3l2 5-2.5 1.5a11 11 0 005 5L14 13l5 2v3a2 2 0 01-2 2A14 14 0 013 6a2 2 0 012-2z"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </svg>
  );
}
