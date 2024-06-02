'use client';

import * as React from 'react';
import { redirect } from 'next/navigation';
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Unstable_Grid2';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';

import { paths } from '@/paths';
import { LatestOrders } from '@/components/dashboard/overview/latest-orders';
import { Orders } from '@/components/dashboard/overview/orders';

export default function Main(): React.JSX.Element {
  let authToken;
  if (typeof window !== 'undefined') {
    authToken = sessionStorage.getItem('auth-token') ? sessionStorage.getItem('auth-token') : '';
  }
  const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};

  const { isLoading, data, error } = useQuery({
    queryKey: ['getOrder'],
    queryFn: async () => {
      const res = await axios.get('https://api.besttrade.company/api/v1/order', {
        headers,
      });
      return res.data.data;
    },
  });

  React.useEffect(() => {
    if (error) {
      redirect(paths.auth.signIn);
    }
  }, [error]);

  console.log(data, error);
  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Grid lg={12} xs={12}>
            <Orders
              chartSeries={[
                { name: '做多', data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20] },
                { name: '放空', data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13] },
              ]}
              sx={{ height: '100%' }}
            />
          </Grid>
          <Grid lg={12} md={12} xs={12}>
            <LatestOrders orders={data} sx={{ height: '100%' }} />
          </Grid>
        </>
      )}
    </>
  );
}
