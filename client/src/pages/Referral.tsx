import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import {
  Home,
  Settings,
  Users,
  Copy,
  Share2,
  Gift,
  TrendingUp,
  Award,
} from "lucide-react";
import { useState } from "react";

const referrals = [
  { address: "0x1234...5678", volume: "$12,450", earnings: "$124.50", status: "Active" },
  { address: "0x8765...4321", volume: "$8,230", earnings: "$82.30", status: "Active" },
  { address: "0xabcd...efgh", volume: "$5,670", earnings: "$56.70", status: "Active" },
];

export default function Referral() {
  const [copied, setCopied] = useState(false);
  const referralCode = "PERPX-ABC123";
  const referralLink = `https://perpx.io/ref/${referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
                  <Button variant="ghost" size="sm" className="text-white hover:text-white/80">
                    Points
                  </Button>
                </Link>
                <Link href="/referral">
                  <Button variant="ghost" size="sm" className="text-white border-b-2 border-white">
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
            <Users className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Referral Program</h1>
          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto">
            Earn 10% of your referrals' trading fees forever. The more friends you invite, the more you earn!
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm text-white/70">Total Referrals</span>
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">0</div>
              <div className="text-xs text-white/70">All time</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm text-white/70">Total Earnings</span>
                <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">$0.00</div>
              <div className="text-xs text-green-400">+0%</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm text-white/70">This Month</span>
                <Gift className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">$0.00</div>
              <div className="text-xs text-white/70">0 referrals</div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm text-white/70">Bonus Points</span>
                <Award className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">0</div>
              <div className="text-xs text-white/70">From referrals</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Referral Link */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-base sm:text-lg">Your Referral Link</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs sm:text-sm text-white/70 mb-2 block">Referral Code</label>
                <div className="flex gap-2">
                  <Input
                    value={referralCode}
                    readOnly
                    className="bg-white/10 border-white/20 text-white text-sm sm:text-base"
                  />
                  <Button
                    onClick={copyToClipboard}
                    className="bg-white text-primary hover:bg-white/90 shrink-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-xs sm:text-sm text-white/70 mb-2 block">Referral Link</label>
                <div className="flex gap-2">
                  <Input
                    value={referralLink}
                    readOnly
                    className="bg-white/10 border-white/20 text-white text-xs sm:text-sm"
                  />
                  <Button
                    onClick={copyToClipboard}
                    className="bg-white text-primary hover:bg-white/90 shrink-0"
                  >
                    {copied ? "Copied!" : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
                <Button className="flex-1 bg-white text-primary hover:bg-white/90">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share on Twitter
                </Button>
                <Button className="flex-1 bg-white text-primary hover:bg-white/90">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share on Telegram
                </Button>
              </div>

              <div className="bg-white/5 rounded-lg p-3 sm:p-4 mt-4">
                <h4 className="text-sm sm:text-base font-semibold text-white mb-2">How it works</h4>
                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-white/70">
                  <li>• Share your referral link with friends</li>
                  <li>• They sign up and start trading</li>
                  <li>• You earn 10% of their trading fees</li>
                  <li>• Earnings are paid out weekly</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Referral Tiers */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-base sm:text-lg">Referral Tiers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4">
              <div className="p-3 sm:p-4 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm sm:text-base font-semibold text-white">Bronze (0-9 referrals)</span>
                  <span className="text-base sm:text-lg font-bold text-white">10%</span>
                </div>
                <div className="text-xs sm:text-sm text-white/70">Standard commission rate</div>
              </div>

              <div className="p-3 sm:p-4 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm sm:text-base font-semibold text-white">Silver (10-49 referrals)</span>
                  <span className="text-base sm:text-lg font-bold text-white">15%</span>
                </div>
                <div className="text-xs sm:text-sm text-white/70">+500 bonus points</div>
              </div>

              <div className="p-3 sm:p-4 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm sm:text-base font-semibold text-white">Gold (50-99 referrals)</span>
                  <span className="text-base sm:text-lg font-bold text-white">20%</span>
                </div>
                <div className="text-xs sm:text-sm text-white/70">+2,000 bonus points</div>
              </div>

              <div className="p-3 sm:p-4 bg-white/5 rounded-lg border-2 border-white/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm sm:text-base font-semibold text-white">Platinum (100+ referrals)</span>
                  <span className="text-base sm:text-lg font-bold text-white">25%</span>
                </div>
                <div className="text-xs sm:text-sm text-white/70">+10,000 bonus points + NFT badge</div>
              </div>
            </CardContent>
          </Card>

          {/* Referral List */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-white text-base sm:text-lg">Your Referrals</CardTitle>
            </CardHeader>
            <CardContent>
              {referrals.length > 0 ? (
                <div className="space-y-2 sm:space-y-3">
                  {referrals.map((ref, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-white/5 rounded-lg gap-2 sm:gap-0">
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                        <div className="text-sm sm:text-base text-white font-mono truncate">{ref.address}</div>
                        <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded shrink-0">
                          {ref.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm">
                        <div>
                          <div className="text-white/70">Volume</div>
                          <div className="text-white font-semibold">{ref.volume}</div>
                        </div>
                        <div>
                          <div className="text-white/70">Earnings</div>
                          <div className="text-green-400 font-semibold">{ref.earnings}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 sm:py-12 text-white/70">
                  <Users className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 opacity-50" />
                  <p className="text-sm sm:text-base">No referrals yet</p>
                  <p className="text-xs sm:text-sm mt-2">Share your link to start earning!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

