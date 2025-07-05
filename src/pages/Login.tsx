
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import GlassMorphicCard from '@/components/ui/GlassMorphicCard';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const { login, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: 'Missing information',
        description: 'Please enter both email and password.',
        variant: 'destructive'
      });
      return;
    }
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Login failed',
        description: error instanceof Error ? error.message : 'Invalid credentials. Please try again.',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <GlassMorphicCard>
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center">
                  <span className="font-bold text-white text-2xl">F</span>
                </div>
                <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
                <p className="text-muted-foreground">
                  Sign in to your FindIt account
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail size={18} className="text-muted-foreground" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      className="input-field pl-10"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>
                
                {/* Password */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor="password" className="block text-sm font-medium text-foreground">
                      Password
                    </label>
                    <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={18} className="text-muted-foreground" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="input-field pl-10 pr-10"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      disabled={isLoading}
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff size={18} className="text-muted-foreground" />
                      ) : (
                        <Eye size={18} className="text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>
                
                {/* Login Button */}
                <Button 
                  type="submit" 
                  className="w-full py-6 shadow-md bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 border-none"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="mr-2 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
                
                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-2 bg-background text-muted-foreground text-sm">
                      OR
                    </span>
                  </div>
                </div>
                
                {/* Register Link */}
                <p className="text-center text-sm">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-primary font-medium hover:underline">
                    Create Account
                  </Link>
                </p>
              </form>
              
              {/* Demo credentials */}
              <div className="mt-6 p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-center text-muted-foreground">
                  <strong>Demo Credentials:</strong><br />
                  Student: student@example.com / password<br />
                  Staff: staff@example.com / password<br />
                  Admin: admin@example.com / password
                </p>
              </div>
            </div>
          </GlassMorphicCard>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
