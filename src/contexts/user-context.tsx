import React, { createContext } from 'react';

import type { User } from '@/types/user';

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

export function UserProvider({ children }: UserProviderProps): React.ReactElement {
  const state = {
    user: null,
    error: null,
    isLoading: false,
  };

  // const fetchUser = async (): Promise<User | null> => {
  //   const authToken = sessionStorage.getItem('auth-token');
  //   const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
  //   const res = await axios.get<{ data: { user: User } }>('https://api.besttrade.company/api/v1/user/me', {
  //     headers: headers,
  //   });
  //   return res.data.data.user;
  // };

  // const {
  //   data: userData,
  //   error: userError,
  //   isLoading: userIsLoading,
  // } = useQuery<User | null>({
  //   queryKey: ['getUser'],
  //   queryFn: fetchUser,
  // });

  // useEffect(() => {
  //   if (userError) {
  //     setState({ user: null, error: 'Something went wrong', isLoading: false });
  //   } else {
  //     setState({ user: userData ?? null, error: null, isLoading: userIsLoading });
  //   }
  // }, [userData, userError, userIsLoading]);

  return <UserContext.Provider value={{ ...state }}>{children}</UserContext.Provider>;
}

export const UserConsumer = UserContext.Consumer;
