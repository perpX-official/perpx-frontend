import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Code, Key, Book, Terminal } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function API() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{t('api.title')}</h1>
          <p className="text-white/60">{t('api.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="glass-card rounded-xl p-6">
            <Code className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">REST API</h3>
            <p className="text-white/60 mb-4">Access market data, place orders, and manage your account programmatically</p>
            <Button className="neuro-button micro-bounce text-white font-medium">
              View Documentation
            </Button>
          </div>

          <div className="glass-card rounded-xl p-6">
            <Terminal className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">WebSocket API</h3>
            <p className="text-white/60 mb-4">Real-time market data and order updates via WebSocket connection</p>
            <Button className="neuro-button micro-bounce text-white font-medium">
              View Documentation
            </Button>
          </div>
        </div>

        <div className="glass-card rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">API Key Management</h2>
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between py-4 border-b border-white/5">
              <div>
                <div className="text-white font-medium">Production API Key</div>
                <div className="text-sm text-white/60">Created on 2025-10-15</div>
              </div>
              <Button variant="outline" className="glass-card border-white/20 text-white hover:bg-white/10">
                Revoke
              </Button>
            </div>
          </div>
          <Button className="neuro-button micro-bounce micro-glow text-white font-medium">
            <Key className="h-5 w-5 mr-2" />
            Generate New API Key
          </Button>
        </div>

        <div className="glass-card rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">Quick Start</h2>
          <div className="bg-black/30 rounded-lg p-4 overflow-x-auto">
            <code className="text-sm text-green-400">
              {`curl -X GET "https://api.perpx.com/v1/markets" \
  -H "X-API-KEY: your_api_key_here"`}
            </code>
          </div>
          <div className="mt-6 flex gap-4">
            <Button variant="outline" className="glass-card border-white/20 text-white hover:bg-white/10">
              <Book className="h-5 w-5 mr-2" />
              Full Documentation
            </Button>
            <Button variant="outline" className="glass-card border-white/20 text-white hover:bg-white/10">
              View Examples
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
