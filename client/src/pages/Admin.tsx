import { useState, useEffect, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Users,
  Coins,
  Twitter,
  MessageCircle,
  TrendingUp,
  Search,
  ChevronLeft,
  ChevronRight,
  Lock,
  Eye,
  EyeOff,
  RefreshCw,
  Loader2,
  ArrowUpDown,
  Plus,
  Minus,
  ExternalLink,
  FileText,
  BarChart3,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [tweetPage, setTweetPage] = useState(1);
  const [sortBy, setSortBy] = useState<"totalPoints" | "createdAt">("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [activityPeriod, setActivityPeriod] = useState<"daily" | "weekly" | "monthly" | "yearly" | "all">("daily");
  
  // Points adjustment dialog
  const [adjustDialogOpen, setAdjustDialogOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [pointsChange, setPointsChange] = useState<number>(0);
  const [adjustReason, setAdjustReason] = useState("");

  // Check session storage for auth
  useEffect(() => {
    const stored = sessionStorage.getItem("admin_authenticated");
    if (stored === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // API calls
  const verifyPassword = trpc.admin.verifyPassword.useMutation({
    onSuccess: (data) => {
      if (data.valid) {
        setIsAuthenticated(true);
        sessionStorage.setItem("admin_authenticated", "true");
        setAuthError("");
      } else {
        setAuthError("Invalid password");
      }
    },
  });

  const { data: stats, isLoading: statsLoading, refetch: refetchStats } = trpc.admin.getStats.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  const { data: usersData, isLoading: usersLoading, refetch: refetchUsers } = trpc.admin.getUsers.useQuery(
    { page, limit: 20, sortBy, sortOrder },
    { enabled: isAuthenticated }
  );

  const { data: searchResults, isLoading: searchLoading } = trpc.admin.searchUsers.useQuery(
    { query: searchQuery, limit: 20 },
    { enabled: isAuthenticated && searchQuery.length > 2 }
  );

  const { data: dailyPostsData, isLoading: dailyPostsLoading, refetch: refetchDailyPosts } = trpc.admin.getDailyPosts.useQuery(
    { page: tweetPage, limit: 20 },
    { enabled: isAuthenticated }
  );

  const { data: activityStats, isLoading: activityLoading, refetch: refetchActivity } = trpc.admin.getActivityStats.useQuery(
    undefined,
    { enabled: isAuthenticated }
  );

  const adjustPoints = trpc.admin.adjustPoints.useMutation({
    onSuccess: () => {
      setAdjustDialogOpen(false);
      setSelectedWallet(null);
      setPointsChange(0);
      setAdjustReason("");
      refetchUsers();
      refetchStats();
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    verifyPassword.mutate({ password });
  };

  const handleAdjustPoints = () => {
    if (!selectedWallet || pointsChange === 0 || !adjustReason) return;
    adjustPoints.mutate({
      walletAddress: selectedWallet,
      pointsChange,
      reason: adjustReason,
    });
  };

  const displayUsers = searchQuery.length > 2 ? searchResults : usersData?.profiles;

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="glass-card p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-white/60">Enter password to access</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="bg-white/5 border-white/20 text-white pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {authError && (
              <p className="text-red-500 text-sm text-center">{authError}</p>
            )}

            <Button
              type="submit"
              className="w-full neuro-button"
              disabled={verifyPassword.isPending}
            >
              {verifyPassword.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Login
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-white/60">Manage users and rewards</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                refetchStats();
                refetchUsers();
                refetchDailyPosts();
                refetchActivity();
              }}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                sessionStorage.removeItem("admin_authenticated");
                setIsAuthenticated(false);
              }}
              className="border-red-500/50 text-red-500 hover:bg-red-500/10"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="glass-card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-white">
                  {statsLoading ? "..." : stats?.totalUsers.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Coins className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Total Points</p>
                <p className="text-2xl font-bold text-white">
                  {statsLoading ? "..." : stats?.totalPointsDistributed.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-sky-500/20 flex items-center justify-center">
                <Twitter className="h-6 w-6 text-sky-500" />
              </div>
              <div>
                <p className="text-white/60 text-sm">X Connected</p>
                <p className="text-2xl font-bold text-white">
                  {statsLoading ? "..." : stats?.xConnectedCount.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <MessageCircle className="h-6 w-6 text-indigo-500" />
              </div>
              <div>
                <p className="text-white/60 text-sm">Discord Connected</p>
                <p className="text-2xl font-bold text-white">
                  {statsLoading ? "..." : stats?.discordConnectedCount.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Chain Stats */}
        {stats?.chainStats && (
          <Card className="glass-card p-6 mb-8">
            <h3 className="text-lg font-bold text-white mb-4">Users by Chain</h3>
            <div className="flex gap-6">
              {Object.entries(stats.chainStats).map(([chain, count]) => (
                <div key={chain} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${
                    chain === "evm" ? "bg-blue-500" :
                    chain === "tron" ? "bg-red-500" :
                    "bg-purple-500"
                  }`} />
                  <span className="text-white/60 capitalize">{chain}:</span>
                  <span className="text-white font-medium">{count}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Tabs for Users, Tweet Verification, and Activity */}
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList className="bg-white/5 border border-white/10">
            <TabsTrigger value="users" className="data-[state=active]:bg-primary/20">
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="tweets" className="data-[state=active]:bg-primary/20">
              <FileText className="h-4 w-4 mr-2" />
              Tweet Verification
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-primary/20">
              <BarChart3 className="h-4 w-4 mr-2" />
              Activity
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Users</h3>
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <Input
                      type="text"
                      placeholder="Search by wallet or username..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-white/5 border-white/20 text-white w-64"
                    />
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSortBy(sortBy === "totalPoints" ? "createdAt" : "totalPoints");
                    }}
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    Sort by {sortBy === "totalPoints" ? "Date" : "Points"}
                  </Button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-white/60 font-medium">Wallet</th>
                      <th className="text-left py-3 px-4 text-white/60 font-medium">Chain</th>
                      <th className="text-left py-3 px-4 text-white/60 font-medium">Points</th>
                      <th className="text-left py-3 px-4 text-white/60 font-medium">X</th>
                      <th className="text-left py-3 px-4 text-white/60 font-medium">Discord</th>
                      <th className="text-left py-3 px-4 text-white/60 font-medium">Daily Tasks</th>
                      <th className="text-left py-3 px-4 text-white/60 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(usersLoading || searchLoading) ? (
                      <tr>
                        <td colSpan={7} className="text-center py-8">
                          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
                        </td>
                      </tr>
                    ) : displayUsers?.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-8 text-white/60">
                          No users found
                        </td>
                      </tr>
                    ) : (
                      displayUsers?.map((user: any) => (
                        <tr key={user.walletAddress} className="border-b border-white/5 hover:bg-white/5">
                          <td className="py-3 px-4">
                            <span className="text-white font-mono text-sm">
                              {user.walletAddress.slice(0, 6)}...{user.walletAddress.slice(-4)}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              user.chainType === "evm" ? "bg-blue-500/20 text-blue-400" :
                              user.chainType === "tron" ? "bg-red-500/20 text-red-400" :
                              "bg-purple-500/20 text-purple-400"
                            }`}>
                              {user.chainType.toUpperCase()}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-primary font-bold">{user.totalPoints.toLocaleString()}</span>
                          </td>
                          <td className="py-3 px-4">
                            {user.xConnected && user.xUsername ? (
                              <a
                                href={`https://x.com/${user.xUsername}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sky-400 hover:underline inline-flex items-center gap-1"
                              >
                                @{user.xUsername}
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            ) : (
                              <span className="text-white/40">-</span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            {user.discordConnected && user.discordUsername ? (
                              <a
                                href={`https://discord.com/users/${user.discordUsername}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-indigo-400 hover:underline inline-flex items-center gap-1"
                              >
                                {user.discordUsername}
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            ) : (
                              <span className="text-white/40">-</span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-white/80">{user.dailyTaskCount || 0}</span>
                          </td>
                          <td className="py-3 px-4">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedWallet(user.walletAddress);
                                setAdjustDialogOpen(true);
                              }}
                              className="border-white/20 text-white hover:bg-white/10"
                            >
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Adjust
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {usersData?.pagination && searchQuery.length <= 2 && (
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
                  <p className="text-white/60 text-sm">
                    Page {usersData.pagination.page} of {usersData.pagination.totalPages} 
                    ({usersData.pagination.totalCount} total)
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(p => Math.min(usersData.pagination.totalPages, p + 1))}
                      disabled={page >= usersData.pagination.totalPages}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Tweet Verification Tab */}
          <TabsContent value="tweets">
            <Card className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Daily Post Submissions</h3>
                <p className="text-white/60 text-sm">
                  Verify user tweets mentioning @perpXFi
                </p>
              </div>

              {/* Tweet Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-white/60 font-medium">Date</th>
                      <th className="text-left py-3 px-4 text-white/60 font-medium">Wallet</th>
                      <th className="text-left py-3 px-4 text-white/60 font-medium">X Username</th>
                      <th className="text-left py-3 px-4 text-white/60 font-medium">Points</th>
                      <th className="text-left py-3 px-4 text-white/60 font-medium">Tweet URL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dailyPostsLoading ? (
                      <tr>
                        <td colSpan={5} className="text-center py-8">
                          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
                        </td>
                      </tr>
                    ) : dailyPostsData?.completions?.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-8 text-white/60">
                          No daily post submissions yet
                        </td>
                      </tr>
                    ) : (
                      dailyPostsData?.completions?.map((post: any) => (
                        <tr key={post.id} className="border-b border-white/5 hover:bg-white/5">
                          <td className="py-3 px-4">
                            <span className="text-white/80 text-sm">
                              {post.completionDate}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-white font-mono text-sm">
                              {post.walletAddress.slice(0, 6)}...{post.walletAddress.slice(-4)}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            {post.xUsername ? (
                              <a 
                                href={`https://x.com/${post.xUsername}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sky-400 hover:underline"
                              >
                                @{post.xUsername}
                              </a>
                            ) : (
                              <span className="text-white/40">-</span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-primary font-bold">+{post.pointsAwarded}</span>
                          </td>
                          <td className="py-3 px-4">
                            {post.tweetUrl ? (
                              <a
                                href={post.tweetUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-sky-400 hover:underline"
                              >
                                <ExternalLink className="h-3 w-3" />
                                View Tweet
                              </a>
                            ) : (
                              <span className="text-white/40">No URL provided</span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {dailyPostsData?.pagination && (
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
                  <p className="text-white/60 text-sm">
                    Page {dailyPostsData.pagination.page} of {dailyPostsData.pagination.totalPages} 
                    ({dailyPostsData.pagination.totalCount} total)
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setTweetPage(p => Math.max(1, p - 1))}
                      disabled={tweetPage === 1}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setTweetPage(p => Math.min(dailyPostsData.pagination.totalPages, p + 1))}
                      disabled={tweetPage >= dailyPostsData.pagination.totalPages}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity">
            <Card className="glass-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">User Activity</h3>
                <div className="flex gap-2">
                  {(["daily", "weekly", "monthly", "yearly", "all"] as const).map((period) => (
                    <Button
                      key={period}
                      variant={activityPeriod === period ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActivityPeriod(period)}
                      className={activityPeriod === period 
                        ? "bg-primary text-white" 
                        : "border-white/20 text-white hover:bg-white/10"
                      }
                    >
                      {period === "daily" ? "Day" : 
                       period === "weekly" ? "Week" : 
                       period === "monthly" ? "Month" : 
                       period === "yearly" ? "Year" : "All"}
                    </Button>
                  ))}
                </div>
              </div>

              {activityLoading ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : activityStats ? (
                <div className="space-y-8">
                  {/* New Users Line Chart */}
                  <div>
                    <h4 className="text-white/80 font-medium mb-4">New Users (Line Chart)</h4>
                    <div className="h-64 bg-white/5 rounded-lg p-4">
                      <UserLineChart 
                        data={activityStats} 
                        period={activityPeriod} 
                      />
                    </div>
                  </div>

                  {/* Task Completion Rate Pie Chart */}
                  <div>
                    <h4 className="text-white/80 font-medium mb-4">Task Completion Rate</h4>
                    <div className="h-64 bg-white/5 rounded-lg p-4 flex items-center justify-center">
                      <TaskCompletionPieChart 
                        totalUsers={activityStats.allTime?.totalUsers || 0}
                        taskParticipants={activityStats.allTime?.totalTaskCompletions || 0}
                      />
                    </div>
                  </div>

                  {/* Summary Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-white/5 p-4">
                      <p className="text-white/60 text-sm">All-Time Users</p>
                      <p className="text-2xl font-bold text-white">
                        {activityStats.allTime?.totalUsers?.toLocaleString() || 0}
                      </p>
                    </Card>
                    <Card className="bg-white/5 p-4">
                      <p className="text-white/60 text-sm">Task Completion Rate</p>
                      <p className="text-2xl font-bold text-white">
                        {activityStats.allTime?.totalUsers > 0 
                          ? ((activityStats.allTime?.totalTaskCompletions / activityStats.allTime?.totalUsers) * 100).toFixed(1)
                          : 0}%
                      </p>
                    </Card>
                  </div>
                </div>
              ) : (
                <p className="text-white/60 text-center py-8">No activity data available</p>
              )}
            </Card>
          </TabsContent>
        </Tabs>

        {/* Points Adjustment Dialog */}
        <Dialog open={adjustDialogOpen} onOpenChange={setAdjustDialogOpen}>
          <DialogContent className="bg-[#1a1a1a] border-white/10">
            <DialogHeader>
              <DialogTitle className="text-white">Adjust Points</DialogTitle>
              <DialogDescription className="text-white/60">
                Wallet: {selectedWallet?.slice(0, 10)}...{selectedWallet?.slice(-6)}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div>
                <label className="text-white/60 text-sm mb-2 block">Points Change</label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPointsChange(p => p - 100)}
                    className="border-red-500/50 text-red-500 hover:bg-red-500/10"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={pointsChange}
                    onChange={(e) => setPointsChange(parseInt(e.target.value) || 0)}
                    className="bg-white/5 border-white/20 text-white text-center"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPointsChange(p => p + 100)}
                    className="border-green-500/50 text-green-500 hover:bg-green-500/10"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <label className="text-white/60 text-sm mb-2 block">Reason</label>
                <Input
                  type="text"
                  value={adjustReason}
                  onChange={(e) => setAdjustReason(e.target.value)}
                  placeholder="Enter reason for adjustment..."
                  className="bg-white/5 border-white/20 text-white"
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setAdjustDialogOpen(false)}
                className="border-white/20 text-white hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAdjustPoints}
                disabled={pointsChange === 0 || !adjustReason || adjustPoints.isPending}
                className={pointsChange > 0 ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
              >
                {adjustPoints.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                {pointsChange > 0 ? `Add ${pointsChange}` : `Remove ${Math.abs(pointsChange)}`} Points
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

// User Line Chart Component with dynamic Y-axis scaling
interface UserLineChartProps {
  data: {
    daily: {
      users: Array<{ date: string; newUsers: number }>;
      tasks: Array<{ date: string | null; completions: number }>;
    };
    monthly: {
      users: Array<{ month: string; newUsers: number }>;
      tasks: Array<{ month: string; completions: number }>;
    };
    allTime: { totalUsers: number; totalTaskCompletions: number };
  };
  period: "daily" | "weekly" | "monthly" | "yearly" | "all";
}

function UserLineChart({ data, period }: UserLineChartProps) {
  const chartData = useMemo(() => {
    if (period === "all") {
      return [{ label: "All Time", value: data.allTime.totalUsers }];
    }

    if (period === "yearly") {
      return data.monthly.users.map(item => ({
        label: item.month,
        value: item.newUsers
      }));
    }

    const sourceData = data.daily.users;
    let filteredData = sourceData;

    if (period === "daily") {
      filteredData = sourceData.slice(-7);
    } else if (period === "weekly") {
      filteredData = sourceData.slice(-14);
    } else if (period === "monthly") {
      filteredData = sourceData.slice(-30);
    }

    return filteredData.map(item => ({
      label: item.date ? String(item.date).slice(-5) : '',
      value: item.newUsers
    }));
  }, [data, period]);

  // Dynamic Y-axis calculation: round up to nearest nice number
  const maxValue = Math.max(...chartData.map(d => d.value), 1);
  const getYAxisMax = (max: number) => {
    if (max <= 5) return 5;
    if (max <= 10) return 10;
    if (max <= 20) return 20;
    if (max <= 50) return 50;
    if (max <= 100) return 100;
    if (max <= 200) return 200;
    if (max <= 500) return 500;
    if (max <= 1000) return 1000;
    return Math.ceil(max / 500) * 500;
  };
  const yAxisMax = getYAxisMax(maxValue);
  const yAxisSteps = [0, Math.round(yAxisMax / 4), Math.round(yAxisMax / 2), Math.round(yAxisMax * 3 / 4), yAxisMax];

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-white/40">
        No data available for this period
      </div>
    );
  }

  // Calculate SVG path for line chart
  const width = 100;
  const height = 100;
  const padding = 10;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  
  const points = chartData.map((item, index) => {
    const x = padding + (chartWidth / (chartData.length - 1 || 1)) * index;
    const y = padding + chartHeight - (item.value / yAxisMax) * chartHeight;
    return { x, y, value: item.value, label: item.label };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1]?.x || padding} ${padding + chartHeight} L ${padding} ${padding + chartHeight} Z`;

  return (
    <div className="relative h-full w-full flex">
      {/* Y-axis labels */}
      <div className="flex flex-col justify-between h-full pr-2 text-[10px] text-white/40">
        {yAxisSteps.reverse().map((step, i) => (
          <span key={i}>{step}</span>
        ))}
      </div>
      
      {/* Chart area */}
      <div className="flex-1 relative">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="none">
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
            <line
              key={i}
              x1={padding}
              y1={padding + chartHeight * ratio}
              x2={width - padding}
              y2={padding + chartHeight * ratio}
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="0.5"
            />
          ))}
          
          {/* Area fill */}
          <path d={areaPath} fill="url(#lineGradient)" opacity="0.3" />
          
          {/* Line */}
          <path d={linePath} fill="none" stroke="#0ABAB5" strokeWidth="2" />
          
          {/* Data points */}
          {points.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="3" fill="#0ABAB5" />
          ))}
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0ABAB5" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* X-axis labels */}
        <div className="flex justify-between text-[10px] text-white/40 mt-1">
          {chartData.map((item, i) => (
            <span key={i} className="truncate" style={{ width: `${100 / chartData.length}%`, textAlign: 'center' }}>
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Task Completion Pie Chart Component
interface TaskCompletionPieChartProps {
  totalUsers: number;
  taskParticipants: number;
}

function TaskCompletionPieChart({ totalUsers, taskParticipants }: TaskCompletionPieChartProps) {
  const completionRate = totalUsers > 0 ? (taskParticipants / totalUsers) * 100 : 0;
  const nonCompletionRate = 100 - completionRate;
  
  // SVG pie chart calculations
  const size = 200;
  const center = size / 2;
  const radius = 70;
  const innerRadius = 45; // For donut chart effect
  
  // Calculate arc paths
  const completedAngle = (completionRate / 100) * 360;
  const startAngle = -90; // Start from top
  
  const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad)
    };
  };
  
  const describeArc = (cx: number, cy: number, r: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
  };
  
  const completedPath = describeArc(center, center, radius, startAngle, startAngle + completedAngle);
  const remainingPath = describeArc(center, center, radius, startAngle + completedAngle, startAngle + 360);

  return (
    <div className="flex items-center gap-8">
      {/* Pie Chart */}
      <div className="relative">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Background circle */}
          <circle cx={center} cy={center} r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="25" />
          
          {/* Completed arc (green) */}
          {completionRate > 0 && (
            <path
              d={completedPath}
              fill="none"
              stroke="#0ABAB5"
              strokeWidth="25"
              strokeLinecap="round"
            />
          )}
          
          {/* Remaining arc (gray) */}
          {nonCompletionRate > 0 && completionRate < 100 && (
            <path
              d={remainingPath}
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="25"
              strokeLinecap="round"
            />
          )}
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-white">{completionRate.toFixed(1)}%</span>
          <span className="text-xs text-white/60">Completion Rate</span>
        </div>
      </div>
      
      {/* Legend */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-[#0ABAB5]"></div>
          <div>
            <p className="text-sm text-white">Completed Tasks</p>
            <p className="text-xs text-white/60">{taskParticipants.toLocaleString()} users</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-white/20"></div>
          <div>
            <p className="text-sm text-white">No Tasks</p>
            <p className="text-xs text-white/60">{(totalUsers - taskParticipants).toLocaleString()} users</p>
          </div>
        </div>
        <div className="pt-2 border-t border-white/10">
          <p className="text-xs text-white/60">Total Users</p>
          <p className="text-lg font-bold text-white">{totalUsers.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
