'use client';

import * as React from 'react';
import { redirect } from 'next/navigation';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { paths } from '@/paths';

interface User {
  name: string;
  avatar: string;
  jobTitle: string;
  country: string;
  city: string;
  timezone: string;
  username: string;
  email: string;
  bio: string;
}

const defaultUser: User = {
  name: 'Sofia Rivers',
  avatar: '/assets/avatar.png',
  jobTitle: 'Senior Developer',
  country: 'USA',
  city: 'Los Angeles',
  timezone: 'GTM-7',
  username: '',
  email: '',
  bio: '',
};

export function AccountInfo(): React.ReactElement {
  const authToken = localStorage.getItem('auth-token');
  const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};

  const { isLoading, data, error } = useQuery<User>({
    queryKey: ['getMe'],
    queryFn: async () => {
      const res = await axios.get<User>('https://api.besttrade.company/api/v1/user/me', {
        headers: headers,
      });
      return res.data;
    },
  });

  React.useEffect(() => {
    if (error) {
      redirect(paths.auth.signIn);
    }
  }, [error]);

  return (
    <Card>
      <CardContent>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <Stack spacing={2} sx={{ alignItems: 'center' }}>
              <div>
                <Avatar src={data?.avatar ? data.avatar : defaultUser.avatar} sx={{ height: '80px', width: '80px' }} />
              </div>
              <Stack spacing={1} sx={{ textAlign: 'center' }}>
                <Typography variant="h5">{data?.username}</Typography>
                <Typography color="text.secondary" variant="body2">
                  {data?.email}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {data?.bio}
                </Typography>
              </Stack>
            </Stack>
          </>
        )}
      </CardContent>
    </Card>
  );
}
