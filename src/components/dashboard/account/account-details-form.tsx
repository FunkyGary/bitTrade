'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Grid from '@mui/material/Unstable_Grid2';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function AccountDetailsForm(): React.JSX.Element {
  const { isLoading, data } = useQuery({
    queryKey: ['getExchangeApi'],
    queryFn: async () => {
      const res = await axios.get('https://api.besttrade.company/api/v1/user/exchange-api', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('auth-token')}`,
        },
      });
      return res.data.data;
    },
  });
  console.log(data);
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
              {data.map((e) => (
                <>
                  <Grid xs={12} key={e.id}>
                    <Box
                      component="img"
                      sx={{
                        maxWidth: { xs: 250, md: 150 },
                      }}
                      alt={e.exchange}
                      src={`/assets/${e.exchange}.png`}
                    />
                  </Grid>
                  <Grid md={6} xs={12}>
                    <FormControl fullWidth required>
                      <InputLabel>{e.exchange} API key</InputLabel>
                      <OutlinedInput value={e.key} label={`${e.exchange} API key`} />
                    </FormControl>
                  </Grid>
                  <Grid md={6} xs={12}>
                    <FormControl fullWidth required>
                      <InputLabel>{e.exchange} secret</InputLabel>
                      <OutlinedInput value={e.secret} label={`${e.exchange} secret`} />
                    </FormControl>
                  </Grid>
                </>
              ))}
            </Grid>

            // {            data.map(e=>{
            //                       switch (e.exchange) {
            //           case '"Bitfinex"':
            //             return (<>              <Grid xs={12}>
            //                 <Box
            //                   component="img"
            //                   sx={{
            //                     maxWidth: { xs: 250, md: 150 },
            //                   }}
            //                   alt="Bitinex"
            //                   src="/assets/Bitinex.png"
            //                 />
            //               </Grid>
            //               <Grid md={6} xs={12}>
            //                 <FormControl fullWidth required>
            //                   <InputLabel>Bitfinex API key</InputLabel>
            //                   <OutlinedInput defaultValue="geij1=i1" label="Bitfinex API key" />
            //                 </FormControl>
            //               </Grid>
            //               <Grid md={6} xs={12}>
            //                 <FormControl fullWidth required>
            //                   <InputLabel>Bitfinex secret</InputLabel>
            //                   <OutlinedInput defaultValue="geij1=i1" label="Bitfinex secret" />
            //                 </FormControl>
            //               </Grid></>);
            //             break;
            //           default:
            //             return;
            //         }
            //             })}
            // <Grid container spacing={3}>
            //   <Grid xs={12}>
            //     <Box
            //       component="img"
            //       sx={{
            //         maxWidth: { xs: 250, md: 150 },
            //       }}
            //       alt="Binance"
            //       src="/assets/Binance.png"
            //     />
            //   </Grid>
            //   <Grid md={6} xs={12}>
            //     <FormControl fullWidth required>
            //       <InputLabel>Binance API key</InputLabel>
            //       <OutlinedInput defaultValue="geij1=i1" label="Binance API key" />
            //     </FormControl>
            //   </Grid>
            //   <Grid md={6} xs={12}>
            //     <FormControl fullWidth required>
            //       <InputLabel>Binance secret</InputLabel>
            //       <OutlinedInput defaultValue="geij1=i1" label="Binance secret" />
            //     </FormControl>
            //   </Grid>
            //   <Grid xs={12}>
            //     <Box
            //       component="img"
            //       sx={{
            //         maxWidth: { xs: 250, md: 150 },
            //       }}
            //       alt="OKX"
            //       src="/assets/OKX.svg"
            //     />
            //   </Grid>
            //   <Grid md={6} xs={12}>
            //     <FormControl fullWidth required>
            //       <InputLabel>OKX API key</InputLabel>
            //       <OutlinedInput defaultValue="geij1=i1" label="OKX API key" />
            //     </FormControl>
            //   </Grid>
            //   <Grid md={6} xs={12}>
            //     <FormControl fullWidth required>
            //       <InputLabel>OKX secret</InputLabel>
            //       <OutlinedInput defaultValue="geij1=i1" label="OKX secret" />
            //     </FormControl>
            //   </Grid>
            //   <Grid xs={12}>
            //     <Box
            //       component="img"
            //       sx={{
            //         maxWidth: { xs: 250, md: 150 },
            //       }}
            //       alt="max exchange"
            //       src="/assets/max-exchange-logo.png"
            //     />
            //   </Grid>
            //   <Grid md={6} xs={12}>
            //     <FormControl fullWidth required>
            //       <InputLabel>Max API key</InputLabel>
            //       <OutlinedInput defaultValue="geij1=i1" label="Max API key" />
            //     </FormControl>
            //   </Grid>
            //   <Grid md={6} xs={12}>
            //     <FormControl fullWidth required>
            //       <InputLabel>Max secret</InputLabel>
            //       <OutlinedInput defaultValue="geij1=i1" label="Max secret" />
            //     </FormControl>
            //   </Grid>
            // </Grid>
          )}
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained">Save</Button>
        </CardActions>
      </Card>
    </form>
  );
}
