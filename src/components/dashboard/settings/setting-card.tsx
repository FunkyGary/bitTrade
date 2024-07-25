'use client';

import React, { useMemo } from 'react';
import { redirect } from 'next/navigation';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

import { paths } from '@/paths';

interface TradeSetting {
  amount: string;
  exchange: string;
  currency: string;
  risk_reference: string;
}

export function SettingCard(): React.ReactElement {
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
  const [setting, setSetting] = React.useState<TradeSetting>({
    amount: '0',
    exchange: 'Binance',
    currency: '',
    risk_reference: '',
  });
  const mutation = useMutation({
    mutationFn: async () => {
      await axios.post(`https://api.besttrade.company/api/v1/user/trade-setting`, setting, {
        headers,
      });
    },
    onSuccess: () => {
      toast.success('設定成功');
    },
    onError: () => {
      toast.error('設定失敗');
    },
  });

  const filteredMenuItems = useMemo(() => {
    return ['BTC', 'ETH']
      .filter((e) => !data?.find((element) => element.currency === e && element.exchange === setting.exchange))
      .map((e) => (
        <MenuItem key={e} value={e}>
          {e}
        </MenuItem>
      ));
  }, [data, setting]);

  if (error) {
    redirect(paths.auth.signIn);
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        mutation.mutate();
      }}
    >
      <Card>
        <CardHeader subheader="請設定交易幣種、金額與風險（不能重複新增）" title="新增設定" />
        <Divider />
        <CardContent>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Grid container spacing={3} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Grid item>
                      <FormControl sx={{ width: '150px' }} required>
                        <InputLabel>交易所</InputLabel>
                        <Select
                          value={setting.exchange}
                          label="交易所"
                          onChange={(event) => {
                            setSetting({
                              ...setting,
                              exchange: event.target.value,
                            });
                          }}
                        >
                          <MenuItem value="Binance">Binance</MenuItem>
                          <MenuItem value="Bitfinex">Bitfinex</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <FormControl sx={{ width: '150px' }} required error={filteredMenuItems.length === 0}>
                        <InputLabel>幣種</InputLabel>
                        <Select
                          disabled={filteredMenuItems.length === 0}
                          value={setting.currency}
                          label="幣種"
                          onChange={(event) => {
                            setSetting({
                              ...setting,
                              currency: event.target.value,
                            });
                          }}
                        >
                          {filteredMenuItems}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <FormControl sx={{ width: '150px' }} required>
                        <InputLabel>金額</InputLabel>
                        <OutlinedInput
                          value={setting.amount}
                          label="金額"
                          onChange={(event) => {
                            setSetting({
                              ...setting,
                              amount: event.target.value.toString(),
                            });
                          }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <FormControl sx={{ width: '150px' }} required>
                        <InputLabel>風險偏好</InputLabel>
                        <Select
                          value={setting.risk_reference}
                          label="風險偏好"
                          onChange={(event) => {
                            setSetting({
                              ...setting,
                              risk_reference: event.target.value,
                            });
                          }}
                        >
                          <MenuItem value="Conservative">保守型</MenuItem>
                          <MenuItem value="Balanced">均衡型</MenuItem>
                          <MenuItem value="Aggressive">積極型</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item>
                      <Button variant="contained" type="submit">
                        新增
                      </Button>
                    </Grid>
                  </Grid>
                  {filteredMenuItems.length === 0 && (
                    <FormHelperText error sx={{ marginTop: '10px' }}>
                      已經新增，請更新設定
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>
            </>
          )}
        </CardContent>
      </Card>
    </form>
  );
}
