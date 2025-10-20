import Header from "@/components/Header";
import { Book, FileText, Code, HelpCircle, Zap, Shield } from "lucide-react";

export default function Docs() {
  const sections = [
    { icon: Book, title: "Getting Started", desc: "Learn the basics of PerpX", link: "#" },
    { icon: Zap, title: "Trading Guide", desc: "Master perpetual trading", link: "#" },
    { icon: Code, title: "API Reference", desc: "Integrate with PerpX API", link: "#" },
    { icon: Shield, title: "Security", desc: "Best practices for account security", link: "#" },
    { icon: FileText, title: "FAQ", desc: "Frequently asked questions", link: "#" },
    { icon: HelpCircle, title: "Support", desc: "Get help from our team", link: "#" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Documentation</h1>
          <p className="text-white/60">Explore product features and learn how to use PerpX</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {sections.map((section, index) => (
            <a key={index} href={section.link} className="glass-card rounded-xl p-6 hover-reveal block">
              <section.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">{section.title}</h3>
              <p className="text-sm text-white/60">{section.desc}</p>
            </a>
          ))}
        </div>

        <div className="glass-card rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Popular Articles</h2>
          <div className="space-y-4">
            {[
              { title: "How to place your first trade", category: "Getting Started" },
              { title: "Understanding leverage and margin", category: "Trading Guide" },
              { title: "Setting up API keys", category: "API Reference" },
              { title: "Two-factor authentication setup", category: "Security" },
            ].map((article, index) => (
              <a key={index} href="#" className="flex items-center justify-between py-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors rounded-lg px-4">
                <div>
                  <div className="text-white font-medium mb-1">{article.title}</div>
                  <div className="text-sm text-white/60">{article.category}</div>
                </div>
                <FileText className="h-5 w-5 text-white/40" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
