'use client';

import * as React from 'react';
import { redirect } from 'next/navigation';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { paths } from '@/paths';
import { useUser } from '@/hooks/use-user';

const defaultUser = {
  name: 'Sofia Rivers',
  avatar: '/assets/avatar.png',
  jobTitle: 'Senior Developer',
  country: 'USA',
  city: 'Los Angeles',
  timezone: 'GTM-7',
} as const;

export function AccountInfo(): React.JSX.Element {
  // const { user, error, isLoading,checkSession } = useUser();
  //   await checkSession?.();
  // console.log(user);
  const { isLoading, data, error } = useQuery({
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
  console.log(error, data);

  if (error) {
    redirect(paths.auth.signIn);
  }

  return (
    <Card>
      <CardContent>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <Stack spacing={2} sx={{ alignItems: 'center' }}>
              <div>
                <Avatar src={data?.image ? data.image : defaultUser.avatar} sx={{ height: '80px', width: '80px' }} />
              </div>
              <Stack spacing={1} sx={{ textAlign: 'center' }}>
                <Typography variant="h5">{data.username}</Typography>
                <Typography color="text.secondary" variant="body2">
                  {data.email}
                </Typography>
                <Typography color="text.secondary" variant="body2">
                  {data.bio}
                </Typography>
              </Stack>
            </Stack>
            {/* <Divider />
            <CardActions>
              <Button fullWidth variant="text">
                Upload picture
              </Button>
            </CardActions> */}
          </>
        )}
      </CardContent>
    </Card>
  );
}