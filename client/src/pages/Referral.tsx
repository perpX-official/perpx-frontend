import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "wouter";
import { Copy, ExternalLink, Menu, X, Settings } from "lucide-react";
import { useState } from "react";

export default function Referral() {
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
                <Link href="/trade"><a className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors">Perpetual</a></Link>
                <Link href="/dashboard"><a className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors">Portfolio</a></Link>
                <Link href="/referral"><a className="text-xs sm:text-sm text-white hover:text-white transition-colors">Referral</a></Link>
                <Link href="/points"><a className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors">Rewards</a></Link>
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
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex text-white/80 hover:text-white">
                <Settings className="h-4 w-4" />
              </Button>
              <Button className="bg-primary hover:bg-primary/90 text-white text-xs sm:text-sm px-3 sm:px-4">
                Connect wallet
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card border-b border-white/10 p-4">
          <div className="flex flex-col gap-3">
            <Link href="/trade"><a className="text-sm text-white/60">Perpetual</a></Link>
            <Link href="/dashboard"><a className="text-sm text-white/60">Portfolio</a></Link>
            <Link href="/referral"><a className="text-sm text-white">Referral</a></Link>
            <Link href="/points"><a className="text-sm text-white/60">Rewards</a></Link>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="container mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-12">
        {/* Hero Section */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3">
                Invite friends, Earn together
              </h1>
              <p className="text-sm sm:text-base text-white/70 mb-4">
                Invite friends to trade on PerpX and earn commission on their trading fees.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Learn more about our referral program
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
            <div className="hidden sm:block">
              <img
                src="/logo-horizontal.png"
                alt="Referral"
                className="w-48 sm:w-60 md:w-64 opacity-80"
              />
            </div>
          </div>
        </div>

        {/* Invite & Summary Cards */}
        <div className="grid gap-4 sm:gap-6 md:gap-8 lg:grid-cols-2 mb-8 sm:mb-12">
          {/* Invite Now Card */}
          <Card className="bg-gradient-to-b from-primary/10 to-transparent border-white/10">
            <CardHeader className="border-b border-white/10">
              <CardTitle className="text-base sm:text-lg text-white">Invite now</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-white/60 mb-1">You receive</div>
                  <div className="text-primary font-semibold">--</div>
                </div>
                <div>
                  <div className="text-white/60 mb-1">Your invitee receive</div>
                  <div className="text-primary font-semibold">--</div>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-white/80">Referral code</label>
                    <button className="text-white/60 hover:text-white transition-colors">
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      value="--"
                      readOnly
                      className="bg-card border-white/10 text-white/60 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm text-white/80">Referral link</label>
                    <button className="text-white/60 hover:text-white transition-colors">
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      value="--"
                      readOnly
                      className="bg-card border-white/10 text-white/60 text-sm"
                    />
                  </div>
                </div>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                Connect wallet
              </Button>
            </CardContent>
          </Card>

          {/* Summary Card */}
          <Card className="bg-gradient-to-b from-card/50 to-transparent border-white/10">
            <CardHeader className="border-b border-white/10">
              <CardTitle className="text-base sm:text-lg text-white">Summary of invitations</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <dl className="grid grid-cols-1 gap-4 sm:gap-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-white/60">Total Volume</dt>
                  <dd className="text-sm text-white font-semibold">
                    <span className="text-white/60">/</span>
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-white/60">Referral rewards</dt>
                  <dd className="text-sm text-white font-semibold">
                    <span className="text-white/60">/</span>
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-white/60">Referred friends</dt>
                  <dd className="text-sm text-white font-semibold">
                    <span className="text-white/60">/</span>
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-white/60">Friends who traded</dt>
                  <dd className="text-sm text-white font-semibold">
                    <span className="text-white/60">/</span>
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>

        {/* Referral Tiers */}
        <Card className="border-white/10 mb-8 sm:mb-12">
          <CardHeader className="border-b border-white/10">
            <CardTitle className="text-base sm:text-lg text-white">Referral tiers</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead className="text-white/60 text-xs sm:text-sm">Tier</TableHead>
                    <TableHead className="text-white/60 text-xs sm:text-sm">30-day Volume</TableHead>
                    <TableHead className="text-white/60 text-xs sm:text-sm">Your Rewards</TableHead>
                    <TableHead className="text-white/60 text-xs sm:text-sm">Friend Discount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-white/10 hover:bg-white/5">
                    <TableCell className="text-white text-xs sm:text-sm">Tier 1</TableCell>
                    <TableCell className="text-white/80 text-xs sm:text-sm">≥ $0</TableCell>
                    <TableCell className="text-primary text-xs sm:text-sm">10%</TableCell>
                    <TableCell className="text-green-500 text-xs sm:text-sm">5%</TableCell>
                  </TableRow>
                  <TableRow className="border-white/10 hover:bg-white/5">
                    <TableCell className="text-white text-xs sm:text-sm">Tier 2</TableCell>
                    <TableCell className="text-white/80 text-xs sm:text-sm">≥ $100K</TableCell>
                    <TableCell className="text-primary text-xs sm:text-sm">15%</TableCell>
                    <TableCell className="text-green-500 text-xs sm:text-sm">7%</TableCell>
                  </TableRow>
                  <TableRow className="border-white/10 hover:bg-white/5">
                    <TableCell className="text-white text-xs sm:text-sm">Tier 3</TableCell>
                    <TableCell className="text-white/80 text-xs sm:text-sm">≥ $500K</TableCell>
                    <TableCell className="text-primary text-xs sm:text-sm">20%</TableCell>
                    <TableCell className="text-green-500 text-xs sm:text-sm">10%</TableCell>
                  </TableRow>
                  <TableRow className="border-white/10 hover:bg-white/5">
                    <TableCell className="text-white text-xs sm:text-sm">Tier 4</TableCell>
                    <TableCell className="text-white/80 text-xs sm:text-sm">≥ $1M</TableCell>
                    <TableCell className="text-primary text-xs sm:text-sm">25%</TableCell>
                    <TableCell className="text-green-500 text-xs sm:text-sm">12%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Referral List */}
        <Card className="border-white/10">
          <CardHeader className="border-b border-white/10">
            <CardTitle className="text-base sm:text-lg text-white">Referral list</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-transparent">
                    <TableHead className="text-white/60 text-xs sm:text-sm">Address</TableHead>
                    <TableHead className="text-white/60 text-xs sm:text-sm">Volume (USDT)</TableHead>
                    <TableHead className="text-white/60 text-xs sm:text-sm">Your rewards (USDT)</TableHead>
                    <TableHead className="text-white/60 text-xs sm:text-sm">Date joined</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-12 text-white/60 text-sm">
                      Please connect your wallet first
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

