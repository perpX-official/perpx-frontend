import Header from "@/components/Header";
import { useLanguage } from "@/contexts/LanguageContext";

export default function TermsOfService() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
        <p className="text-sm text-white/60 mb-8">Last updated: January 21, 2026</p>

        <div className="space-y-8 text-white/80">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing or using PerpX ("the Platform"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you must not access or use the Platform.
            </p>
            <p>
              These Terms constitute a legally binding agreement between you and PerpX. Please read them carefully.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Eligibility and Restrictions</h2>
            <p className="mb-4">
              You must be at least 18 years old to use the Platform. By using the Platform, you represent and warrant that you meet this age requirement.
            </p>
            <p className="mb-4">
              The Platform is not available to persons or entities in certain restricted jurisdictions. You may not use the Platform if you are located in, or a citizen or resident of, any jurisdiction where such use would be illegal or prohibited.
            </p>
            <p>
              You may not use any technology or mechanism (such as VPNs) to circumvent geographic restrictions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Description of Services</h2>
            <p className="mb-4">
              PerpX provides a decentralized platform for perpetual contract trading. The Platform allows users to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Trade perpetual contracts with leverage</li>
              <li>Access real-time market data and trading tools</li>
              <li>Manage trading positions and portfolios</li>
              <li>Participate in rewards and referral programs</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. User Responsibilities</h2>
            <p className="mb-4">You agree to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your wallet and private keys</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Not engage in market manipulation or fraudulent activities</li>
              <li>Not use the Platform for money laundering or terrorist financing</li>
              <li>Not interfere with the Platform's operation or security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Trading Risks</h2>
            <p className="mb-4">
              Trading perpetual contracts involves significant risk of loss. You acknowledge and accept that:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>You may lose all or more than your initial investment</li>
              <li>Leverage amplifies both gains and losses</li>
              <li>Market volatility can result in rapid and substantial losses</li>
              <li>Past performance does not guarantee future results</li>
              <li>You are solely responsible for your trading decisions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Fees and Charges</h2>
            <p>
              The Platform may charge fees for trading and other services. All applicable fees will be disclosed to you before you complete a transaction. Fees are subject to change at our discretion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Intellectual Property</h2>
            <p>
              All content, features, and functionality of the Platform are owned by PerpX and are protected by intellectual property laws. You may not copy, modify, distribute, or create derivative works without our express permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">8. Disclaimers</h2>
            <p className="mb-4">
              THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND. WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Warranties of merchantability and fitness for a particular purpose</li>
              <li>Warranties regarding accuracy, reliability, or availability</li>
              <li>Warranties that the Platform will be uninterrupted or error-free</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">9. Limitation of Liability</h2>
            <p className="mb-4">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, PERPX SHALL NOT BE LIABLE FOR:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Any indirect, incidental, special, or consequential damages</li>
              <li>Loss of profits, revenue, data, or business opportunities</li>
              <li>Trading losses or liquidations</li>
              <li>Damages resulting from unauthorized access to your account</li>
              <li>Damages caused by third-party services or blockchain networks</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">10. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless PerpX and its affiliates from any claims, damages, losses, or expenses arising from your use of the Platform, violation of these Terms, or violation of any rights of third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">11. Modifications to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify you of material changes by posting the updated Terms on the Platform. Your continued use after such changes constitutes acceptance of the modified Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">12. Termination</h2>
            <p>
              We may suspend or terminate your access to the Platform at any time, with or without cause or notice. You may stop using the Platform at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">13. Dispute Resolution</h2>
            <p className="mb-4">
              Any disputes arising from these Terms or your use of the Platform shall be resolved through binding arbitration, except where prohibited by law.
            </p>
            <p>
              You waive any right to participate in class action lawsuits or class-wide arbitration.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">14. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">15. Severability</h2>
            <p>
              If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">16. Contact Information</h2>
            <p>
              If you have questions about these Terms, please contact us at:
            </p>
            <p className="mt-4">
              Email: legal@perpx.exchange
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

