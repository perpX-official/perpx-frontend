import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Crown, Check, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function VIP() {
  const { t } = useLanguage();
  const tiers = [
    { 
      name: "Silver", 
      fee: "0.08%", 
      volume: "$100K+", 
      benefits: ["Priority support", "Reduced fees", "Early access"] 
    },
    { 
      name: "Gold", 
      fee: "0.06%", 
      volume: "$1M+", 
      benefits: ["All Silver benefits", "Dedicated account manager", "Custom API limits"] 
    },
    { 
      name: "Platinum", 
      fee: "0.04%", 
      volume: "$10M+", 
      benefits: ["All Gold benefits", "Zero maker fees", "Exclusive events"] 
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{t('vip.title')}</h1>
          <p className="text-white/60">{t('vip.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {tiers.map((tier, index) => (
            <div key={index} className="glass-card rounded-xl p-6 hover-reveal">
              <div className="flex items-center gap-2 mb-4">
                <Crown className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-bold text-white">{tier.name}</h3>
              </div>
              <div className="mb-4">
                <div className="text-3xl font-bold text-primary mb-1">{tier.fee}</div>
                <div className="text-sm text-white/60">{t('vip.tradingFee')}</div>
              </div>
              <div className="mb-6">
                <div className="text-sm text-white/60 mb-1">{t('vip.volumeRequired')}</div>
                <div className="text-lg font-bold text-white">{tier.volume}</div>
              </div>
              <div className="space-y-2 mb-6">
                {tier.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-white/80">
                    <Check className="h-4 w-4 text-green-500" />
                    {benefit}
                  </div>
                ))}
              </div>
              <Button className="w-full neuro-button micro-bounce text-white font-medium">
                Learn More
              </Button>
            </div>
          ))}
        </div>

        <div className="glass-card rounded-xl p-8 text-center">
          <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Current Tier: Standard</h2>
          <p className="text-white/60 mb-6">Trade $100K in the next 30 days to unlock Silver tier</p>
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-white/60 mb-2">
              <span>$45,230 / $100,000</span>
              <span>45%</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full" style={{width: "45%"}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
