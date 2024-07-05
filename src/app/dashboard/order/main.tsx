'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
// import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { paths } from '@/paths';
import { NoData } from '@/components/core/no-data';
import { LatestOrders } from '@/components/dashboard/overview/latest-orders';

// import { Orders } from '@/components/dashboard/overview/orders';

export interface Order {
  amount: string;
  created_at: string;
  crypto: string;
  id: number;
  price: string;
  trade_direction: string;
  trade_rate: string;
  updated_at: string;
  user_id: number;
}

export default function Main(): React.JSX.Element {
  const router = useRouter();
  let authToken;
  if (typeof window !== 'undefined') {
    authToken = sessionStorage.getItem('auth-token') ? sessionStorage.getItem('auth-token') : '';
  }
  const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};

  const { isLoading, data, error } = useQuery<Order[]>({
    queryKey: ['getOrder'],
    queryFn: async () => {
      const res = await axios.get<{ data: Order[] }>('https://api.besttrade.company/api/v1/order', {
        headers,
      });
      return res.data.data;
    },
  });

  React.useEffect(() => {
    if (error) {
      router.replace(paths.auth.signIn);
    }
  }, [error, router]);

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Grid lg={12} xs={12}>
            <Typography variant="h4" gutterBottom>
              下單記錄
            </Typography>
          </Grid>
          {data ? (
            <>
              {/* <Grid lg={12} xs={12}>
                <Card sx={{ height: '100%' }}>
                  <Orders
                    chartSeries={[
                      { name: '做多', data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20] },
                      { name: '放空', data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13] },
                    ]}
                  />
                </Card>
              </Grid> */}
              <Grid lg={12} md={12} xs={12}>
                <LatestOrders orders={data} sx={{ height: '100%' }} />
              </Grid>
            </>
          ) : (
            <NoData />
          )}
        </>
      )}
    </>
  );
}
