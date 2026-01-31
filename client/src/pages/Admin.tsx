import { useState, useEffect } from "react";
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
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<"totalPoints" | "createdAt">("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  
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

        {/* Search & Users Table */}
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
                  <th className="text-left py-3 px-4 text-white/60 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {(usersLoading || searchLoading) ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
                    </td>
                  </tr>
                ) : displayUsers?.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-white/60">
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
                        {user.xConnected ? (
                          <span className="text-sky-400">@{user.xUsername}</span>
                        ) : (
                          <span className="text-white/40">-</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {user.discordConnected ? (
                          <span className="text-indigo-400">{user.discordUsername}</span>
                        ) : (
                          <span className="text-white/40">-</span>
                        )}
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
