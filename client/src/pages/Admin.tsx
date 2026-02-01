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
  Menu,
  X,
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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

  const handleRefreshAll = () => {
    refetchStats();
    refetchUsers();
    refetchDailyPosts();
    refetchActivity();
  };

  const displayUsers = searchQuery.length > 2 ? searchResults : usersData?.profiles;

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="glass-card p-6 sm:p-8 w-full max-w-md">
          <div className="text-center mb-6 sm:mb-8">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
              <Lock className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-white/60 text-sm sm:text-base">Enter password to access</p>
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
    <div className="min-h-screen bg-background p-3 sm:p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header - Mobile Responsive */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-white/60 text-sm sm:text-base">Manage users and rewards</p>
          </div>
          
          {/* Desktop buttons */}
          <div className="hidden sm:flex gap-2">
            <Button
              variant="outline"
              onClick={handleRefreshAll}
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
          
          {/* Mobile buttons */}
          <div className="flex sm:hidden gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefreshAll}
              className="border-white/20 text-white hover:bg-white/10 flex-1"
            >
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
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

        {/* Stats Cards - Mobile: 2x2 grid, Desktop: 4 columns */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Card className="glass-card p-3 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
              </div>
              <div className="min-w-0">
                <p className="text-white/60 text-xs sm:text-sm truncate">Total Users</p>
                <p className="text-lg sm:text-2xl font-bold text-white">
                  {statsLoading ? "..." : stats?.totalUsers.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-3 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Coins className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-white/60 text-xs sm:text-sm truncate">Total Points</p>
                <p className="text-lg sm:text-2xl font-bold text-white">
                  {statsLoading ? "..." : stats?.totalPointsDistributed.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-3 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-sky-500/20 flex items-center justify-center flex-shrink-0">
                <Twitter className="h-5 w-5 sm:h-6 sm:w-6 text-sky-500" />
              </div>
              <div className="min-w-0">
                <p className="text-white/60 text-xs sm:text-sm truncate">X Connected</p>
                <p className="text-lg sm:text-2xl font-bold text-white">
                  {statsLoading ? "..." : stats?.xConnectedCount.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>

          <Card className="glass-card p-3 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-500" />
              </div>
              <div className="min-w-0">
                <p className="text-white/60 text-xs sm:text-sm truncate">Discord</p>
                <p className="text-lg sm:text-2xl font-bold text-white">
                  {statsLoading ? "..." : stats?.discordConnectedCount.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Chain Stats - Hidden on mobile, shown on tablet+ */}
        {stats?.chainStats && (
          <Card className="glass-card p-4 sm:p-6 mb-6 sm:mb-8 hidden sm:block">
            <h3 className="text-base sm:text-lg font-bold text-white mb-4">Users by Chain</h3>
            <div className="flex flex-wrap gap-4 sm:gap-6">
              {Object.entries(stats.chainStats).map(([chain, count]) => (
                <div key={chain} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${
                    chain === "evm" ? "bg-blue-500" :
                    chain === "tron" ? "bg-red-500" :
                    "bg-purple-500"
                  }`} />
                  <span className="text-white/60 capitalize">{chain}:</span>
                  <span className="text-white font-bold">{(count as number).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Tabs for Users, Tweet Verification, and Activity */}
        <Tabs defaultValue="users" className="space-y-4">
          {/* Tab List - Scrollable on mobile */}
          <TabsList className="bg-white/5 border border-white/10 w-full sm:w-auto overflow-x-auto flex-nowrap">
            <TabsTrigger value="users" className="data-[state=active]:bg-primary/20 text-xs sm:text-sm whitespace-nowrap">
              <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="tweets" className="data-[state=active]:bg-primary/20 text-xs sm:text-sm whitespace-nowrap">
              <FileText className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Tweets
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-primary/20 text-xs sm:text-sm whitespace-nowrap">
              <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Activity
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card className="glass-card p-3 sm:p-6">
              {/* Search and Sort - Stack on mobile */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-bold text-white">Users</h3>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <Input
                      type="text"
                      placeholder="Search wallet/username..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-white/5 border-white/20 text-white w-full sm:w-56 lg:w-64 text-sm"
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSortBy(sortBy === "totalPoints" ? "createdAt" : "totalPoints");
                    }}
                    className="border-white/20 text-white hover:bg-white/10 text-xs sm:text-sm"
                  >
                    <ArrowUpDown className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    Sort: {sortBy === "totalPoints" ? "Date" : "Points"}
                  </Button>
                </div>
              </div>

              {/* Table - Horizontal scroll on mobile */}
              <div className="overflow-x-auto -mx-3 sm:mx-0">
                <div className="min-w-[600px] sm:min-w-0 px-3 sm:px-0">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-white/60 font-medium text-xs sm:text-sm">Wallet</th>
                        <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-white/60 font-medium text-xs sm:text-sm hidden lg:table-cell">Chain</th>
                        <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-white/60 font-medium text-xs sm:text-sm">Points</th>
                        <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-white/60 font-medium text-xs sm:text-sm">X</th>
                        <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-white/60 font-medium text-xs sm:text-sm hidden md:table-cell">Discord</th>
                        <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-white/60 font-medium text-xs sm:text-sm hidden lg:table-cell">Tasks</th>
                        <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-white/60 font-medium text-xs sm:text-sm">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(usersLoading || searchLoading) ? (
                        <tr>
                          <td colSpan={7} className="text-center py-8">
                            <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-primary mx-auto" />
                          </td>
                        </tr>
                      ) : displayUsers?.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center py-8 text-white/60 text-sm">
                            No users found
                          </td>
                        </tr>
                      ) : (
                        displayUsers?.map((user: any) => (
                          <tr key={user.walletAddress} className="border-b border-white/5 hover:bg-white/5">
                            <td className="py-2 sm:py-3 px-2 sm:px-4">
                              <span className="text-white font-mono text-xs sm:text-sm">
                                {user.walletAddress.slice(0, 4)}...{user.walletAddress.slice(-3)}
                              </span>
                            </td>
                            <td className="py-2 sm:py-3 px-2 sm:px-4 hidden lg:table-cell">
                              <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs font-medium ${
                                user.chainType === "evm" ? "bg-blue-500/20 text-blue-400" :
                                user.chainType === "tron" ? "bg-red-500/20 text-red-400" :
                                "bg-purple-500/20 text-purple-400"
                              }`}>
                                {user.chainType.toUpperCase()}
                              </span>
                            </td>
                            <td className="py-2 sm:py-3 px-2 sm:px-4">
                              <span className="text-primary font-bold text-xs sm:text-sm">{user.totalPoints.toLocaleString()}</span>
                            </td>
                            <td className="py-2 sm:py-3 px-2 sm:px-4">
                              {user.xConnected && user.xUsername ? (
                                <a
                                  href={`https://x.com/${user.xUsername}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sky-400 hover:underline inline-flex items-center gap-1 text-xs sm:text-sm"
                                >
                                  @{user.xUsername.length > 8 ? user.xUsername.slice(0, 8) + '...' : user.xUsername}
                                  <ExternalLink className="h-2.5 w-2.5 sm:h-3 sm:w-3 hidden sm:inline" />
                                </a>
                              ) : (
                                <span className="text-white/40 text-xs sm:text-sm">-</span>
                              )}
                            </td>
                            <td className="py-2 sm:py-3 px-2 sm:px-4 hidden md:table-cell">
                              {user.discordConnected && user.discordUsername ? (
                                <a
                                  href={`https://discord.com/users/${user.discordUsername}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-indigo-400 hover:underline inline-flex items-center gap-1 text-xs sm:text-sm"
                                >
                                  {user.discordUsername.length > 10 ? user.discordUsername.slice(0, 10) + '...' : user.discordUsername}
                                  <ExternalLink className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                                </a>
                              ) : (
                                <span className="text-white/40 text-xs sm:text-sm">-</span>
                              )}
                            </td>
                            <td className="py-2 sm:py-3 px-2 sm:px-4 hidden lg:table-cell">
                              <span className="text-white/80 text-xs sm:text-sm">{user.dailyTaskCount || 0}</span>
                            </td>
                            <td className="py-2 sm:py-3 px-2 sm:px-4">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedWallet(user.walletAddress);
                                  setAdjustDialogOpen(true);
                                }}
                                className="border-white/20 text-white hover:bg-white/10 text-[10px] sm:text-xs px-2 py-1 h-auto"
                              >
                                <TrendingUp className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-0.5 sm:mr-1" />
                                Adjust
                              </Button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              {usersData?.pagination && searchQuery.length <= 2 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 sm:mt-6 pt-4 border-t border-white/10">
                  <p className="text-white/60 text-xs sm:text-sm">
                    Page {usersData.pagination.page} of {usersData.pagination.totalPages} 
                    <span className="hidden sm:inline"> ({usersData.pagination.totalCount} total)</span>
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
            <Card className="glass-card p-3 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-bold text-white">Daily Post Submissions</h3>
                <p className="text-white/60 text-xs sm:text-sm">
                  Verify tweets mentioning @perpXFi
                </p>
              </div>

              {/* Tweet Table */}
              <div className="overflow-x-auto -mx-3 sm:mx-0">
                <div className="min-w-[500px] sm:min-w-0 px-3 sm:px-0">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-white/60 font-medium text-xs sm:text-sm">Date</th>
                        <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-white/60 font-medium text-xs sm:text-sm">Wallet</th>
                        <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-white/60 font-medium text-xs sm:text-sm hidden sm:table-cell">X User</th>
                        <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-white/60 font-medium text-xs sm:text-sm">Points</th>
                        <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-white/60 font-medium text-xs sm:text-sm">Tweet</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dailyPostsLoading ? (
                        <tr>
                          <td colSpan={5} className="text-center py-8">
                            <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-primary mx-auto" />
                          </td>
                        </tr>
                      ) : dailyPostsData?.completions?.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="text-center py-8 text-white/60 text-sm">
                            No daily post submissions yet
                          </td>
                        </tr>
                      ) : (
                        dailyPostsData?.completions?.map((post: any) => (
                          <tr key={post.id} className="border-b border-white/5 hover:bg-white/5">
                            <td className="py-2 sm:py-3 px-2 sm:px-4">
                              <span className="text-white/80 text-xs sm:text-sm">
                                {post.completionDate}
                              </span>
                            </td>
                            <td className="py-2 sm:py-3 px-2 sm:px-4">
                              <span className="text-white font-mono text-xs sm:text-sm">
                                {post.walletAddress.slice(0, 4)}...{post.walletAddress.slice(-3)}
                              </span>
                            </td>
                            <td className="py-2 sm:py-3 px-2 sm:px-4 hidden sm:table-cell">
                              {post.xUsername ? (
                                <a 
                                  href={`https://x.com/${post.xUsername}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-sky-400 hover:underline text-xs sm:text-sm"
                                >
                                  @{post.xUsername}
                                </a>
                              ) : (
                                <span className="text-white/40 text-xs sm:text-sm">-</span>
                              )}
                            </td>
                            <td className="py-2 sm:py-3 px-2 sm:px-4">
                              <span className="text-primary font-bold text-xs sm:text-sm">+{post.pointsAwarded}</span>
                            </td>
                            <td className="py-2 sm:py-3 px-2 sm:px-4">
                              {post.tweetUrl ? (
                                <a
                                  href={post.tweetUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-sky-400 hover:underline text-xs sm:text-sm"
                                >
                                  <ExternalLink className="h-3 w-3" />
                                  <span className="hidden sm:inline">View</span>
                                </a>
                              ) : (
                                <span className="text-white/40 text-xs sm:text-sm">-</span>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Pagination */}
              {dailyPostsData?.pagination && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4 sm:mt-6 pt-4 border-t border-white/10">
                  <p className="text-white/60 text-xs sm:text-sm">
                    Page {dailyPostsData.pagination.page} of {dailyPostsData.pagination.totalPages}
                    <span className="hidden sm:inline"> ({dailyPostsData.pagination.totalCount} total)</span>
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
            <Card className="glass-card p-3 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-bold text-white">User Activity</h3>
                {/* Period selector - Scrollable on mobile */}
                <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-2 sm:pb-0">
                  {(["daily", "weekly", "monthly", "yearly", "all"] as const).map((period) => (
                    <Button
                      key={period}
                      variant={activityPeriod === period ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActivityPeriod(period)}
                      className={`text-xs sm:text-sm px-2 sm:px-3 whitespace-nowrap ${activityPeriod === period 
                        ? "bg-primary text-white" 
                        : "border-white/20 text-white hover:bg-white/10"
                      }`}
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
                <div className="flex items-center justify-center py-12 sm:py-16">
                  <Loader2 className="h-6 w-6 sm:h-8 sm:w-8 animate-spin text-primary" />
                </div>
              ) : activityStats ? (
                <div className="space-y-6 sm:space-y-8">
                  {/* New Users Line Chart */}
                  <div>
                    <h4 className="text-white/80 font-medium mb-3 sm:mb-4 text-sm sm:text-base">New Users (Line Chart)</h4>
                    <div className="h-48 sm:h-64 bg-white/5 rounded-lg p-3 sm:p-4">
                      <UserLineChart 
                        data={activityStats} 
                        period={activityPeriod} 
                      />
                    </div>
                  </div>

                  {/* Task Completion Rate Pie Chart */}
                  <div>
                    <h4 className="text-white/80 font-medium mb-3 sm:mb-4 text-sm sm:text-base">Task Completion Rate</h4>
                    <div className="bg-white/5 rounded-lg p-3 sm:p-4 flex items-center justify-center overflow-x-auto">
                      <TaskCompletionPieChart 
                        totalUsers={activityStats.allTime?.totalUsers || 0}
                        taskParticipants={activityStats.allTime?.totalTaskCompletions || 0}
                      />
                    </div>
                  </div>

                  {/* Summary Stats */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <Card className="bg-white/5 p-3 sm:p-4">
                      <p className="text-white/60 text-xs sm:text-sm">All-Time Users</p>
                      <p className="text-xl sm:text-2xl font-bold text-white">
                        {activityStats.allTime?.totalUsers?.toLocaleString() || 0}
                      </p>
                    </Card>
                    <Card className="bg-white/5 p-3 sm:p-4">
                      <p className="text-white/60 text-xs sm:text-sm">Completion Rate</p>
                      <p className="text-xl sm:text-2xl font-bold text-white">
                        {activityStats.allTime?.totalUsers > 0 
                          ? ((activityStats.allTime?.totalTaskCompletions / activityStats.allTime?.totalUsers) * 100).toFixed(1)
                          : 0}%
                      </p>
                    </Card>
                  </div>
                </div>
              ) : (
                <p className="text-white/60 text-center py-8 text-sm">No activity data available</p>
              )}
            </Card>
          </TabsContent>
        </Tabs>

        {/* Points Adjustment Dialog */}
        <Dialog open={adjustDialogOpen} onOpenChange={setAdjustDialogOpen}>
          <DialogContent className="bg-[#1a1a1a] border-white/10 max-w-[95vw] sm:max-w-md mx-auto">
            <DialogHeader>
              <DialogTitle className="text-white text-base sm:text-lg">Adjust Points</DialogTitle>
              <DialogDescription className="text-white/60 text-xs sm:text-sm">
                Wallet: {selectedWallet?.slice(0, 8)}...{selectedWallet?.slice(-6)}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div>
                <label className="text-white/60 text-xs sm:text-sm mb-2 block">Points Change</label>
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
                <label className="text-white/60 text-xs sm:text-sm mb-2 block">Reason</label>
                <Input
                  type="text"
                  value={adjustReason}
                  onChange={(e) => setAdjustReason(e.target.value)}
                  placeholder="Enter reason for adjustment..."
                  className="bg-white/5 border-white/20 text-white text-sm"
                />
              </div>
            </div>

            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => setAdjustDialogOpen(false)}
                className="border-white/20 text-white hover:bg-white/10 w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAdjustPoints}
                disabled={pointsChange === 0 || !adjustReason || adjustPoints.isPending}
                className={`w-full sm:w-auto ${pointsChange > 0 ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}
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
      label: item.date,
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
      <div className="flex items-center justify-center h-full text-white/40 text-sm">
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
      <div className="flex flex-col justify-between h-full pr-1 sm:pr-2 text-[8px] sm:text-[10px] text-white/40">
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
        
        {/* X-axis labels - Show fewer on mobile */}
        <div className="flex justify-between text-[8px] sm:text-[10px] text-white/40 mt-1">
          {chartData.map((item, i) => {
            // On mobile, show every other label if there are many
            const showLabel = chartData.length <= 7 || i % 2 === 0 || i === chartData.length - 1;
            return (
              <span 
                key={i} 
                className={`truncate ${!showLabel ? 'hidden sm:block' : ''}`}
                style={{ width: `${100 / chartData.length}%`, textAlign: 'center' }}
              >
                {item.label}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Task Completion Pie Chart Component - Responsive
interface TaskCompletionPieChartProps {
  totalUsers: number;
  taskParticipants: number;
}

function TaskCompletionPieChart({ totalUsers, taskParticipants }: TaskCompletionPieChartProps) {
  const completionRate = totalUsers > 0 ? (taskParticipants / totalUsers) * 100 : 0;
  const nonCompletionRate = 100 - completionRate;
  
  // SVG pie chart calculations - Smaller on mobile
  const size = 160; // Reduced from 200
  const center = size / 2;
  const radius = 55; // Reduced from 70
  const innerRadius = 35; // Reduced from 45
  
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
    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
      {/* Pie Chart */}
      <div className="relative flex-shrink-0">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {/* Background circle */}
          <circle cx={center} cy={center} r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="20" />
          
          {/* Completed arc (green) */}
          {completionRate > 0 && (
            <path
              d={completedPath}
              fill="none"
              stroke="#0ABAB5"
              strokeWidth="20"
              strokeLinecap="round"
            />
          )}
          
          {/* Remaining arc (gray) */}
          {nonCompletionRate > 0 && completionRate < 100 && (
            <path
              d={remainingPath}
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="20"
              strokeLinecap="round"
            />
          )}
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl sm:text-3xl font-bold text-white">{completionRate.toFixed(1)}%</span>
          <span className="text-[10px] sm:text-xs text-white/60">Completion</span>
        </div>
      </div>
      
      {/* Legend */}
      <div className="space-y-2 sm:space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-[#0ABAB5]"></div>
          <div>
            <p className="text-xs sm:text-sm text-white">Completed Tasks</p>
            <p className="text-[10px] sm:text-xs text-white/60">{taskParticipants.toLocaleString()} users</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-white/20"></div>
          <div>
            <p className="text-xs sm:text-sm text-white">No Tasks</p>
            <p className="text-[10px] sm:text-xs text-white/60">{(totalUsers - taskParticipants).toLocaleString()} users</p>
          </div>
        </div>
        <div className="pt-2 border-t border-white/10">
          <p className="text-[10px] sm:text-xs text-white/60">Total Users</p>
          <p className="text-base sm:text-lg font-bold text-white">{totalUsers.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
