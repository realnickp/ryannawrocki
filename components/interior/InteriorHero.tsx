import { Reveal } from "@/components/primitives/Reveal";
import { RevealImage } from "@/components/home/RevealImage";
import { cn } from "@/lib/cn";

type Media = {
  src: string;
  alt: string;
  objectPosition?: string;
  /** Tailwind aspect class, default "aspect-[5/4]". */
  aspect?: string;
  from?: "up" | "left" | "right";
};

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  /** Crisp framed photo on the right (2-col). Omit for a centered text hero. */
  media?: Media;
  /** Button row. */
  actions?: React.ReactNode;
  /** Optional node rendered above the action row (e.g. a back-link). */
  kicker?: React.ReactNode;
};

/**
 * Premium navy photographic hero band for interior pages — white content over
 * a rich navy gradient with a campaign-ribbon accent line and a crisp framed
 * photo. The transparent header flips to its white logo/nav over this band
 * (see Header `darkHeroRoutes`).
 */
export function InteriorHero({
  eyebrow,
  title,
  lede,
  media,
  actions,
  kicker,
}: Props) {
  return (
    <section className="hero-navy pt-32 md:pt-40">
      <div
        className={cn(
          "mx-auto max-w-[1180px] px-6 pb-20 pt-10 md:px-10 md:pb-28 md:pt-16",
          media &&
            "grid items-center gap-12 md:grid-cols-[1.05fr_0.95fr] md:gap-14",
        )}
      >
        <Reveal>
          {kicker}
          <div className="gold-tick" />
          <p className="eyebrow eyebrow--light mt-5">{eyebrow}</p>
          <h1 className="hero-navy__title mt-4">{title}</h1>
          {lede && (
            <p className="hero-navy__lede mt-6 max-w-xl">{lede}</p>
          )}
          {actions && (
            <div className="mt-8 flex flex-wrap gap-4">{actions}</div>
          )}
        </Reveal>

        {media && (
          <Reveal delay={0.1}>
            <RevealImage
              src={media.src}
              alt={media.alt}
              from={media.from ?? "up"}
              frameClassName={cn("photo-frame w-full", media.aspect ?? "aspect-[5/4]")}
              imgClassName="h-full w-full object-cover"
              objectPosition={media.objectPosition}
            />
          </Reveal>
        )}
      </div>
    </section>
  );
}
