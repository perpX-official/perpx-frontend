import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import {
  TrendingUp,
  DollarSign,
  Award,
  BarChart3,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
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
                <Link href="/trade"><a className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors">Trade</a></Link>
                <Link href="/dashboard"><a className="text-xs sm:text-sm text-primary font-semibold">Dashboard</a></Link>
                <Link href="/points"><a className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors">Points</a></Link>
                <Link href="/referral"><a className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors">Referral</a></Link>
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
              <Button className="bg-primary hover:bg-primary/90 text-white text-xs sm:text-sm px-3 sm:px-4">
                Connect Wallet
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card border-b border-white/10 p-4">
          <div className="flex flex-col gap-3">
            <Link href="/trade"><a className="text-sm text-white/60">Trade</a></Link>
            <Link href="/dashboard"><a className="text-sm text-primary font-semibold">Dashboard</a></Link>
            <Link href="/points"><a className="text-sm text-white/60">Points</a></Link>
            <Link href="/referral"><a className="text-sm text-white/60">Referral</a></Link>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Stage Header - AsterDEX Style */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">
                Stage 3 • <span className="text-primary">Dawn</span>
              </h1>
              <p className="text-xs sm:text-sm text-white/60">
                Track your trading performance and rewards
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 bg-card border border-white/10 rounded-lg">
                <div className="text-xs text-white/60 mb-0.5">Name</div>
                <div className="text-sm font-semibold text-white">--</div>
              </div>
              <div className="px-3 py-1.5 bg-card border border-white/10 rounded-lg">
                <div className="text-xs text-white/60 mb-0.5">Total points</div>
                <div className="text-sm font-semibold text-white">--</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <Card className="bg-card border-white/10 hover:border-primary/50 transition-all duration-300">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="text-xs sm:text-sm text-white/60">Total Balance</div>
                <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">$0.00</div>
              <div className="text-xs text-white/40">Available to trade</div>
            </CardContent>
          </Card>

          <Card className="bg-card border-white/10 hover:border-primary/50 transition-all duration-300">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="text-xs sm:text-sm text-white/60">Total PnL</div>
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">$0.00</div>
              <div className="text-xs text-green-500">+0.00%</div>
            </CardContent>
          </Card>

          <Card className="bg-card border-white/10 hover:border-primary/50 transition-all duration-300">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="text-xs sm:text-sm text-white/60">Total Volume</div>
                <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-secondary" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">$0.00</div>
              <div className="text-xs text-white/40">All time</div>
            </CardContent>
          </Card>

          <Card className="bg-card border-white/10 hover:border-primary/50 transition-all duration-300">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="text-xs sm:text-sm text-white/60">PerpX Points</div>
                <Award className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">0</div>
              <Link href="/points">
                <a className="text-xs text-primary hover:underline">View details →</a>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Active Positions & Recent Trades */}
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="bg-card border-white/10">
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">Active Positions</h3>
              <div className="flex flex-col items-center justify-center py-8 sm:py-12">
                <TrendingUp className="h-10 w-10 sm:h-12 sm:w-12 text-white/20 mb-3 sm:mb-4" />
                <p className="text-sm sm:text-base text-white/60 mb-3 sm:mb-4">No active positions</p>
                <Link href="/trade">
                  <Button className="bg-primary hover:bg-primary/90 text-white text-sm">
                    Start Trading
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-white/10">
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">Recent Trades</h3>
              <div className="flex flex-col items-center justify-center py-8 sm:py-12">
                <BarChart3 className="h-10 w-10 sm:h-12 sm:w-12 text-white/20 mb-3 sm:mb-4" />
                <p className="text-sm sm:text-base text-white/60">No recent trades</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Portfolio Performance */}
        <Card className="bg-card border-white/10">
          <CardContent className="p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">Portfolio Performance</h3>
            <div className="h-48 sm:h-64 bg-background/50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-10 w-10 sm:h-12 sm:w-12 text-white/20 mx-auto mb-3 sm:mb-4" />
                <p className="text-sm sm:text-base text-white/60">No performance data yet</p>
                <p className="text-xs sm:text-sm text-white/40 mt-2">Start trading to see your performance chart</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

