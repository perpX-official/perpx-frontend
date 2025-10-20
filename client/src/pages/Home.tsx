import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useRef, useState } from "react";
import { Code, Rocket, Layers, Waves, TrendingUp, Zap, Shield, BarChart3, Coins, Network } from "lucide-react";

export default function Home() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const roadmapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (roadmapRef.current) {
      observer.observe(roadmapRef.current);
    }

    return () => {
      if (roadmapRef.current) {
        observer.unobserve(roadmapRef.current);
      }
    };
  }, []);

  const roadmapItems = [
    {
      quarter: "Q1 2026",
      title: "PerpX V1: Perpetual and Spot DEX",
      desc: "Web and Mobile Applications Launch",
      icon: Rocket,
      color: "from-blue-500 to-cyan-500"
    },
    {
      quarter: "Q2 2026",
      title: "Strategy: On-Chain Asset Management",
      desc: "LP and Trading Strategy Vaults Launch",
      icon: Layers,
      color: "from-purple-500 to-pink-500"
    },
    {
      quarter: "Q3 2026",
      title: "PerpX V2: High-Performance Layer 2",
      desc: "Blockchain Testnet Launch",
      icon: Code,
      color: "from-green-500 to-teal-500"
    },
    {
      quarter: "Q4 2026",
      title: "Permissionless Liquidity Modules",
      desc: "Anyone can create, manage, and deploy liquidity strategies",
      icon: Waves,
      color: "from-orange-500 to-red-500"
    }
  ];

  const features = [
    {
      icon: TrendingUp,
      title: "AI-Powered Trading",
      desc: "Advanced AI assistance for smarter trading decisions"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      desc: "Execute trades in milliseconds with low latency"
    },
    {
      icon: Shield,
      title: "Self-Custody",
      desc: "Your keys, your crypto. Full control over your assets"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      desc: "Professional-grade charts and trading tools"
    },
    {
      icon: Coins,
      title: "Deep Liquidity",
      desc: "Access to deep liquidity pools across multiple chains"
    },
    {
      icon: Network,
      title: "Multi-Chain",
      desc: "Trade on Solana and EVM chains seamlessly"
    }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Gradient Motion Background */}
      <div className="fixed inset-0 gradient-motion-fast opacity-20 pointer-events-none"></div>
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <a className="flex items-center gap-2">
                <img src="/logo-icon.png" alt="PerpX" className="h-8 w-8" />
                <span className="text-xl font-bold text-white">PerpX</span>
              </a>
            </Link>

            <div className="flex items-center gap-4">
              <div className="relative group">
                <button className="px-4 py-2 text-white/80 hover:text-white transition-colors flex items-center gap-1">
                  <span className="text-sm">EN</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-40 glass-card rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <button className="w-full px-4 py-2 text-left text-white/80 hover:text-white hover:bg-white/5 rounded-t-lg">
                    English
                  </button>
                  <button className="w-full px-4 py-2 text-left text-white/80 hover:text-white hover:bg-white/5">
                    日本語
                  </button>
                  <button className="w-full px-4 py-2 text-left text-white/80 hover:text-white hover:bg-white/5 rounded-b-lg">
                    中文
                  </button>
                </div>
              </div>

              <Link href="/trade">
                <Button size="lg" className="neuro-button micro-bounce micro-glow text-white font-medium px-8">
                  Launch App
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Parallax */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0">
          <div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }}
          ></div>
          <div 
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
            style={{ transform: `translateY(${scrollY * -0.2}px)` }}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 apple-fade-in">
              <div className="space-y-6">
                <p className="text-sm font-medium text-white/60 tracking-wider uppercase">
                  UNLOCK YOUR TRADING EDGE
                </p>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
                  Liquidity for all
                </h1>
                <p className="text-xl text-white/70 max-w-xl">
                  Ultra-fast decentralized perpetual exchange with deep liquidity, powered by advanced AI trading assistance.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/trade">
                  <Button size="lg" className="neuro-button micro-bounce micro-glow text-white font-medium text-lg px-10 py-7 w-full sm:w-auto">
                    Start Trading →
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="glass-card border-white/20 text-white hover:bg-white/10 text-lg px-10 py-7 w-full sm:w-auto">
                  Learn More
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="glass-card rounded-lg p-4">
                  <div className="text-xs text-white/60 mb-1">24h Volume</div>
                  <div className="text-xl sm:text-2xl font-bold text-white">$3.37B</div>
                </div>
                <div className="glass-card rounded-lg p-4">
                  <div className="text-xs text-white/60 mb-1">Total Volume</div>
                  <div className="text-xl sm:text-2xl font-bold text-white">$139.20B</div>
                </div>
                <div className="glass-card rounded-lg p-4">
                  <div className="text-xs text-white/60 mb-1">Users</div>
                  <div className="text-xl sm:text-2xl font-bold text-white">147,278</div>
                </div>
              </div>
            </div>

            {/* Right Content - Logo Display with Parallax */}
            <div 
              className="relative apple-scale-in"
              style={{ transform: `translateY(${scrollY * 0.1}px)` }}
            >
              <div className="glass-card rounded-2xl p-12 aspect-square flex items-center justify-center gradient-border relative overflow-hidden">
                {/* Animated Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/20 to-pink-500/20 animate-pulse"></div>
                <img src="/logo-horizontal.png" alt="PerpX" className="w-full max-w-md relative z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Why Choose PerpX?
            </h2>
            <p className="text-xl text-white/60">
              Next-generation trading experience designed for everyone
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="glass-card rounded-xl p-8 hover-reveal apple-fade-in group cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/60 text-lg">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section ref={roadmapRef} className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Roadmap
            </h2>
            <p className="text-xl text-white/60">
              Aggressive Launch Plan for a Fast-Moving Market
            </p>
          </div>

          {/* Roadmap Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {roadmapItems.map((item, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-3xl p-[1.5px] ${
                  isVisible ? 'apple-fade-in' : 'opacity-0'
                }`}
                style={{ 
                  animationDelay: `${index * 200}ms`,
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.88) 3.9%, rgba(255,255,255,0.85) 6.2%, rgba(255,255,255,0.8) 9.2%, rgba(255,255,255,0.72) 15%, rgba(255,255,255,0.64) 22.8%, rgba(255,255,255,0) 35.7%, rgba(255,255,255,0.12) 48.2%, rgba(255,255,255,0) 66.9%, rgba(255,255,255,0.4) 82.5%, rgba(153,153,153,0.4) 100%)'
                }}
              >
                <div className="relative w-full overflow-hidden rounded-[22px] bg-[#181818] shadow-[24px_24px_120px_rgba(255,255,255,0.08)]">
                  {/* Glow Effect */}
                  <div className="absolute z-10 pointer-events-none top-0 left-0">
                    <div className="absolute left-0 top-0 rounded-full bg-[#d9d9d9]" style={{ width: '72px', height: '72px', filter: 'blur(160px)' }}></div>
                    <div className="absolute left-0 top-0 rounded-full bg-white" style={{ width: '32px', height: '32px', filter: 'blur(64px)' }}></div>
                  </div>

                  <div className="flex flex-col justify-between p-8 min-h-[280px]">
                    {/* Icon */}
                    <div className="flex w-full items-start justify-end">
                      <div className={`w-[120px] h-[120px] rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                        <item.icon className="h-16 w-16 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-6">
                      <div className="text-left text-[40px] font-bold leading-[1.172] text-[#F9F9F9]">
                        {item.quarter}
                      </div>
                      <div className="flex w-full flex-col gap-4">
                        <div className="text-left text-[20px] font-medium leading-[1.5] text-[#F9F9F9]">
                          {item.title}
                        </div>
                        <div className="w-full text-left text-[16px] leading-[1.5] text-[#F9F9F9]">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="glass-card rounded-2xl p-16 text-center max-w-4xl mx-auto relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
            
            <div className="relative z-10">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Ready to Start Trading?
              </h2>
              <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
                Join thousands of traders on the next-generation perpetual DEX. Experience the future of decentralized trading today.
              </p>
              <Link href="/trade">
                <Button size="lg" className="neuro-button micro-bounce micro-glow text-white font-medium text-xl px-16 py-8">
                  Start Trading →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <img src="/logo-icon.png" alt="PerpX" className="h-8 w-8" />
              <span className="text-lg font-bold text-white">PerpX</span>
            </div>
            <div className="text-white/60 text-sm">
              © 2025 PerpX. All rights reserved.
            </div>
            <div className="flex gap-8">
              <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                Documentation
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

