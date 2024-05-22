'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useGoogleLogin } from '@react-oauth/google';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import GoogleButton from 'react-google-button';

import { paths } from '@/paths';

export function SignInForm(): React.ReactElement {
  const router = useRouter();
  const [token, setToken] = React.useState<string | undefined>();

  const { data, error } = useQuery<string>({
    queryKey: ['getToken'],
    queryFn: async () => {
      if (!token) return '';
      const res = await axios.get<{ data: { token: string } }>(
        'https://api.besttrade.company/api/v1/user/oauth/google_callback',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res?.data?.data?.token;
    },
    enabled: Boolean(token),
  });
  React.useEffect(() => {
    if (data) {
      sessionStorage.setItem('auth-token', data);
      router.replace(paths.dashboard.overview);
    }
  }, [data, router]);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse: { access_token: string }) => {
      setToken(tokenResponse.access_token);
      // UserProvider, for this case, will not refresh the router
      // After refresh, GuestGuard will handle the redirect
    },
  });

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4">Sign in</Typography>
      </Stack>
      <GoogleButton
        onClick={() => {
          login();
        }}
      />
      {error && <Alert color="error">{error.message}</Alert>}
    </Stack>
  );
}
