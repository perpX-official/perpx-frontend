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
    
    // Rewards
    "rewards.dailyTasks": "Daily Tasks",
    "rewards.weeklyTasks": "Weekly Tasks",
    "rewards.specialTasks": "Special Tasks",
    "rewards.loginBonus": "Login Bonus",
    "rewards.loginBonusDesc": "Get rewards by logging in daily",
    "rewards.demoTrade": "Complete 3 Demo Trades",
    "rewards.demoTradeDesc": "Experience trading in learning mode 3 times",
    "rewards.twitterPost": "Post on X (Twitter)",
    "rewards.twitterPostDesc": "Tweet about PerpX",
    "rewards.weeklyLogin": "7-Day Login Streak",
    "rewards.weeklyLoginDesc": "Log in daily for a week to get special rewards",
    "rewards.joinDiscord": "Join Discord",
    "rewards.joinDiscordDesc": "Join our official Discord server",
    "rewards.joinTelegram": "Join Telegram",
    "rewards.joinTelegramDesc": "Join our official Telegram group",
    "rewards.joinGuild": "Join a Guild",
    "rewards.joinGuildDesc": "Join a guild to get exclusive benefits",
    "rewards.login": "Login",
    "rewards.trade": "Trade",
    "rewards.post": "Post",
    "rewards.claim": "Claim Reward",
    "rewards.join": "Join",
    "rewards.points": "points",
    "rewards.completed": "Completed",
    "rewards.loginSuccess": "Login completed! Earned 1 point.",
    "rewards.demoSuccess": "Demo trade completed! Earned 5 points.",
    "rewards.snsSuccess": "SNS post completed! Earned 5 points.",
    "rewards.weeklyLoginSuccess": "7-day login streak achieved! Earned 10 points.",
    "rewards.communitySuccess": "Community joined! Earned 30 points.",
    "rewards.guildSuccess": "Guild joined! Earned 50 points (one-time only).",
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
    
    // Rewards
    "rewards.dailyTasks": "デイリータスク",
    "rewards.weeklyTasks": "ウィークリータスク",
    "rewards.specialTasks": "特別タスク",
    "rewards.loginBonus": "ログインボーナス",
    "rewards.loginBonusDesc": "毎日ログインして報酬を獲得",
    "rewards.demoTrade": "デモ取引を3回実行",
    "rewards.demoTradeDesc": "学習モードで3回取引を体験",
    "rewards.twitterPost": "X (Twitter) に投稿",
    "rewards.twitterPostDesc": "PerpXについてツイート",
    "rewards.weeklyLogin": "7日連続ログイン",
    "rewards.weeklyLoginDesc": "1週間毎日ログインして特別報酬を獲得",
    "rewards.joinDiscord": "Discordに参加",
    "rewards.joinDiscordDesc": "公式Discordサーバーに参加",
    "rewards.joinTelegram": "Telegramに参加",
    "rewards.joinTelegramDesc": "公式Telegramグループに参加",
    "rewards.joinGuild": "ギルドに参加",
    "rewards.joinGuildDesc": "ギルドに参加して限定特典を獲得",
    "rewards.login": "ログイン",
    "rewards.trade": "取引する",
    "rewards.post": "投稿する",
    "rewards.claim": "報酬を受け取る",
    "rewards.join": "参加する",
    "rewards.points": "ポイント",
    "rewards.completed": "完了",
    "rewards.loginSuccess": "ログイン完了！1ポイント獲得しました。",
    "rewards.demoSuccess": "デモ取引完了！5ポイント獲得しました。",
    "rewards.snsSuccess": "SNS投稿完了！5ポイント獲得しました。",
    "rewards.weeklyLoginSuccess": "7日連続ログイン達成！10ポイント獲得しました。",
    "rewards.communitySuccess": "コミュニティ参加完了！30ポイント獲得しました。",
    "rewards.guildSuccess": "ギルド参加完了！50ポイント獲得しました（一回限り）。",
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
    
    // Rewards
    "rewards.dailyTasks": "每日任务",
    "rewards.weeklyTasks": "每周任务",
    "rewards.specialTasks": "特殊任务",
    "rewards.loginBonus": "登录奖励",
    "rewards.loginBonusDesc": "每天登录获得奖励",
    "rewards.demoTrade": "完成3次模拟交易",
    "rewards.demoTradeDesc": "在学习模式下体验3次交易",
    "rewards.twitterPost": "在X (Twitter)上发布",
    "rewards.twitterPostDesc": "发推文介绍PerpX",
    "rewards.weeklyLogin": "连续登录7天",
    "rewards.weeklyLoginDesc": "每天登录一周以获得特殊奖励",
    "rewards.joinDiscord": "加入Discord",
    "rewards.joinDiscordDesc": "加入我们的官方Discord服务器",
    "rewards.joinTelegram": "加入Telegram",
    "rewards.joinTelegramDesc": "加入我们的官方Telegram群组",
    "rewards.joinGuild": "加入公会",
    "rewards.joinGuildDesc": "加入公会获得独家福利",
    "rewards.login": "登录",
    "rewards.trade": "交易",
    "rewards.post": "发布",
    "rewards.claim": "领取奖励",
    "rewards.join": "加入",
    "rewards.points": "积分",
    "rewards.completed": "已完成",
    "rewards.loginSuccess": "登录完成！获得1积分。",
    "rewards.demoSuccess": "模拟交易完成！获得5积分。",
    "rewards.snsSuccess": "SNS发布完成！获得5积分。",
    "rewards.weeklyLoginSuccess": "连续登录7天达成！获得10积分。",
    "rewards.communitySuccess": "社区加入完成！获得30积分。",
    "rewards.guildSuccess": "公会加入完成！获得50积分（仅限一次）。",
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

