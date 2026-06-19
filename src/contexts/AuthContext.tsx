import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, UserRole, ApprovalStatus, EducationStage } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export const FOUNDER_EMAIL = 'gsvinayak8@gmail.com';
export const ALLOWED_DOMAINS = ['gmail.com', 'yahoo.com'];

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isConfigured: boolean;
  needsOnboarding: boolean;
  signUp: (
    email: string,
    password: string,
    name: string,
    role: UserRole,
    educationStage?: EducationStage
  ) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<{ error: Error | null }>;
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
  resendVerification: (email?: string) => Promise<{ error: Error | null }>;
  completeOnboarding: (
    educationStage: EducationStage,
    interests: string[]
  ) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS = [
  { email: 'student@demo.com', password: 'demo123', role: 'student' as UserRole },
  { email: 'parent@demo.com', password: 'demo123', role: 'parent' as UserRole },
  { email: 'admin@pathpilot.com', password: 'admin123', role: 'admin' as UserRole },
];

function resolveRole(email: string, dbRole: string | null): UserRole {
  if (email === FOUNDER_EMAIL) return 'admin';
  return (dbRole as UserRole) || 'student';
}

function resolveApproval(_email: string, dbApproval: string | null): ApprovalStatus {
  return (dbApproval as ApprovalStatus) || 'approved';
}

