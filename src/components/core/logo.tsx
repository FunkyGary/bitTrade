'use client';

import * as React from 'react';
import { useColorScheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { NoSsr } from '@/components/core/no-ssr';

type Color = 'dark' | 'light';

export interface LogoProps {
  color?: Color;
  emblem?: boolean;
  height?: number;
  width?: number;
}

export function Logo({ color = 'dark' }: LogoProps): React.JSX.Element {
  return (
    <Typography variant="h5" sx={color === 'light' ? { color: 'white' } : null}>
      Best Trade
    </Typography>
  );
}

export interface DynamicLogoProps {
  colorDark?: Color;
  colorLight?: Color;
  emblem?: boolean;
  height?: number;
  width?: number;
}

export function DynamicLogo({
  colorDark = 'light',
  colorLight = 'dark',
  ...props
}: DynamicLogoProps): React.JSX.Element {
  const { colorScheme } = useColorScheme();
  const color = colorScheme === 'dark' ? colorDark : colorLight;
  return (
    <NoSsr>
      <Logo color={color} {...props} />
    </NoSsr>
  );
}
