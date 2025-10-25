import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
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
  const { t } = useLanguage();
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  const handleTaskComplete = (taskId: string) => {
    setCompletedTasks(prev => new Set(Array.from(prev).concat(taskId)));
  };

  const handleLogin = () => {
    handleTaskComplete('daily-login');
    alert(`${t('rewards.loginBonus')} ${t('rewards.completed')}! 1 ${t('rewards.points')}`);
  };

  const handleDemoTrade = () => {
    handleTaskComplete('daily-demo');
    alert(`${t('rewards.demoTrade')} ${t('rewards.completed')}! 5 ${t('rewards.points')}`);
  };

  const handleSocialPost = (platform: string) => {
    const urls: Record<string, string> = {
      twitter: 'https://twitter.com/intent/tweet?text=PerpX&url=https://perpx.com',
      telegram: 'https://t.me/share/url?url=https://perpx.com&text=PerpX',
    };
    
    window.open(urls[platform], '_blank');
    
    setTimeout(() => {
      handleTaskComplete(`daily-sns-${platform}`);
      alert(`SNS ${t('rewards.post')} ${t('rewards.completed')}! 5 ${t('rewards.points')}`);
    }, 2000);
  };

  const handleWeeklyLogin = () => {
    handleTaskComplete('weekly-login');
    alert(`${t('rewards.weeklyLogin')} ${t('rewards.completed')}! 10 ${t('rewards.points')}`);
  };

  const handleCommunityJoin = (platform: string) => {
    const urls: Record<string, string> = {
      discord: 'https://discord.gg/perpx',
      telegram: 'https://t.me/perpx',
    };
    
    window.open(urls[platform], '_blank');
    
    setTimeout(() => {
      handleTaskComplete(`weekly-community-${platform}`);
      alert(`${platform === 'discord' ? 'Discord' : 'Telegram'} ${t('rewards.join')} ${t('rewards.completed')}! 30 ${t('rewards.points')}`);
    }, 2000);
  };

  const handleGuildJoin = () => {
    handleTaskComplete('special-guild');
    alert(`${t('rewards.joinGuild')} ${t('rewards.completed')}! 50 ${t('rewards.points')} (${t('rewards.oneTime')})`);
  };

  const dailyTasks = [
    {
      id: 'daily-login',
      title: t('rewards.loginBonus'),
      description: t('rewards.loginBonusDesc'),
      points: 1,
      action: handleLogin,
      buttonText: t('rewards.login'),
    },
    {
      id: 'daily-demo',
      title: t('rewards.demoTrade'),
      description: t('rewards.demoTradeDesc'),
      points: 5,
      action: handleDemoTrade,
      buttonText: t('rewards.trade'),
    },
    {
      id: 'daily-sns-twitter',
      title: t('rewards.socialPost'),
      description: t('rewards.socialPostDesc'),
      points: 5,
      action: () => handleSocialPost('twitter'),
      buttonText: t('rewards.post'),
      icon: Twitter,
    },
  ];

  const weeklyTasks = [
    {
      id: 'weekly-login',
      title: t('rewards.weeklyLogin'),
      description: t('rewards.weeklyLoginDesc'),
      points: 10,
      action: handleWeeklyLogin,
      buttonText: t('rewards.claim'),
    },
    {
      id: 'weekly-community-discord',
      title: t('rewards.joinDiscord'),
      description: t('rewards.joinDiscordDesc'),
      points: 30,
      action: () => handleCommunityJoin('discord'),
      buttonText: t('rewards.join'),
      icon: MessageCircle,
    },
    {
      id: 'weekly-community-telegram',
      title: t('rewards.joinTelegram'),
      description: t('rewards.joinTelegramDesc'),
      points: 30,
      action: () => handleCommunityJoin('telegram'),
      buttonText: t('rewards.join'),
      icon: MessageCircle,
    },
  ];

  const specialTasks = [
    {
      id: 'special-guild',
      title: t('rewards.joinGuild'),
      description: t('rewards.joinGuildDesc'),
      points: 50,
      action: handleGuildJoin,
      buttonText: t('rewards.join'),
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
              <Trophy className="w-10 h-10 text-primary" />
              {t('rewards.title')}
            </h1>
            <div className="flex items-center justify-center gap-2 text-2xl font-semibold">
              <Star className="w-6 h-6 text-yellow-500" />
              <span>{t('rewards.totalPoints')}: {totalPoints} {t('rewards.points')}</span>
            </div>
          </div>

          {/* Daily Tasks */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6 text-primary" />
              {t('rewards.dailyTasks')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {dailyTasks.map((task) => {
                const isCompleted = completedTasks.has(task.id);
                const Icon = task.icon || Gift;
                return (
                  <Card key={task.id} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{task.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{task.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-bold">+{task.points} {t('rewards.points')}</span>
                      <Button
                        onClick={task.action}
                        disabled={isCompleted}
                        size="sm"
                        variant={isCompleted ? "outline" : "default"}
                      >
                        {isCompleted ? t('rewards.completed') : task.buttonText}
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Weekly Tasks */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-primary" />
              {t('rewards.weeklyTasks')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {weeklyTasks.map((task) => {
                const isCompleted = completedTasks.has(task.id);
                const Icon = task.icon || Gift;
                return (
                  <Card key={task.id} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{task.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{task.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-bold">+{task.points} {t('rewards.points')}</span>
                      <Button
                        onClick={task.action}
                        disabled={isCompleted}
                        size="sm"
                        variant={isCompleted ? "outline" : "default"}
                      >
                        {isCompleted ? t('rewards.completed') : task.buttonText}
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Special Tasks */}
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500" />
              {t('rewards.specialTasks')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {specialTasks.map((task) => {
                const isCompleted = completedTasks.has(task.id);
                const Icon = task.icon || Gift;
                return (
                  <Card key={task.id} className="p-6 hover:shadow-lg transition-shadow border-2 border-yellow-500/50">
                    <div className="flex items-start justify-between mb-4">
                      <Icon className="w-8 h-8 text-yellow-500" />
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{task.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{task.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-yellow-500 font-bold">+{task.points} {t('rewards.points')}</span>
                      <Button
                        onClick={task.action}
                        disabled={isCompleted}
                        size="sm"
                        variant={isCompleted ? "outline" : "default"}
                      >
                        {isCompleted ? t('rewards.completed') : task.buttonText}
                      </Button>
                    </div>
                    {task.oneTime && (
                      <div className="mt-2 text-xs text-yellow-600 font-medium">
                        ⭐ {t('rewards.oneTime')}
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

