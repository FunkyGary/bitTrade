'use client';

import * as React from 'react';
import { redirect, useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { SignOut as SignOutIcon } from '@phosphor-icons/react/dist/ssr/SignOut';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { GoogleLogout } from 'react-google-login';

import { User } from '@/types/user';
import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import { useUser } from '@/hooks/use-user';

export interface UserPopoverProps {
  anchorEl: Element | null;
  onClose: () => void;
  open: boolean;
}

export function UserPopover({ anchorEl, onClose, open }: UserPopoverProps): React.JSX.Element {
  const { checkSession } = useUser();

  const authToken = sessionStorage.getItem('auth-token');
  const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};

  const { data, error } = useQuery<User>({
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
      sessionStorage.removeItem('auth-token');
      redirect(paths.auth.signIn);
    }
  }, [error]);

  const router = useRouter();

  const handleSignOut = React.useCallback(async (): Promise<void> => {
    try {
      // const { error } = await AuthClient.signOut();
      sessionStorage.removeItem('auth-token');
      router.replace(paths.auth.signIn);

      // Refresh the auth state
      await checkSession?.();

      // UserProvider, for this case, will not refresh the router and we need to do it manually
      router.refresh();
      // After refresh, AuthGuard will handle the redirect
    } catch (err) {
      logger.error('Sign out error', err);
    }
  }, [checkSession, router]);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { width: '240px' } } }}
    >
      <Box sx={{ p: '16px 20px ' }}>
        <Typography variant="subtitle1">{data?.name}</Typography>
        <Typography color="text.secondary" variant="body2">
          {data?.email}
        </Typography>
      </Box>
      <Divider />
      <GoogleLogout
        clientId="23020782984-pimnbrtmtq2hjmr4eecsm06ddqcq2uj2.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={handleSignOut}
      />
      <MenuList disablePadding sx={{ p: '8px', '& .MuiMenuItem-root': { borderRadius: 1 } }}>
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <SignOutIcon fontSize="var(--icon-fontSize-md)" />
          </ListItemIcon>
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
}
