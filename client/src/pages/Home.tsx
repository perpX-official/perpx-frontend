import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import {
  Zap,
  Shield,
  TrendingUp,
  BarChart3,
  Coins,
  Network,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation */}
      <nav className="border-b border-white/10 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="px-3 sm:px-4 lg:px-6 py-2 sm:py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                className="md:hidden p-2"
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
              <div className="hidden md:flex items-center gap-3 sm:gap-6 ml-4 sm:ml-8">
                <a href="#features" className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors">Features</a>
                <a href="#stats" className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors">Stats</a>
                <a href="#roadmap" className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors">Roadmap</a>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden sm:flex items-center gap-2 text-xs">
                <Button variant="ghost" size="sm" className="text-white/80 hover:text-white h-7 px-2">EN</Button>
                <span className="text-white/40">|</span>
                <Button variant="ghost" size="sm" className="text-white/80 hover:text-white h-7 px-2">JP</Button>
                <span className="text-white/40">|</span>
                <Button variant="ghost" size="sm" className="text-white/80 hover:text-white h-7 px-2">CN</Button>
              </div>
              <Link href="/trade">
                <Button className="bg-primary hover:bg-primary/90 text-white text-xs sm:text-sm px-3 sm:px-4">
                  Launch App
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card border-b border-white/10 p-4">
          <div className="flex flex-col gap-3">
            <a href="#features" className="text-sm text-white/60">Features</a>
            <a href="#stats" className="text-sm text-white/60">Stats</a>
            <a href="#roadmap" className="text-sm text-white/60">Roadmap</a>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden px-3 sm:px-4 lg:px-6 py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-block mb-4 px-3 py-1 bg-primary/20 border border-primary/30 rounded-full text-xs sm:text-sm text-primary font-semibold">
                UNLOCK YOUR TRADING EDGE
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                Liquidity for all
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-white/70 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0">
                Ultra-fast decentralized perpetual exchange with deep liquidity, powered by advanced AI trading assistance.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link href="/trade">
                  <Button className="bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold rounded-full w-full sm:w-auto">
                    Start Trading
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </Link>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold rounded-full w-full sm:w-auto">
                  Learn More
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12">
                <div>
                  <div className="text-xs sm:text-sm text-white/60 mb-1">24h Volume</div>
                  <div className="text-lg sm:text-2xl font-bold text-white">$3.37B</div>
                </div>
                <div>
                  <div className="text-xs sm:text-sm text-white/60 mb-1">Cumulative Volume</div>
                  <div className="text-lg sm:text-2xl font-bold text-white">$139.20B</div>
                </div>
                <div>
                  <div className="text-xs sm:text-sm text-white/60 mb-1">Addresses</div>
                  <div className="text-lg sm:text-2xl font-bold text-white">147,278</div>
                </div>
              </div>
            </div>

            {/* Right Content - Screenshot with Animated Border */}
            <div className="flex-1 w-full lg:w-auto">
              <div className="relative">
                {/* Animated Border Effect */}
                <div className="relative rounded-3xl p-[2px] bg-gradient-to-r from-primary via-secondary to-primary animate-gradient-rotate">
                  <div className="relative rounded-3xl overflow-hidden bg-card shadow-2xl">
                    <img 
                      src="/logo-horizontal.png" 
                      alt="PerpX Trading Interface" 
                      className="w-full h-auto"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"></div>
                  </div>
                </div>

                {/* Floating Cards */}
                <div className="absolute -left-4 sm:-left-8 top-1/4 hidden lg:block">
                  <Card className="bg-card border-white/10 w-48">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <Shield className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <p className="text-sm text-white">Self-Custody</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="absolute -left-4 sm:-left-8 bottom-1/4 hidden lg:block">
                  <Card className="bg-card border-white/10 w-48">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <Zap className="h-5 w-5 text-primary" />
                        </div>
                      </div>
                      <p className="text-sm text-white">Lightning Fast Execution</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-3 sm:px-4 lg:px-6 py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
              High-Performance Trading for Everyone
            </h2>
            <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto">
              Powerful trading engine designed for deep liquidity, speed, and security
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <Card className="bg-card border-white/10 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Ultra-Deep Liquidity</h3>
                <p className="text-sm text-white/60">
                  $10M+ depth within 1bps spreads, even during high volatility.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-white/10 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">High Performance</h3>
                <p className="text-sm text-white/60">
                  200,000+ orders per second, less than 10ms latency.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-white/10 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Proven Security</h3>
                <p className="text-sm text-white/60">
                  Secured by Ethereum mainnet. Your Keys. Your Assets.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-white/10 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Up to 100x Leverage</h3>
                <p className="text-sm text-white/60">
                  Trade with confidence using flexible leverage options on major pairs.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-white/10 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Coins className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Earn Yield</h3>
                <p className="text-sm text-white/60">
                  Your collateral works for you. Earn passive yield automatically.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-white/10 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <Network className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Multi-Chain Support</h3>
                <p className="text-sm text-white/60">
                  One app, unlimited DeFi experience. Multi-chain, multi-protocol.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-3 sm:px-4 lg:px-6 py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto">
          <Card className="bg-gradient-to-r from-primary/20 to-secondary/20 border-primary/30">
            <CardContent className="p-8 sm:p-12 text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
                Ready to Start Trading?
              </h2>
              <p className="text-sm sm:text-base text-white/70 mb-6 sm:mb-8 max-w-2xl mx-auto">
                Join thousands of traders experiencing the future of perpetual trading.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center">
                <Link href="/trade">
                  <Button className="bg-white hover:bg-white/90 text-background px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold rounded-full w-full sm:w-auto">
                    Launch App
                  </Button>
                </Link>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base font-semibold rounded-full w-full sm:w-auto">
                  View Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-card/30 px-3 sm:px-4 lg:px-6 py-8 sm:py-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8">
            <div>
              <h4 className="text-sm font-semibold text-white mb-3 sm:mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/trade"><a className="text-xs sm:text-sm text-white/60 hover:text-white">Trade</a></Link></li>
                <li><Link href="/dashboard"><a className="text-xs sm:text-sm text-white/60 hover:text-white">Dashboard</a></Link></li>
                <li><Link href="/points"><a className="text-xs sm:text-sm text-white/60 hover:text-white">Points</a></Link></li>
                <li><Link href="/referral"><a className="text-xs sm:text-sm text-white/60 hover:text-white">Referral</a></Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-3 sm:mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-xs sm:text-sm text-white/60 hover:text-white">Documentation</a></li>
                <li><a href="#" className="text-xs sm:text-sm text-white/60 hover:text-white">API</a></li>
                <li><a href="#" className="text-xs sm:text-sm text-white/60 hover:text-white">Tutorials</a></li>
                <li><a href="#" className="text-xs sm:text-sm text-white/60 hover:text-white">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-3 sm:mb-4">Community</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-xs sm:text-sm text-white/60 hover:text-white">Twitter</a></li>
                <li><a href="#" className="text-xs sm:text-sm text-white/60 hover:text-white">Discord</a></li>
                <li><a href="#" className="text-xs sm:text-sm text-white/60 hover:text-white">Telegram</a></li>
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <img src="/logo-icon.png" alt="PerpX" className="h-6 w-6 sm:h-8 sm:w-8" />
                <span className="text-base sm:text-lg font-bold text-white">PerpX</span>
              </div>
              <p className="text-xs sm:text-sm text-white/60">
                Next-generation AI-powered perpetual DEX for Asia and beyond.
              </p>
            </div>
          </div>
          <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-white/60">© 2025 PerpX. All rights reserved.</p>
            <div className="flex items-center gap-4 sm:gap-6">
              <a href="#" className="text-xs sm:text-sm text-white/60 hover:text-white">Privacy Policy</a>
              <a href="#" className="text-xs sm:text-sm text-white/60 hover:text-white">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>


    </div>
  );
}

