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

import { User } from '@/types/user';
import { paths } from '@/paths';

const defaultUser: User = {
  id: '1',
  name: 'Sofia Rivers',
  image: '/assets/avatar.png',
  username: '',
  email: '',
  bio: '',
};

export function AccountInfo(): React.ReactElement {
  let authToken;
  if (typeof window !== 'undefined') {
<<<<<<< HEAD
    authToken = sessionStorage.getItem('auth-token') ? sessionStorage.getItem('auth-token') : '';
=======
    authToken = localStorage.getItem('auth-token') ? localStorage.getItem('auth-token') : '';
>>>>>>> 12d2e1d (feature/user-sign-out)
  }
  const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};

  const { isLoading, data, error } = useQuery<User>({
    queryKey: ['getMe'],
    queryFn: async () => {
      const res = await axios.get<{ data: { user: User } }>('https://api.besttrade.company/api/v1/user/me', {
        headers,
      });
      return res.data.data.user;
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
                <Avatar src={data?.image ? data.image : defaultUser.image} sx={{ height: '80px', width: '80px' }} />
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
