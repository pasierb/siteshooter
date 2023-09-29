import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="container prose">
      <h1>Terms of Service</h1>

      <p>Effective Date: 26.09.2023</p>

      <h2>1. Agreement to Terms</h2>
      <p>
        By using Siteshooter, a Software as a Service (SaaS) application, you
        agree to these terms. If you don&apos;t agree, you should not use our
        service.
      </p>

      <h2>2. Subscription & Payment</h2>
      <p>
        Access to our software requires a subscription. Fees are billed monthly
        or annually, as agreed upon during signup. Payments are due at the start
        of each billing cycle. Failure to pay will result in account suspension.
      </p>

      <h2>3. Cancellation & Refund</h2>
      <p>
        You can cancel your subscription at any time. If you cancel within the
        first 30 days of your subscription, you&apos;ll receive a full refund. After
        the first 30 days, no refunds will be given, but the service will
        continue until the end of that billing cycle.
      </p>

      <h2>4. Service Availability</h2>
      <p>
        We strive to maintain uptime, but there may be instances where the
        service is unavailable due to maintenance or unforeseen circumstances.
        We will notify subscribers of planned outages when possible.
      </p>

      <h2>5. Data & Privacy</h2>
      <p>
        Our use of your data is governed by our{" "}
        <Link href="privacy">Privacy Policy</Link>. We take data
        security seriously and use modern techniques to protect your
        information.
      </p>

      <h2>6. Termination</h2>
      <p>
        We reserve the right to terminate your subscription for violations of
        these terms, illegal activities, or any action that harms the integrity
        of our service or other users.
      </p>

      <h2>7. Limitation of Liability</h2>
      <p>
        While we strive to provide a seamless and error-free service,
        Siteshooter cannot be held responsible for any data loss, business
        interruption, or other damages stemming from the use or inability to use
        our service.
      </p>

      <h2>8. Changes to Terms</h2>
      <p>
        We reserve the right to update these terms at any time. Changes will be
        effective immediately upon posting to this page. Continued use of our
        service after changes constitutes agreement to the new terms.
      </p>

      <h2>9. Governing Law</h2>
      <p>
        These terms are governed by the laws of Switzerland. Disputes
        arising from these terms will be resolved in the jurisdiction of the
        courts of Switzerland.
      </p>

      <h2>10. Contact</h2>
      <p>
        If you have questions regarding these terms, please contact us at{" "}
        <strong>mpasierbski+siteshooter@gmail.com</strong>.
      </p>
    </div>
  );
}
