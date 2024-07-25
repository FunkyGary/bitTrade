'use client';

import * as React from 'react';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CircularProgress, Divider, Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { paths } from '@/paths';

import TradeSettingForm from './setting-form';

interface TradeSetting {
  id: number;
  amount: string;
  exchange: string;
  currency: string;
  risk_reference: string;
}

export function SettingsDetails(): React.ReactElement {
  let authToken;
  if (typeof window !== 'undefined') {
    authToken = sessionStorage.getItem('auth-token') ? sessionStorage.getItem('auth-token') : '';
  }
  const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
  const { data, isLoading, error } = useQuery({
    queryKey: ['getTradeSetting'],
    queryFn: async () => {
      const res = await axios.get<{ data: TradeSetting[] }>('https://api.besttrade.company/api/v1/user/trade-setting', {
        headers: headers,
      });
      return res.data.data;
    },
  });

  if (error) {
    redirect(paths.auth.signIn);
  }

  return (
    <Card>
      <CardHeader subheader="可以更新交易幣種、金額與風險" title="交易設定列表" />
      <Divider />
      <CardContent>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={3}>
            {data?.map((tradeSetting) => (
              <Grid item xs={12} key={tradeSetting.id}>
                <TradeSettingForm tradeSetting={tradeSetting} />
              </Grid>
            ))}
          </Grid>
        )}
      </CardContent>
    </Card>
  );
}
