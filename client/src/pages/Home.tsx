import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import {
  Brain,
  Droplet,
  TrendingUp,
  Shield,
  Coins,
  BarChart3,
  CheckCircle2,
  ArrowRight,
  Zap,
  Globe,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{backgroundColor: '#0ABAB5'}}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-primary/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/logo-icon.png" alt="PerpX" className="h-8 w-8" />
              <img src="/logo-horizontal.png" alt="PerpX" className="h-6" />
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm hover:text-primary transition-colors">
                Features
              </a>
              <a href="#security" className="text-sm hover:text-primary transition-colors">
                Security
              </a>
              <a href="#tokenomics" className="text-sm hover:text-primary transition-colors">
                Tokenomics
              </a>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  EN
                </Button>
                <span className="text-muted-foreground">|</span>
                <Button variant="ghost" size="sm">
                  JP
                </Button>
                <span className="text-muted-foreground">|</span>
                <Button variant="ghost" size="sm">
                  CN
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost">Connect Wallet</Button>
              <Link href="/trade">
                <Button className="bg-primary hover:bg-primary/90">
                  Launch App
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20 opacity-50" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/30 rounded-full blur-3xl" />
        </div>
        
        <div className="container relative z-10 mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">AI-Powered</span>
              <br />
              Perpetual Trading
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Trade Freely. Earn Stylishly. Experience the next generation of decentralized perpetual exchange with intelligent trading assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/trade">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                  Start Trading
                  <Zap className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Learn More
                <Globe className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              <div className="glass rounded-xl p-4">
                <div className="text-3xl font-bold text-primary">$2.5B+</div>
                <div className="text-sm text-muted-foreground">Total Volume</div>
              </div>
              <div className="glass rounded-xl p-4">
                <div className="text-3xl font-bold text-primary">100x</div>
                <div className="text-sm text-muted-foreground">Max Leverage</div>
              </div>
              <div className="glass rounded-xl p-4">
                <div className="text-3xl font-bold text-primary">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
              <div className="glass rounded-xl p-4">
                <div className="text-3xl font-bold text-primary">$0</div>
                <div className="text-sm text-muted-foreground">Loss Record</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Powerful Features</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built for traders who demand the best. Every feature designed for optimal performance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-card border-primary/20 hover:border-primary/40 transition-all">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">AI Trading Assistant</h3>
                <p className="text-muted-foreground">
                  Real-time market insights powered by advanced AI algorithms to help you make informed decisions.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-primary/20 hover:border-primary/40 transition-all">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                  <Droplet className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Deep Liquidity</h3>
                <p className="text-muted-foreground">
                  JIT liquidity mechanism ensures minimal slippage and optimal execution for all trades.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-primary/20 hover:border-primary/40 transition-all">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Cross Margin</h3>
                <p className="text-muted-foreground">
                  Maximize capital efficiency with cross-margin trading across all your positions.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-primary/20 hover:border-primary/40 transition-all">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Up to 100x Leverage</h3>
                <p className="text-muted-foreground">
                  Trade with confidence using flexible leverage options up to 100x on major pairs.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-primary/20 hover:border-primary/40 transition-all">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                  <Coins className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Earn Yield</h3>
                <p className="text-muted-foreground">
                  Your collateral works for you. Earn passive yield on deposited assets automatically.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-primary/20 hover:border-primary/40 transition-all">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Advanced Analytics</h3>
                <p className="text-muted-foreground">
                  Professional-grade charts and analytics tools integrated with TradingView.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-20 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Security & Trust</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your assets are protected by industry-leading security measures.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-card border-primary/20">
              <CardContent className="p-6 text-center">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">4 Audits</h3>
                <p className="text-muted-foreground">
                  Audited by top security firms
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-primary/20">
              <CardContent className="p-6 text-center">
                <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">$0 Loss</h3>
                <p className="text-muted-foreground">
                  Zero security incidents
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-primary/20">
              <CardContent className="p-6 text-center">
                <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">99.9%</h3>
                <p className="text-muted-foreground">
                  Platform uptime
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-primary/20">
              <CardContent className="p-6 text-center">
                <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Multi-Chain</h3>
                <p className="text-muted-foreground">
                  Solana + EVM support
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <Card className="bg-gradient-to-br from-primary/20 to-secondary/20 border-primary/30">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Ready to Start Trading?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of traders experiencing the future of perpetual trading.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/trade">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                    Launch App
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="text-lg px-8">
                  View Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-primary/10 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo-icon.png" alt="PerpX" className="h-8 w-8" />
                <img src="/logo-horizontal.png" alt="PerpX" className="h-6" />
              </div>
              <p className="text-sm text-muted-foreground">
                Next-generation AI-powered perpetual DEX for Asia and beyond.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Trade</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Earn</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Analytics</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Simulator</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Tutorials</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Telegram</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-primary/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 PerpX. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

