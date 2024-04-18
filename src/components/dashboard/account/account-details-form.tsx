'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';

export function AccountDetailsForm(): React.JSX.Element {
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
          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Name</InputLabel>
                <OutlinedInput defaultValue="Sofia Rivers" label="Name" name="name" disabled />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput defaultValue="sofia@devias.io" label="Email address" name="email" disabled />
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <Box
                component="img"
                sx={{
                  maxWidth: { xs: 250, md: 150 },
                }}
                alt="Binance"
                src="/assets/Binance.png"
              />
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Binance API key</InputLabel>
                <OutlinedInput defaultValue="geij1=i1" label="Binance API key" />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Binance secret</InputLabel>
                <OutlinedInput defaultValue="geij1=i1" label="Binance secret" />
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <Box
                component="img"
                sx={{
                  maxWidth: { xs: 250, md: 150 },
                }}
                alt="OKX"
                src="/assets/OKX.svg"
              />
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>OKX API key</InputLabel>
                <OutlinedInput defaultValue="geij1=i1" label="OKX API key" />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>OKX secret</InputLabel>
                <OutlinedInput defaultValue="geij1=i1" label="OKX secret" />
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <Box
                component="img"
                sx={{
                  maxWidth: { xs: 250, md: 150 },
                }}
                alt="max exchange"
                src="/assets/max-exchange-logo.png"
              />
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Max API key</InputLabel>
                <OutlinedInput defaultValue="geij1=i1" label="Max API key" />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Max secret</InputLabel>
                <OutlinedInput defaultValue="geij1=i1" label="Max secret" />
              </FormControl>
            </Grid>
            <Grid xs={12}>
              <Box
                component="img"
                sx={{
                  maxWidth: { xs: 250, md: 150 },
                }}
                alt="Bitinex"
                src="/assets/Bitinex.png"
              />
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Bitfinex API key</InputLabel>
                <OutlinedInput defaultValue="geij1=i1" label="Bitfinex API key" />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Bitfinex secret</InputLabel>
                <OutlinedInput defaultValue="geij1=i1" label="Bitfinex secret" />
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained">Save</Button>
        </CardActions>
      </Card>
    </form>
  );
}
