import { Wallet } from 'lucide-react';
import { useAccount } from 'wagmi';
import { useEffect } from 'react';
import { useAppKit } from '@reown/appkit/react';
import { rewardsStorage, type ChainKind } from '@/lib/rewardsStorage';

interface ConnectWalletScreenProps {
  title: string;
  description: string;
}

export default function ConnectWalletScreen({ title, description }: ConnectWalletScreenProps) {
  // Wagmi hook for wallet state
  const { address, isConnected } = useAccount();
  const { open } = useAppKit();

  // Sync wagmi state with rewardsStorage when connected
  useEffect(() => {
    if (isConnected && address) {
      const newState = {
        chain: 'evm' as ChainKind,
        chainType: 'evm' as const,
        address: address, // Store FULL address (42 chars)
        isConnected: true
      };
      rewardsStorage.set(newState);
      // Initialize user data with full address
      rewardsStorage.initUser(address, 'evm');
    }
  }, [isConnected, address]);

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="max-w-md w-full space-y-8">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center backdrop-blur-sm border border-white/10">
              <Wallet className="h-10 w-10 text-primary" />
            </div>
          </div>

          {/* Title and Description */}
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">{title}</h2>
            <p className="text-base sm:text-lg text-white/60">
              {description}
            </p>
          </div>

          {/* AppKit Connect Button */}
          <div className="flex justify-center">
            <button
              onClick={() => open()}
              className="px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium transition-all duration-200 text-lg flex items-center gap-3"
            >
              <Wallet className="h-5 w-5" />
              Connect Wallet
            </button>
          </div>

          {/* Coming Soon Notice */}
          <div className="text-center pt-4">
            <p className="text-sm text-white/40">Full trading features coming soon</p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">100x</div>
              <div className="text-xs text-white/40 mt-1">Leverage</div>
            </div>
            <div className="text-center border-x border-white/10">
              <div className="text-2xl font-bold text-primary">$0</div>
              <div className="text-xs text-white/40 mt-1">Fees</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">24/7</div>
              <div className="text-xs text-white/40 mt-1">Trading</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
