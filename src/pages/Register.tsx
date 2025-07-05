
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, User, School, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import GlassMorphicCard from '@/components/ui/GlassMorphicCard';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [role, setRole] = useState('student');
  const [showPassword, setShowPassword] = useState(false);
  
  const { register, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword || (role === 'student' && !roomNumber)) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all required fields.',
        variant: 'destructive'
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: 'Password mismatch',
        description: 'Passwords do not match. Please try again.',
        variant: 'destructive'
      });
      return;
    }
    
    try {
      await register(
        email, 
        password, 
        name, 
        role === 'student' ? 'student' : 'staff',
        role === 'student' ? roomNumber : undefined
      );
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: error instanceof Error ? error.message : 'An error occurred. Please try again.',
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
                <h1 className="text-2xl font-bold mb-2">Create an Account</h1>
                <p className="text-muted-foreground">
                  Join the FindIt platform
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Role Selection */}
                <div className="flex border border-input rounded-lg p-1 bg-background">
                  <button
                    type="button"
                    className={`w-1/2 py-2 rounded-md text-sm font-medium transition-colors ${
                      role === 'student' 
                        ? 'bg-primary text-white' 
                        : 'text-muted-foreground hover:bg-muted'
                    }`}
                    onClick={() => setRole('student')}
                    disabled={isLoading}
                  >
                    Student
                  </button>
                  <button
                    type="button"
                    className={`w-1/2 py-2 rounded-md text-sm font-medium transition-colors ${
                      role === 'staff' 
                        ? 'bg-primary text-white' 
                        : 'text-muted-foreground hover:bg-muted'
                    }`}
                    onClick={() => setRole('staff')}
                    disabled={isLoading}
                  >
                    Staff
                  </button>
                </div>
                
                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={18} className="text-muted-foreground" />
                    </div>
                    <input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      className="input-field pl-10"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>
                
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
                
                {/* Room Number (only for students) */}
                {role === 'student' && (
                  <div>
                    <label htmlFor="roomNumber" className="block text-sm font-medium text-foreground mb-1">
                      Room Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <School size={18} className="text-muted-foreground" />
                      </div>
                      <input
                        id="roomNumber"
                        type="text"
                        placeholder="e.g. A-101"
                        className="input-field pl-10"
                        value={roomNumber}
                        onChange={e => setRoomNumber(e.target.value)}
                        disabled={isLoading}
                        required={role === 'student'}
                      />
                    </div>
                  </div>
                )}
                
                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
                    Password
                  </label>
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
                
                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={18} className="text-muted-foreground" />
                    </div>
                    <input
                      id="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="input-field pl-10"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      disabled={isLoading}
                      required
                    />
                  </div>
                </div>
                
                {/* Register Button */}
                <Button 
                  type="submit" 
                  className="w-full py-6 shadow-md bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 border-none"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="mr-2 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>
                
                {/* Login Link */}
                <p className="text-center text-sm">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary font-medium hover:underline">
                    Sign In
                  </Link>
                </p>
              </form>
            </div>
          </GlassMorphicCard>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
