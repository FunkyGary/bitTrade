'use client';

import * as React from 'react';

export interface GuestGuardProps {
  children: React.ReactNode;
}

export function GuestGuard({ children }: GuestGuardProps): React.JSX.Element | null {
  const checkPermissions = async (): Promise<void> => {
    if (sessionStorage.getItem('auth-token')) {
      sessionStorage.removeItem('auth-token');
      return;
    }
  };

  React.useEffect(() => {
    checkPermissions().catch(() => {
      // noop
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Expected
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
}
