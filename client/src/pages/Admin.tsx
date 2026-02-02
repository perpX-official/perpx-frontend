import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Users,
  Coins,
  Twitter,
  MessageCircle,
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
import { toast } from "sonner";
import {
  getAdminStats,
  getAllWalletProfiles,
  searchWalletProfiles,
  adjustUserPoints,
  getDailyPostCompletions,
  getUserActivityStats,
  WalletProfile,
  TaskCompletion,
} from "@/lib/supabase";

// Admin password from environment variable (fallback for demo)
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "perpdex_admin_2026";

interface AdminStats {
  totalUsers: number;
  totalPointsDistributed: number;
  xConnectedCount: number;
  discordConnectedCount: number;
}

interface UsersData {
  profiles: WalletProfile[];
  total: number;
  page: number;
  totalPages: number;
}

interface DailyPostsData {
  completions: (TaskCompletion & { wallet_profile?: WalletProfile })[];
  total: number;
  page: number;
  totalPages: number;
}

interface ActivityStats {
  daily: { date: string; count: number }[];
  weekly: { week: string; count: number }[];
  monthly: { month: string; count: number }[];
  yearly: { year: string; count: number }[];
  taskCompletionRates: {
    connectBonus: number;
    xConnected: number;
    discordConnected: number;
    dailyPost: number;
  };
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [tweetPage, setTweetPage] = useState(1);
  const [sortBy, setSortBy] = useState<"total_points" | "created_at">("created_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [activityPeriod, setActivityPeriod] = useState<"daily" | "weekly" | "monthly" | "yearly">("daily");
  
  // Data states
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(false);
  const [usersData, setUsersData] = useState<UsersData | null>(null);
  const [usersLoading, setUsersLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<WalletProfile[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [dailyPostsData, setDailyPostsData] = useState<DailyPostsData | null>(null);
  const [dailyPostsLoading, setDailyPostsLoading] = useState(false);
  const [activityStats, setActivityStats] = useState<ActivityStats | null>(null);
  const [activityLoading, setActivityLoading] = useState(false);
  
  // Points adjustment dialog
  const [adjustDialogOpen, setAdjustDialogOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [pointsChange, setPointsChange] = useState<number>(0);
  const [adjustReason, setAdjustReason] = useState("");
  const [adjusting, setAdjusting] = useState(false);

  // Check session storage for auth
  useEffect(() => {
    const stored = sessionStorage.getItem("admin_authenticated");
    if (stored === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  // Fetch stats
  const fetchStats = useCallback(async () => {
    if (!isAuthenticated) return;
    setStatsLoading(true);
    try {
      const data = await getAdminStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setStatsLoading(false);
    }
  }, [isAuthenticated]);

  // Fetch users
  const fetchUsers = useCallback(async () => {
    if (!isAuthenticated) return;
    setUsersLoading(true);
    try {
      const data = await getAllWalletProfiles(page, 20, sortBy, sortOrder);
      setUsersData(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setUsersLoading(false);
    }
  }, [isAuthenticated, page, sortBy, sortOrder]);

  // Search users
  const searchUsers = useCallback(async () => {
    if (!isAuthenticated || searchQuery.length < 3) {
      setSearchResults([]);
      return;
    }
    setSearchLoading(true);
    try {
      const data = await searchWalletProfiles(searchQuery, 20);
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching users:', error);
    } finally {
      setSearchLoading(false);
    }
  }, [isAuthenticated, searchQuery]);

  // Fetch daily posts
  const fetchDailyPosts = useCallback(async () => {
    if (!isAuthenticated) return;
    setDailyPostsLoading(true);
    try {
      const data = await getDailyPostCompletions(tweetPage, 20);
      setDailyPostsData(data);
    } catch (error) {
      console.error('Error fetching daily posts:', error);
    } finally {
      setDailyPostsLoading(false);
    }
  }, [isAuthenticated, tweetPage]);

  // Fetch activity stats
  const fetchActivityStats = useCallback(async () => {
    if (!isAuthenticated) return;
    setActivityLoading(true);
    try {
      const data = await getUserActivityStats();
      setActivityStats(data);
    } catch (error) {
      console.error('Error fetching activity stats:', error);
    } finally {
      setActivityLoading(false);
    }
  }, [isAuthenticated]);

  // Load data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchStats();
      fetchUsers();
      fetchDailyPosts();
      fetchActivityStats();
    }
  }, [isAuthenticated, fetchStats, fetchUsers, fetchDailyPosts, fetchActivityStats]);

  // Search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      searchUsers();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, searchUsers]);

  // Refetch users when page/sort changes
  useEffect(() => {
    fetchUsers();
  }, [page, sortBy, sortOrder, fetchUsers]);

  // Refetch daily posts when page changes
  useEffect(() => {
    fetchDailyPosts();
  }, [tweetPage, fetchDailyPosts]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    // Simple password check
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("admin_authenticated", "true");
      setAuthError("");
    } else {
      setAuthError("Invalid password");
    }
    setIsLoggingIn(false);
  };

  const handleAdjustPoints = async () => {
    if (!selectedWallet || pointsChange === 0 || !adjustReason) return;
    
    setAdjusting(true);
    try {
      const result = await adjustUserPoints(selectedWallet, pointsChange, adjustReason);
      if (result.success) {
        toast.success(result.message);
        setAdjustDialogOpen(false);
        setSelectedWallet(null);
        setPointsChange(0);
        setAdjustReason("");
        fetchUsers();
        fetchStats();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Failed to adjust points');
    } finally {
      setAdjusting(false);
    }
  };

  const handleRefreshAll = () => {
    fetchStats();
    fetchUsers();
    fetchDailyPosts();
    fetchActivityStats();
  };

  const displayUsers = searchQuery.length > 2 ? searchResults : usersData?.profiles;

  // Format wallet address for display
  const formatAddress = (address: string) => {
    if (address.length <= 12) return address;
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

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
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
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
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-white/60 text-sm sm:text-base">Manage users and rewards</p>
          </div>
          
          <div className="flex gap-2">
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
        </div>

        {/* Stats Cards */}
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
                <p className="text-white/60 text-xs sm:text-sm truncate">Discord Connected</p>
                <p className="text-lg sm:text-2xl font-bold text-white">
                  {statsLoading ? "..." : stats?.discordConnectedCount.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="users" className="space-y-4">
          <TabsList className="bg-white/5 border border-white/10">
            <TabsTrigger value="users" className="data-[state=active]:bg-primary/20">
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="tweets" className="data-[state=active]:bg-primary/20">
              <FileText className="h-4 w-4 mr-2" />
              Daily Posts
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-primary/20">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by wallet address or username..."
                className="bg-white/5 border-white/20 text-white pl-10"
              />
            </div>

            {/* Sort Controls */}
            <div className="flex gap-2 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (sortBy === "total_points") {
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                  } else {
                    setSortBy("total_points");
                    setSortOrder("desc");
                  }
                }}
                className={`border-white/20 text-white hover:bg-white/10 ${sortBy === "total_points" ? "bg-white/10" : ""}`}
              >
                <ArrowUpDown className="h-3 w-3 mr-1" />
                Points {sortBy === "total_points" && (sortOrder === "desc" ? "↓" : "↑")}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (sortBy === "created_at") {
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                  } else {
                    setSortBy("created_at");
                    setSortOrder("desc");
                  }
                }}
                className={`border-white/20 text-white hover:bg-white/10 ${sortBy === "created_at" ? "bg-white/10" : ""}`}
              >
                <ArrowUpDown className="h-3 w-3 mr-1" />
                Date {sortBy === "created_at" && (sortOrder === "desc" ? "↓" : "↑")}
              </Button>
            </div>

            {/* Users Table */}
            <Card className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-3 sm:p-4 text-white/60 text-xs sm:text-sm font-medium">Wallet</th>
                      <th className="text-left p-3 sm:p-4 text-white/60 text-xs sm:text-sm font-medium">Points</th>
                      <th className="text-left p-3 sm:p-4 text-white/60 text-xs sm:text-sm font-medium hidden sm:table-cell">X</th>
                      <th className="text-left p-3 sm:p-4 text-white/60 text-xs sm:text-sm font-medium hidden sm:table-cell">Discord</th>
                      <th className="text-left p-3 sm:p-4 text-white/60 text-xs sm:text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersLoading || searchLoading ? (
                      <tr>
                        <td colSpan={5} className="text-center p-8">
                          <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
                        </td>
                      </tr>
                    ) : displayUsers && displayUsers.length > 0 ? (
                      displayUsers.map((user) => (
                        <tr key={user.wallet_address} className="border-b border-white/5 hover:bg-white/5">
                          <td className="p-3 sm:p-4">
                            <div className="text-white text-xs sm:text-sm font-mono">
                              {formatAddress(user.wallet_address)}
                            </div>
                            <div className="text-white/40 text-xs">{user.chain_type}</div>
                          </td>
                          <td className="p-3 sm:p-4">
                            <span className="text-primary font-bold text-sm sm:text-base">
                              {user.total_points.toLocaleString()}
                            </span>
                          </td>
                          <td className="p-3 sm:p-4 hidden sm:table-cell">
                            {user.x_connected ? (
                              <span className="text-sky-400 text-xs sm:text-sm">@{user.x_username}</span>
                            ) : (
                              <span className="text-white/40 text-xs sm:text-sm">-</span>
                            )}
                          </td>
                          <td className="p-3 sm:p-4 hidden sm:table-cell">
                            {user.discord_connected ? (
                              <span className="text-indigo-400 text-xs sm:text-sm">{user.discord_username}</span>
                            ) : (
                              <span className="text-white/40 text-xs sm:text-sm">-</span>
                            )}
                          </td>
                          <td className="p-3 sm:p-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedWallet(user.wallet_address);
                                setAdjustDialogOpen(true);
                              }}
                              className="border-white/20 text-white hover:bg-white/10 text-xs"
                            >
                              <Plus className="h-3 w-3 mr-1" />
                              <Minus className="h-3 w-3" />
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center p-8 text-white/40">
                          No users found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {usersData && usersData.totalPages > 1 && searchQuery.length < 3 && (
                <div className="flex items-center justify-between p-4 border-t border-white/10">
                  <span className="text-white/60 text-sm">
                    Page {usersData.page} of {usersData.totalPages}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage(Math.min(usersData.totalPages, page + 1))}
                      disabled={page === usersData.totalPages}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Daily Posts Tab */}
          <TabsContent value="tweets" className="space-y-4">
            <Card className="glass-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-3 sm:p-4 text-white/60 text-xs sm:text-sm font-medium">User</th>
                      <th className="text-left p-3 sm:p-4 text-white/60 text-xs sm:text-sm font-medium">Date</th>
                      <th className="text-left p-3 sm:p-4 text-white/60 text-xs sm:text-sm font-medium">Points</th>
                      <th className="text-left p-3 sm:p-4 text-white/60 text-xs sm:text-sm font-medium">Status</th>
                      <th className="text-left p-3 sm:p-4 text-white/60 text-xs sm:text-sm font-medium">Tweet</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dailyPostsLoading ? (
                      <tr>
                        <td colSpan={5} className="text-center p-8">
                          <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
                        </td>
                      </tr>
                    ) : dailyPostsData?.completions && dailyPostsData.completions.length > 0 ? (
                      dailyPostsData.completions.map((completion) => {
                        const metadata = completion.metadata ? JSON.parse(completion.metadata) : {};
                        return (
                          <tr key={completion.id} className="border-b border-white/5 hover:bg-white/5">
                            <td className="p-3 sm:p-4">
                              <div className="text-white text-xs sm:text-sm font-mono">
                                {formatAddress(completion.wallet_address)}
                              </div>
                              {completion.wallet_profile?.x_username && (
                                <div className="text-sky-400 text-xs">@{completion.wallet_profile.x_username}</div>
                              )}
                            </td>
                            <td className="p-3 sm:p-4 text-white/60 text-xs sm:text-sm">
                              {completion.completion_date}
                            </td>
                            <td className="p-3 sm:p-4">
                              <span className={`font-bold text-sm ${completion.is_revoked ? 'text-red-400 line-through' : 'text-primary'}`}>
                                {completion.points_awarded}
                              </span>
                            </td>
                            <td className="p-3 sm:p-4">
                              {completion.is_revoked ? (
                                <span className="text-red-400 text-xs">Revoked</span>
                              ) : (
                                <span className="text-green-400 text-xs">Active</span>
                              )}
                            </td>
                            <td className="p-3 sm:p-4">
                              {metadata.tweetUrl ? (
                                <a
                                  href={metadata.tweetUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:underline flex items-center gap-1 text-xs"
                                >
                                  View <ExternalLink className="h-3 w-3" />
                                </a>
                              ) : (
                                <span className="text-white/40 text-xs">-</span>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center p-8 text-white/40">
                          No daily posts found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {dailyPostsData && dailyPostsData.totalPages > 1 && (
                <div className="flex items-center justify-between p-4 border-t border-white/10">
                  <span className="text-white/60 text-sm">
                    Page {dailyPostsData.page} of {dailyPostsData.totalPages}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setTweetPage(Math.max(1, tweetPage - 1))}
                      disabled={tweetPage === 1}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setTweetPage(Math.min(dailyPostsData.totalPages, tweetPage + 1))}
                      disabled={tweetPage === dailyPostsData.totalPages}
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            {/* Period Selector */}
            <div className="flex gap-2 flex-wrap">
              {(['daily', 'weekly', 'monthly', 'yearly'] as const).map((period) => (
                <Button
                  key={period}
                  variant="outline"
                  size="sm"
                  onClick={() => setActivityPeriod(period)}
                  className={`border-white/20 text-white hover:bg-white/10 capitalize ${activityPeriod === period ? "bg-white/10" : ""}`}
                >
                  {period}
                </Button>
              ))}
            </div>

            {/* Task Completion Rates */}
            <Card className="glass-card p-4 sm:p-6">
              <h3 className="text-lg font-bold text-white mb-4">Task Completion Rates</h3>
              {activityLoading ? (
                <div className="flex justify-center p-8">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : activityStats ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-primary">
                      {activityStats.taskCompletionRates.connectBonus}%
                    </div>
                    <div className="text-white/60 text-xs sm:text-sm">Connect Bonus</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-sky-400">
                      {activityStats.taskCompletionRates.xConnected}%
                    </div>
                    <div className="text-white/60 text-xs sm:text-sm">X Connected</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-indigo-400">
                      {activityStats.taskCompletionRates.discordConnected}%
                    </div>
                    <div className="text-white/60 text-xs sm:text-sm">Discord Connected</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-green-400">
                      {activityStats.taskCompletionRates.dailyPost}%
                    </div>
                    <div className="text-white/60 text-xs sm:text-sm">Daily Post (Today)</div>
                  </div>
                </div>
              ) : null}
            </Card>

            {/* User Registration Chart */}
            <Card className="glass-card p-4 sm:p-6">
              <h3 className="text-lg font-bold text-white mb-4">User Registrations ({activityPeriod})</h3>
              {activityLoading ? (
                <div className="flex justify-center p-8">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : activityStats ? (
                <div className="space-y-2">
                  {(activityPeriod === 'daily' ? activityStats.daily :
                    activityPeriod === 'weekly' ? activityStats.weekly :
                    activityPeriod === 'monthly' ? activityStats.monthly :
                    activityStats.yearly
                  ).slice(-10).map((item, index) => {
                    const label = 'date' in item ? item.date : 
                                  'week' in item ? item.week : 
                                  'month' in item ? item.month : 
                                  (item as any).year;
                    const maxCount = Math.max(...(activityPeriod === 'daily' ? activityStats.daily :
                      activityPeriod === 'weekly' ? activityStats.weekly :
                      activityPeriod === 'monthly' ? activityStats.monthly :
                      activityStats.yearly
                    ).map(i => i.count), 1);
                    const percentage = (item.count / maxCount) * 100;
                    
                    return (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-20 sm:w-24 text-white/60 text-xs sm:text-sm truncate">{label}</div>
                        <div className="flex-1 h-6 bg-white/10 rounded overflow-hidden">
                          <div 
                            className="h-full bg-primary/60 rounded transition-all duration-300"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <div className="w-12 text-right text-white text-sm font-bold">{item.count}</div>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Points Adjustment Dialog */}
      <Dialog open={adjustDialogOpen} onOpenChange={setAdjustDialogOpen}>
        <DialogContent className="bg-[#0a0e1a] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Adjust Points</DialogTitle>
            <DialogDescription className="text-white/60">
              Adjust points for wallet: {selectedWallet ? formatAddress(selectedWallet) : ''}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm text-white/60 mb-2 block">Points Change</label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPointsChange(pointsChange - 100)}
                  className="border-red-500/50 text-red-500 hover:bg-red-500/10"
                >
                  -100
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
                  onClick={() => setPointsChange(pointsChange + 100)}
                  className="border-green-500/50 text-green-500 hover:bg-green-500/10"
                >
                  +100
                </Button>
              </div>
            </div>
            
            <div>
              <label className="text-sm text-white/60 mb-2 block">Reason</label>
              <Input
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
              disabled={pointsChange === 0 || !adjustReason || adjusting}
              className="neuro-button"
            >
              {adjusting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              {pointsChange >= 0 ? 'Add' : 'Deduct'} Points
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
