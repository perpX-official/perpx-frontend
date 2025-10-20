import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import {
  Users,
  DollarSign,
  Gift,
  Award,
  Copy,
  Check,
  Twitter,
  Send,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const referrals = [
  { address: "0x1234...5678", status: "Active", volume: "$12,450", earnings: "$124.50" },
  { address: "0x8765...4321", status: "Active", volume: "$8,230", earnings: "$82.30" },
  { address: "0xabcd...efgh", status: "Active", volume: "$5,670", earnings: "$56.70" },
];

export default function Referral() {
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("PERPX-ABC123");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
                <Link href="/points"><a className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors">Points</a></Link>
                <Link href="/referral"><a className="text-xs sm:text-sm text-primary font-semibold">Referral</a></Link>
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
            <Link href="/points"><a className="text-sm text-white/60">Points</a></Link>
            <Link href="/referral"><a className="text-sm text-primary font-semibold">Referral</a></Link>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Header - AsterDEX Style */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-12">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
            <Users className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3">
            Referral Program
          </h1>
          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto mb-2">
            Earn up to a <span className="text-orange-500 font-semibold">10% Rebate</span> when you invite friends!
          </p>
          <p className="text-xs sm:text-sm text-white/60 max-w-2xl mx-auto">
            The more friends you invite, the more you earn!
          </p>
          <a href="#" className="inline-block text-xs sm:text-sm text-primary hover:underline mt-2">
            View referral rules →
          </a>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          <Card className="bg-card border-white/10">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div className="text-xs sm:text-sm text-white/60">Total Referrals</div>
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">0</div>
              <div className="text-xs text-white/40">All time</div>
            </CardContent>
          </Card>

          <Card className="bg-card border-white/10">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div className="text-xs sm:text-sm text-white/60">Total Earnings</div>
                <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">$0.00</div>
              <div className="text-xs text-green-500">+0%</div>
            </CardContent>
          </Card>

          <Card className="bg-card border-white/10">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div className="text-xs sm:text-sm text-white/60">This Month</div>
                <Gift className="h-4 w-4 sm:h-5 sm:w-5 text-secondary" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">$0.00</div>
              <div className="text-xs text-white/40">0 referrals</div>
            </CardContent>
          </Card>

          <Card className="bg-card border-white/10">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div className="text-xs sm:text-sm text-white/60">Bonus Points</div>
                <Award className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">0</div>
              <div className="text-xs text-white/40">From referrals</div>
            </CardContent>
          </Card>
        </div>

        {/* Invite & Tiers */}
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Your Referral Link */}
          <Card className="bg-card border-white/10">
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">
                Invite now
              </h3>
              
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="text-xs sm:text-sm text-white/60 mb-2 block">Referral Code</label>
                  <div className="flex gap-2">
                    <Input
                      value="PERPX-ABC123"
                      readOnly
                      className="bg-background border-white/10 text-sm"
                    />
                    <Button
                      onClick={handleCopy}
                      className="bg-primary hover:bg-primary/90 text-white px-3"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div>
                  <label className="text-xs sm:text-sm text-white/60 mb-2 block">Referral Link</label>
                  <div className="flex gap-2">
                    <Input
                      value="https://perpx.io/ref/PERPX-ABC123"
                      readOnly
                      className="bg-background border-white/10 text-sm"
                    />
                    <Button
                      onClick={handleCopy}
                      className="bg-primary hover:bg-primary/90 text-white px-3"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white text-sm">
                    <Twitter className="mr-2 h-4 w-4" />
                    Share on Twitter
                  </Button>
                  <Button className="flex-1 bg-[#0088cc] hover:bg-[#006699] text-white text-sm">
                    <Send className="mr-2 h-4 w-4" />
                    Share on Telegram
                  </Button>
                </div>

                <div className="mt-4 p-3 bg-background/50 rounded-lg">
                  <div className="text-xs sm:text-sm font-semibold text-white mb-2">How it works</div>
                  <ul className="text-xs sm:text-sm text-white/60 space-y-1">
                    <li>• Share your referral link with friends</li>
                    <li>• They sign up and start trading</li>
                    <li>• You earn 10% of their trading fees</li>
                    <li>• Earnings are paid out weekly</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Referral Tiers */}
          <Card className="bg-card border-white/10">
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">
                Referral Tiers
              </h3>

              <div className="space-y-3 sm:space-y-4">
                <div className="p-3 bg-gradient-to-r from-orange-500/20 to-orange-600/10 border border-orange-500/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm sm:text-base font-bold text-orange-500">Bronze (0-9 referrals)</div>
                    <div className="text-base sm:text-lg font-bold text-orange-500">10%</div>
                  </div>
                  <div className="text-xs sm:text-sm text-white/60">Standard commission rate</div>
                </div>

                <div className="p-3 bg-gradient-to-r from-gray-400/20 to-gray-500/10 border border-gray-400/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm sm:text-base font-bold text-gray-400">Silver (10-49 referrals)</div>
                    <div className="text-base sm:text-lg font-bold text-gray-400">15%</div>
                  </div>
                  <div className="text-xs sm:text-sm text-white/60">+500 bonus points</div>
                </div>

                <div className="p-3 bg-gradient-to-r from-yellow-500/20 to-yellow-600/10 border border-yellow-500/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm sm:text-base font-bold text-yellow-500">Gold (50-99 referrals)</div>
                    <div className="text-base sm:text-lg font-bold text-yellow-500">20%</div>
                  </div>
                  <div className="text-xs sm:text-sm text-white/60">+2,000 bonus points</div>
                </div>

                <div className="p-3 bg-gradient-to-r from-primary/20 to-secondary/10 border border-primary/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm sm:text-base font-bold text-primary">Platinum (100+ referrals)</div>
                    <div className="text-base sm:text-lg font-bold text-primary">25%</div>
                  </div>
                  <div className="text-xs sm:text-sm text-white/60">+10,000 bonus points + NFT badge</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Your Referrals Table */}
        <Card className="bg-card border-white/10">
          <CardContent className="p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">
              Your Referrals
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left text-xs sm:text-sm text-white/60 font-semibold pb-3">Address</th>
                    <th className="text-left text-xs sm:text-sm text-white/60 font-semibold pb-3">Status</th>
                    <th className="text-right text-xs sm:text-sm text-white/60 font-semibold pb-3">Volume</th>
                    <th className="text-right text-xs sm:text-sm text-white/60 font-semibold pb-3">Your Earnings</th>
                  </tr>
                </thead>
                <tbody>
                  {referrals.map((ref, i) => (
                    <tr key={i} className="border-b border-white/5">
                      <td className="py-3 text-xs sm:text-sm text-white">{ref.address}</td>
                      <td className="py-3">
                        <span className="inline-block px-2 py-1 bg-green-500/20 text-green-500 text-xs rounded">
                          {ref.status}
                        </span>
                      </td>
                      <td className="py-3 text-right text-xs sm:text-sm text-white">{ref.volume}</td>
                      <td className="py-3 text-right text-xs sm:text-sm text-green-500 font-semibold">{ref.earnings}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

