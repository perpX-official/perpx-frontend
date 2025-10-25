import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { 
  Gift, 
  Trophy, 
  Star, 
  Zap, 
  CheckCircle2, 
  Circle,
  Twitter,
  MessageCircle,
  Users
} from "lucide-react";

export default function Rewards() {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  const handleTaskComplete = (taskId: string) => {
    setCompletedTasks(prev => new Set(Array.from(prev).concat(taskId)));
  };

  const handleLogin = () => {
    handleTaskComplete('daily-login');
    alert('ログイン完了！1ポイント獲得しました。');
  };

  const handleDemoTrade = () => {
    handleTaskComplete('daily-demo');
    alert('デモ取引完了！5ポイント獲得しました。');
  };

  const handleSocialPost = (platform: string) => {
    const urls: Record<string, string> = {
      twitter: 'https://twitter.com/intent/tweet?text=PerpXで取引を始めました！&url=https://perpx.com',
      telegram: 'https://t.me/share/url?url=https://perpx.com&text=PerpXで取引を始めました！',
    };
    
    window.open(urls[platform], '_blank');
    
    // 投稿後にタスク完了とする（実際にはバックエンドで確認が必要）
    setTimeout(() => {
      handleTaskComplete(`daily-sns-${platform}`);
      alert('SNS投稿完了！5ポイント獲得しました。');
    }, 2000);
  };

  const handleWeeklyLogin = () => {
    handleTaskComplete('weekly-login');
    alert('7日連続ログイン達成！10ポイント獲得しました。');
  };

  const handleCommunityJoin = (platform: string) => {
    const urls: Record<string, string> = {
      discord: 'https://discord.gg/perpx',
      telegram: 'https://t.me/perpx',
    };
    
    window.open(urls[platform], '_blank');
    
    setTimeout(() => {
      handleTaskComplete(`weekly-community-${platform}`);
      alert(`${platform === 'discord' ? 'Discord' : 'Telegram'}参加完了！30ポイント獲得しました。`);
    }, 2000);
  };

  const handleGuildJoin = () => {
    handleTaskComplete('special-guild');
    alert('ギルド参加完了！50ポイント獲得しました（一回限り）。');
  };

  const dailyTasks = [
    {
      id: 'daily-login',
      title: 'ログインボーナス',
      description: '毎日ログインして報酬を獲得',
      points: 1,
      action: handleLogin,
      buttonText: 'ログイン',
    },
    {
      id: 'daily-demo',
      title: 'デモ取引を3回実行',
      description: '学習モードで3回取引を体験',
      points: 5,
      action: handleDemoTrade,
      buttonText: '取引する',
    },
    {
      id: 'daily-sns-twitter',
      title: 'X (Twitter) に投稿',
      description: 'PerpXについてツイート',
      points: 5,
      action: () => handleSocialPost('twitter'),
      buttonText: '投稿する',
      icon: Twitter,
    },
  ];

  const weeklyTasks = [
    {
      id: 'weekly-login',
      title: '7日連続ログイン',
      description: '1週間毎日ログインして特別報酬を獲得',
      points: 10,
      action: handleWeeklyLogin,
      buttonText: '報酬を受け取る',
    },
    {
      id: 'weekly-community-discord',
      title: 'Discordに参加',
      description: '公式Discordサーバーに参加',
      points: 30,
      action: () => handleCommunityJoin('discord'),
      buttonText: '参加する',
      icon: MessageCircle,
    },
    {
      id: 'weekly-community-telegram',
      title: 'Telegramに参加',
      description: '公式Telegramグループに参加',
      points: 30,
      action: () => handleCommunityJoin('telegram'),
      buttonText: '参加する',
      icon: MessageCircle,
    },
  ];

  const specialTasks = [
    {
      id: 'special-guild',
      title: 'ギルドに参加',
      description: 'ギルドに参加して特別報酬を獲得（一回限り）',
      points: 50,
      action: handleGuildJoin,
      buttonText: 'ギルドに参加',
      icon: Users,
      oneTime: true,
    },
  ];

  const calculateDailyPoints = () => {
    return dailyTasks.reduce((sum, task) => {
      return sum + (completedTasks.has(task.id) ? task.points : 0);
    }, 0);
  };

  const calculateWeeklyPoints = () => {
    return weeklyTasks.reduce((sum, task) => {
      return sum + (completedTasks.has(task.id) ? task.points : 0);
    }, 0);
  };

  const calculateSpecialPoints = () => {
    return specialTasks.reduce((sum, task) => {
      return sum + (completedTasks.has(task.id) ? task.points : 0);
    }, 0);
  };

  const totalPoints = calculateDailyPoints() + calculateWeeklyPoints() + calculateSpecialPoints();

  const renderTask = (task: any) => {
    const isCompleted = completedTasks.has(task.id);
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
              <div className="text-primary font-bold">+{task.points} ポイント</div>
            </div>
          </div>
        </div>
        <Button
          onClick={task.action}
          disabled={isCompleted}
          className={`w-full ${
            isCompleted
              ? 'bg-green-500/20 text-green-500 cursor-not-allowed'
              : 'neuro-button micro-bounce'
          }`}
        >
          {isCompleted ? '完了' : task.buttonText}
        </Button>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">ポイント獲得</h1>
          <p className="text-white/60">タスクをこなしてポイントを貯めよう</p>
        </div>

        {/* Total Points */}
        <div className="glass-card rounded-xl p-8 mb-8 text-center">
          <div className="text-sm text-white/60 mb-2">今日の獲得ポイント</div>
          <div className="text-4xl sm:text-5xl font-bold text-white mb-4">{totalPoints} pt</div>
          <div className="text-sm text-green-500 mb-2">≈ ${totalPoints} USD</div>
          <div className="text-xs text-white/60">
            デイリー: {calculateDailyPoints()}pt | ウィークリー: {calculateWeeklyPoints()}pt | 特別: {calculateSpecialPoints()}pt
          </div>
        </div>

        {/* Daily Tasks */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-white">デイリータスク</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dailyTasks.map(renderTask)}
          </div>
          <div className="mt-4 text-sm text-white/60">
            月間獲得可能: {dailyTasks.reduce((sum, t) => sum + t.points, 0) * 30} ポイント
          </div>
        </div>

        {/* Weekly Tasks */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-white">ウィークリータスク</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {weeklyTasks.map(renderTask)}
          </div>
          <div className="mt-4 text-sm text-white/60">
            月間獲得可能: {weeklyTasks.reduce((sum, t) => sum + t.points, 0) * 4} ポイント
          </div>
        </div>

        {/* Special Tasks */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Gift className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-white">特別タスク</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialTasks.map(renderTask)}
          </div>
        </div>

        {/* Reward History */}
        <div className="glass-card rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">獲得履歴</h2>
          <div className="space-y-4">
            {Array.from(completedTasks).map((taskId, index) => {
              const task = [...dailyTasks, ...weeklyTasks, ...specialTasks].find(t => t.id === taskId);
              if (!task) return null;
              
              return (
                <div key={index} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                  <div>
                    <div className="text-white font-medium">{task.title}</div>
                    <div className="text-sm text-white/60">{new Date().toLocaleDateString('ja-JP')}</div>
                  </div>
                  <div className="text-green-500 font-bold">+{task.points} pt</div>
                </div>
              );
            })}
            {completedTasks.size === 0 && (
              <div className="text-sm text-white/60 text-center py-8">
                まだタスクを完了していません
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

