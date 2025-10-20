import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "jp" | "cn";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Header
    "nav.perpetual": "Perpetual",
    "nav.1001x": "1001x",
    "nav.spot": "Spot",
    "nav.portfolio": "Portfolio",
    "nav.referral": "Referral",
    "nav.rewards": "Rewards",
    "nav.features": "Features",
    "nav.stats": "Stats",
    "nav.roadmap": "Roadmap",
    "button.launchApp": "Launch App",
    "button.connectWallet": "Connect wallet",
    
    // Home
    "home.unlock": "UNLOCK YOUR TRADING EDGE",
    "home.title": "Liquidity for all",
    "home.subtitle": "Ultra-fast decentralized perpetual exchange with deep liquidity, powered by advanced AI trading assistance.",
    "home.startTrading": "Start Trading",
    "home.learnMore": "Learn More",
    "home.24hVolume": "24h Volume",
    "home.cumulativeVolume": "Cumulative Volume",
    "home.addresses": "Addresses",
    "home.selfCustody": "Self-Custody",
    "home.lightningFast": "Lightning Fast Execution",
    "home.highPerformance": "High-Performance Trading for Everyone",
    "home.highPerformanceDesc": "Powerful trading engine designed for deep liquidity, speed, and security",
    "home.ultraDeepLiquidity": "Ultra-Deep Liquidity",
    "home.ultraDeepLiquidityDesc": "$10M+ depth within 1bps spreads, even during high volatility.",
    "home.highPerformanceTitle": "High Performance",
    "home.highPerformanceDesc2": "200,000+ orders per second, less than 10ms latency.",
    "home.provenSecurity": "Proven Security",
    "home.provenSecurityDesc": "Secured by Ethereum mainnet. Your Keys. Your Assets.",
    "home.leverage": "Up to 100x Leverage",
    "home.leverageDesc": "Trade with confidence using flexible leverage options on major pairs.",
    "home.earnYield": "Earn Yield",
    "home.earnYieldDesc": "Your collateral works for you. Earn passive yield automatically.",
    "home.multiChain": "Multi-Chain Support",
    "home.multiChainDesc": "One app, unlimited DeFi experience. Multi-chain, multi-protocol.",
    "home.readyToStart": "Ready to Start Trading?",
    "home.readyToStartDesc": "Join thousands of traders experiencing the future of perpetual trading.",
    "home.viewDocs": "View Documentation",
  },
  jp: {
    // Header
    "nav.perpetual": "パーペチュアル",
    "nav.1001x": "1001x",
    "nav.spot": "スポット",
    "nav.portfolio": "ポートフォリオ",
    "nav.referral": "紹介",
    "nav.rewards": "報酬",
    "nav.features": "機能",
    "nav.stats": "統計",
    "nav.roadmap": "ロードマップ",
    "button.launchApp": "アプリを起動",
    "button.connectWallet": "ウォレット接続",
    
    // Home
    "home.unlock": "取引の優位性を解放",
    "home.title": "すべての人に流動性を",
    "home.subtitle": "高度なAI取引支援を搭載した、深い流動性を持つ超高速分散型永続取引所。",
    "home.startTrading": "取引を開始",
    "home.learnMore": "詳細を見る",
    "home.24hVolume": "24時間取引高",
    "home.cumulativeVolume": "累計取引高",
    "home.addresses": "アドレス数",
    "home.selfCustody": "自己管理",
    "home.lightningFast": "超高速実行",
    "home.highPerformance": "すべての人のための高性能取引",
    "home.highPerformanceDesc": "深い流動性、スピード、セキュリティのために設計された強力な取引エンジン",
    "home.ultraDeepLiquidity": "超深い流動性",
    "home.ultraDeepLiquidityDesc": "高いボラティリティ時でも1bps以内で$10M+の深さ。",
    "home.highPerformanceTitle": "高性能",
    "home.highPerformanceDesc2": "毎秒200,000+注文、10ms未満のレイテンシ。",
    "home.provenSecurity": "実証済みのセキュリティ",
    "home.provenSecurityDesc": "Ethereumメインネットで保護。あなたの鍵。あなたの資産。",
    "home.leverage": "最大100倍レバレッジ",
    "home.leverageDesc": "主要ペアで柔軟なレバレッジオプションを使用して自信を持って取引。",
    "home.earnYield": "利回りを獲得",
    "home.earnYieldDesc": "あなたの担保があなたのために働きます。自動的に受動的利回りを獲得。",
    "home.multiChain": "マルチチェーン対応",
    "home.multiChainDesc": "1つのアプリ、無限のDeFi体験。マルチチェーン、マルチプロトコル。",
    "home.readyToStart": "取引を始める準備はできましたか?",
    "home.readyToStartDesc": "何千人ものトレーダーが永続取引の未来を体験しています。",
    "home.viewDocs": "ドキュメントを見る",
  },
  cn: {
    // Header
    "nav.perpetual": "永续合约",
    "nav.1001x": "1001x",
    "nav.spot": "现货",
    "nav.portfolio": "投资组合",
    "nav.referral": "推荐",
    "nav.rewards": "奖励",
    "nav.features": "功能",
    "nav.stats": "统计",
    "nav.roadmap": "路线图",
    "button.launchApp": "启动应用",
    "button.connectWallet": "连接钱包",
    
    // Home
    "home.unlock": "释放您的交易优势",
    "home.title": "为所有人提供流动性",
    "home.subtitle": "超快速去中心化永续交易所，具有深度流动性，由先进的AI交易辅助提供支持。",
    "home.startTrading": "开始交易",
    "home.learnMore": "了解更多",
    "home.24hVolume": "24小时交易量",
    "home.cumulativeVolume": "累计交易量",
    "home.addresses": "地址数",
    "home.selfCustody": "自我托管",
    "home.lightningFast": "闪电般快速执行",
    "home.highPerformance": "为所有人提供高性能交易",
    "home.highPerformanceDesc": "为深度流动性、速度和安全性设计的强大交易引擎",
    "home.ultraDeepLiquidity": "超深流动性",
    "home.ultraDeepLiquidityDesc": "即使在高波动性期间，1bps价差内也有$10M+深度。",
    "home.highPerformanceTitle": "高性能",
    "home.highPerformanceDesc2": "每秒200,000+订单，延迟低于10ms。",
    "home.provenSecurity": "经过验证的安全性",
    "home.provenSecurityDesc": "由以太坊主网保护。您的密钥。您的资产。",
    "home.leverage": "高达100倍杠杆",
    "home.leverageDesc": "在主要交易对上使用灵活的杠杆选项自信交易。",
    "home.earnYield": "赚取收益",
    "home.earnYieldDesc": "您的抵押品为您工作。自动赚取被动收益。",
    "home.multiChain": "多链支持",
    "home.multiChainDesc": "一个应用，无限的DeFi体验。多链，多协议。",
    "home.readyToStart": "准备开始交易了吗？",
    "home.readyToStartDesc": "加入成千上万的交易者，体验永续交易的未来。",
    "home.viewDocs": "查看文档",
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

