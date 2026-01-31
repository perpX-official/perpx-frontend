import React from "react";
import type { ChainKind } from "@/lib/rewardsStorage";
import { Wallet, Zap, Globe, Smartphone } from "lucide-react";

export function ChainSelectModal(props: {
  open: boolean;
  onClose: () => void;
  onSelect: (chain: ChainKind) => void;
}) {
  if (!props.open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="absolute inset-0 bg-black/80" onClick={props.onClose} />
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Connect Wallet</h2>
          <button 
            className="rounded-full p-2 hover:bg-white/10 transition text-white/60 hover:text-white" 
            onClick={props.onClose}
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-3">
          <ChainButton 
            label="EVM Wallets" 
            subLabel="MetaMask, Rabbit, etc."
            icon={<Globe className="w-6 h-6 text-blue-400" />}
            onClick={() => props.onSelect("evm")} 
          />
          <ChainButton 
            label="WalletConnect" 
            subLabel="Mobile Wallets & QR Code"
            icon={<Smartphone className="w-6 h-6 text-blue-400" />}
            onClick={() => props.onSelect("evm")} 
          />
          <ChainButton 
            label="Tron Network" 
            subLabel="TronLink, etc."
            icon={<Zap className="w-6 h-6 text-red-500" />}
            onClick={() => props.onSelect("tron")} 
          />
          <ChainButton 
            label="Solana" 
            subLabel="Phantom, Solflare, etc."
            icon={<Wallet className="w-6 h-6 text-purple-400" />}
            onClick={() => props.onSelect("sol")} 
          />
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 text-center">
          <p className="text-xs text-white/40">
            By connecting your wallet, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}

function ChainButton(props: { label: string; subLabel: string; icon: React.ReactNode; onClick: () => void }) {
  return (
    <button
      className="w-full group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 text-left hover:bg-white/10 hover:border-primary/50 transition-all duration-200"
      onClick={props.onClick}
    >
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
          {props.icon}
        </div>
        <div>
          <div className="font-bold text-white group-hover:text-primary transition-colors">{props.label}</div>
          <div className="text-sm text-white/40">{props.subLabel}</div>
        </div>
      </div>
    </button>
  );
}