function buildUserFromProfile(
  supabaseUser: { id: string; email?: string | null },
  profile: Record<string, unknown> | null
): User {
  const email = supabaseUser.email || '';
  const isFounder = email === FOUNDER_EMAIL;
  return {
    id: supabaseUser.id,
    email,
    name: (profile?.full_name as string) || email.split('@')[0],
    role: resolveRole(email, (profile?.role as string) || null),
    approval_status: resolveApproval(email, (profile?.approval_status as string) || null),
    email_verified: isFounder ? true : Boolean(profile?.email_verified),
    education_stage: profile?.education_stage as EducationStage | undefined,
    onboarding_completed: isFounder ? true : Boolean(profile?.onboarding_completed),
    city: profile?.city as string | undefined,
    state: profile?.state as string | undefined,
    phone: profile?.phone as string | undefined,
    avatar_url: profile?.avatar_url as string | undefined,
    notifications_enabled: (profile?.notifications_enabled as boolean) ?? true,
    created_at: (profile?.created_at as string) || new Date().toISOString(),
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem('pathpilot_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUser({
          ...parsed,
          approval_status: parsed.approval_status || 'approved',
          email_verified: parsed.email_verified ?? true,
          onboarding_completed: parsed.onboarding_completed ?? false,
        });
      } catch {
        localStorage.removeItem('pathpilot_user');
      }
    }
  };

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      loadFromLocalStorage();
      setLoading(false);
      return;
    }

    let mounted = true;

    const fetchProfile = async (supabaseUser: { id: string; email?: string | null }) => {
      const { data: profile } = await supabase!
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .maybeSingle();

      // Ensure founder always has admin role in DB
      if (supabaseUser.email === FOUNDER_EMAIL && profile) {
        if (profile.role !== 'admin' || profile.approval_status !== 'approved') {
          await supabase!
            .from('profiles')
            .update({ role: 'admin', approval_status: 'approved' })
            .eq('id', supabaseUser.id);
        }
      }

      return buildUserFromProfile(supabaseUser, profile as Record<string, unknown> | null);
    };

    const init = async () => {
      const { data: { session } } = await supabase!.auth.getSession();
      if (mounted && session?.user) {
        const u = await fetchProfile(session.user);
        setUser(u);
      }
      if (mounted) setLoading(false);
    };
    init();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        if ((event === 'SIGNED_IN' || event === 'USER_UPDATED') && session?.user) {
          const u = await fetchProfile(session.user);
          setUser(u);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          localStorage.removeItem('pathpilot_user');
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (
    email: string,
    password: string,
    name: string,
    role: UserRole,
    educationStage?: EducationStage
  ) => {
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/verify-email` },
        });
        if (error) return { error: new Error(error.message) };

        if (data.user) {
          const isFounder = email === FOUNDER_EMAIL;
          const finalRole: UserRole = isFounder ? 'admin' : role;

          await supabase.from('profiles').insert({
            id: data.user.id,
            email,
            full_name: name,
            role: finalRole,
            education_stage: educationStage,
            approval_status: 'approved',
            email_verified: true,
            onboarding_completed: isFounder,
            notifications_enabled: true,
          });

          setUser({
            id: data.user.id,
            email,
            name,
            role: finalRole,
            approval_status: 'approved',
            email_verified: true,
            education_stage: educationStage,
            onboarding_completed: isFounder,
            notifications_enabled: true,
            created_at: new Date().toISOString(),
          });
        }
        return { error: null };
      } else {
        const isFounder = email === FOUNDER_EMAIL;
        const newUser: User = {
          id: crypto.randomUUID(),
          email,
          name,
          role: isFounder ? 'admin' : role,
          approval_status: 'approved',
          email_verified: true,
          education_stage: educationStage,
          onboarding_completed: isFounder,
          notifications_enabled: true,
          created_at: new Date().toISOString(),
        };
        localStorage.setItem('pathpilot_user', JSON.stringify(newUser));
        setUser(newUser);
        return { error: null };
      }
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) return { error: new Error(error.message) };
      } else {
        const demoUser = DEMO_USERS.find(
          u => u.email === email && u.password === password
        );
        let loggedInUser: User;

        if (demoUser) {
          loggedInUser = {
            id: crypto.randomUUID(),
            email: demoUser.email,
            name: demoUser.email.split('@')[0],
            role: demoUser.role,
            approval_status: 'approved',
            email_verified: true,
            onboarding_completed: demoUser.role === 'admin',
            notifications_enabled: true,
            created_at: new Date().toISOString(),
          };
        } else {
          const saved = localStorage.getItem('pathpilot_user');
          loggedInUser = saved
            ? JSON.parse(saved)
            : {
                id: crypto.randomUUID(),
                email,
                name: email.split('@')[0],
                role: email === FOUNDER_EMAIL ? 'admin' : 'student',
                approval_status: 'approved',
                email_verified: true,
                onboarding_completed: false,
                notifications_enabled: true,
                created_at: new Date().toISOString(),
              };
        }

        localStorage.setItem('pathpilot_user', JSON.stringify(loggedInUser));
        setUser(loggedInUser);
      }
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem('pathpilot_user');
    setUser(null);
  };

  const updateProfile = async (updates: Partial<User>) => {
    try {
      if (!user) return { error: null };
      const updatedUser = { ...user, ...updates };

      if (isSupabaseConfigured && supabase) {
        await supabase.from('profiles').upsert({
          id: user.id,
          full_name: updatedUser.name,
          role: updatedUser.role,
          education_stage: updatedUser.education_stage,
          city: updatedUser.city,
          state: updatedUser.state,
          phone: updatedUser.phone,
          notifications_enabled: updatedUser.notifications_enabled,
          updated_at: new Date().toISOString(),
        });
      }

      localStorage.setItem('pathpilot_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const resetPassword = async (email: string) => {
    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) return { error: new Error(error.message) };
      }
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const resendVerification = async (email?: string) => {
    try {
      if (isSupabaseConfigured && supabase) {
        const target = email || user?.email || '';
        const { error } = await supabase.auth.resend({ type: 'signup', email: target });
        if (error) return { error: new Error(error.message) };
      }
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const completeOnboarding = async (educationStage: EducationStage, interests: string[]) => {
    try {
      if (!user) return { error: null };
      const updatedUser = { ...user, education_stage: educationStage, onboarding_completed: true };

      if (isSupabaseConfigured && supabase) {
        await supabase
          .from('profiles')
          .update({
            education_stage: educationStage,
            onboarding_completed: true,
            updated_at: new Date().toISOString(),
          })
          .eq('id', user.id);
      }

      localStorage.setItem('pathpilot_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const needsOnboarding = Boolean(
    user && !user.onboarding_completed && user.role !== 'admin'
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isConfigured: isSupabaseConfigured,
        needsOnboarding,
        signUp,
        signIn,
        signOut,
        updateProfile,
        resetPassword,
        resendVerification,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
