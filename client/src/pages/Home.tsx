import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { TrendingUp, Zap, Shield, BarChart3, Coins, Network } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Home() {
  const { t } = useLanguage();
  useScrollAnimation();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-12 sm:py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 sm:space-y-8 animate-on-scroll animate-fade-in-left">
              <div className="space-y-4 sm:space-y-6">
                <p className="text-xs sm:text-sm font-medium text-white/60 tracking-wider uppercase">
                  {t('home.unlock')}
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                  {t('home.title')}
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-white/70 max-w-xl">
                  {t('home.subtitle')}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link href="/trade">
                  <Button className="bg-white hover:bg-white/90 text-black font-medium px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base w-full sm:w-auto">
                    {t('home.startTrading')} →
                  </Button>
                </Link>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base w-full sm:w-auto">
                  {t('home.learnMore')}
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-4 sm:pt-8">
                <div>
                  <div className="text-xs sm:text-sm text-white/60 mb-1">{t('home.24hVolume')}</div>
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">$3.37B</div>
                </div>
                <div>
                  <div className="text-xs sm:text-sm text-white/60 mb-1">{t('home.cumulativeVolume')}</div>
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">$139.20B</div>
                </div>
                <div>
                  <div className="text-xs sm:text-sm text-white/60 mb-1">{t('home.addresses')}</div>
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">147,278</div>
                </div>
              </div>
            </div>

            {/* Right Content - Screenshot with Border Animation */}
            <div className="relative animate-on-scroll animate-fade-in-right">
              <div className="relative rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent animate-pulse"></div>
                <div className="relative bg-card/50 backdrop-blur-sm p-8 sm:p-12 lg:p-16 aspect-[4/3] flex items-center justify-center">
                  <img src="/logo-horizontal.png" alt="PerpX" className="w-full max-w-md opacity-90" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* High-Performance Section */}
      <section className="py-12 sm:py-16 lg:py-24 bg-card/30">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          <div className="text-center mb-12 sm:mb-16 animate-on-scroll animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
              {t('home.highPerformance')}
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-white/70 max-w-2xl mx-auto">
              {t('home.highPerformanceDesc')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="bg-card border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-primary/50 transition-all animate-on-scroll animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/20 flex items-center justify-center mb-4 sm:mb-6">
                <TrendingUp className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{t('home.ultraDeepLiquidity')}</h3>
              <p className="text-xs sm:text-sm text-white/60">{t('home.ultraDeepLiquidityDesc')}</p>
            </div>

            <div className="bg-card border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-primary/50 transition-all animate-on-scroll animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/20 flex items-center justify-center mb-4 sm:mb-6">
                <Zap className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{t('home.highPerformanceTitle')}</h3>
              <p className="text-xs sm:text-sm text-white/60">{t('home.highPerformanceDesc2')}</p>
            </div>

            <div className="bg-card border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-primary/50 transition-all animate-on-scroll animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/20 flex items-center justify-center mb-4 sm:mb-6">
                <Shield className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{t('home.provenSecurity')}</h3>
              <p className="text-xs sm:text-sm text-white/60">{t('home.provenSecurityDesc')}</p>
            </div>

            <div className="bg-card border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-primary/50 transition-all animate-on-scroll animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/20 flex items-center justify-center mb-4 sm:mb-6">
                <BarChart3 className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{t('home.leverage')}</h3>
              <p className="text-xs sm:text-sm text-white/60">{t('home.leverageDesc')}</p>
            </div>

            <div className="bg-card border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-primary/50 transition-all animate-on-scroll animate-fade-in-up" style={{animationDelay: '0.5s'}}>
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/20 flex items-center justify-center mb-4 sm:mb-6">
                <Coins className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{t('home.earnYield')}</h3>
              <p className="text-xs sm:text-sm text-white/60">{t('home.earnYieldDesc')}</p>
            </div>

            <div className="bg-card border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-primary/50 transition-all animate-on-scroll animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/20 flex items-center justify-center mb-4 sm:mb-6">
                <Network className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{t('home.multiChain')}</h3>
              <p className="text-xs sm:text-sm text-white/60">{t('home.multiChainDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          <div className="bg-gradient-to-r from-primary/20 to-transparent border border-white/10 rounded-3xl p-8 sm:p-12 lg:p-16 text-center animate-on-scroll animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
              {t('home.readyToStart')}
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-white/70 mb-6 sm:mb-8 max-w-2xl mx-auto">
              {t('home.readyToStartDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/trade">
                <Button className="bg-white hover:bg-white/90 text-black font-medium px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base w-full sm:w-auto">
                  {t('button.launchApp')}
                </Button>
              </Link>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base w-full sm:w-auto">
                {t('home.viewDocs')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 sm:py-12">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div className="animate-on-scroll animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <h3 className="text-sm font-semibold text-white mb-3 sm:mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="/trade"><a className="text-xs sm:text-sm text-white/60 hover:text-white">Trade</a></Link></li>
                <li><Link href="/dashboard"><a className="text-xs sm:text-sm text-white/60 hover:text-white">Dashboard</a></Link></li>
                <li><Link href="/points"><a className="text-xs sm:text-sm text-white/60 hover:text-white">Points</a></Link></li>
                <li><Link href="/referral"><a className="text-xs sm:text-sm text-white/60 hover:text-white">Referral</a></Link></li>
              </ul>
            </div>
            <div className="animate-on-scroll animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <h3 className="text-sm font-semibold text-white mb-3 sm:mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-xs sm:text-sm text-white/60 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-xs sm:text-sm text-white/60 hover:text-white">API</a></li>
                <li><a href="#" className="text-xs sm:text-sm text-white/60 hover:text-white">Tutorials</a></li>
                <li><a href="#" className="text-xs sm:text-sm text-white/60 hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div className="animate-on-scroll animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <h3 className="text-sm font-semibold text-white mb-3 sm:mb-4">Community</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-xs sm:text-sm text-white/60 hover:text-white">Twitter</a></li>
                <li><a href="#" className="text-xs sm:text-sm text-white/60 hover:text-white">Discord</a></li>
                <li><a href="#" className="text-xs sm:text-sm text-white/60 hover:text-white">Telegram</a></li>
              </ul>
            </div>
            <div className="animate-on-scroll animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <img src="/logo-icon.png" alt="PerpX" className="h-6 w-6 sm:h-8 sm:w-8" />
                <span className="text-base sm:text-lg font-bold text-white">PerpX</span>
              </div>
              <p className="text-xs sm:text-sm text-white/60">
                Next-generation AI-powered perpetual DEX for Asia and beyond.
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 sm:pt-8 border-t border-white/10">
            <p className="text-xs sm:text-sm text-white/60">© 2025 PerpX. All rights reserved.</p>
            <div className="flex gap-4 sm:gap-6">
              <a href="#" className="text-xs sm:text-sm text-white/60 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-xs sm:text-sm text-white/60 hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

