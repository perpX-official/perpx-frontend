import { useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "wouter";
import Header from "@/components/Header";

export default function Home() {
  const { language } = useLanguage();
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
        heroRef.current.style.opacity = `${Math.max(0, 1 - scrolled / 800)}`;
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
      title: "Next-Gen Perpetual DEX",
      subtitle: "Trade Freely. Earn Stylishly.",
      description: "Ultra-fast decentralized perpetual exchange with deep liquidity, powered by advanced AI trading assistance.",
      startTrading: "Start Trading",
      learnMore: "Learn More",
      stats1: "24h Volume",
      stats2: "Cumulative Volume",
      stats3: "Addresses",
      features: "Why Choose PerpX",
      feature1Title: "AI-Powered Trading",
      feature1Desc: "Advanced AI algorithms provide real-time market insights and trading suggestions to maximize your profits",
      feature2Title: "Deep Liquidity",
      feature2Desc: "JIT liquidity mechanism ensures optimal execution with minimal slippage for all your trades",
      feature3Title: "Cross-Margin System",
      feature3Desc: "Efficient capital utilization with cross-margin trading up to 100x leverage",
      feature4Title: "100x Leverage",
      feature4Desc: "Maximize your trading potential with industry-leading leverage options",
      feature5Title: "Yield-Earning Collateral",
      feature5Desc: "Your collateral generates yield while you trade, maximizing capital efficiency",
      feature6Title: "Advanced Analytics",
      feature6Desc: "Professional-grade charting tools and market analysis powered by TradingView",
      roadmapTitle: "Roadmap to the Future",
      q1Title: "Q1 2026 - Foundation",
      q1Items: ["Development Kickoff", "Core Infrastructure Setup", "Smart Contract Security Audit", "Testnet Launch"],
      q2Title: "Q2 2026 - Platform Launch",
      q2Items: ["Mainnet Launch", "First Airdrop Round", "Community Building", "Marketing Campaign"],
      q3Title: "Q3 2026 - Expansion",
      q3Items: ["Second Airdrop Round", "Advanced Trading Features", "Multi-chain Support", "Mobile App Beta"],
      q4Title: "Q4 2026 - Innovation",
      q4Items: ["NFT Trading Achievements", "VISA Card Integration", "Global Expansion", "Governance Launch"],
      ctaTitle: "Ready to Start Trading?",
      ctaDescription: "Join thousands of traders experiencing the future of decentralized perpetual trading with PerpX",
      ctaButton: "Launch App"
    },
    jp: {
      tagline: "トレーディングの優位性を解き放つ",
      title: "次世代永続DEX",
      subtitle: "自由に取引。スタイリッシュに稼ぐ。",
      description: "高度なAI取引支援を搭載した、深い流動性を持つ超高速分散型永続取引所",
      startTrading: "取引を開始",
      learnMore: "詳細を見る",
      stats1: "24時間出来高",
      stats2: "累計出来高",
      stats3: "アドレス数",
      features: "PerpXを選ぶ理由",
      feature1Title: "AI駆動取引",
      feature1Desc: "高度なAIアルゴリズムがリアルタイムの市場洞察と取引提案を提供し、利益を最大化",
      feature2Title: "深い流動性",
      feature2Desc: "JIT流動性メカニズムにより、すべての取引で最小限のスリッページで最適な執行を保証",
      feature3Title: "クロスマージンシステム",
      feature3Desc: "最大100倍のレバレッジでクロスマージン取引による効率的な資本活用",
      feature4Title: "100倍レバレッジ",
      feature4Desc: "業界最高水準のレバレッジオプションで取引の可能性を最大化",
      feature5Title: "収益を生むコラテラル",
      feature5Desc: "取引中もコラテラルが収益を生み出し、資本効率を最大化",
      feature6Title: "高度な分析",
      feature6Desc: "TradingView搭載のプロフェッショナルグレードのチャートツールと市場分析",
      roadmapTitle: "未来へのロードマップ",
      q1Title: "2026年Q1 - 基盤構築",
      q1Items: ["開発着手", "コアインフラ構築", "スマートコントラクト監査", "テストネットローンチ"],
      q2Title: "2026年Q2 - プラットフォームローンチ",
      q2Items: ["メインネットローンチ", "第一弾エアドロップ", "コミュニティ構築", "マーケティングキャンペーン"],
      q3Title: "2026年Q3 - 拡張",
      q3Items: ["第二弾エアドロップ", "高度な取引機能", "マルチチェーン対応", "モバイルアプリベータ"],
      q4Title: "2026年Q4 - イノベーション",
      q4Items: ["NFT取引実績", "VISAカード連携", "グローバル展開", "ガバナンスローンチ"],
      ctaTitle: "取引を始める準備はできましたか?",
      ctaDescription: "PerpXで分散型永続取引の未来を体験する数千人のトレーダーに参加しましょう",
      ctaButton: "アプリを起動"
    },
    cn: {
      tagline: "释放您的交易优势",
      title: "下一代永续DEX",
      subtitle: "自由交易。时尚赚钱。",
      description: "超快速去中心化永续交易所，具有深度流动性，由先进的AI交易辅助提供支持",
      startTrading: "开始交易",
      learnMore: "了解更多",
      stats1: "24小时交易量",
      stats2: "累计交易量",
      stats3: "地址数",
      features: "为什么选择PerpX",
      feature1Title: "AI驱动交易",
      feature1Desc: "先进的AI算法提供实时市场洞察和交易建议，最大化您的利润",
      feature2Title: "深度流动性",
      feature2Desc: "JIT流动性机制确保所有交易以最小滑点实现最佳执行",
      feature3Title: "跨保证金系统",
      feature3Desc: "通过高达100倍杠杆的跨保证金交易实现高效资本利用",
      feature4Title: "100倍杠杆",
      feature4Desc: "通过行业领先的杠杆选项最大化您的交易潜力",
      feature5Title: "产生收益的抵押品",
      feature5Desc: "您的抵押品在交易时产生收益，最大化资本效率",
      feature6Title: "高级分析",
      feature6Desc: "由TradingView提供支持的专业级图表工具和市场分析",
      roadmapTitle: "通往未来的路线图",
      q1Title: "2026年Q1 - 基础",
      q1Items: ["开发启动", "核心基础设施搭建", "智能合约安全审计", "测试网启动"],
      q2Title: "2026年Q2 - 平台启动",
      q2Items: ["主网启动", "第一轮空投", "社区建设", "营销活动"],
      q3Title: "2026年Q3 - 扩展",
      q3Items: ["第二轮空投", "高级交易功能", "多链支持", "移动应用测试版"],
      q4Title: "2026年Q4 - 创新",
      q4Items: ["NFT交易成就", "VISA卡集成", "全球扩张", "治理启动"],
      ctaTitle: "准备开始交易了吗？",
      ctaDescription: "加入数千名体验PerpX去中心化永续交易未来的交易者",
      ctaButton: "启动应用"
    }
  };

  const content = translations[language as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen bg-[#0A1628] text-white overflow-hidden">
      {/* Header Component */}
      <Header />

      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6">
        <div className="absolute inset-0 gradient-motion opacity-30"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Text Content */}
            <div className="space-y-4 sm:space-y-8 trail-effect text-center lg:text-left">
              <div className="text-xs sm:text-sm tracking-widest text-[#0ABAB5] font-semibold uppercase">
                {content.tagline}
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
                <span className="text-gradient">{content.title}</span>
              </h1>
              
              <p className="text-lg sm:text-2xl text-[#FFD700] font-semibold">
                {content.subtitle}
              </p>
              
              <p className="text-base sm:text-xl text-gray-300 leading-relaxed">
                {content.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                <Link href="/trade">
                  <button className="button-scale-fade neumorphic px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg w-full sm:w-auto">
                    {content.startTrading}
                  </button>
                </Link>
                <button className="button-scale-fade glass px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg border border-white/20 hover:border-[#0ABAB5] w-full sm:w-auto">
                  {content.learnMore}
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                <div className="glass p-4 rounded-xl">
                  <div className="text-xs sm:text-sm text-gray-400 mb-1">{content.stats1}</div>
                  <div className="text-lg sm:text-2xl font-bold text-[#0ABAB5]">$3.37B</div>
                </div>
                <div className="glass p-4 rounded-xl">
                  <div className="text-xs sm:text-sm text-gray-400 mb-1">{content.stats2}</div>
                  <div className="text-lg sm:text-2xl font-bold text-[#0ABAB5]">$139.20B</div>
                </div>
                <div className="glass p-4 rounded-xl">
                  <div className="text-xs sm:text-sm text-gray-400 mb-1">{content.stats3}</div>
                  <div className="text-lg sm:text-2xl font-bold text-[#0ABAB5]">147,278</div>
                </div>
              </div>
            </div>

            {/* Right: Geometric Visual */}
            <div className="relative hover-reveal mt-8 lg:mt-0">
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
      <section id="features" className="py-16 sm:py-32 relative px-4 sm:px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-5xl font-bold text-center mb-12 sm:mb-20 text-gradient scroll-reveal">
            {content.features}
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
                className="glass p-6 sm:p-8 rounded-2xl hover-reveal hover:scale-105 transition-all duration-500 scroll-reveal"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl sm:text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-[#0ABAB5]">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap Section - Vertical Scroll */}
      <section id="roadmap" className="py-16 sm:py-32 relative px-4 sm:px-6">
        <div className="container mx-auto">
          <h2 className="text-3xl sm:text-5xl font-bold text-center mb-12 sm:mb-20 text-gradient">
            {content.roadmapTitle}
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12">
            {[
              { title: content.q1Title, items: content.q1Items, color: "#0ABAB5" },
              { title: content.q2Title, items: content.q2Items, color: "#A855F7" },
              { title: content.q3Title, items: content.q3Items, color: "#FFD700" },
              { title: content.q4Title, items: content.q4Items, color: "#10B981" }
            ].map((quarter, index) => (
              <div
                key={index}
                ref={(el: HTMLDivElement | null) => { roadmapItemsRef.current[index] = el; }}
                className="roadmap-item glass p-6 sm:p-8 rounded-2xl border-l-4 hover:scale-105 transition-all duration-500"
                style={{ borderLeftColor: quarter.color }}
              >
                <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6" style={{ color: quarter.color }}>
                  {quarter.title}
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  {quarter.items.map((item: string, i: number) => (
                    <li key={i} className="flex items-center gap-3 text-base sm:text-lg text-gray-300">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: quarter.color }}></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-32 relative px-4 sm:px-6">
        <div className="absolute inset-0 gradient-motion opacity-20"></div>
        
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 text-gradient scroll-reveal">
            {content.ctaTitle}
          </h2>
          <p className="text-base sm:text-xl text-gray-300 mb-8 sm:mb-12 max-w-2xl mx-auto scroll-reveal">
            {content.ctaDescription}
          </p>
          <Link href="/trade">
            <button className="button-scale-fade neumorphic px-10 sm:px-12 py-4 sm:py-5 rounded-xl font-semibold text-lg sm:text-xl">
              {content.ctaButton}
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass border-t border-white/10 py-8 sm:py-12 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 sm:gap-3 mb-4">
                <img src="/logo-icon.png" alt="PerpX" className="h-6 w-6 sm:h-8 sm:w-8" />
                <span className="text-lg sm:text-xl font-bold text-gradient">PerpX</span>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm">
                Next-generation decentralized perpetual exchange for Asia
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-[#0ABAB5] text-sm sm:text-base">Product</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
                <li><Link href="/trade" className="hover:text-white transition-colors">Trade</Link></li>
                <li><Link href="/stats" className="hover:text-white transition-colors">Stats</Link></li>
                <li><Link href="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-[#0ABAB5] text-sm sm:text-base">Community</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><Link href="/referral" className="hover:text-white transition-colors">Referral</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-[#0ABAB5] text-sm sm:text-base">Legal</h4>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10 text-center text-xs sm:text-sm text-gray-400">
            <p>&copy; 2025 PerpX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

