'use client';

import * as React from 'react';
import { redirect } from 'next/navigation';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { paths } from '@/paths';

interface ExchangeApiData {
  id: string;
  exchange: string;
  key: string;
  secret: string;
}

interface ExchangeCredentials {
  key: string;
  secret: string;
}

interface Exchanges {
  Binance: ExchangeCredentials;
  Bitfinex: ExchangeCredentials;
}

function inputFormatter(inputArray: ExchangeApiData[]) {
  const output = { Binance: { key: '', secret: '' }, Bitfinex: { key: '', secret: '' } };
  inputArray.forEach((e) => {
    if (e.exchange === 'Binance') {
      output.Binance = { key: e.key, secret: e.secret };
    } else if (e.exchange === 'Bitfinex') {
      output.Bitfinex = { key: e.key, secret: e.secret };
    }
  });
  return output;
}

export function AccountDetailsForm(): React.ReactElement {
  const [exchangeAPI, setExchangeAPI] = React.useState<Exchanges>({
    Binance: { key: '', secret: '' },
    Bitfinex: { key: '', secret: '' },
  });
  let authToken;
  if (typeof window !== 'undefined') {
    authToken = sessionStorage.getItem('auth-token') ? sessionStorage.getItem('auth-token') : '';
  }
  const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
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

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post<{ data: ExchangeApiData[] }>(
        'https://api.besttrade.company/api/v1/user/exchange-api',
        Object.entries(exchangeAPI),
        { headers }
      );
      return res.data.data;
    },
    onSuccess: (response) => {
      setExchangeAPI(inputFormatter(response));
    },
  });

  React.useEffect(() => {
    if (!isLoading && data) {
      setExchangeAPI(inputFormatter(data));
    }
  }, [data, isLoading]);

  if (error) {
    redirect(paths.auth.signIn);
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        mutation.mutate();
      }}
      noValidate
    >
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box
                    component="img"
                    sx={{
                      maxWidth: { xs: 250, md: 150 },
                    }}
                    alt="Binance"
                    src={`/assets/Binance.png`}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Binance API key</InputLabel>
                    <OutlinedInput
                      value={exchangeAPI.Binance.key}
                      label="Binance API key"
                      onChange={(event) => {
                        setExchangeAPI({
                          ...exchangeAPI,
                          Binance: { ...exchangeAPI.Binance, key: event.target.value },
                        });
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Binance API secret</InputLabel>
                    <OutlinedInput
                      value={exchangeAPI.Binance.secret}
                      label="Binance API secret"
                      onChange={(event) => {
                        setExchangeAPI({
                          ...exchangeAPI,
                          Binance: { ...exchangeAPI.Binance, secret: event.target.value },
                        });
                      }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box
                    component="img"
                    sx={{
                      maxWidth: { xs: 250, md: 150 },
                    }}
                    alt="Bitfinex"
                    src={`/assets/Bitfinex.png`}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Bitfinex API key</InputLabel>
                    <OutlinedInput
                      value={exchangeAPI.Bitfinex.key}
                      label="Bitfinex API key"
                      onChange={(event) => {
                        setExchangeAPI({
                          ...exchangeAPI,
                          Bitfinex: { ...exchangeAPI.Bitfinex, key: event.target.value },
                        });
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth required>
                    <InputLabel>Bitfinex API secret</InputLabel>
                    <OutlinedInput
                      value={exchangeAPI.Bitfinex.secret}
                      label="Bitfinex API secret"
                      onChange={(event) => {
                        setExchangeAPI({
                          ...exchangeAPI,
                          Bitfinex: { ...exchangeAPI.Bitfinex, secret: event.target.value },
                        });
                      }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </>
          )}
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </CardActions>
      </Card>
    </form>
  );
}
