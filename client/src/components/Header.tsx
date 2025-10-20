import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Menu, X, Settings } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const isHomePage = location === "/";

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
                      Perpetual
                    </a>
                  </Link>
                  <a href="#" className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors">1001x</a>
                  <a href="#" className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors">Spot</a>
                  <Link href="/dashboard">
                    <a className={`text-xs sm:text-sm transition-colors ${
                      location === "/dashboard" ? "text-white" : "text-white/60 hover:text-white"
                    }`}>
                      Portfolio
                    </a>
                  </Link>
                  <Link href="/referral">
                    <a className={`text-xs sm:text-sm transition-colors ${
                      location === "/referral" ? "text-white" : "text-white/60 hover:text-white"
                    }`}>
                      Referral
                    </a>
                  </Link>
                  <Link href="/points">
                    <a className={`text-xs sm:text-sm transition-colors ${
                      location === "/points" ? "text-white" : "text-white/60 hover:text-white"
                    }`}>
                      Rewards
                    </a>
                  </Link>
                </div>
              )}
              {isHomePage && (
                <div className="hidden lg:flex items-center gap-4 sm:gap-6 ml-4 sm:ml-8">
                  <a href="#features" className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors">Features</a>
                  <a href="#stats" className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors">Stats</a>
                  <a href="#roadmap" className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors">Roadmap</a>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden sm:flex items-center gap-2 text-xs">
                <Button variant="ghost" size="sm" className="text-white/80 hover:text-white h-7 px-2">EN</Button>
                <span className="text-white/40">|</span>
                <Button variant="ghost" size="sm" className="text-white/80 hover:text-white h-7 px-2">JP</Button>
                <span className="text-white/40">|</span>
                <Button variant="ghost" size="sm" className="text-white/80 hover:text-white h-7 px-2">CN</Button>
              </div>
              {!isHomePage && (
                <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-white/80 hover:text-white">
                  <Settings className="h-4 w-4" />
                </Button>
              )}
              {isHomePage ? (
                <Link href="/trade">
                  <Button className="bg-primary hover:bg-primary/90 text-white text-xs sm:text-sm px-3 sm:px-4">
                    Launch App
                  </Button>
                </Link>
              ) : (
                <Button className="bg-primary hover:bg-primary/90 text-white text-xs sm:text-sm px-3 sm:px-4">
                  Connect wallet
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
            <Link href="/trade"><a className="text-sm text-white/60">Perpetual</a></Link>
            <a href="#" className="text-sm text-white/60">1001x</a>
            <a href="#" className="text-sm text-white/60">Spot</a>
            <Link href="/dashboard"><a className="text-sm text-white/60">Portfolio</a></Link>
            <Link href="/referral"><a className="text-sm text-white/60">Referral</a></Link>
            <Link href="/points"><a className="text-sm text-white/60">Rewards</a></Link>
          </div>
        </div>
      )}

      {mobileMenuOpen && isHomePage && (
        <div className="lg:hidden bg-card border-b border-white/10 p-4">
          <div className="flex flex-col gap-3">
            <a href="#features" className="text-sm text-white/60">Features</a>
            <a href="#stats" className="text-sm text-white/60">Stats</a>
            <a href="#roadmap" className="text-sm text-white/60">Roadmap</a>
          </div>
        </div>
      )}
    </>
  );
}

