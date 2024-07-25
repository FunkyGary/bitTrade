'use client';

import * as React from 'react';
import { redirect } from 'next/navigation';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// import { toast } from 'react-toastify';

import { paths } from '@/paths';

interface ExchangeApiData {
  id: number;
  exchange: string;
  key: string;
  secret: string;
  name: string;
  status: boolean;
}

export function AccountDetails(): React.ReactElement {
  let authToken;
  if (typeof window !== 'undefined') {
    authToken = sessionStorage.getItem('auth-token') ? sessionStorage.getItem('auth-token') : '';
  }
  const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
  // const mutation = useMutation({
  //   mutationFn: async (id: number) => {
  //     await axios.delete(`https://api.besttrade.company/api/v1/user/exchange-api/${id}`, {
  //       headers,
  //     });
  //   },
  //   onSuccess: () => {
  //     toast.success('刪除成功');
  //   },
  //   onError: () => {
  //     toast.error('刪除失敗');
  //   },
  // });
  const { data, isLoading, error } = useQuery({
    queryKey: ['getExchangeApi'],
    queryFn: async () => {
      const res = await axios.get<{ data: ExchangeApiData[] }>(
        'https://api.besttrade.company/api/v1/user/exchange-api',
        { headers: headers }
      );
      return res.data.data;
    },
  });

  if (error) {
    redirect(paths.auth.signIn);
  }

  return (
    <Card>
      <CardHeader title="交易所 Key 列表" />
      <Divider />
      <CardContent>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <Grid container spacing={3}>
              {data?.find((e) => e.exchange === 'Binance') && (
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <Box
                    component="img"
                    sx={{
                      maxWidth: { xs: 250, md: 150 },
                    }}
                    alt="Binance"
                    src={`/assets/Binance.png`}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                {data
                  ?.filter((e) => e.exchange === 'Binance')
                  .map((e) => {
                    return (
                      <Grid key={e.id} container spacing={3} sx={{ display: 'flex', alignItems: 'center' }}>
                        <Grid item>
                          <FormControl>
                            <InputLabel>Name</InputLabel>
                            <OutlinedInput value={e.name} label="Name" disabled />
                          </FormControl>
                        </Grid>
                        <Grid item>
                          <FormControl>
                            <InputLabel>Key</InputLabel>
                            <OutlinedInput value={e.key} label="Key" disabled />
                          </FormControl>
                        </Grid>
                        <Grid item>
                          <FormControl>
                            <InputLabel>Secret</InputLabel>
                            <OutlinedInput value={e.secret} label="Secret" disabled type="password" />
                          </FormControl>
                        </Grid>
                        <Grid item>
                          {e.status ? (
                            <Chip label="有效" color="success" variant="outlined" />
                          ) : (
                            <Chip label="失效" color="error" />
                          )}
                        </Grid>
                        {/* <Grid item>
                          <Button variant="contained" color="error" onClick={() => mutation.mutate(e.id)}>
                            刪除
                          </Button>
                        </Grid> */}
                      </Grid>
                    );
                  })}
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              {data?.find((e) => e.exchange === 'Bitfinex') && (
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <Box
                    component="img"
                    sx={{
                      maxWidth: { xs: 250, md: 150 },
                    }}
                    alt="Bitfinex"
                    src={`/assets/Bitfinex.png`}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                {data
                  ?.filter((e) => e.exchange === 'Bitfinex')
                  .map((e) => {
                    return (
                      <Grid
                        key={e.id}
                        container
                        spacing={3}
                        sx={{ display: 'flex', alignItems: 'center', marginTop: '1px' }}
                      >
                        <Grid item>
                          <FormControl>
                            <InputLabel>Name</InputLabel>
                            <OutlinedInput value={e.name} label="Name" disabled />
                          </FormControl>
                        </Grid>
                        <Grid item>
                          <FormControl>
                            <InputLabel>Key</InputLabel>
                            <OutlinedInput value={e.key} label="Key" disabled />
                          </FormControl>
                        </Grid>
                        <Grid item>
                          <FormControl>
                            <InputLabel>Secret</InputLabel>
                            <OutlinedInput value={e.secret} label="Secret" disabled type="password" />
                          </FormControl>
                        </Grid>
                        <Grid item>
                          {e.status ? (
                            <Chip label="有效" color="success" variant="outlined" />
                          ) : (
                            <Chip label="失效" color="error" />
                          )}
                        </Grid>
                        {/* <Grid item>
                          <Button variant="contained" color="error" onClick={() => mutation.mutate(e.id)}>
                            刪除
                          </Button>
                        </Grid> */}
                      </Grid>
                    );
                  })}
              </Grid>
            </Grid>
          </>
        )}
      </CardContent>
    </Card>
  );
}
