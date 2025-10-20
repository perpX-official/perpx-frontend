import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Terms() {
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
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-8">Terms of Service</h1>
          <div className="glass-card rounded-xl p-8 space-y-6 text-white/80">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using PerpX, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Eligibility</h2>
              <p className="mb-4">
                To use PerpX, you must:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Be at least 18 years old</li>
                <li>Have the legal capacity to enter into binding contracts</li>
                <li>Not be located in a restricted jurisdiction</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Trading Risks</h2>
              <p className="mb-4">
                Trading perpetual contracts and cryptocurrencies involves significant risks:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>High volatility can lead to substantial losses</li>
                <li>Leverage amplifies both gains and losses</li>
                <li>You may lose your entire investment</li>
                <li>Past performance does not guarantee future results</li>
              </ul>
              <p className="mt-4 font-semibold">
                Only trade with funds you can afford to lose.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. User Responsibilities</h2>
              <p className="mb-4">
                You are responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Maintaining the security of your wallet and private keys</li>
                <li>All trading decisions and their consequences</li>
                <li>Complying with tax obligations in your jurisdiction</li>
                <li>Ensuring your use of the platform is legal in your location</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. Prohibited Activities</h2>
              <p className="mb-4">
                The following activities are strictly prohibited:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Market manipulation or wash trading</li>
                <li>Using bots or automated systems without authorization</li>
                <li>Attempting to exploit platform vulnerabilities</li>
                <li>Money laundering or financing illegal activities</li>
                <li>Violating any applicable laws or regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Platform Availability</h2>
              <p>
                We strive to maintain platform availability but do not guarantee uninterrupted service. We may suspend or terminate services for maintenance, security, or legal reasons without prior notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Limitation of Liability</h2>
              <p>
                PerpX and its affiliates shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform. Our total liability shall not exceed the fees paid by you in the past 12 months.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Dispute Resolution</h2>
              <p>
                Any disputes arising from these terms shall be resolved through binding arbitration in accordance with international arbitration rules. You waive the right to participate in class action lawsuits.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">9. Modifications</h2>
              <p>
                We reserve the right to modify these Terms of Service at any time. Continued use of the platform after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">10. Contact Information</h2>
              <p>
                For questions about these Terms of Service, contact us at legal@perpx.io
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
