import Image from "next/image";
import { cn } from "@/lib/cn";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  /** When true, skip the cream + sepia treatment (Maryland flag / community color moments). */
  natural?: boolean;
  className?: string;
  sizes?: string;
};

export function Photo({
  src,
  alt,
  width,
  height,
  caption,
  natural = false,
  className,
  sizes,
}: Props) {
  return (
    <figure className={cn("relative", className)}>
      <div className={cn("relative overflow-hidden", natural ? "" : "bg-md-cream")}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes ?? "(max-width: 768px) 100vw, 50vw"}
          className={cn("block h-auto w-full", natural ? "" : "photo-sepia")}
        />
      </div>
      {caption ? (
        <figcaption className="t-caption mt-3 italic">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
