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
  Wallet
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
      
      // Show success message (could be a toast)
      alert(`Task completed! +${points} Points`);
    }, 1000);
  };

  const handleSocialConnect = (platform: 'twitter' | 'discord') => {
    // Simulate OAuth flow
    const width = 600;
    const height = 400;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    
    const popup = window.open(
      '', 
      'Connect', 
      `width=${width},height=${height},top=${top},left=${left}`
    );
    
    if (popup) {
      popup.document.write(`
        <html>
          <body style="background:#1a1a1a;color:white;display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;">
            <h2>Connecting to ${platform}...</h2>
            <p>Please wait...</p>
          </body>
        </html>
      `);
      
      setTimeout(() => {
        popup.close();
        handleTaskComplete(`connect-${platform}`, 100);
      }, 1500);
    }
  };

  const handleSocialPost = () => {
    window.open('https://twitter.com/intent/tweet?text=Trading%20on%20PerpX!%20%23PerpX&url=https://perpx.com', '_blank');
    
    // In production, this would need verification via API
    setTimeout(() => {
      // Allow multiple completions for daily posts? 
      // Requirement says "100P per post", assuming daily limit or unique posts
      // For now, we'll use a timestamp-based ID to allow multiple
      const today = new Date().toISOString().split('T')[0];
      const taskId = `post-twitter-${today}`;
      
      if (!userData?.completedTasks.includes(taskId)) {
        handleTaskComplete(taskId, 100);
      } else {
        alert("You have already claimed today's post reward!");
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
      action: () => {}, // Handled automatically on connection
      buttonText: 'Connected',
      category: 'onboarding'
    },
    {
      id: 'connect-twitter',
      title: 'Connect X (Twitter)',
      description: 'Link your X account to earn points',
      points: 100,
      icon: Twitter,
      action: () => handleSocialConnect('twitter'),
      buttonText: 'Connect X',
      category: 'social'
    },
    {
      id: 'connect-discord',
      title: 'Connect Discord',
      description: 'Link your Discord account to earn points',
      points: 100,
      icon: MessageCircle,
      action: () => handleSocialConnect('discord'),
      buttonText: 'Connect Discord',
      category: 'social'
    },
    {
      id: `post-twitter-${new Date().toISOString().split('T')[0]}`, // Daily dynamic ID
      title: 'Post on X',
      description: 'Share your trading journey on X (Daily)',
      points: 100,
      icon: Twitter,
      action: handleSocialPost,
      buttonText: 'Post Now',
      category: 'daily'
    }
  ];

  const renderTask = (task: any) => {
    const isCompleted = userData?.completedTasks.includes(task.id);
    const TaskIcon = task.icon || Star;

    return (
      <Card key={task.id} className="glass-card p-6 hover-reveal">
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
        <Button
          onClick={task.action}
          disabled={isCompleted || loading || (task.id === 'connect-wallet')}
          className={`w-full ${
            isCompleted
              ? 'bg-green-500/20 text-green-500 cursor-not-allowed'
              : 'neuro-button micro-bounce'
          }`}
        >
          {loading ? 'Processing...' : isCompleted ? 'Completed' : task.buttonText}
        </Button>
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
