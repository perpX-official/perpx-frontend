import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <a className="flex items-center gap-2">
                <img src="/logo-icon.png" alt="PerpX" className="h-8 w-8" />
                <span className="text-xl font-bold text-white">PerpX</span>
              </a>
            </Link>
            <Link href="/trade">
              <Button size="lg" className="neuro-button text-white font-medium px-8">
                Launch App
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-8">Privacy Policy</h1>
          <div className="glass-card rounded-xl p-8 space-y-6 text-white/80">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
              <p className="mb-4">
                PerpX is committed to protecting your privacy. We collect minimal information necessary to provide our services:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Wallet addresses for transaction purposes</li>
                <li>Trading activity and transaction history</li>
                <li>Device and browser information for security</li>
                <li>IP addresses for fraud prevention</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">
                Your information is used to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide and improve our trading services</li>
                <li>Ensure platform security and prevent fraud</li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Communicate important updates about the platform</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Data Security</h2>
              <p>
                We implement industry-standard security measures to protect your data. All sensitive information is encrypted both in transit and at rest. We never store your private keys or seed phrases.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Third-Party Services</h2>
              <p>
                We may use third-party services for analytics and infrastructure. These services are carefully vetted and comply with strict privacy standards. We do not sell your personal information to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Your Rights</h2>
              <p className="mb-4">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of non-essential data collection</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Cookies</h2>
              <p>
                We use cookies to improve your experience and analyze platform usage. You can control cookie preferences through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify users of significant changes through the platform or via email.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at privacy@perpx.io
              </p>
            </section>

            <p className="text-sm text-white/60 mt-8">
              Last updated: October 21, 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
