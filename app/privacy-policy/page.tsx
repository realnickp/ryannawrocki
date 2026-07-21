import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import { Reveal } from "@/components/primitives/Reveal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Friends of Ryan Nawrocki collects, uses, and protects the personal information of visitors to ryannawrocki.com.",
  alternates: { canonical: "/privacy-policy" },
};

const EFFECTIVE_DATE = "July 20, 2026";

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* ── Hero band ─────────────────────────────────── */}
      <section className="page-hero pt-32 md:pt-40">
        <div className="mx-auto max-w-[860px] px-6 py-16 md:px-10 md:py-20">
          <Reveal>
            <div className="gold-tick" />
            <p className="eyebrow mt-5">Legal</p>
            <h1 className="h-display mt-4">Privacy Policy</h1>
            <p className="lede mt-6 max-w-[60ch]">
              How we collect, use, and protect your personal information when
              you visit this website.
            </p>
            <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-brand-slate/60">
              Effective Date: {EFFECTIVE_DATE}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Policy body ───────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-[760px] px-6 py-16 md:px-10 md:py-20">
          <div className="prose-light">
            <p>
              <strong>{site.campaignName}</strong> (&ldquo;we,&rdquo;
              &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects your privacy and
              is committed to protecting the personal information you share
              with us. This Privacy Policy explains what information we collect
              through this website (the &ldquo;Site&rdquo;), how we use it, and
              the choices you have. By using the Site, you agree to the
              collection and use of information as described in this policy.
            </p>

            <h2>Information We Collect</h2>
            <p>
              <strong>Information you provide voluntarily.</strong> When you
              contact us, sign up for updates, volunteer, or request a yard
              sign, we may collect information such as your name, email
              address, phone number, mailing address, and the contents of your
              message.
            </p>
            <p>
              <strong>Text messaging opt-in.</strong> If you provide your phone
              number and opt in to receive text messages, we collect your phone
              number for the purpose of sending you campaign-related messages.
            </p>
            <p>
              <strong>Information collected automatically.</strong> Like most
              websites, we may automatically collect certain technical
              information when you visit the Site, including your IP address,
              browser type, device type, the pages you visit, and similar usage
              data. This information may be collected through cookies and
              similar technologies.
            </p>

            <h2>How We Use Your Information</h2>
            <ul>
              <li>To respond to your messages, questions, and requests.</li>
              <li>
                To send you updates, newsletters, and information about the
                campaign, events, and ways to get involved.
              </li>
              <li>To coordinate volunteer activities you sign up for.</li>
              <li>To improve the Site and how it performs for visitors.</li>
              <li>To comply with applicable legal requirements.</li>
            </ul>

            <h2>Text Messaging</h2>
            <p>
              If you opt in to receive text messages from us, your phone number
              will be used solely to send you campaign-related messages, such
              as updates, event reminders, and calls to action. Message and
              data rates may apply. You may opt out at any time by replying
              STOP to any message. Phone numbers collected for text messaging
              will not be shared with third parties for their own marketing
              purposes.
            </p>

            <h2>How We Share Your Information</h2>
            <p>
              We will not share, sell, rent, or disclose your personal
              information to third parties, except as described in this
              Privacy Policy or as required by law. We may share information
              with trusted service providers who help us operate the Site and
              communicate with supporters — such as email delivery, newsletter,
              and website hosting services — and only to the extent needed to
              perform those services on our behalf.
            </p>
            <p>
              Contributions to the campaign are processed through a secure
              third-party donation platform and are subject to that
              platform&rsquo;s own privacy policy. Please note that
              contribution records are subject to disclosure requirements under
              Maryland campaign finance law.
            </p>

            <h2>Cookies</h2>
            <p>
              The Site may use cookies and similar technologies to remember
              your preferences and understand how visitors use the Site. Most
              browsers let you refuse or delete cookies through your browser
              settings; doing so may affect how some parts of the Site
              function.
            </p>

            <h2>Data Security</h2>
            <p>
              We use industry-standard technologies and practices to help
              protect your personal information. However, no method of
              transmission over the internet or method of electronic storage is
              100% secure, and we cannot guarantee absolute security.
            </p>

            <h2>Children&rsquo;s Privacy</h2>
            <p>
              The Site is not intended for children under the age of 13, and we
              do not knowingly collect personal information from children under
              13. If we learn that we have inadvertently collected personal
              information from a child under 13 without parental consent, we
              will delete that information promptly.
            </p>

            <h2>Links to Other Websites</h2>
            <p>
              The Site contains links to third-party websites, including social
              media, donation, and newsletter platforms. We are not responsible
              for the privacy practices or content of those websites, and we
              encourage you to review their privacy policies.
            </p>

            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes take
              effect immediately upon posting to this page, and the effective
              date above will be updated accordingly. We encourage you to
              review this page periodically.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or how your
              information is handled, contact us at{" "}
              <a href={`mailto:${site.campaignEmail}`}>{site.campaignEmail}</a>{" "}
              or by mail at {site.mailing}.
            </p>
          </div>

          <div className="mt-12 border-t border-brand-hairline pt-8 text-sm text-brand-slate/70">
            <p>
              See also our{" "}
              <Link
                href="/terms"
                className="font-semibold text-brand-maroon hover:underline"
              >
                Terms &amp; Conditions
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
