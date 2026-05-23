import Image from "next/image";
import { cn } from "@/lib/cn";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

/**
 * Soft cream frame, 1px gold-deep ring, subtle SVG grain overlay —
 * used exclusively for portraits of Ryan.
 */
export function Portrait({
  src,
  alt,
  width,
  height,
  className,
  priority,
  sizes,
}: Props) {
  return (
    <figure className={cn("portrait-frame relative", className)}>
      <div className="portrait-grain relative overflow-hidden">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          sizes={sizes ?? "(max-width: 768px) 100vw, 50vw"}
          className="block h-auto w-full"
        />
      </div>
    </figure>
  );
}
