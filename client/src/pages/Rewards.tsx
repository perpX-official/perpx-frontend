import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Gift, Trophy, Star, Zap } from "lucide-react";

export default function Rewards() {
  const rewards = [
    { title: "Trading Volume Rewards", amount: "2,500 PERPX", status: "Available", icon: Trophy },
    { title: "Referral Bonus", amount: "1,200 PERPX", status: "Available", icon: Gift },
    { title: "Liquidity Provider Rewards", amount: "850 PERPX", status: "Locked", icon: Star },
    { title: "Community Participation", amount: "450 PERPX", status: "Available", icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Rewards Hub</h1>
          <p className="text-white/60">Claim your generous rewards and bonuses</p>
        </div>

        {/* Total Rewards */}
        <div className="glass-card rounded-xl p-8 mb-8 text-center">
          <div className="text-sm text-white/60 mb-2">Total Available Rewards</div>
          <div className="text-4xl sm:text-5xl font-bold text-white mb-4">5,000 PERPX</div>
          <div className="text-sm text-green-500 mb-6">≈ $12,500 USD</div>
          <Button className="neuro-button micro-bounce micro-glow text-white font-medium px-8 py-6">
            Claim All Rewards
          </Button>
        </div>

        {/* Rewards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rewards.map((reward, index) => (
            <div key={index} className="glass-card rounded-xl p-6 hover-reveal">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <reward.icon className="h-6 w-6 text-primary" />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  reward.status === 'Available' 
                    ? 'bg-green-500/20 text-green-500' 
                    : 'bg-white/10 text-white/60'
                }`}>
                  {reward.status}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{reward.title}</h3>
              <div className="text-2xl font-bold text-primary mb-4">{reward.amount}</div>
              <Button 
                variant="outline" 
                className="w-full glass-card border-white/20 text-white hover:bg-white/10"
                disabled={reward.status === 'Locked'}
              >
                {reward.status === 'Available' ? 'Claim Reward' : 'Locked'}
              </Button>
            </div>
          ))}
        </div>

        {/* Reward History */}
        <div className="glass-card rounded-xl p-6 mt-8">
          <h2 className="text-xl font-bold text-white mb-6">Reward History</h2>
          <div className="space-y-4">
            {[
              { date: '2025-10-15', type: 'Trading Volume', amount: '+500 PERPX' },
              { date: '2025-10-10', type: 'Referral Bonus', amount: '+300 PERPX' },
              { date: '2025-10-05', type: 'Liquidity Provider', amount: '+750 PERPX' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                <div>
                  <div className="text-white font-medium">{item.type}</div>
                  <div className="text-sm text-white/60">{item.date}</div>
                </div>
                <div className="text-green-500 font-bold">{item.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

