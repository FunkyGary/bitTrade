'use client';

import { createContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import type { User } from '@/types/user';
// import AuthClient from '@/lib/auth/client';
import { logger } from '@/lib/default-logger';

export interface UserContextValue {
  user: User | null;
  error: string | null;
  isLoading: boolean;
  checkSession?: () => Promise<void>;
}

export const UserContext = createContext<UserContextValue | undefined>(undefined);

export interface UserProviderProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: UserProviderProps): React.JSX.Element {
  const [state, setState] = useState<{ user: User | null; error: string | null; isLoading: boolean }>({
    user: null,
    error: null,
    isLoading: true,
  });

  const fetchUser = async (): Promise<User | null> => {
    try {
      const res = await axios.get('https://api.besttrade.company/api/v1/user/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
      });
      return res.data.data.user;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  };

  const {
    data: userData,
    error: userError,
    isLoading: userIsLoading,
  } = useQuery<User | null>({
    queryKey: ['getUser'],
    queryFn: fetchUser,
  });

  useEffect(() => {
    if (userError) {
      console.error('Error fetching user:', userError);
      setState({ user: null, error: 'Something went wrong', isLoading: false });
    } else {
      setState({ user: userData ?? null, error: null, isLoading: userIsLoading });
    }
  }, [userData, userError, userIsLoading]);

  return <UserContext.Provider value={{ ...state }}>{children}</UserContext.Provider>;
}

export const UserConsumer = UserContext.Consumer;
