import { FeatureBand } from "@/components/home/FeatureBand";
import { Reveal } from "@/components/primitives/Reveal";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  blurb?: React.ReactNode;
  /** Button row (provided by the page so it controls links/labels). */
  children: React.ReactNode;
  /** Low-opacity photo backdrop behind the navy. */
  bgSrc?: string;
  bgPosition?: string;
};

/**
 * Shared closing CTA band, matching the homepage finish: a photographic
 * navy FeatureBand with a centered gold tick, eyebrow, headline and buttons.
 */
export function CtaBand({
  eyebrow,
  title,
  blurb,
  children,
  bgSrc = "/images/588512414_1266055232007494_3344370248710133705_n.jpg",
  bgPosition = "center 22%",
}: Props) {
  return (
    <FeatureBand bgSrc={bgSrc} bgOpacity={0.2} bgPosition={bgPosition}>
      <div className="mx-auto max-w-[1180px] px-6 py-12 text-center md:px-10 md:py-14">
        <Reveal>
          <div className="mx-auto flex w-fit">
            <div className="gold-tick" />
          </div>
          <p className="eyebrow eyebrow--light mt-4">{eyebrow}</p>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl">
            {title}
          </h2>
          {blurb && (
            <p className="mx-auto mt-4 max-w-xl text-base text-white/75">
              {blurb}
            </p>
          )}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {children}
          </div>
        </Reveal>
      </div>
    </FeatureBand>
  );
}
