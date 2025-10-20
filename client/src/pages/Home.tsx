import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useRef, useState } from "react";
import { Code, Rocket, Layers, Waves } from "lucide-react";

export default function Home() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const roadmapRef = useRef<HTMLDivElement>(null);

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
      title: { en: "PerpX V1: Perpetual and Spot DEX", ja: "PerpX V1: 永続取引とスポットDEX", zh: "PerpX V1: 永续和现货DEX" },
      desc: { en: "Web and Mobile Applications Launch", ja: "ウェブおよびモバイルアプリケーション開始", zh: "网页和移动应用启动" },
      icon: Rocket,
      color: "from-blue-500 to-cyan-500"
    },
    {
      quarter: "Q2 2026",
      title: { en: "Strategy: On-Chain Asset Management", ja: "戦略: オンチェーン資産管理", zh: "策略: 链上资产管理" },
      desc: { en: "LP and Trading Strategy Vaults Launch", ja: "LPおよび取引戦略ボールト開始", zh: "LP和交易策略金库启动" },
      icon: Layers,
      color: "from-purple-500 to-pink-500"
    },
    {
      quarter: "Q3 2026",
      title: { en: "PerpX V2: High-Performance Layer 2", ja: "PerpX V2: 高性能レイヤー2", zh: "PerpX V2: 高性能Layer 2" },
      desc: { en: "Blockchain Testnet Launch", ja: "ブロックチェーンテストネット開始", zh: "区块链测试网启动" },
      icon: Code,
      color: "from-green-500 to-teal-500"
    },
    {
      quarter: "Q4 2026",
      title: { en: "Permissionless Liquidity Modules", ja: "パーミッションレス流動性モジュール", zh: "无许可流动性模块" },
      desc: { en: "Anyone can create, manage, and deploy liquidity strategies", ja: "誰でも流動性戦略を作成、管理、展開可能", zh: "任何人都可以创建、管理和部署流动性策略" },
      icon: Waves,
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
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
                  {t('launchApp')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-left space-y-6 apple-fade-in">
              <div className="text-sm text-white/60 uppercase tracking-wider">
                UNLOCK YOUR TRADING EDGE
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Liquidity for all
              </h1>
              <p className="text-lg text-white/70 max-w-xl">
                Ultra-fast decentralized perpetual exchange with deep liquidity, powered by advanced AI trading assistance.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/trade">
                  <Button size="lg" className="neuro-button micro-bounce micro-glow text-white font-medium text-lg px-10 py-7">
                    Start Trading →
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="glass-card border-white/20 text-white hover:bg-white/10 text-lg px-10 py-7">
                  Learn More
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                <div className="glass-card rounded-lg p-4">
                  <div className="text-sm text-white/60 mb-1">24h Volume</div>
                  <div className="text-2xl font-bold text-white">$3.37B</div>
                </div>
                <div className="glass-card rounded-lg p-4">
                  <div className="text-sm text-white/60 mb-1">Cumulative Volume</div>
                  <div className="text-2xl font-bold text-white">$139.20B</div>
                </div>
                <div className="glass-card rounded-lg p-4">
                  <div className="text-sm text-white/60 mb-1">Addresses</div>
                  <div className="text-2xl font-bold text-white">147,278</div>
                </div>
              </div>
            </div>

            {/* Right Content - Logo Display */}
            <div className="relative apple-scale-in">
              <div className="glass-card rounded-2xl p-12 aspect-square flex items-center justify-center gradient-border">
                <img src="/logo-horizontal.png" alt="PerpX" className="w-full max-w-md" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "🎨",
                title: "Beautiful UI/UX",
                desc: "Intuitive design for seamless trading"
              },
              {
                icon: "🚀",
                title: "Lightning Fast",
                desc: "Execute trades in milliseconds"
              },
              {
                icon: "🔒",
                title: "Self-Custody",
                desc: "Your keys, your crypto"
              },
              {
                icon: "📊",
                title: "Advanced Analytics",
                desc: "Professional trading tools"
              },
              {
                icon: "🎓",
                title: "Built-in Education",
                desc: "Learn while you trade"
              },
              {
                icon: "🌐",
                title: "Multi-Chain Support",
                desc: "Solana & EVM compatible"
              }
            ].map((feature, index) => (
              <div key={index} className="glass-card rounded-xl p-6 hover-reveal apple-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-white/60">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section ref={roadmapRef} className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Roadmap
            </h2>
            <p className="text-white/60 text-lg">
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
                  <div className="absolute z-10 pointer-events-none">
                    <div className="absolute left-0 top-0 rounded-full bg-[#d9d9d9]" style={{ width: '72px', height: '72px', filter: 'blur(160px)' }}></div>
                    <div className="absolute left-0 top-0 rounded-full bg-white" style={{ width: '32px', height: '32px', filter: 'blur(64px)' }}></div>
                  </div>

                  <div className="flex flex-col justify-between p-8 phone:p-4 min-h-[280px]">
                    {/* Icon */}
                    <div className="flex w-full items-start justify-end">
                      <div className={`w-[120px] h-[120px] rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center phone:w-10 phone:h-10`}>
                        <item.icon className="h-16 w-16 text-white phone:h-5 phone:w-5" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-6 phone:gap-2">
                      <div className="text-left text-[40px] font-bold leading-[1.172] text-[#F9F9F9] phone:text-xl phone:leading-none">
                        {item.quarter}
                      </div>
                      <div className="flex w-full max-w-[409px] flex-col gap-4 phone:max-w-none phone:gap-2">
                        <div className="text-left text-[20px] font-medium leading-[1.5] text-[#F9F9F9] phone:text-[16px] phone:font-normal">
                          {item.title.en}
                        </div>
                        <div className="w-full text-left text-[16px] leading-[1.5] text-[#F9F9F9] phone:max-w-none phone:text-[12px] phone:leading-[1.6]">
                          {item.desc.en}
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
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="glass-card rounded-2xl p-12 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Start Trading?
            </h2>
            <p className="text-white/60 text-lg mb-8">
              Join thousands of traders on the next-generation perpetual DEX
            </p>
            <Link href="/trade">
              <Button size="lg" className="neuro-button micro-bounce micro-glow text-white font-medium text-lg px-12 py-6">
                Start Trading →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-white/60 text-sm">
              © 2025 PerpX. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

