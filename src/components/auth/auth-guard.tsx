'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import { paths } from '@/paths';
import { logger } from '@/lib/default-logger';
import { useUser } from '@/hooks/use-user';

export interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps): React.JSX.Element | null {
  const router = useRouter();
  const { error, isLoading } = useUser();
  const [isChecking, setIsChecking] = React.useState<boolean>(false);
  const checkPermissions = async (): Promise<void> => {
    console.log(!localStorage.getItem('auth-token'));
    if (!localStorage.getItem('auth-token')) {
      router.replace(paths.auth.signIn);
    }
    if (isLoading) {
      return;
    }

    if (error) {
      logger.debug('[AuthGuard]: User is not logged in, redirecting to sign in');
      router.replace(paths.auth.signIn);
      return;
    }

    setIsChecking(false);
  };

  React.useEffect(() => {
    checkPermissions().catch(() => {
      // noop
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, [error, isLoading]);

  if (isChecking) {
    return null;
  }

  return <React.Fragment>{children}</React.Fragment>;
}
