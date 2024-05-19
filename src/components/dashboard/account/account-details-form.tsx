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
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { paths } from '@/paths';

interface ExchangeApiData {
  id: string;
  exchange: string;
  key: string;
  secret: string;
}

export function AccountDetailsForm(): React.ReactElement {
  const authToken = localStorage.getItem('auth-token');
  const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
  const { isLoading, error, data } = useQuery<ExchangeApiData[]>({
    queryKey: ['getExchangeApi'],
    queryFn: async () => {
      const res = await axios.get<{ data: ExchangeApiData[] }>(
        'https://api.besttrade.company/api/v1/user/exchange-api',
        {
          headers: headers,
        }
      );
      return res.data.data;
    },
  });

  if (error) {
    redirect(paths.auth.signIn);
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <Grid container spacing={3}>
              {data?.map((e) => (
                <React.Fragment key={e.id}>
                  <Grid item xs={12}>
                    <Box
                      component="img"
                      sx={{
                        maxWidth: { xs: 250, md: 150 },
                      }}
                      alt={e.exchange}
                      src={`/assets/${e.exchange}.png`}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <FormControl fullWidth required>
                      <InputLabel>{`${e.exchange} API key`}</InputLabel>
                      <OutlinedInput value={e.key} label={`${e.exchange} API key`} />
                    </FormControl>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <FormControl fullWidth required>
                      <InputLabel>{`${e.exchange} secret`}</InputLabel>
                      <OutlinedInput value={e.secret} label={`${e.exchange} secret`} />
                    </FormControl>
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
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
