import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRewardsState } from "@/hooks/useRewardsState";
import ConnectWalletScreen from "@/components/ConnectWalletScreen";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { 
  Gift, 
  Trophy, 
  Star, 
  Zap, 
  CheckCircle2, 
  Twitter,
  MessageCircle,
  Users,
  Wallet,
  Unplug,
  Loader2,
  ExternalLink,
  Link as LinkIcon
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Rewards() {
  const { t } = useLanguage();
  const { isConnected, address, chainType } = useRewardsState();
  const [loading, setLoading] = useState<string | null>(null);
  
  // Tweet URL verification modal state
  const [showTweetModal, setShowTweetModal] = useState(false);
  const [tweetUrl, setTweetUrl] = useState("");
  const [tweetUrlError, setTweetUrlError] = useState("");

  // Get profile from backend
  const { data: profile, refetch: refetchProfile, isLoading: profileLoading } = trpc.rewards.getProfile.useQuery(
    { walletAddress: address || "", chainType: chainType || "evm" },
    { enabled: !!address && !!chainType }
  );

  // Mutations
  const claimConnectBonus = trpc.rewards.claimConnectBonus.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        refetchProfile();
      } else {
        toast.info(data.message);
      }
    },
    onError: (error) => toast.error(error.message),
  });

  const connectX = trpc.rewards.connectX.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        refetchProfile();
      } else {
        toast.info(data.message);
      }
    },
    onError: (error) => toast.error(error.message),
  });

  const disconnectX = trpc.rewards.disconnectX.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        refetchProfile();
      }
    },
    onError: (error) => toast.error(error.message),
  });

  const connectDiscord = trpc.rewards.connectDiscord.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        refetchProfile();
      } else {
        toast.info(data.message);
      }
    },
    onError: (error) => toast.error(error.message),
  });

  const disconnectDiscord = trpc.rewards.disconnectDiscord.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        refetchProfile();
      }
    },
    onError: (error) => toast.error(error.message),
  });

  const completeDailyPost = trpc.rewards.completeDailyPost.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        setShowTweetModal(false);
        setTweetUrl("");
        refetchProfile();
      } else {
        toast.info(data.message);
      }
    },
    onError: (error) => toast.error(error.message),
  });

  // Auto-claim connect bonus when profile is loaded and not yet claimed
  useEffect(() => {
    if (profile && !profile.connectBonusClaimed && address) {
      claimConnectBonus.mutate({ walletAddress: address });
    }
  }, [profile?.connectBonusClaimed, address]);

  // Check OAuth status on mount
  const { data: oauthStatus } = trpc.rewards.getOAuthStatus.useQuery();

  const handleSocialConnect = (platform: 'twitter' | 'discord') => {
    if (!address) return;
    
    // Check if OAuth is configured
    if (platform === 'twitter' && !oauthStatus?.x?.configured) {
      // Fallback to manual input if OAuth not configured
      handleManualSocialConnect(platform);
      return;
    }
    if (platform === 'discord' && !oauthStatus?.discord?.configured) {
      handleManualSocialConnect(platform);
      return;
    }
    
    // Redirect to OAuth endpoint
    const endpoint = platform === 'twitter' 
      ? `/api/social/x/auth?wallet=${encodeURIComponent(address)}`
      : `/api/social/discord/auth?wallet=${encodeURIComponent(address)}`;
    
    window.location.href = endpoint;
  };

  // Fallback manual connection (when OAuth is not configured)
  const handleManualSocialConnect = (platform: 'twitter' | 'discord') => {
    const width = 500;
    const height = 400;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    
    const popup = window.open(
      '', 
      `Connect ${platform}`, 
      `width=${width},height=${height},top=${top},left=${left}`
    );
    
    if (popup) {
      popup.document.write(`
        <html>
          <head>
            <title>Connect ${platform === 'twitter' ? 'X' : 'Discord'}</title>
            <style>
              body { background: #0a0a0a; color: white; font-family: system-ui, sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
              h2 { margin-bottom: 8px; }
              p { color: #888; margin-bottom: 16px; }
              .btn { background: #0ABAB5; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: 600; }
              .btn:hover { background: #08a5a0; }
              input { padding: 12px; border-radius: 8px; border: 1px solid #333; background: #1a1a1a; color: white; width: 250px; margin-bottom: 16px; font-size: 14px; }
              input:focus { outline: none; border-color: #0ABAB5; }
            </style>
          </head>
          <body>
            <h2>Connect ${platform === 'twitter' ? 'X (Twitter)' : 'Discord'}</h2>
            <p>Enter your username to link your account</p>
            <input type="text" id="username" placeholder="${platform === 'twitter' ? '@username' : 'username#0000'}" autofocus />
            <button class="btn" onclick="
              const username = document.getElementById('username').value.trim();
              if (username) {
                window.opener.postMessage({ type: 'SOCIAL_CONNECTED', platform: '${platform}', username: username }, '*');
                window.close();
              } else {
                alert('Please enter your username');
              }
            ">Connect Account</button>
          </body>
        </html>
      `);
    }
  };

  // Listen for social connection messages
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'SOCIAL_CONNECTED' && address) {
        const platform = event.data.platform;
        const username = event.data.username;
        
        if (platform === 'twitter') {
          connectX.mutate({ walletAddress: address, xUsername: username });
        } else if (platform === 'discord') {
          connectDiscord.mutate({ walletAddress: address, discordUsername: username });
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [address]);

  const handleDisconnectSocial = (platform: 'twitter' | 'discord') => {
    if (!address) return;
    
    if (confirm(`Are you sure you want to disconnect your ${platform} account?`)) {
      if (platform === 'twitter') {
        disconnectX.mutate({ walletAddress: address });
      } else {
        disconnectDiscord.mutate({ walletAddress: address });
      }
    }
  };

  // Open Twitter Intent with @perpXFi mention
  const handleOpenTweetIntent = () => {
    const tweetText = encodeURIComponent("Trading on @perpXFi! 🚀\n\nThe next-generation perpetual DEX with up to 100x leverage.\n\n#PerpX #DeFi #Crypto");
    const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(tweetUrl, '_blank', 'width=600,height=400');
  };

  // Validate tweet URL format
  const validateTweetUrl = (url: string): boolean => {
    // Accept both twitter.com and x.com URLs
    const tweetUrlPattern = /^https?:\/\/(twitter\.com|x\.com)\/[a-zA-Z0-9_]+\/status\/\d+/;
    return tweetUrlPattern.test(url);
  };

  // Handle tweet URL submission
  const handleSubmitTweetUrl = () => {
    if (!address) return;
    
    const trimmedUrl = tweetUrl.trim();
    
    if (!trimmedUrl) {
      setTweetUrlError("Please enter your tweet URL");
      return;
    }
    
    if (!validateTweetUrl(trimmedUrl)) {
      setTweetUrlError("Invalid tweet URL. Please enter a valid Twitter/X post URL (e.g., https://x.com/username/status/123456789)");
      return;
    }
    
    setTweetUrlError("");
    completeDailyPost.mutate({ walletAddress: address, tweetUrl: trimmedUrl });
  };

  // Handle social post button click
  const handleSocialPost = () => {
    if (!address) return;
    setShowTweetModal(true);
  };

  const tasks = [
    {
      id: 'connect-wallet',
      title: 'Connect Wallet',
      description: 'Connect your wallet to start earning',
      points: 300,
      icon: Wallet,
      action: () => {}, 
      buttonText: 'Connected',
      category: 'onboarding',
      isSocial: false,
      isCompleted: profile?.connectBonusClaimed || false,
    },
    {
      id: 'connect-twitter',
      title: 'Connect X (Twitter)',
      description: 'Link your X account to earn points',
      points: 100,
      icon: Twitter,
      action: () => handleSocialConnect('twitter'),
      disconnectAction: () => handleDisconnectSocial('twitter'),
      buttonText: 'Connect X',
      category: 'social',
      isSocial: true,
      platform: 'twitter',
      isCompleted: profile?.xConnected || false,
      connectedUsername: profile?.xUsername,
    },
    {
      id: 'connect-discord',
      title: 'Connect Discord',
      description: 'Link your Discord account to earn points',
      points: 100,
      icon: MessageCircle,
      action: () => handleSocialConnect('discord'),
      disconnectAction: () => handleDisconnectSocial('discord'),
      buttonText: 'Connect Discord',
      category: 'social',
      isSocial: true,
      platform: 'discord',
      isCompleted: profile?.discordConnected || false,
      connectedUsername: profile?.discordUsername,
    },
    {
      id: 'post-twitter-daily',
      title: 'Post on X with @perpXFi',
      description: `Mention @perpXFi in your post to earn points (Daily - Resets at 00:00 JST)`,
      points: 100,
      icon: Twitter,
      action: handleSocialPost,
      buttonText: 'Post Now',
      category: 'daily',
      isSocial: false,
      isCompleted: profile?.dailyPostCompleted || false,
      requiresXConnection: true,
    }
  ];

  const renderTask = (task: any) => {
    const isCompleted = task.isCompleted;
    const TaskIcon = task.icon || Star;
    const isDisabled = task.requiresXConnection && !profile?.xConnected;
    const isMutating = connectX.isPending || disconnectX.isPending || 
                       connectDiscord.isPending || disconnectDiscord.isPending ||
                       completeDailyPost.isPending || claimConnectBonus.isPending;

    return (
      <Card key={task.id} className="glass-card p-6 hover-reveal relative group">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <TaskIcon className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-bold text-white">{task.title}</h3>
                {isCompleted && <CheckCircle2 className="h-5 w-5 text-green-500" />}
              </div>
              <p className="text-sm text-white/60 mb-2">{task.description}</p>
              {task.connectedUsername && (
                <p className="text-xs text-primary mb-2">@{task.connectedUsername}</p>
              )}
              <div className="text-primary font-bold">+{task.points} Points</div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={task.action}
            disabled={isCompleted || isMutating || (task.id === 'connect-wallet') || isDisabled}
            className={`flex-1 ${
              isCompleted
                ? 'bg-green-500/20 text-green-500 cursor-not-allowed'
                : isDisabled
                ? 'bg-gray-500/20 text-gray-500 cursor-not-allowed'
                : 'neuro-button micro-bounce'
            }`}
          >
            {isMutating ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : null}
            {isCompleted ? 'Completed' : isDisabled ? 'Connect X First' : task.buttonText}
          </Button>
          
          {/* Disconnect Button for Social Tasks */}
          {task.isSocial && isCompleted && (
            <Button
              onClick={task.disconnectAction}
              disabled={isMutating}
              variant="outline"
              className="border-red-500/50 text-red-500 hover:bg-red-500/10 hover:text-red-400"
              title="Disconnect"
            >
              <Unplug className="h-4 w-4" />
            </Button>
          )}
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {!isConnected && (
        <ConnectWalletScreen
          title="Rewards Program"
          description="Connect your wallet to view your points and available tasks."
        />
      )}

      {isConnected && profileLoading && (
        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      )}

      {isConnected && profile && !profileLoading && (
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Rewards Center</h1>
            <p className="text-white/60">Complete tasks to earn points and unlock exclusive benefits.</p>
            <p className="text-xs text-white/40 mt-1">Today (JST): {profile.todayJST}</p>
          </div>

          {/* Total Points */}
          <div className="glass-card rounded-xl p-8 mb-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 animate-pulse-slow"></div>
            <div className="relative z-10">
              <div className="text-sm text-white/60 mb-2">Total Points</div>
              <div className="text-5xl sm:text-6xl font-bold text-white mb-4 tracking-tight">
                {profile.totalPoints.toLocaleString()} <span className="text-2xl text-primary">PTS</span>
              </div>
              <div className="text-sm text-green-500 mb-2">
                100 PTS = 1 Token (Estimated)
              </div>
            </div>
          </div>

          {/* Task Categories */}
          <div className="space-y-8">
            {/* Onboarding */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Zap className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-white">Onboarding</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tasks.filter(t => t.category === 'onboarding').map(renderTask)}
              </div>
            </div>

            {/* Social */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-white">Social Tasks</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tasks.filter(t => t.category === 'social').map(renderTask)}
              </div>
            </div>

            {/* Daily */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold text-white">Daily Tasks</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tasks.filter(t => t.category === 'daily').map(renderTask)}
              </div>
            </div>
          </div>

          {/* Coming Soon Section */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <h2 className="text-xl font-bold text-white mb-6 text-center opacity-50">Coming Soon</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-50 pointer-events-none grayscale">
              <Card className="glass-card p-6">
                <div className="h-12 w-12 bg-white/10 rounded-full mb-4"></div>
                <div className="h-6 w-3/4 bg-white/10 rounded mb-2"></div>
                <div className="h-4 w-full bg-white/10 rounded"></div>
              </Card>
              <Card className="glass-card p-6">
                <div className="h-12 w-12 bg-white/10 rounded-full mb-4"></div>
                <div className="h-6 w-3/4 bg-white/10 rounded mb-2"></div>
                <div className="h-4 w-full bg-white/10 rounded"></div>
              </Card>
              <Card className="glass-card p-6">
                <div className="h-12 w-12 bg-white/10 rounded-full mb-4"></div>
                <div className="h-6 w-3/4 bg-white/10 rounded mb-2"></div>
                <div className="h-4 w-full bg-white/10 rounded"></div>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Tweet URL Verification Modal */}
      <Dialog open={showTweetModal} onOpenChange={setShowTweetModal}>
        <DialogContent className="sm:max-w-[500px] bg-[#1a1a2e] border-white/10 backdrop-blur-none">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Twitter className="h-5 w-5 text-primary" />
              Post on X with @perpXFi
            </DialogTitle>
            <DialogDescription className="text-white/60">
              Complete this daily task to earn 100 points
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Step 1: Create Tweet */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">1</div>
                <Label className="text-white font-medium">Create your post</Label>
              </div>
              <p className="text-sm text-white/60 ml-8">
                Click the button below to open X with a pre-filled message mentioning @perpXFi
              </p>
              <Button 
                onClick={handleOpenTweetIntent}
                className="ml-8 neuro-button"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open X to Post
              </Button>
            </div>

            {/* Step 2: Submit URL */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">2</div>
                <Label className="text-white font-medium">Submit your post URL</Label>
              </div>
              <p className="text-sm text-white/60 ml-8">
                After posting, copy the URL of your post and paste it below
              </p>
              <div className="ml-8 space-y-2">
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <Input
                    placeholder="https://x.com/username/status/123456789"
                    value={tweetUrl}
                    onChange={(e) => {
                      setTweetUrl(e.target.value);
                      setTweetUrlError("");
                    }}
                    className="pl-10 bg-background border-white/20 text-white placeholder:text-white/40"
                  />
                </div>
                {tweetUrlError && (
                  <p className="text-sm text-red-500">{tweetUrlError}</p>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowTweetModal(false);
                setTweetUrl("");
                setTweetUrlError("");
              }}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitTweetUrl}
              disabled={completeDailyPost.isPending || !tweetUrl.trim()}
              className="neuro-button"
            >
              {completeDailyPost.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Verify & Claim Points
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
