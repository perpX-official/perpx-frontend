import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Menu, X, Settings, Globe, ChevronDown, Check } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [location] = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const isHomePage = location === "/";

  const languageNames = {
    en: 'English',
    jp: '日本語',
    cn: '中文'
  };

  return (
    <>
      {/* Top Navigation */}
      <nav className="border-b border-white/10 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                className="lg:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
              <Link href="/">
                <a className="flex items-center gap-2">
                  <img src="/logo-icon.png" alt="PerpX" className="h-6 w-6 sm:h-8 sm:w-8" />
                  <span className="text-base sm:text-lg font-bold text-white">PerpX</span>
                </a>
              </Link>
              {!isHomePage && (
                <div className="hidden lg:flex items-center gap-4 sm:gap-6 ml-4 sm:ml-8">
                  <Link href="/trade">
                    <a className={`text-xs sm:text-sm transition-colors ${
                      location === "/trade" ? "text-white" : "text-white/60 hover:text-white"
                    }`}>
                      {t('nav.perpetual')}
                    </a>
                  </Link>
                  <Link href="/dashboard">
                    <a className={`text-xs sm:text-sm transition-colors ${
                      location === "/dashboard" ? "text-white" : "text-white/60 hover:text-white"
                    }`}>
                      {t('nav.portfolio')}
                    </a>
                  </Link>
                  <Link href="/referral">
                    <a className={`text-xs sm:text-sm transition-colors ${
                      location === "/referral" ? "text-white" : "text-white/60 hover:text-white"
                    }`}>
                      {t('nav.referral')}
                    </a>
                  </Link>
                  <Link href="/points">
                    <a className={`text-xs sm:text-sm transition-colors ${
                      location === "/points" ? "text-white" : "text-white/60 hover:text-white"
                    }`}>
                      {t('nav.rewards')}
                    </a>
                  </Link>
                </div>
              )}
              {isHomePage && (
                <div className="hidden lg:flex items-center gap-4 sm:gap-6 ml-4 sm:ml-8">
                  <a href="#features" className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors">{t('nav.features')}</a>
                  <a href="#stats" className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors">{t('nav.stats')}</a>
                  <a href="#roadmap" className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors">{t('nav.roadmap')}</a>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Language Dropdown */}
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  {language.toUpperCase()}
                  <ChevronDown className={`h-4 w-4 transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
                </button>
                {isLanguageOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-card border border-white/10 rounded-lg shadow-xl overflow-hidden z-50">
                    <div className="py-2">
                      <button
                        onClick={() => { setLanguage('en'); setIsLanguageOpen(false); }}
                        className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                          language === 'en'
                            ? 'bg-white/10 text-white'
                            : 'text-white/60 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{languageNames.en}</span>
                          {language === 'en' && <Check className="h-4 w-4" />}
                        </div>
                      </button>
                      <button
                        onClick={() => { setLanguage('jp'); setIsLanguageOpen(false); }}
                        className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                          language === 'jp'
                            ? 'bg-white/10 text-white'
                            : 'text-white/60 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{languageNames.jp}</span>
                          {language === 'jp' && <Check className="h-4 w-4" />}
                        </div>
                      </button>
                      <button
                        onClick={() => { setLanguage('cn'); setIsLanguageOpen(false); }}
                        className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                          language === 'cn'
                            ? 'bg-white/10 text-white'
                            : 'text-white/60 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{languageNames.cn}</span>
                          {language === 'cn' && <Check className="h-4 w-4" />}
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {!isHomePage && (
                <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-white/80 hover:text-white">
                  <Settings className="h-4 w-4" />
                </Button>
              )}
              {isHomePage ? (
                <Link href="/trade">
                  <Button className="bg-primary hover:bg-primary/90 text-white text-xs sm:text-sm px-3 sm:px-4">
                    {t('button.launchApp')}
                  </Button>
                </Link>
              ) : (
                <Button className="bg-primary hover:bg-primary/90 text-white text-xs sm:text-sm px-3 sm:px-4">
                  {t('button.connectWallet')}
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && !isHomePage && (
        <div className="lg:hidden bg-card border-b border-white/10 p-4">
          <div className="flex flex-col gap-3">
            <Link href="/trade"><a className="text-sm text-white/60">{t('nav.perpetual')}</a></Link>
            <Link href="/dashboard"><a className="text-sm text-white/60">{t('nav.portfolio')}</a></Link>
            <Link href="/referral"><a className="text-sm text-white/60">{t('nav.referral')}</a></Link>
            <Link href="/points"><a className="text-sm text-white/60">{t('nav.rewards')}</a></Link>
          </div>
        </div>
      )}

      {mobileMenuOpen && isHomePage && (
        <div className="lg:hidden bg-card border-b border-white/10 p-4">
          <div className="flex flex-col gap-3">
            <a href="#features" className="text-sm text-white/60">{t('nav.features')}</a>
            <a href="#stats" className="text-sm text-white/60">{t('nav.stats')}</a>
            <a href="#roadmap" className="text-sm text-white/60">{t('nav.roadmap')}</a>
          </div>
        </div>
      )}
    </>
  );
}

