import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRewardsState } from "@/hooks/useRewardsState";
import ConnectWalletScreen from "@/components/ConnectWalletScreen";
import { rewardsStorage } from "@/lib/rewardsStorage";
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
  Unplug
} from "lucide-react";

export default function Rewards() {
  const { t } = useLanguage();
  const { isConnected, address } = useRewardsState();
  const [userData, setUserData] = useState(address ? rewardsStorage.getUserData(address) : null);
  const [loading, setLoading] = useState(false);

  // Sync user data
  useEffect(() => {
    if (address) {
      const data = rewardsStorage.getUserData(address);
      setUserData(data);
    }
  }, [address]);

  const handleTaskComplete = (taskId: string, points: number) => {
    if (!address || !userData) return;

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newCompletedTasks = [...userData.completedTasks, taskId];
      const newPoints = userData.points + points;
      
      const updatedUser = {
        ...userData,
        points: newPoints,
        completedTasks: newCompletedTasks
      };
      
      rewardsStorage.saveUserData(address, updatedUser);
      setUserData(updatedUser);
      setLoading(false);
    }, 1000);
  };

  const handleSocialConnect = (platform: 'twitter' | 'discord') => {
    // Simulate OAuth flow with redirect
    const width = 600;
    const height = 600;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    
    const popup = window.open(
      '', 
      `Connect ${platform}`, 
      `width=${width},height=${height},top=${top},left=${left}`
    );
    
    if (popup) {
      // Simulate a real OAuth page
      popup.document.write(`
        <html>
          <head>
            <title>Authorize ${platform}</title>
            <style>
              body { background: #1a1a1a; color: white; font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
              .btn { background: #3b82f6; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-size: 16px; margin-top: 20px; }
              .btn:hover { background: #2563eb; }
              .logo { width: 64px; height: 64px; margin-bottom: 20px; }
            </style>
          </head>
          <body>
            <h2>Authorize PerpDEX to access your ${platform} account?</h2>
            <p>This will allow PerpDEX to verify your username.</p>
            <button class="btn" onclick="window.opener.postMessage({ type: 'SOCIAL_CONNECTED', platform: '${platform}' }, '*'); window.close();">Authorize App</button>
          </body>
        </html>
      `);
    }
  };

  // Listen for social connection messages
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'SOCIAL_CONNECTED' && address && userData) {
        const platform = event.data.platform;
        const taskId = `connect-${platform}`;
        
        if (!userData.completedTasks.includes(taskId)) {
          handleTaskComplete(taskId, 100);
          
          // Update social connection state
          const updatedUser = {
            ...userData,
            socialConnections: {
              ...userData.socialConnections,
              [platform]: true
            }
          };
          rewardsStorage.saveUserData(address, updatedUser);
          setUserData(updatedUser);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [address, userData]);

  const handleDisconnectSocial = (platform: 'twitter' | 'discord') => {
    if (!address || !userData) return;
    
    if (confirm(`Are you sure you want to disconnect your ${platform} account?`)) {
      const taskId = `connect-${platform}`;
      const newCompletedTasks = userData.completedTasks.filter(id => id !== taskId);
      // Optional: Deduct points? Usually we don't deduct points for disconnecting, but we reset the task status
      // For this requirement, we just reset the connection status so they can connect again (but maybe not earn points again if that's the rule, or earn again?)
      // Assuming "reset" means they can connect again. If points should be deducted, we subtract.
      // Let's keep points but allow re-connection flow.
      
      const updatedUser = {
        ...userData,
        socialConnections: {
          ...userData.socialConnections,
          [platform]: false
        },
        completedTasks: newCompletedTasks // Remove from completed tasks so button shows "Connect" again
      };
      
      rewardsStorage.saveUserData(address, updatedUser);
      setUserData(updatedUser);
    }
  };

  const handleSocialPost = () => {
    // JST 00:00 Reset Logic
    const jstDate = rewardsStorage.getJSTDateString();
    const taskId = `post-twitter-${jstDate}`;
    
    window.open('https://twitter.com/intent/tweet?text=Trading%20on%20PerpX!%20%23PerpX&url=https://perpx.com', '_blank');
    
    // In production, verify via API
    setTimeout(() => {
      if (!userData?.completedTasks.includes(taskId)) {
        handleTaskComplete(taskId, 100);
      } else {
        alert("You have already claimed today's post reward! Resets at 00:00 JST.");
      }
    }, 5000);
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
      isSocial: false
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
      platform: 'twitter'
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
      platform: 'discord'
    },
    {
      id: `post-twitter-${rewardsStorage.getJSTDateString()}`, // Daily dynamic ID based on JST
      title: 'Post on X',
      description: 'Share your trading journey on X (Daily)',
      points: 100,
      icon: Twitter,
      action: handleSocialPost,
      buttonText: 'Post Now',
      category: 'daily',
      isSocial: false
    }
  ];

  const renderTask = (task: any) => {
    const isCompleted = userData?.completedTasks.includes(task.id);
    const TaskIcon = task.icon || Star;

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
              <div className="text-primary font-bold">+{task.points} Points</div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={task.action}
            disabled={isCompleted || loading || (task.id === 'connect-wallet')}
            className={`flex-1 ${
              isCompleted
                ? 'bg-green-500/20 text-green-500 cursor-not-allowed'
                : 'neuro-button micro-bounce'
            }`}
          >
            {loading ? 'Processing...' : isCompleted ? 'Connected' : task.buttonText}
          </Button>
          
          {/* Disconnect Button for Social Tasks */}
          {task.isSocial && isCompleted && (
            <Button
              onClick={task.disconnectAction}
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

      {isConnected && userData && (
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Rewards Center</h1>
            <p className="text-white/60">Complete tasks to earn points and unlock exclusive benefits.</p>
          </div>

          {/* Total Points */}
          <div className="glass-card rounded-xl p-8 mb-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10 animate-pulse-slow"></div>
            <div className="relative z-10">
              <div className="text-sm text-white/60 mb-2">Total Points</div>
              <div className="text-5xl sm:text-6xl font-bold text-white mb-4 tracking-tight">
                {userData.points.toLocaleString()} <span className="text-2xl text-primary">PTS</span>
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
    </div>
  );
}
