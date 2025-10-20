import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import {
  Award,
  TrendingUp,
  Users,
  Trophy,
  Zap,
  Calendar,
  Gift,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const activities = [
  { type: "Trade Volume", desc: "$1,000 traded", points: "+1", time: "2h ago" },
  { type: "Daily Login", desc: "Consecutive 5 days", points: "+10", time: "1d ago" },
  { type: "Referral Bonus", desc: "Friend started trading", points: "+100", time: "2d ago" },
];

export default function Points() {
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
                <Link href="/dashboard"><a className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors">Dashboard</a></Link>
                <Link href="/points"><a className="text-xs sm:text-sm text-primary font-semibold">Points</a></Link>
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
            <Link href="/dashboard"><a className="text-sm text-white/60">Dashboard</a></Link>
            <Link href="/points"><a className="text-sm text-primary font-semibold">Points</a></Link>
            <Link href="/referral"><a className="text-sm text-white/60">Referral</a></Link>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-12">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <Award className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3">
            PerpX Points
          </h1>
          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto">
            Earn points by trading, referring friends, and participating in the PerpX ecosystem. Redeem for exclusive rewards!
          </p>
        </div>

        {/* Points Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <Card className="bg-card border-white/10">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div className="text-xs sm:text-sm text-white/60">Total Points</div>
                <Award className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">0</div>
              <div className="text-xs text-white/40">Rank: Unranked</div>
            </CardContent>
          </Card>

          <Card className="bg-card border-white/10">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div className="text-xs sm:text-sm text-white/60">This Week</div>
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">0</div>
              <div className="text-xs text-green-500">+0% from last week</div>
            </CardContent>
          </Card>

          <Card className="bg-card border-white/10">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div className="text-xs sm:text-sm text-white/60">Referrals</div>
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-secondary" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">0</div>
              <Link href="/referral">
                <a className="text-xs text-primary hover:underline">Invite friends →</a>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-card border-white/10">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div className="text-xs sm:text-sm text-white/60">Next Tier</div>
                <Trophy className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">Bronze</div>
              <div className="text-xs text-white/40">0 / 1,000 points</div>
            </CardContent>
          </Card>
        </div>

        {/* Ways to Earn & Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Ways to Earn Points */}
          <Card className="bg-card border-white/10">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                <h3 className="text-base sm:text-lg font-semibold text-white">Ways to Earn Points</h3>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                  <div>
                    <div className="text-sm sm:text-base font-semibold text-white mb-1">Trade Volume</div>
                    <div className="text-xs sm:text-sm text-white/60">1 point per $100 traded</div>
                  </div>
                  <div className="text-base sm:text-lg font-bold text-primary">+1</div>
                </div>

                <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                  <div>
                    <div className="text-sm sm:text-base font-semibold text-white mb-1">Daily Login</div>
                    <div className="text-xs sm:text-sm text-white/60">Login every day</div>
                  </div>
                  <div className="text-base sm:text-lg font-bold text-primary">+10</div>
                </div>

                <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                  <div>
                    <div className="text-sm sm:text-base font-semibold text-white mb-1">Referral</div>
                    <div className="text-xs sm:text-sm text-white/60">Invite a friend</div>
                  </div>
                  <div className="text-base sm:text-lg font-bold text-primary">+100</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-card border-white/10">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <Calendar className="h-5 w-5 sm:h-6 sm:w-6 text-secondary" />
                <h3 className="text-base sm:text-lg font-semibold text-white">Recent Activity</h3>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {activities.map((activity, i) => (
                  <div key={i} className="flex items-start justify-between p-3 bg-background/50 rounded-lg">
                    <div className="flex-1">
                      <div className="text-sm sm:text-base font-semibold text-white mb-1">{activity.type}</div>
                      <div className="text-xs sm:text-sm text-white/60 mb-1">{activity.desc}</div>
                      <div className="text-xs text-white/40">{activity.time}</div>
                    </div>
                    <div className="text-sm sm:text-base font-bold text-green-500">{activity.points}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rewards Tiers */}
        <Card className="bg-card border-white/10">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4 sm:mb-6">
              <Gift className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500" />
              <h3 className="text-base sm:text-lg font-semibold text-white">Rewards Tiers</h3>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-4 bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 rounded-lg">
                <div className="text-base sm:text-lg font-bold text-orange-500 mb-2">Bronze</div>
                <div className="text-xs sm:text-sm text-white/60 mb-3">0 - 999 points</div>
                <ul className="text-xs sm:text-sm text-white/80 space-y-1">
                  <li>• Standard trading fees</li>
                  <li>• Basic support</li>
                </ul>
              </div>

              <div className="p-4 bg-gradient-to-br from-gray-400/20 to-gray-500/10 border border-gray-400/30 rounded-lg">
                <div className="text-base sm:text-lg font-bold text-gray-400 mb-2">Silver</div>
                <div className="text-xs sm:text-sm text-white/60 mb-3">1,000 - 4,999 points</div>
                <ul className="text-xs sm:text-sm text-white/80 space-y-1">
                  <li>• 5% fee discount</li>
                  <li>• Priority support</li>
                </ul>
              </div>

              <div className="p-4 bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border border-yellow-500/30 rounded-lg">
                <div className="text-base sm:text-lg font-bold text-yellow-500 mb-2">Gold</div>
                <div className="text-xs sm:text-sm text-white/60 mb-3">5,000 - 19,999 points</div>
                <ul className="text-xs sm:text-sm text-white/80 space-y-1">
                  <li>• 10% fee discount</li>
                  <li>• Exclusive NFT</li>
                </ul>
              </div>

              <div className="p-4 bg-gradient-to-br from-primary/20 to-secondary/10 border border-primary/30 rounded-lg">
                <div className="text-base sm:text-lg font-bold text-primary mb-2">Platinum</div>
                <div className="text-xs sm:text-sm text-white/60 mb-3">20,000+ points</div>
                <ul className="text-xs sm:text-sm text-white/80 space-y-1">
                  <li>• 20% fee discount</li>
                  <li>• VIP access</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

