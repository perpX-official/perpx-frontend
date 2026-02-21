import React, { useState, useEffect, useRef, useCallback } from "react";
import { Wallet, Zap, Globe, Loader2, X, Copy, Check, AlertTriangle, LogOut } from "lucide-react";
import { useWallet } from "@/contexts/WalletContext";
import { EVM_MOBILE_WALLETS, SOLANA_MOBILE_WALLETS } from "@/config/walletConstants";
import { detectMetaMaskAvailable } from "@/lib/evmProviders";
import { getWalletConnectionErrorMessage } from "@/lib/walletConnectionError";
import { toast } from "sonner";
import QRCode from "qrcode";
import {
  WalletMetamask,
  WalletWalletConnect,
  WalletPhantom,
  WalletTrust,
  WalletSafe,
  NetworkTron,
} from "@web3icons/react";

type ModalView =
  | "chains"
  | "switch_confirm"
  | "evm_wallets"
  | "evm_wc_qr"
  | "tron_wallets"
  | "tron_wc_qr"
  | "solana_wallets"
  | "wc_qr";

type EvmWcTarget = "walletconnect" | "trust" | "safepal";
type SolanaWcTarget = "walletconnect" | "phantom";

export function ChainSelectModal() {
  const {
    isChainSelectOpen,
    setChainSelectOpen,
    isConnected,
    activeChain,
    address,
    connectEvm,
    connectTron,
    connectSolana,
    disconnect,
    tronWcUri,
    evmWcUri,
    solanaWcUri,
    solanaAvailableWallets,
  } = useWallet();

  const hasTronExtension =
    typeof window !== "undefined" && (!!(window as any).tronLink || !!(window as any).tronWeb);
  const hasMetaMask = detectMetaMaskAvailable();
  const hasPhantomSolana = solanaAvailableWallets.some(
    (wallet) => wallet.id === "phantom" && wallet.available
  );
  const isMobileBrowser =
    typeof navigator !== "undefined" &&
    /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent || "");

  const openMetaMaskDeepLink = useCallback(() => {
    if (typeof window === "undefined") return;
    const current = window.location.href.replace(/^https?:\/\//, "");
    window.location.href = `https://metamask.app.link/dapp/${current}`;
  }, []);

  const openWalletDeepLink = useCallback((deepLinkPrefix: string, uri: string) => {
    if (typeof window === "undefined") return;
    const encodedUri = encodeURIComponent(uri);
    window.location.href = `${deepLinkPrefix}${encodedUri}`;
  }, []);

  const [view, setView] = useState<ModalView>("chains");
  const [connecting, setConnecting] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [evmWcTarget, setEvmWcTarget] = useState<EvmWcTarget>("walletconnect");
  const [solanaWcTarget, setSolanaWcTarget] = useState<SolanaWcTarget>("walletconnect");
  const [pendingSwitchChain, setPendingSwitchChain] = useState<'evm' | 'tron' | 'sol' | null>(null);
  const openedMobileUriRef = useRef<string | null>(null);

  // Generate QR code when URI changes
  const activeUri =
    view === "evm_wc_qr"
      ? evmWcUri
      : view === "tron_wc_qr"
      ? tronWcUri
      : view === "wc_qr"
      ? solanaWcUri
      : null;
  useEffect(() => {
    if (activeUri && (view === "evm_wc_qr" || view === "tron_wc_qr" || view === "wc_qr")) {
      QRCode.toDataURL(activeUri, {
        width: 280,
        margin: 2,
        color: { dark: "#000000", light: "#ffffff" },
      })
        .then((url) => setQrDataUrl(url))
        .catch(() => setQrDataUrl(null));
    } else {
      setQrDataUrl(null);
    }
  }, [activeUri, view]);

  // If Solana WalletConnect URI is generated, switch to QR view automatically
  useEffect(() => {
    if (view === "solana_wallets" && solanaWcUri) {
      setView("wc_qr");
      setConnecting(false);
    }
  }, [solanaWcUri, view]);

  useEffect(() => {
    if (!isMobileBrowser) return;

    let mobileUri: string | null = null;
    let deepLinkPrefix: string | null = null;

    if (view === "evm_wc_qr" && evmWcUri) {
      mobileUri = evmWcUri;
      deepLinkPrefix = EVM_MOBILE_WALLETS[evmWcTarget].deepLinkPrefix;
    } else if (view === "tron_wc_qr" && tronWcUri) {
      mobileUri = tronWcUri;
      deepLinkPrefix = EVM_MOBILE_WALLETS.walletconnect.deepLinkPrefix;
    } else if (view === "wc_qr" && solanaWcUri) {
      mobileUri = solanaWcUri;
      deepLinkPrefix = SOLANA_MOBILE_WALLETS[solanaWcTarget].deepLinkPrefix;
    }

    if (!mobileUri || !deepLinkPrefix) return;

    const launchKey = `${view}:${deepLinkPrefix}:${mobileUri}`;
    if (openedMobileUriRef.current === launchKey) return;
    openedMobileUriRef.current = launchKey;
    openWalletDeepLink(deepLinkPrefix, mobileUri);
  }, [
    isMobileBrowser,
    view,
    evmWcUri,
    tronWcUri,
    solanaWcUri,
    evmWcTarget,
    solanaWcTarget,
    openWalletDeepLink,
  ]);

  // Reset state when modal opens
  useEffect(() => {
    if (isChainSelectOpen) {
      setView("chains");
      setConnecting(false);
      setQrDataUrl(null);
      setCopied(false);
      setEvmWcTarget("walletconnect");
      setSolanaWcTarget("walletconnect");
      setPendingSwitchChain(null);
      openedMobileUriRef.current = null;
    }
  }, [isChainSelectOpen]);

  if (!isChainSelectOpen) return null;

  const handleClose = () => {
    setChainSelectOpen(false);
    setView("chains");
    setConnecting(false);
    setQrDataUrl(null);
    setCopied(false);
    setEvmWcTarget("walletconnect");
    setSolanaWcTarget("walletconnect");
    setPendingSwitchChain(null);
    openedMobileUriRef.current = null;
  };

  // Format address for display
  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // Get chain display name
  const getChainDisplayName = (chain: string) => {
    switch (chain) {
      case 'evm': return 'EVM';
      case 'tron': return 'Tron';
      case 'sol': return 'Solana';
      default: return chain;
    }
  };

  // Handle chain button click with switch confirmation
  const handleChainClick = (targetChain: 'evm' | 'tron' | 'sol') => {
    // If already connected to a different chain, show switch confirmation
    if (isConnected && activeChain && activeChain !== targetChain) {
      setPendingSwitchChain(targetChain);
      setView("switch_confirm");
      return;
    }

    // Not connected or same chain - proceed directly
    proceedWithConnection(targetChain);
  };

  // Proceed with actual connection after confirmation
  const proceedWithConnection = (targetChain: 'evm' | 'tron' | 'sol') => {
    setPendingSwitchChain(null);
    switch (targetChain) {
      case 'evm':
        setView("evm_wallets");
        break;
      case 'tron':
        // Show Tron wallet list instead of auto-connecting
        setView("tron_wallets");
        break;
      case 'sol':
        handleSolanaSelect();
        break;
    }
  };

  // Confirm chain switch
  const handleConfirmSwitch = () => {
    if (pendingSwitchChain) {
      proceedWithConnection(pendingSwitchChain);
    }
  };

  const handleEvmMetaMask = async () => {
    if (!hasMetaMask) {
      if (isMobileBrowser) {
        openMetaMaskDeepLink();
        return;
      }
      toast.error(getWalletConnectionErrorMessage(new Error("MetaMask not detected")));
      return;
    }
    setConnecting(true);
    try {
      await connectEvm("metamask");
      handleClose();
    } catch (err: any) {
      toast.error(getWalletConnectionErrorMessage(err));
      setConnecting(false);
    }
  };

  const handleEvmWalletConnect = async (target: EvmWcTarget) => {
    setEvmWcTarget(target);
    setConnecting(true);
    setView("evm_wc_qr");
    try {
      await connectEvm("walletconnect");
      handleClose();
    } catch (err: any) {
      if (evmWcUri) {
        setConnecting(false);
      } else {
        toast.error(getWalletConnectionErrorMessage(err));
        setView("evm_wallets");
        setConnecting(false);
      }
    }
  };

  const handleTronExtensionConnect = async () => {
    if (!hasTronExtension && isMobileBrowser) {
      await handleTronWalletConnect();
      return;
    }
    setConnecting(true);
    try {
      await connectTron("tronlink");
      handleClose();
    } catch (err: any) {
      toast.error(getWalletConnectionErrorMessage(err));
      setConnecting(false);
    }
  };

  // Tron: connect via WalletConnect (show QR code)
  const handleTronWalletConnect = async () => {
    setConnecting(true);
    setView("tron_wc_qr");
    try {
      await connectTron("walletconnect");
      handleClose();
    } catch (err: any) {
      // If WalletConnect URI was generated, stay on QR view
      if (tronWcUri) {
        setConnecting(false);
      } else {
        toast.error(getWalletConnectionErrorMessage(err));
        setView("tron_wallets");
        setConnecting(false);
      }
    }
  };

  // Solana: show available wallets
  const handleSolanaSelect = () => {
    setView("solana_wallets");
  };

  const handleSolanaConnect = async (walletId: string, target: SolanaWcTarget) => {
    setSolanaWcTarget(target);
    setConnecting(true);
    try {
      await connectSolana(walletId);
      handleClose();
    } catch (err: any) {
      // If WalletConnect URI was generated, show QR
      if (solanaWcUri) {
        setView("wc_qr");
        setConnecting(false);
      } else {
        toast.error(getWalletConnectionErrorMessage(err));
        setConnecting(false);
      }
    }
  };

  const handleCopyUri = async () => {
    const uri = activeUri;
    if (!uri) return;
    try {
      await navigator.clipboard.writeText(uri);
      setCopied(true);
      toast.success("URI copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  const handleDisconnect = () => {
    disconnect();
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="absolute inset-0 bg-black/80" onClick={handleClose} />
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0a0a0a] p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            {view !== "chains" && view !== "switch_confirm" && (
              <button
                className="rounded-full p-1.5 hover:bg-white/10 transition text-white/60 hover:text-white"
                onClick={() => {
                  setView("chains");
                  setConnecting(false);
                  setQrDataUrl(null);
                  setPendingSwitchChain(null);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
            )}
            <h2 className="text-xl font-bold text-white">
              {view === "chains" && (isConnected ? "Wallet" : "Connect Wallet")}
              {view === "switch_confirm" && "Switch Chain"}
              {view === "evm_wallets" && "EVM Wallets"}
              {view === "evm_wc_qr" && "Scan QR Code"}
              {view === "tron_wallets" && "Tron Network"}
              {view === "tron_wc_qr" && "Scan QR Code"}
              {view === "solana_wallets" && "Solana"}
              {view === "wc_qr" && "Scan QR Code"}
            </h2>
          </div>
          <button
            className="rounded-full p-2 hover:bg-white/10 transition text-white/60 hover:text-white"
            onClick={handleClose}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ===== Chain Selection View ===== */}
        {view === "chains" && (
          <div className="space-y-3">
            {/* Show current connection status */}
            {isConnected && address && activeChain && (
              <div className="mb-4 p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      activeChain === 'evm' ? 'bg-blue-500' : 
                      activeChain === 'tron' ? 'bg-red-500' : 'bg-purple-500'
                    }`} />
                    <div>
                      <div className="text-sm font-medium text-white">
                        Connected to {getChainDisplayName(activeChain)}
                      </div>
                      <div className="text-xs text-white/50 font-mono">
                        {formatAddress(address)}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleDisconnect}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium transition-colors"
                  >
                    <LogOut className="w-3 h-3" />
                    Disconnect
                  </button>
                </div>
              </div>
            )}

            {isConnected && (
              <p className="text-xs text-white/40 uppercase tracking-wider font-medium px-1">
                Switch to another chain
              </p>
            )}

            <ChainButton
              label="EVM Wallets"
              subLabel="MetaMask, SafePal, Trust, WalletConnect"
              icon={<Globe className="w-6 h-6 text-blue-400" />}
              onClick={() => handleChainClick('evm')}
              active={activeChain === 'evm'}
            />
            <ChainButton
              label="Tron Network"
              subLabel="TronLink, WalletConnect"
              icon={<Zap className="w-6 h-6 text-red-500" />}
              onClick={() => handleChainClick('tron')}
              active={activeChain === 'tron'}
            />
            <ChainButton
              label="Solana"
              subLabel="Phantom, WalletConnect"
              icon={<Wallet className="w-6 h-6 text-purple-400" />}
              onClick={() => handleChainClick('sol')}
              active={activeChain === 'sol'}
            />
          </div>
        )}

        {/* ===== Switch Chain Confirmation View ===== */}
        {view === "switch_confirm" && pendingSwitchChain && (
          <div className="flex flex-col items-center gap-5 py-4">
            <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
            </div>
            <div className="text-center space-y-2">
              <p className="text-sm text-white/80">
                You are currently connected to{" "}
                <span className="font-bold text-white">{getChainDisplayName(activeChain!)}</span>.
              </p>
              <p className="text-sm text-white/80">
                Switch to{" "}
                <span className="font-bold text-white">{getChainDisplayName(pendingSwitchChain)}</span>?
              </p>
              <p className="text-xs text-white/40">
                Your current connection will be disconnected. Points will be automatically linked.
              </p>
            </div>
            <div className="flex gap-3 w-full">
              <button
                onClick={() => {
                  setPendingSwitchChain(null);
                  setView("chains");
                }}
                className="flex-1 px-4 py-2.5 rounded-lg border border-white/10 text-white/70 hover:bg-white/5 transition text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSwitch}
                className="flex-1 px-4 py-2.5 rounded-lg bg-primary text-white hover:bg-primary/90 transition text-sm font-medium"
              >
                Switch
              </button>
            </div>
          </div>
        )}

        {/* ===== EVM Wallet List View ===== */}
        {view === "evm_wallets" && (
          <div className="space-y-3">
            <p className="text-xs text-white/40 uppercase tracking-wider font-medium px-1">
              Select a wallet to connect
            </p>
            <ChainButton
              label="MetaMask"
              subLabel={
                hasMetaMask
                  ? "Browser Extension"
                  : isMobileBrowser
                  ? "Open MetaMask App"
                  : "Not detected"
              }
              icon={<WalletMetamask className="w-6 h-6" variant="branded" />}
              onClick={handleEvmMetaMask}
            />
            <ChainButton
              label="SafePal"
              subLabel={isMobileBrowser ? "Open SafePal App" : "WalletConnect (QR)"}
              icon={<WalletSafe className="w-6 h-6" variant="branded" />}
              onClick={() => handleEvmWalletConnect("safepal")}
            />
            <ChainButton
              label="Trust Wallet"
              subLabel={isMobileBrowser ? "Open Trust Wallet App" : "WalletConnect (QR)"}
              icon={<WalletTrust className="w-6 h-6" variant="branded" />}
              onClick={() => handleEvmWalletConnect("trust")}
            />
            <ChainButton
              label="WalletConnect"
              subLabel={isMobileBrowser ? "Open Wallet App" : "Scan QR code with mobile wallet"}
              icon={<WalletWalletConnect className="w-6 h-6" variant="branded" />}
              onClick={() => handleEvmWalletConnect("walletconnect")}
            />
          </div>
        )}

        {/* ===== EVM WalletConnect QR View ===== */}
        {view === "evm_wc_qr" && (
          <div className="flex flex-col items-center gap-4 py-2">
            <p className="text-sm text-white/60 text-center">
              Scan with your EVM wallet app
            </p>
            {evmWcUri && qrDataUrl ? (
              <div className="p-3 bg-white rounded-xl">
                <img
                  src={qrDataUrl}
                  alt="WalletConnect QR"
                  className="w-56 h-56"
                />
              </div>
            ) : (
              <div className="w-56 h-56 flex items-center justify-center bg-white/5 rounded-xl">
                <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
              </div>
            )}
            {activeUri && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyUri}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition text-sm text-white/70"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  {copied ? "Copied" : "Copy URI"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* ===== Tron Wallet List View ===== */}
        {view === "tron_wallets" && (
          <div className="space-y-3">
            <p className="text-xs text-white/40 uppercase tracking-wider font-medium px-1">
              Select a wallet to connect
            </p>

            <ChainButton
              label="TronLink"
              subLabel={
                hasTronExtension
                  ? "Browser extension"
                  : isMobileBrowser
                  ? "Open Tron wallet app"
                  : "Install TronLink extension first"
              }
              icon={<NetworkTron className="w-6 h-6" variant="branded" />}
              onClick={handleTronExtensionConnect}
              disabled={!hasTronExtension && !isMobileBrowser}
            />

            <ChainButton
              label="WalletConnect"
              subLabel={isMobileBrowser ? "Open Wallet App" : "Scan QR code with mobile wallet"}
              icon={<WalletWalletConnect className="w-6 h-6" variant="branded" />}
              onClick={handleTronWalletConnect}
            />

            <p className="text-xs text-white/30 text-center mt-2">
              TronLink or WalletConnect only.
            </p>
          </div>
        )}

        {/* ===== Tron WalletConnect QR View ===== */}
        {view === "tron_wc_qr" && (
          <div className="flex flex-col items-center gap-4 py-2">
            <p className="text-sm text-white/60 text-center">
              Scan with your Tron-compatible wallet
            </p>
            {tronWcUri && qrDataUrl ? (
              <div className="p-3 bg-white rounded-xl">
                <img
                  src={qrDataUrl}
                  alt="WalletConnect QR"
                  className="w-56 h-56"
                />
              </div>
            ) : (
              <div className="w-56 h-56 flex items-center justify-center bg-white/5 rounded-xl">
                <Loader2 className="w-6 h-6 text-red-400 animate-spin" />
              </div>
            )}
            {activeUri && (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyUri}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition text-sm text-white/70"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  {copied ? "Copied" : "Copy URI"}
                </button>
              </div>
            )}
            <p className="text-xs text-white/30 text-center">
              Use TronLink or any WalletConnect-compatible Tron wallet.
            </p>
          </div>
        )}

        {/* ===== Solana Wallets View ===== */}
        {view === "solana_wallets" && (
          <div className="space-y-3">
            <p className="text-xs text-white/40 uppercase tracking-wider font-medium px-1">
              Select a wallet to connect
            </p>

            <ChainButton
              label="Phantom"
              subLabel={
                hasPhantomSolana
                  ? "Extension detected"
                  : isMobileBrowser
                  ? "Open Phantom App"
                  : "WalletConnect fallback"
              }
              icon={<WalletPhantom className="w-6 h-6" variant="branded" />}
              onClick={() => handleSolanaConnect("phantom", "phantom")}
              badge={hasPhantomSolana ? "Available" : undefined}
            />

            <div className="pt-2 border-t border-white/5">
              <ChainButton
                label="WalletConnect"
                subLabel={isMobileBrowser ? "Open Wallet App" : "Connect via QR code"}
                icon={<WalletWalletConnect className="w-6 h-6" variant="branded" />}
                onClick={() => handleSolanaConnect("walletconnect", "walletconnect")}
              />
            </div>
          </div>
        )}

        {/* ===== WalletConnect QR View (Solana fallback) ===== */}
        {view === "wc_qr" && (
          <div className="flex flex-col items-center gap-4 py-2">
            <p className="text-sm text-white/60 text-center">
              Scan with your Solana wallet app
            </p>
            {qrDataUrl ? (
              <div className="p-3 bg-white rounded-xl">
                <img
                  src={qrDataUrl}
                  alt="WalletConnect QR"
                  className="w-56 h-56"
                />
              </div>
            ) : solanaWcUri ? (
              <div className="w-56 h-56 flex items-center justify-center bg-white/5 rounded-xl">
                <Loader2 className="w-6 h-6 text-white/40 animate-spin" />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 py-8">
                <Loader2 className="w-10 h-10 text-purple-400 animate-spin" />
                <p className="text-sm text-white/60">
                  Initializing WalletConnect...
                </p>
              </div>
            )}
            {activeUri && (
              <button
                onClick={handleCopyUri}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition text-sm text-white/70"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                {copied ? "Copied" : "Copy URI"}
              </button>
            )}
          </div>
        )}

        {/* Loading overlay for connecting state */}
        {connecting && view !== "tron_wc_qr" && view !== "wc_qr" && view !== "switch_confirm" && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/60 rounded-2xl">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <p className="text-sm text-white/70">Connecting...</p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 text-center">
          <p className="text-xs text-white/40">
            By connecting your wallet, you agree to our Terms of Service and
            Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}

function ChainButton(props: {
  label: string;
  subLabel: string;
  icon: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  badge?: string;
  active?: boolean;
}) {
  return (
    <button
      className={`w-full group relative overflow-hidden rounded-xl border p-4 text-left transition-all duration-200 ${
        props.active
          ? "bg-primary/10 border-primary/50"
          : props.disabled
          ? "bg-white/[0.02] opacity-50 cursor-not-allowed border-white/10"
          : "bg-white/5 hover:bg-white/10 hover:border-primary/50 border-white/10"
      }`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors flex items-center justify-center w-12 h-12">
          {props.icon}
        </div>
        <div className="flex-1">
          <div className="font-bold text-white group-hover:text-primary transition-colors">
            {props.label}
          </div>
          <div className="text-sm text-white/40">{props.subLabel}</div>
        </div>
        {props.active && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">
            Connected
          </span>
        )}
        {props.badge && !props.active && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
            {props.badge}
          </span>
        )}
      </div>
    </button>
  );
}
