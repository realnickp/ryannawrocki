import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import { Reveal } from "@/components/primitives/Reveal";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms and conditions that govern your use of ryannawrocki.com, the official website of Friends of Ryan Nawrocki.",
  alternates: { canonical: "/terms" },
};

const EFFECTIVE_DATE = "July 20, 2026";

export default function TermsPage() {
  return (
    <>
      {/* ── Hero band ─────────────────────────────────── */}
      <section className="page-hero pt-32 md:pt-40">
        <div className="mx-auto max-w-[860px] px-6 py-16 md:px-10 md:py-20">
          <Reveal>
            <div className="gold-tick" />
            <p className="eyebrow mt-5">Legal</p>
            <h1 className="h-display mt-4">Terms &amp; Conditions</h1>
            <p className="lede mt-6 max-w-[60ch]">
              The terms that govern your use of this website.
            </p>
            <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-brand-slate/60">
              Effective Date: {EFFECTIVE_DATE}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Terms body ────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-[760px] px-6 py-16 md:px-10 md:py-20">
          <div className="prose-light">
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing or using this website (the &ldquo;Site&rdquo;),
              operated by <strong>{site.campaignName}</strong>{" "}
              (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), you
              agree to be bound by these Terms &amp; Conditions and all
              applicable laws and regulations. If you do not agree with any of
              these terms, please do not use the Site. The materials on the
              Site are protected by applicable copyright and trademark law.
            </p>

            <h2>2. Use of the Site</h2>
            <p>
              You may view, download, and print materials from the Site for
              personal, non-commercial use only. You may not modify the
              materials, use them for any commercial purpose or public display,
              remove any copyright or proprietary notices, or misrepresent the
              source of the materials. This license terminates automatically if
              you violate any of these restrictions.
            </p>

            <h2>3. Disclaimer</h2>
            <p>
              The materials on the Site are provided on an &ldquo;as is&rdquo;
              basis. We make no warranties, expressed or implied, and hereby
              disclaim and negate all other warranties, including without
              limitation implied warranties of merchantability, fitness for a
              particular purpose, or non-infringement. We do not warrant or
              make any representations concerning the accuracy, likely
              results, or reliability of the use of the materials on the Site
              or on any websites linked to the Site.
            </p>

            <h2>4. Limitations of Liability</h2>
            <p>
              In no event shall {site.campaignName} or its agents be liable
              for any damages (including, without limitation, damages for loss
              of data or profit, or due to business interruption) arising out
              of the use or inability to use the materials on the Site, even
              if we have been notified of the possibility of such damage.
            </p>

            <h2>5. Accuracy of Materials</h2>
            <p>
              The materials appearing on the Site could include technical,
              typographical, or photographic errors. We do not warrant that any
              of the materials on the Site are accurate, complete, or current.
              We may make changes to the materials at any time without notice,
              but we make no commitment to update them.
            </p>

            <h2>6. Links to Other Websites</h2>
            <p>
              We have not reviewed all of the websites linked to the Site and
              are not responsible for the contents of any linked website. The
              inclusion of any link does not imply our endorsement of the
              linked website. Use of any linked website is at your own risk and
              subject to that website&rsquo;s own terms and policies.
            </p>

            <h2>7. Text Messaging</h2>
            <p>
              By providing your phone number and opting in to receive text
              messages, you consent to receive recurring campaign-related
              messages, including updates, event reminders, and requests for
              support, which may be sent using automated technology. Consent is
              not a condition of any purchase or contribution. Message and data
              rates may apply, and message frequency varies. You may opt out at
              any time by replying STOP, or reply HELP for assistance.
            </p>

            <h2>8. Contributions</h2>
            <p>
              Contributions made through links on the Site are processed by a
              secure third-party donation platform and are subject to that
              platform&rsquo;s own terms of service. Contributions are governed
              by Maryland campaign finance law, including applicable
              contribution limits and eligibility requirements, and are not
              tax-deductible.
            </p>

            <h2>9. Modifications to These Terms</h2>
            <p>
              We may revise these Terms &amp; Conditions at any time without
              notice. By continuing to use the Site after changes are posted,
              you agree to be bound by the then-current version of these terms.
            </p>

            <h2>10. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in
              accordance with the laws of the State of Maryland, and you
              irrevocably submit to the exclusive jurisdiction of the courts of
              that state.
            </p>

            <h2>11. Contact Us</h2>
            <p>
              If you have questions about these Terms &amp; Conditions, contact
              us at{" "}
              <a href={`mailto:${site.campaignEmail}`}>{site.campaignEmail}</a>{" "}
              or by mail at {site.mailing}.
            </p>
          </div>

          <div className="mt-12 border-t border-brand-hairline pt-8 text-sm text-brand-slate/70">
            <p>
              See also our{" "}
              <Link
                href="/privacy-policy"
                className="font-semibold text-brand-maroon hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
