
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { toast } from "@/hooks/use-toast";

interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'staff' | 'admin';
  roomNumber?: string;
  greenPoints?: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, role: 'student' | 'staff', roomNumber?: string) => Promise<void>;
  logout: () => void;
  updateGreenPoints: (points: number) => void;
}

// We'll store users in localStorage under these keys
const USERS_STORAGE_KEY = 'findit_users';
const CURRENT_USER_KEY = 'findit_current_user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize users if not exist
  const initializeUsers = () => {
    const users = localStorage.getItem(USERS_STORAGE_KEY);
    if (!users) {
      // Create initial demo users
      const initialUsers = [
        {
          id: '1',
          email: 'student@example.com',
          password: 'password', // In a real app, this would be hashed
          name: 'John Doe',
          role: 'student',
          roomNumber: 'A-101',
          greenPoints: 25
        },
        {
          id: '2',
          email: 'staff@example.com',
          password: 'password', // In a real app, this would be hashed
          name: 'Jane Smith',
          role: 'staff'
        },
        {
          id: '3',
          email: 'admin@example.com',
          password: 'password', // In a real app, this would be hashed
          name: 'Admin User',
          role: 'admin'
        }
      ];
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(initialUsers));
    }
  };

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      initializeUsers();
      const storedUser = localStorage.getItem(CURRENT_USER_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  // Get all users from localStorage
  const getUsers = () => {
    const users = localStorage.getItem(USERS_STORAGE_KEY);
    return users ? JSON.parse(users) : [];
  };

  // Save users to localStorage
  const saveUsers = (users: any[]) => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  };

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = getUsers();
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      // Convert to User type (omit password)
      const loggedInUser: User = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role,
        roomNumber: foundUser.roomNumber,
        greenPoints: foundUser.greenPoints
      };
      
      setUser(loggedInUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(loggedInUser));
      toast({
        title: "Login successful",
        description: `Welcome back, ${loggedInUser.name}!`,
      });
    } else {
      throw new Error('Invalid credentials');
    }
    
    setIsLoading(false);
  };

  // Register function
  const register = async (email: string, password: string, name: string, role: 'student' | 'staff', roomNumber?: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if email is already registered
    const users = getUsers();
    if (users.some((u: any) => u.email === email)) {
      setIsLoading(false);
      throw new Error('Email already in use');
    }
    
    const newUser = {
      id: Math.random().toString(36).substring(2, 11),
      email,
      password, // In a real app, this would be hashed
      name,
      role,
      roomNumber: role === 'student' ? (roomNumber || 'A-101') : undefined, // Default room for students
      greenPoints: role === 'student' ? 0 : undefined
    };
    
    // Add user to users list
    users.push(newUser);
    saveUsers(users);
    
    // Log in the new user
    const loggedInUser: User = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      roomNumber: newUser.roomNumber,
      greenPoints: newUser.greenPoints
    };
    
    setUser(loggedInUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(loggedInUser));
    toast({
      title: "Registration successful",
      description: `Welcome to FindIt, ${loggedInUser.name}!`,
    });
    
    setIsLoading(false);
  };

  // Update green points
  const updateGreenPoints = (points: number) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      greenPoints: (user.greenPoints || 0) + points
    };
    
    setUser(updatedUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
    
    // Update in users list
    const users = getUsers();
    const updatedUsers = users.map((u: any) => 
      u.id === user.id ? {...u, greenPoints: updatedUser.greenPoints} : u
    );
    saveUsers(updatedUsers);
    
    toast({
      title: points > 0 ? "Green Points Added!" : "Green Points Deducted",
      description: `${Math.abs(points)} green points ${points > 0 ? 'added to' : 'deducted from'} your account.`,
    });
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateGreenPoints
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
