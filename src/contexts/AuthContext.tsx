
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isUserAdmin } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { useToast } from '@/components/ui/use-toast';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast: uiToast } = useToast();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        console.log("Auth state changed:", _event, session?.user?.email);
        setSession(session);
        setUser(session?.user ?? null);
        setIsAdmin(isUserAdmin(session?.user?.email));
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session check:", session?.user?.email);
      setSession(session);
      setUser(session?.user ?? null);
      setIsAdmin(isUserAdmin(session?.user?.email));
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      console.log("Attempting login with:", email);
      
      // Trim the email and convert to lowercase for consistency
      const trimmedEmail = email.trim().toLowerCase();
      
      // Check if the user is trying to login with an admin email and using our special admin password
      if (isUserAdmin(trimmedEmail) && password === "mrfate123") {
        // Use the admin password to sign in
        const { data, error } = await supabase.auth.signInWithPassword({
          email: trimmedEmail,
          password,
        });
        
        if (error) {
          console.error("Admin login with master password failed:", error.message);
          // Use the admin password to sign in with password "admin123" as fallback
          const { data: fallbackData, error: fallbackError } = await supabase.auth.signInWithPassword({
            email: trimmedEmail,
            password: "admin123",
          });
          
          if (fallbackError) {
            console.error("Admin fallback login failed:", fallbackError.message);
            uiToast({
              title: "Login failed",
              description: "Invalid admin credentials. Please check your email and password.",
              variant: "destructive",
            });
            return Promise.reject(fallbackError);
          }
          
          console.log("Admin login successful with fallback password");
          console.log("Admin status:", isUserAdmin(fallbackData.user?.email));
          
          toast.success("Admin login successful", {
            description: "Welcome back, admin!",
          });
          return;
        }
        
        console.log("Admin login successful");
        console.log("Admin status:", isUserAdmin(data.user?.email));
        
        toast.success("Admin login successful", {
          description: "Welcome back, admin!",
        });
        return;
      }
      
      // Regular login flow
      const { data, error } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password,
      });
      
      if (error) {
        console.error("Login error:", error.message);
        uiToast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
        return Promise.reject(error);
      }
      
      console.log("Login successful, user:", data.user?.email);
      console.log("Admin status:", isUserAdmin(data.user?.email));
      
      toast.success("Login successful", {
        description: "Welcome back!",
      });
    } catch (error: any) {
      console.error("Unexpected login error:", error.message);
      uiToast({
        title: "An error occurred",
        description: error.message,
        variant: "destructive",
      });
      return Promise.reject(error);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });
      
      if (error) {
        uiToast({
          title: "Registration failed",
          description: error.message,
          variant: "destructive",
        });
        return Promise.reject(error);
      }
      
      toast.success("Registration successful", {
        description: "Please check your email for verification link",
      });
    } catch (error: any) {
      uiToast({
        title: "An error occurred",
        description: error.message,
        variant: "destructive",
      });
      return Promise.reject(error);
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        uiToast({
          title: "Password reset failed",
          description: error.message,
          variant: "destructive",
        });
        return Promise.reject(error);
      }
      
      toast.success("Password reset email sent", {
        description: "Please check your email for the password reset link",
      });
    } catch (error: any) {
      uiToast({
        title: "An error occurred",
        description: error.message,
        variant: "destructive",
      });
      return Promise.reject(error);
    }
  };

  const resetPassword = async (password: string) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password
      });
      
      if (error) {
        uiToast({
          title: "Password update failed",
          description: error.message,
          variant: "destructive",
        });
        return Promise.reject(error);
      }
      
      toast.success("Password updated successfully", {
        description: "You can now login with your new password",
      });
    } catch (error: any) {
      uiToast({
        title: "An error occurred",
        description: error.message,
        variant: "destructive",
      });
      return Promise.reject(error);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out", {
        description: "You have been successfully logged out",
      });
    } catch (error: any) {
      uiToast({
        title: "An error occurred",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const value = {
    user,
    session,
    isLoading,
    signIn,
    signUp,
    signOut,
    isAdmin,
    forgotPassword,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
