import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import {
  Zap,
  Shield,
  TrendingUp,
  Users,
  Coins,
  BarChart3,
  ChevronRight,
  Twitter,
  Github,
  Send,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-primary/10">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/logo-icon.png" alt="PerpX" className="h-6 w-6 sm:h-8 sm:w-8" />
              <span className="text-lg sm:text-xl font-bold text-white">PerpX</span>
            </div>
            <div className="hidden md:flex items-center gap-6 sm:gap-8">
              <a href="#features" className="text-xs sm:text-sm text-white/80 hover:text-primary transition-colors">
                Features
              </a>
              <a href="#stats" className="text-xs sm:text-sm text-white/80 hover:text-primary transition-colors">
                Stats
              </a>
              <a href="#roadmap" className="text-xs sm:text-sm text-white/80 hover:text-primary transition-colors">
                Roadmap
              </a>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden sm:flex items-center gap-2 text-xs">
                <Button variant="ghost" size="sm" className="text-white/80 hover:text-white">EN</Button>
                <span className="text-white/40">|</span>
                <Button variant="ghost" size="sm" className="text-white/80 hover:text-white">JP</Button>
                <span className="text-white/40">|</span>
                <Button variant="ghost" size="sm" className="text-white/80 hover:text-white">CN</Button>
              </div>
              <Link href="/trade">
                <Button className="bg-primary hover:bg-primary/90 text-white text-sm sm:text-base">
                  Launch App
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - EdgeX Style */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="max-w-4xl">
            <div className="text-xs sm:text-sm text-primary mb-4 sm:mb-6 font-semibold tracking-wider uppercase">
              Unlock Your Trading Edge
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              Liquidity for all
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/70 mb-6 sm:mb-8 max-w-2xl">
              Ultra-fast decentralized perpetual exchange with deep liquidity, powered by advanced AI trading assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12">
              <Link href="/trade">
                <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white text-base sm:text-lg px-6 sm:px-8">
                  Start Trading
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 text-base sm:text-lg px-6 sm:px-8">
                Learn More
              </Button>
            </div>

            {/* Stats - EdgeX Style */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div>
                <div className="text-xs sm:text-sm text-white/60 mb-1 sm:mb-2">24H Volume</div>
                <div className="text-2xl sm:text-3xl font-bold text-white">$3.37B</div>
              </div>
              <div>
                <div className="text-xs sm:text-sm text-white/60 mb-1 sm:mb-2">Cumulative Volume</div>
                <div className="text-2xl sm:text-3xl font-bold text-white">$139.20B</div>
              </div>
              <div>
                <div className="text-xs sm:text-sm text-white/60 mb-1 sm:mb-2">Addresses</div>
                <div className="text-2xl sm:text-3xl font-bold text-white">147,278</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">
              High-Performance Trading for Everyone
            </h2>
            <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto">
              Powerful trading engine designed for deep liquidity, speed, and security
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <Card className="bg-card border-white/10 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                  <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Ultra-Deep Liquidity</h3>
                <p className="text-sm sm:text-base text-white/70">
                  $10M+ depth within 1bps spreads, even during high volatility.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-white/10 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                  <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-secondary" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">High Performance</h3>
                <p className="text-sm sm:text-base text-white/70">
                  200,000+ orders per second, less than 10ms latency.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-white/10 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                  <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Proven Security</h3>
                <p className="text-sm sm:text-base text-white/70">
                  Secured by Ethereum mainnet. Your Keys. Your Assets.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-white/10 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                  <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Up to 100x Leverage</h3>
                <p className="text-sm sm:text-base text-white/70">
                  Trade with confidence using flexible leverage options on major pairs.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-white/10 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                  <Coins className="h-5 w-5 sm:h-6 sm:w-6 text-secondary" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Earn Yield</h3>
                <p className="text-sm sm:text-base text-white/70">
                  Your collateral works for you. Earn passive yield automatically.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-white/10 hover:border-primary/50 transition-all duration-300">
              <CardContent className="p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                  <Users className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Multi-Chain Support</h3>
                <p className="text-sm sm:text-base text-white/70">
                  One app, unlimited DeFi experience. Multi-chain, multi-protocol.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="container mx-auto">
          <Card className="bg-gradient-to-r from-primary/20 to-secondary/20 border-primary/30">
            <CardContent className="p-6 sm:p-12 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
                Ready to Start Trading?
              </h2>
              <p className="text-base sm:text-lg text-white/80 mb-6 sm:mb-8 max-w-2xl mx-auto">
                Join thousands of traders experiencing the future of perpetual trading.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link href="/trade">
                  <Button size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 text-base sm:text-lg px-6 sm:px-8">
                    Launch App
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 text-base sm:text-lg px-6 sm:px-8">
                  View Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 sm:py-12 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <img src="/logo-icon.png" alt="PerpX" className="h-6 w-6 sm:h-8 sm:w-8" />
                <span className="text-base sm:text-lg font-bold text-white">PerpX</span>
              </div>
              <p className="text-xs sm:text-sm text-white/60">
                Next-generation AI-powered perpetual DEX for Asia and beyond.
              </p>
            </div>
            
            <div>
              <h4 className="text-sm sm:text-base font-semibold text-white mb-3 sm:mb-4">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/trade"><a className="text-xs sm:text-sm text-white/60 hover:text-primary transition-colors">Trade</a></Link></li>
                <li><Link href="/dashboard"><a className="text-xs sm:text-sm text-white/60 hover:text-primary transition-colors">Dashboard</a></Link></li>
                <li><Link href="/points"><a className="text-xs sm:text-sm text-white/60 hover:text-primary transition-colors">Points</a></Link></li>
                <li><Link href="/referral"><a className="text-xs sm:text-sm text-white/60 hover:text-primary transition-colors">Referral</a></Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm sm:text-base font-semibold text-white mb-3 sm:mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-xs sm:text-sm text-white/60 hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="text-xs sm:text-sm text-white/60 hover:text-primary transition-colors">API</a></li>
                <li><a href="#" className="text-xs sm:text-sm text-white/60 hover:text-primary transition-colors">Tutorials</a></li>
                <li><a href="#" className="text-xs sm:text-sm text-white/60 hover:text-primary transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm sm:text-base font-semibold text-white mb-3 sm:mb-4">Community</h4>
              <div className="flex gap-3 sm:gap-4">
                <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors">
                  <Twitter className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </a>
                <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors">
                  <Send className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </a>
                <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors">
                  <Github className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs sm:text-sm text-white/60">
              © 2025 PerpX. All rights reserved.
            </p>
            <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-white/60">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

