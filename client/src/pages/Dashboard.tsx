import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import {
  Home,
  BarChart3,
  Coins,
  Users,
  Settings,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
  Award,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen" style={{backgroundColor: '#0ABAB5'}}>
      {/* Top Navigation */}
      <nav className="border-b border-white/20 bg-card/30 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 sm:gap-6">
              <Link href="/">
                <div className="flex items-center gap-2 cursor-pointer">
                  <img src="/logo-icon.png" alt="PerpX" className="h-6 w-6 sm:h-8 sm:w-8" />
                  <span className="text-lg sm:text-xl font-bold text-white">PerpX</span>
                </div>
              </Link>
              <div className="hidden md:flex items-center gap-2 sm:gap-4">
                <Link href="/">
                  <Button variant="ghost" size="sm" className="text-white hover:text-white/80">
                    <Home className="h-4 w-4 mr-2" />
                    Home
                  </Button>
                </Link>
                <Link href="/trade">
                  <Button variant="ghost" size="sm" className="text-white hover:text-white/80">
                    Trade
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="ghost" size="sm" className="text-white border-b-2 border-white">
                    Dashboard
                  </Button>
                </Link>
                <Link href="/points">
                  <Button variant="ghost" size="sm" className="text-white hover:text-white/80">
                    Points
                  </Button>
                </Link>
                <Link href="/referral">
                  <Button variant="ghost" size="sm" className="text-white hover:text-white/80">
                    Referral
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden sm:flex items-center gap-2 text-xs sm:text-sm">
                <Button variant="ghost" size="sm" className="text-white">EN</Button>
                <span className="text-white/60">|</span>
                <Button variant="ghost" size="sm" className="text-white">JP</Button>
                <span className="text-white/60">|</span>
                <Button variant="ghost" size="sm" className="text-white">CN</Button>
              </div>
              <Button variant="ghost" size="sm" className="text-white">
                <Settings className="h-4 w-4" />
              </Button>
              <Button className="bg-white text-primary hover:bg-white/90 text-sm sm:text-base">
                Connect Wallet
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm text-white/70">Total Balance</span>
                <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white mb-1">$0.00</div>
              <div className="text-xs text-green-400">+0.00%</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm text-white/70">Total PnL</span>
                <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white mb-1">$0.00</div>
              <div className="text-xs text-green-400">+0.00%</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm text-white/70">Total Volume</span>
                <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white mb-1">$0.00</div>
              <div className="text-xs text-white/70">All time</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm text-white/70">PerpX Points</span>
                <Award className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white mb-1">0</div>
              <Link href="/points">
                <div className="text-xs text-white/70 hover:text-white cursor-pointer">View details →</div>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Active Positions */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-base sm:text-lg">Active Positions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 sm:py-12 text-white/70">
                <Activity className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 opacity-50" />
                <p className="text-sm sm:text-base">No active positions</p>
                <Link href="/trade">
                  <Button className="mt-3 sm:mt-4 bg-white text-primary hover:bg-white/90">
                    Start Trading
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Recent Trades */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-base sm:text-lg">Recent Trades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 sm:py-12 text-white/70">
                <BarChart3 className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 opacity-50" />
                <p className="text-sm sm:text-base">No recent trades</p>
              </div>
            </CardContent>
          </Card>

          {/* Portfolio Chart */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-white text-base sm:text-lg">Portfolio Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 sm:h-64 flex items-center justify-center text-white/70">
                <div className="text-center">
                  <TrendingUp className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 opacity-50" />
                  <p className="text-sm sm:text-base">Start trading to see your portfolio performance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

