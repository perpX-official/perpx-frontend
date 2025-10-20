import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Book, Code, Zap, Shield, TrendingUp, Users } from "lucide-react";

export default function Docs() {
  const sections = [
    {
      icon: Book,
      title: "Getting Started",
      desc: "Learn the basics of trading on PerpX",
      links: [
        { name: "What is PerpX?", href: "#" },
        { name: "Creating Your First Trade", href: "#" },
        { name: "Understanding Perpetual Contracts", href: "#" },
        { name: "Wallet Setup Guide", href: "#" }
      ]
    },
    {
      icon: TrendingUp,
      title: "Trading Guide",
      desc: "Master advanced trading strategies",
      links: [
        { name: "Leverage and Margin", href: "#" },
        { name: "Order Types Explained", href: "#" },
        { name: "Risk Management", href: "#" },
        { name: "Technical Analysis Tools", href: "#" }
      ]
    },
    {
      icon: Code,
      title: "API Documentation",
      desc: "Integrate PerpX into your applications",
      links: [
        { name: "REST API Reference", href: "#" },
        { name: "WebSocket Streams", href: "#" },
        { name: "Authentication", href: "#" },
        { name: "Rate Limits", href: "#" }
      ]
    },
    {
      icon: Shield,
      title: "Security",
      desc: "Keep your assets safe",
      links: [
        { name: "Security Best Practices", href: "#" },
        { name: "Two-Factor Authentication", href: "#" },
        { name: "Audit Reports", href: "#" },
        { name: "Bug Bounty Program", href: "#" }
      ]
    },
    {
      icon: Zap,
      title: "Advanced Features",
      desc: "Unlock the full potential of PerpX",
      links: [
        { name: "AI Trading Assistant", href: "#" },
        { name: "Cross-Margin Mode", href: "#" },
        { name: "Portfolio Analytics", href: "#" },
        { name: "Custom Indicators", href: "#" }
      ]
    },
    {
      icon: Users,
      title: "Community",
      desc: "Join the PerpX community",
      links: [
        { name: "Discord Server", href: "#" },
        { name: "Telegram Group", href: "#" },
        { name: "Twitter Updates", href: "#" },
        { name: "Community Forum", href: "#" }
      ]
    }
  ];

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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Documentation</h1>
            <p className="text-xl text-white/60">
              Everything you need to know about trading on PerpX
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section, index) => (
              <div key={index} className="glass-card rounded-xl p-8 hover:bg-white/5 transition-colors">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center mb-6">
                  <section.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{section.title}</h3>
                <p className="text-white/60 mb-6">{section.desc}</p>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a 
                        href={link.href}
                        className="text-white/80 hover:text-primary transition-colors flex items-center gap-2"
                      >
                        <span>→</span>
                        <span>{link.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 glass-card rounded-xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Need More Help?</h2>
            <p className="text-xl text-white/60 mb-8">
              Our support team is available 24/7 to assist you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="neuro-button text-white font-medium px-8">
                Contact Support
              </Button>
              <Button size="lg" variant="outline" className="glass-card border-white/20 text-white hover:bg-white/10 px-8">
                Join Discord
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
