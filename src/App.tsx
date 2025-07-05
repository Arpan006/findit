
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import LoadingScreen from "@/components/ui/LoadingScreen";
import AmbientBackground from "@/components/ui/AmbientBackground";

// Pages
import Index from "./pages/Index";
import LostFound from "./pages/LostFound";
import Marketplace from "./pages/Marketplace";
import Services from "./pages/Services";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Page transition wrapper
const PageTransitionWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading time for gamified experience
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1.5 second loading time
    
    return () => clearTimeout(timer);
  }, [location.pathname]);
  
  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      
      {!isLoading && (
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      )}
    </>
  );
};

const AppContent = () => {
  return (
    <BrowserRouter>
      <AmbientBackground />
      <Routes>
        <Route
          path="/"
          element={
            <PageTransitionWrapper>
              <Index />
            </PageTransitionWrapper>
          }
        />
        <Route
          path="/lost-found"
          element={
            <PageTransitionWrapper>
              <LostFound />
            </PageTransitionWrapper>
          }
        />
        <Route
          path="/marketplace"
          element={
            <PageTransitionWrapper>
              <Marketplace />
            </PageTransitionWrapper>
          }
        />
        <Route
          path="/services"
          element={
            <PageTransitionWrapper>
              <Services />
            </PageTransitionWrapper>
          }
        />
        <Route
          path="/login"
          element={
            <PageTransitionWrapper>
              <Login />
            </PageTransitionWrapper>
          }
        />
        <Route
          path="/register"
          element={
            <PageTransitionWrapper>
              <Register />
            </PageTransitionWrapper>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PageTransitionWrapper>
              <Dashboard />
            </PageTransitionWrapper>
          }
        />
        <Route
          path="*"
          element={
            <PageTransitionWrapper>
              <NotFound />
            </PageTransitionWrapper>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppContent />
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
