'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

import { paths } from '@/paths';

interface ExchangeApiData {
  id: number;
  exchange: string;
  key: string;
  secret: string;
}

interface ExchangeCredentials {
  key: string;
  secret: string;
  exchange: string;
  name: string;
}

export function AccountDetailsForm(): React.ReactElement {
  const [exchangeAPI, setExchangeAPI] = React.useState<ExchangeCredentials>({
    exchange: 'Bitfinex',
    name: '',
    key: '',
    secret: '',
  });

  let authToken;
  if (typeof window !== 'undefined') {
    authToken = sessionStorage.getItem('auth-token') ? sessionStorage.getItem('auth-token') : '';
  }
  const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post<{ data: ExchangeApiData[] }>(
        'https://api.besttrade.company/api/v1/user/exchange-api',
        exchangeAPI,
        { headers }
      );
      return res.data.data;
    },
    onSuccess: () => {
      toast.success('儲存成功');
      router.push(paths.dashboard.settings);
    },
    onError: () => {
      toast.error('儲存失敗');
    },
  });

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        mutation.mutate();
      }}
    >
      <Card>
        <CardHeader title="交易所 Key 設定" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>交易所</InputLabel>
                <Select
                  value={exchangeAPI.exchange}
                  label="交易所"
                  onChange={(event) => {
                    setExchangeAPI({
                      ...exchangeAPI,
                      exchange: event.target.value,
                    });
                  }}
                >
                  <MenuItem value="Binance">Binance</MenuItem>
                  <MenuItem value="Bitfinex">Bitfinex</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>名稱</InputLabel>
                <OutlinedInput
                  value={exchangeAPI.name}
                  label="名稱"
                  required
                  onChange={(event) => {
                    setExchangeAPI({
                      ...exchangeAPI,
                      name: event.target.value,
                    });
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Key</InputLabel>
                <OutlinedInput
                  value={exchangeAPI.key}
                  label="Key"
                  onChange={(event) => {
                    setExchangeAPI({
                      ...exchangeAPI,
                      key: event.target.value,
                    });
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Secret</InputLabel>
                <OutlinedInput
                  value={exchangeAPI.secret}
                  label="Secret"
                  required
                  type="password"
                  onChange={(event) => {
                    setExchangeAPI({
                      ...exchangeAPI,
                      secret: event.target.value,
                    });
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained">
            新增
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
