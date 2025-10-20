import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";
import {
  Home,
  Settings,
  Award,
  TrendingUp,
  Users,
  Zap,
  Gift,
  Trophy,
} from "lucide-react";

const activities = [
  { action: "Trade Volume", points: "+50", description: "$1,000 traded", time: "2h ago" },
  { action: "Daily Login", points: "+10", description: "Consecutive 5 days", time: "1d ago" },
  { action: "Referral Bonus", points: "+100", description: "Friend signed up", time: "2d ago" },
];

const leaderboard = [
  { rank: 1, address: "0x1234...5678", points: "125,430", badge: "🥇" },
  { rank: 2, address: "0x8765...4321", points: "98,210", badge: "🥈" },
  { rank: 3, address: "0xabcd...efgh", points: "87,650", badge: "🥉" },
  { rank: 4, address: "0x9999...8888", points: "76,540", badge: "" },
  { rank: 5, address: "0x7777...6666", points: "65,430", badge: "" },
];

export default function Points() {
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
                  <Button variant="ghost" size="sm" className="text-white hover:text-white/80">
                    Dashboard
                  </Button>
                </Link>
                <Link href="/points">
                  <Button variant="ghost" size="sm" className="text-white border-b-2 border-white">
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
        {/* Hero Section */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-full mb-3 sm:mb-4">
            <Award className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">PerpX Points</h1>
          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto">
            Earn points by trading, referring friends, and participating in the PerpX ecosystem. Redeem for exclusive rewards!
          </p>
        </div>

        {/* Points Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm text-white/70">Total Points</span>
                <Award className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">0</div>
              <div className="text-xs text-white/70">Rank: Unranked</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm text-white/70">This Week</span>
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">0</div>
              <div className="text-xs text-green-400">+0%</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm text-white/70">Referrals</span>
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">0</div>
              <Link href="/referral">
                <div className="text-xs text-white/70 hover:text-white cursor-pointer">Invite friends →</div>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm text-white/70">Next Tier</span>
                <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">Bronze</div>
              <Progress value={0} className="h-1.5 sm:h-2 bg-white/20" />
              <div className="text-xs text-white/70 mt-1">0 / 1,000 points</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Earn Points */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-base sm:text-lg flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Ways to Earn Points
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between p-3 sm:p-4 bg-white/5 rounded-lg">
                <div>
                  <div className="text-sm sm:text-base font-semibold text-white">Trade Volume</div>
                  <div className="text-xs sm:text-sm text-white/70">1 point per $100 traded</div>
                </div>
                <div className="text-lg sm:text-xl font-bold text-white">+1</div>
              </div>

              <div className="flex items-center justify-between p-3 sm:p-4 bg-white/5 rounded-lg">
                <div>
                  <div className="text-sm sm:text-base font-semibold text-white">Daily Login</div>
                  <div className="text-xs sm:text-sm text-white/70">Login every day</div>
                </div>
                <div className="text-lg sm:text-xl font-bold text-white">+10</div>
              </div>

              <div className="flex items-center justify-between p-3 sm:p-4 bg-white/5 rounded-lg">
                <div>
                  <div className="text-sm sm:text-base font-semibold text-white">Referral</div>
                  <div className="text-xs sm:text-sm text-white/70">Invite a friend</div>
                </div>
                <div className="text-lg sm:text-xl font-bold text-white">+100</div>
              </div>

              <div className="flex items-center justify-between p-3 sm:p-4 bg-white/5 rounded-lg">
                <div>
                  <div className="text-sm sm:text-base font-semibold text-white">Provide Liquidity</div>
                  <div className="text-xs sm:text-sm text-white/70">1 point per $10 provided</div>
                </div>
                <div className="text-lg sm:text-xl font-bold text-white">+10</div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-base sm:text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {activities.length > 0 ? (
                <div className="space-y-3 sm:space-y-4">
                  {activities.map((activity, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 sm:p-4 bg-white/5 rounded-lg">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm sm:text-base font-semibold text-white truncate">{activity.action}</div>
                        <div className="text-xs sm:text-sm text-white/70 truncate">{activity.description}</div>
                        <div className="text-xs text-white/50">{activity.time}</div>
                      </div>
                      <div className="text-base sm:text-lg font-bold text-green-400 ml-2">{activity.points}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 sm:py-12 text-white/70">
                  <Gift className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 opacity-50" />
                  <p className="text-sm sm:text-base">No activity yet</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Leaderboard */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-white text-base sm:text-lg flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 sm:space-y-3">
                {leaderboard.map((user) => (
                  <div key={user.rank} className="flex items-center justify-between p-3 sm:p-4 bg-white/5 rounded-lg">
                    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                      <div className="text-base sm:text-lg font-bold text-white w-6 sm:w-8">
                        {user.badge || `#${user.rank}`}
                      </div>
                      <div className="text-sm sm:text-base text-white font-mono truncate">{user.address}</div>
                    </div>
                    <div className="text-base sm:text-lg font-bold text-white ml-2">{user.points}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

