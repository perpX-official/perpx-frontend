import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useRef, useState } from "react";
import { Rocket, Gift, Palette, CreditCard } from "lucide-react";

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
      date: "Oct 2025",
      title: { en: "Development Kickoff", ja: "開発着手", zh: "开发启动" },
      icon: Rocket,
      color: "from-yellow-500 to-orange-500"
    },
    {
      date: "Nov 2025",
      title: { en: "Testing & Marketing Prep", ja: "テスト・マーケティング", zh: "测试与营销" },
      icon: Palette,
      color: "from-green-500 to-teal-500"
    },
    {
      date: "Dec 2025",
      title: { en: "Platform Launch", ja: "プラットフォームローンチ", zh: "平台启动" },
      icon: Rocket,
      color: "from-blue-500 to-purple-500"
    },
    {
      date: "End of Dec 2025",
      title: { en: "First Airdrop Round", ja: "第一弾エアドロップ", zh: "第一轮空投" },
      icon: Gift,
      color: "from-purple-500 to-pink-500"
    },
    {
      date: "Jan 2026",
      title: { en: "Second Airdrop Round", ja: "第二弾エアドロップ", zh: "第二轮空投" },
      icon: Gift,
      color: "from-pink-500 to-red-500"
    },
    {
      date: "Apr 2026",
      title: { en: "NFT Trading Achievements", ja: "NFTインテグレーション", zh: "NFT集成" },
      icon: Palette,
      color: "from-cyan-500 to-blue-500"
    },
    {
      date: "Late 2026",
      title: { en: "VISA Card Integration", ja: "VISAカード連携", zh: "VISA卡集成" },
      icon: CreditCard,
      color: "from-indigo-500 to-purple-500"
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
                  <span className="text-sm">{t('language')}</span>
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
                <Button className="neuro-button micro-bounce micro-glow text-white font-medium">
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
                {t('unlockYourTradingEdge')}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {t('liquidityForAll')}
              </h1>
              <p className="text-lg text-white/70 max-w-xl">
                {t('ultraFastDecentralized')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/trade">
                  <Button className="neuro-button micro-bounce micro-glow text-white font-medium text-lg px-8 py-6">
                    {t('startTrading')} →
                  </Button>
                </Link>
                <Button variant="outline" className="glass-card border-white/20 text-white hover:bg-white/10 text-lg px-8 py-6">
                  {t('learnMore')}
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
                title: { en: "Beautiful UI/UX", ja: "美しいUI/UX", zh: "精美UI/UX" },
                desc: { en: "Intuitive design for seamless trading", ja: "シームレスな取引のための直感的なデザイン", zh: "无缝交易的直观设计" }
              },
              {
                icon: "🚀",
                title: { en: "Lightning Fast", ja: "超高速", zh: "闪电般快速" },
                desc: { en: "Execute trades in milliseconds", ja: "ミリ秒単位で取引を実行", zh: "毫秒级交易执行" }
              },
              {
                icon: "🔒",
                title: { en: "Self-Custody", ja: "自己管理", zh: "自我托管" },
                desc: { en: "Your keys, your crypto", ja: "あなたの鍵、あなたの暗号資産", zh: "您的密钥，您的加密货币" }
              },
              {
                icon: "📊",
                title: { en: "Advanced Analytics", ja: "高度な分析", zh: "高级分析" },
                desc: { en: "Professional trading tools", ja: "プロフェッショナルな取引ツール", zh: "专业交易工具" }
              },
              {
                icon: "🎓",
                title: { en: "Built-in Education", ja: "組み込み教育", zh: "内置教育" },
                desc: { en: "Learn while you trade", ja: "取引しながら学ぶ", zh: "边交易边学习" }
              },
              {
                icon: "🌐",
                title: { en: "Multi-Chain Support", ja: "マルチチェーン対応", zh: "多链支持" },
                desc: { en: "Solana & EVM compatible", ja: "Solana & EVM対応", zh: "Solana & EVM兼容" }
              }
            ].map((feature, index) => (
              <div key={index} className="glass-card rounded-xl p-6 hover-reveal apple-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title.en}</h3>
                <p className="text-white/60">{feature.desc.en}</p>
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
              {t('roadmap') || 'Roadmap'}
            </h2>
            <p className="text-white/60 text-lg">
              {t('aggressiveLaunchPlan') || 'Aggressive Launch Plan for a Fast-Moving Market'}
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-purple-500 to-pink-500 hidden lg:block"></div>

            {/* Roadmap Items */}
            <div className="space-y-12">
              {roadmapItems.map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-col lg:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } ${isVisible ? 'apple-fade-in' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Content Card */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className="glass-card rounded-xl p-6 hover-reveal">
                      <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'}`}>
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                          <item.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="text-sm text-primary font-bold">{item.date}</div>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{item.title.en}</h3>
                      <p className="text-white/60 text-sm">{item.title.ja}</p>
                    </div>
                  </div>

                  {/* Center Dot */}
                  <div className="hidden lg:block w-4 h-4 rounded-full bg-white border-4 border-primary shadow-lg z-10"></div>

                  {/* Spacer */}
                  <div className="flex-1 hidden lg:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="glass-card rounded-2xl p-12 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {t('readyToStartTrading')}
            </h2>
            <p className="text-white/60 text-lg mb-8">
              {t('joinThousandsOfTraders')}
            </p>
            <Link href="/trade">
              <Button className="neuro-button micro-bounce micro-glow text-white font-medium text-lg px-12 py-6">
                {t('startTrading')} →
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

