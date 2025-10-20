import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import {
  TrendingUp,
  DollarSign,
  Award,
  BarChart3,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Main Content */}
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        {/* Stage Header - AsterDEX Style */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">
                Stage 3 • <span className="text-primary">Dawn</span>
              </h1>
              <p className="text-sm sm:text-base text-white/70">
                Track your trading performance and rewards
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4 mb-6 sm:mb-8">
          <Card className="bg-card border-white/10">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="text-xs sm:text-sm text-white/60 mb-1">Total Volume</div>
              <div className="text-lg sm:text-2xl font-bold text-white">$0</div>
            </CardContent>
          </Card>

          <Card className="bg-card border-white/10">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                </div>
              </div>
              <div className="text-xs sm:text-sm text-white/60 mb-1">Total PnL</div>
              <div className="text-lg sm:text-2xl font-bold text-green-500">$0</div>
            </CardContent>
          </Card>

          <Card className="bg-card border-white/10">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Award className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="text-xs sm:text-sm text-white/60 mb-1">Points Earned</div>
              <div className="text-lg sm:text-2xl font-bold text-white">0</div>
            </CardContent>
          </Card>

          <Card className="bg-card border-white/10">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
              </div>
              <div className="text-xs sm:text-sm text-white/60 mb-1">Total Trades</div>
              <div className="text-lg sm:text-2xl font-bold text-white">0</div>
            </CardContent>
          </Card>
        </div>

        {/* Empty State */}
        <Card className="bg-card border-white/10">
          <CardContent className="p-8 sm:p-12 text-center">
            <div className="mb-4">
              <BarChart3 className="h-12 w-12 sm:h-16 sm:w-16 text-white/20 mx-auto" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">No Trading Activity</h3>
            <p className="text-sm sm:text-base text-white/60 mb-6">
              Connect your wallet and start trading to see your dashboard statistics
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

