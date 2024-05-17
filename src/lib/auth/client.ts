'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import type { User } from '@/types/user';

export interface SignUpParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignInWithOAuthParams {
  provider: 'google' | 'discord';
}

export interface SignInWithPasswordParams {
  email: string;
  password: string;
}

export interface ResetPasswordParams {
  email: string;
}

// class AuthClient {
//   async signUp(token: string): Promise<{ error?: string }> {
//     // Make API request

//     // We do not handle the API, so we'll just generate a token and store it in localStorage.
//     localStorage.setItem('auth-token', token);

//     return {};
//   }

//   async signInWithOAuth(_: SignInWithOAuthParams): Promise<{ error?: string }> {
//     return { error: 'Social authentication not implemented' };
//   }

//   async signInWithPassword(params: SignInWithPasswordParams): Promise<{ error?: string }> {
//     const { email, password } = params;

//     // Make API request

//     // We do not handle the API, so we'll check if the credentials match with the hardcoded ones.
//     if (email !== 'sofia@devias.io' || password !== 'Secret1') {
//       return { error: 'Invalid credentials' };
//     }

//     // localStorage.setItem('custom-auth-token', token);

//     return {};
//   }

//   async resetPassword(_: ResetPasswordParams): Promise<{ error?: string }> {
//     return { error: 'Password reset not implemented' };
//   }

//   async updatePassword(_: ResetPasswordParams): Promise<{ error?: string }> {
//     return { error: 'Update reset not implemented' };
//   }

//   async getUser(): Promise<{ data?: User | null; error?: string }> {
//     // Make API request
//     const { isLoading, data, error } = useQuery({
//       queryKey: ['getMe'],
//       queryFn: async () => {
//         const res = await axios.get('https://api.besttrade.company/api/v1/user/me', {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
//           },
//         });
//         return res.data.data.user;
//       },
//     });
//     // We do not handle the API, so just check if we have a token in localStorage.
//     if (error) {
//       return { data: null };
//     }

//     return { data: data };
//   }

//   async signOut(): Promise<{ error?: string }> {
//     localStorage.removeItem('auth-token');

//     return {};
//   }
// }

// export const authClient = new AuthClient();

const AuthClient = () => {
  const getUserQuery = useQuery<User | null>({
    queryKey: ['getMe'],
    queryFn: async () => {
      const res = await axios.get('https://api.besttrade.company/api/v1/user/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
      });
      return res.data.data.user;
    },
  });

  useEffect(() => {
    // Optional: Handle loading/error states
    if (getUserQuery.isLoading) {
      // Handle loading state
    } else if (getUserQuery.error) {
      // Handle error state
    }
  }, [getUserQuery.isLoading, getUserQuery.error]);

  const getUser = async () => {
    // We do not handle the API, so just check if we have a token in localStorage.
    if (getUserQuery.error) {
      return null;
    }
    return getUserQuery.data;
  };

  const signOut = async () => {
    localStorage.removeItem('auth-token');
    return {};
  };

  return {
    getUser,
    signOut,
  };
};

export default AuthClient;
