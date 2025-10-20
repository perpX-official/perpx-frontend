import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import Trade from "./pages/Trade";
import Dashboard from "./pages/Dashboard";
import Points from "./pages/Points";
import Referral from "./pages/Referral";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/trade"} component={Trade} />
      <Route path={"/dashboard"} component={Dashboard} />
      <Route path={"/points"} component={Points} />
      <Route path={"/referral"} component={Referral} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;

