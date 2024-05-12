'use client';

import * as React from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { GoogleLogin, googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { paths } from '@/paths';
import { authClient } from '@/lib/auth/client';
import { useUser } from '@/hooks/use-user';

const schema = zod.object({
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: zod.string().min(1, { message: 'Password is required' }),
});

type Values = zod.infer<typeof schema>;

const defaultValues = { email: 'sofia@devias.io', password: 'Secret1' } satisfies Values;

export function SignInForm(): React.JSX.Element {
  const router = useRouter();
  const { checkSession } = useUser();
  const [token, setToken] = React.useState();

  const tokenExample =
    'ya29.a0AXooCgt0XVJPl9QAJqq_HsNAKU64Ap6s_0vE9ClpkH1Q-87Fyrnd149AeByOofsqxsEFmExMWBXLaOxjRWcT-hmuIITGwiAvH9yekK5l3eZcHk7RLUBE-q2NNfJQJIEioMXTSA7rct8tz_tDJjk0soJEV6rKUNWgvqUaCgYKARESARISFQHGX2MiNrzdfFbtJDMPAqIcMCVnmg0170'; // 包含非ISO-8859-1字符的令牌

  // const { isLoading, data } = useQuery({
  //   queryKey: ['repoData'],
  //   queryFn: () => {
  //     return axios.get('https://api.besttrade.company/api/v1/user/oauth/google_callback', {
  //       headers: {
  //         Authorization: `Bearer ${tokenExample}`,
  //       },
  //     });
  //   },
  // });
  // console.log(data);

  console.log(token);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  // const onSubmit = React.useCallback(
  //   async (values: Values): Promise<void> => {
  //     setIsPending(true);

  //     const { error } = await authClient.signInWithPassword(values);

  //     if (error) {
  //       setError('root', { type: 'server', message: error });
  //       setIsPending(false);
  //       return;
  //     }

  //     // Refresh the auth state
  //     await checkSession?.();

  //     // UserProvider, for this case, will not refresh the router
  //     // After refresh, GuestGuard will handle the redirect
  //     router.refresh();
  //   },
  //   [checkSession, router, setError]
  // );

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      setToken(tokenResponse);
      // UserProvider, for this case, will not refresh the router
      // After refresh, GuestGuard will handle the redirect
      router.refresh();
    },
    onError: (error) => console.error('Login Failed:', error),
  });

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4">Sign in</Typography>
      </Stack>
      <GoogleLogin click_listener={() => login()} onSuccess={() => {}} onError={() => {}} />
      <button
        onClick={() => {
          console.log('log out');
          googleLogout();
        }}
      >
        log out
      </button>
    </Stack>
  );
}
