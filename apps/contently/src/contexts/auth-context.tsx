import type { ReactNode } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const fetchMe = async (): Promise<User | null> => {
  try {
    const res = await fetch('/api/me', { credentials: 'include' });
    if (!res.ok) return null;
    const { data } = (await res.json()) as { data: User };
    return data;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session on mount — checks if cookie is still valid
  useEffect(() => {
    fetchMe()
      .then(setUser)
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (email: string) => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
      credentials: 'include',
    });

    if (!res.ok) {
      let message = 'Login failed';
      try {
        const body = (await res.json()) as { error: string };
        message = body.error;
      } catch {
        message = (await res.text().catch(() => '')) || 'Login failed';
      }
      throw new Error(message);
    }

    // Spec: POST /api/login → GET /api/me → store user
    const me = await fetchMe();
    setUser(me);
  };

  const logout = async () => {
    await fetch('/api/logout', { method: 'POST', credentials: 'include' });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
