import Header from "@/components/Header";
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
import { Copy, ExternalLink } from "lucide-react";

export default function Referral() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

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

