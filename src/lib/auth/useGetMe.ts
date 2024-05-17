'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import type { User } from '@/types/user';

const getUser = async () => {
  const { isLoading, data, error } = useQuery<User | null>({
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

  return {
    isLoading,
    data,
    error,
  };
};

export default getUser;
