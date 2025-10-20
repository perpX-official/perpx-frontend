import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";

export default function Home() {
  const { language, t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const roadmapItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: "0px 0px -100px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    }, observerOptions);

    // Observe roadmap items
    roadmapItemsRef.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    // Parallax effect for hero
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroRef.current.style.opacity = `${1 - scrolled / 800}`;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const translations = {
    en: {
      tagline: "UNLOCK YOUR TRADING EDGE",
      title: "Revolutionizing On-Chain Trading for Asia",
      subtitle: "Trade Freely. Earn Stylishly.",
      description: "Ultra-fast decentralized perpetual exchange with deep liquidity, powered by advanced AI trading assistance.",
      startTrading: "Start Trading",
      learnMore: "Learn More",
      features: "Key Features",
      feature1Title: "AI-Powered Trading",
      feature1Desc: "Advanced AI algorithms provide real-time market insights and trading suggestions",
      feature2Title: "Deep Liquidity",
      feature2Desc: "JIT liquidity mechanism ensures optimal execution with minimal slippage",
      feature3Title: "Cross-Margin System",
      feature3Desc: "Efficient capital utilization with cross-margin trading up to 100x leverage",
      feature4Title: "100x Leverage",
      feature4Desc: "Maximize your trading potential with industry-leading leverage options",
      feature5Title: "Yield-Earning Collateral",
      feature5Desc: "Your collateral generates yield while you trade",
      feature6Title: "Advanced Analytics",
      feature6Desc: "Professional-grade charting tools and market analysis",
      roadmapTitle: "Roadmap",
      q1Title: "Q1 2026 - Foundation",
      q1Items: ["Development Kickoff", "Core Infrastructure", "Smart Contract Audit"],
      q2Title: "Q2 2026 - Launch",
      q2Items: ["Platform Launch", "First Airdrop Round", "Community Building"],
      q3Title: "Q3 2026 - Expansion",
      q3Items: ["Second Airdrop Round", "Advanced Features", "Multi-chain Support"],
      q4Title: "Q4 2026 - Innovation",
      q4Items: ["NFT Trading Achievements", "VISA Card Integration", "Global Expansion"],
      ctaTitle: "Ready to Start Trading?",
      ctaDescription: "Join thousands of traders experiencing the future of decentralized perpetual trading",
      ctaButton: "Launch App"
    },
    ja: {
      tagline: "トレーディングの優位性を解き放つ",
      title: "アジアのためのオンチェーン取引革命",
      subtitle: "自由に取引。スタイリッシュに稼ぐ。",
      description: "高度なAI取引支援を搭載した、深い流動性を持つ超高速分散型永続取引所",
      startTrading: "取引を開始",
      learnMore: "詳細を見る",
      features: "主な機能",
      feature1Title: "AI駆動取引",
      feature1Desc: "高度なAIアルゴリズムがリアルタイムの市場洞察と取引提案を提供",
      feature2Title: "深い流動性",
      feature2Desc: "JIT流動性メカニズムにより、最小限のスリッページで最適な執行を保証",
      feature3Title: "クロスマージンシステム",
      feature3Desc: "最大100倍のレバレッジでクロスマージン取引による効率的な資本活用",
      feature4Title: "100倍レバレッジ",
      feature4Desc: "業界最高水準のレバレッジオプションで取引の可能性を最大化",
      feature5Title: "収益を生むコラテラル",
      feature5Desc: "取引中もコラテラルが収益を生み出します",
      feature6Title: "高度な分析",
      feature6Desc: "プロフェッショナルグレードのチャートツールと市場分析",
      roadmapTitle: "ロードマップ",
      q1Title: "2026年Q1 - 基盤構築",
      q1Items: ["開発着手", "コアインフラ構築", "スマートコントラクト監査"],
      q2Title: "2026年Q2 - ローンチ",
      q2Items: ["プラットフォームローンチ", "第一弾エアドロップ", "コミュニティ構築"],
      q3Title: "2026年Q3 - 拡張",
      q3Items: ["第二弾エアドロップ", "高度な機能追加", "マルチチェーン対応"],
      q4Title: "2026年Q4 - イノベーション",
      q4Items: ["NFT取引実績", "VISAカード連携", "グローバル展開"],
      ctaTitle: "取引を始める準備はできましたか?",
      ctaDescription: "分散型永続取引の未来を体験する数千人のトレーダーに参加しましょう",
      ctaButton: "アプリを起動"
    },
    cn: {
      tagline: "释放您的交易优势",
      title: "革新亚洲链上交易",
      subtitle: "自由交易。时尚赚钱。",
      description: "超快速去中心化永续交易所，具有深度流动性，由先进的AI交易辅助提供支持",
      startTrading: "开始交易",
      learnMore: "了解更多",
      features: "主要功能",
      feature1Title: "AI驱动交易",
      feature1Desc: "先进的AI算法提供实时市场洞察和交易建议",
      feature2Title: "深度流动性",
      feature2Desc: "JIT流动性机制确保以最小滑点实现最佳执行",
      feature3Title: "跨保证金系统",
      feature3Desc: "通过高达100倍杠杆的跨保证金交易实现高效资本利用",
      feature4Title: "100倍杠杆",
      feature4Desc: "通过行业领先的杠杆选项最大化您的交易潜力",
      feature5Title: "产生收益的抵押品",
      feature5Desc: "您的抵押品在交易时产生收益",
      feature6Title: "高级分析",
      feature6Desc: "专业级图表工具和市场分析",
      roadmapTitle: "路线图",
      q1Title: "2026年Q1 - 基础",
      q1Items: ["开发启动", "核心基础设施", "智能合约审计"],
      q2Title: "2026年Q2 - 启动",
      q2Items: ["平台启动", "第一轮空投", "社区建设"],
      q3Title: "2026年Q3 - 扩展",
      q3Items: ["第二轮空投", "高级功能", "多链支持"],
      q4Title: "2026年Q4 - 创新",
      q4Items: ["NFT交易成就", "VISA卡集成", "全球扩张"],
      ctaTitle: "准备开始交易了吗？",
      ctaDescription: "加入数千名体验去中心化永续交易未来的交易者",
      ctaButton: "启动应用"
    }
  };

  const content = translations[language as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen bg-[#0A1628] text-white overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer">
                <img src="/logo-icon.png" alt="PerpX" className="h-8 w-8" />
                <span className="text-2xl font-bold text-gradient">PerpX</span>
              </div>
            </Link>
            <Link href="/trade">
              <button className="neumorphic px-8 py-3 rounded-xl font-semibold text-lg hover:scale-105 transition-all duration-300">
                {content.startTrading}
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 gradient-motion opacity-30"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="space-y-8 trail-effect">
              <div className="text-sm tracking-widest text-[#0ABAB5] font-semibold uppercase">
                {content.tagline}
              </div>
              
              <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-gradient">{content.title}</span>
              </h1>
              
              <p className="text-2xl text-[#FFD700] font-semibold">
                {content.subtitle}
              </p>
              
              <p className="text-xl text-gray-300 leading-relaxed">
                {content.description}
              </p>
              
              <div className="flex gap-4 pt-4">
                <Link href="/trade">
                  <button className="neumorphic px-10 py-4 rounded-xl font-semibold text-lg hover:scale-105 transition-all duration-300 micro-interaction">
                    {content.startTrading}
                  </button>
                </Link>
                <button className="glass px-10 py-4 rounded-xl font-semibold text-lg border border-white/20 hover:border-[#0ABAB5] transition-all duration-300">
                  {content.learnMore}
                </button>
              </div>
            </div>

            {/* Right: Geometric Visual */}
            <div className="relative hover-reveal">
              <div className="absolute inset-0 bg-gradient-to-r from-[#0ABAB5] to-[#A855F7] rounded-full blur-3xl opacity-20 animate-pulse"></div>
              <img 
                src="/hero-visual.png" 
                alt="PerpX Visualization" 
                className="relative z-10 w-full h-auto animate-float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-20 text-gradient scroll-reveal">
            {content.features}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: content.feature1Title, desc: content.feature1Desc, icon: "🤖" },
              { title: content.feature2Title, desc: content.feature2Desc, icon: "💧" },
              { title: content.feature3Title, desc: content.feature3Desc, icon: "⚡" },
              { title: content.feature4Title, desc: content.feature4Desc, icon: "🚀" },
              { title: content.feature5Title, desc: content.feature5Desc, icon: "💰" },
              { title: content.feature6Title, desc: content.feature6Desc, icon: "📊" }
            ].map((feature, index) => (
              <div
                key={index}
                className="glass p-8 rounded-2xl hover-reveal hover:scale-105 transition-all duration-500 scroll-reveal"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-[#0ABAB5]">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section - Vertical Scroll */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold text-center mb-20 text-gradient">
            {content.roadmapTitle}
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-12">
            {[
              { title: content.q1Title, items: content.q1Items, color: "#0ABAB5" },
              { title: content.q2Title, items: content.q2Items, color: "#A855F7" },
              { title: content.q3Title, items: content.q3Items, color: "#FFD700" },
              { title: content.q4Title, items: content.q4Items, color: "#10B981" }
            ].map((quarter, index) => (
              <div
                key={index}
                ref={(el: HTMLDivElement | null) => { roadmapItemsRef.current[index] = el; }}
                className="roadmap-item glass p-8 rounded-2xl border-l-4 hover:scale-105 transition-all duration-500"
                style={{ borderLeftColor: quarter.color }}
              >
                <h3 className="text-3xl font-bold mb-6" style={{ color: quarter.color }}>
                  {quarter.title}
                </h3>
                <ul className="space-y-3">
                  {quarter.items.map((item: string, i: number) => (
                    <li key={i} className="flex items-center gap-3 text-lg text-gray-300">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: quarter.color }}></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 gradient-motion opacity-20"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl font-bold mb-6 text-gradient scroll-reveal">
            {content.ctaTitle}
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto scroll-reveal">
            {content.ctaDescription}
          </p>
          <Link href="/trade">
            <button className="neumorphic px-12 py-5 rounded-xl font-semibold text-xl hover:scale-110 transition-all duration-300 micro-interaction">
              {content.ctaButton}
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass border-t border-white/10 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="/logo-icon.png" alt="PerpX" className="h-8 w-8" />
                <span className="text-xl font-bold text-gradient">PerpX</span>
              </div>
              <p className="text-gray-400 text-sm">
                Next-generation decentralized perpetual exchange for Asia
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-[#0ABAB5]">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/trade" className="hover:text-white transition-colors">Trade</Link></li>
                <li><Link href="/stats" className="hover:text-white transition-colors">Stats</Link></li>
                <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-[#0ABAB5]">Community</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><Link href="/referral" className="hover:text-white transition-colors">Referral</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-[#0ABAB5]">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
            <p>&copy; 2025 PerpX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

