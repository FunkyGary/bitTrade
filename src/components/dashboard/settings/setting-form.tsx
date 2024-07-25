'use client';

import * as React from 'react';
import { Button, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface TradeSetting {
  id: number;
  amount: string;
  exchange: string;
  currency: string;
  risk_reference: string;
}

interface TradeSettingFormProps {
  tradeSetting: TradeSetting;
}

function SettingForm({ tradeSetting }: TradeSettingFormProps) {
  let authToken;
  if (typeof window !== 'undefined') {
    authToken = sessionStorage.getItem('auth-token') ? sessionStorage.getItem('auth-token') : '';
  }
  const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};

  const { control, handleSubmit } = useForm<TradeSetting>({
    defaultValues: {
      id: tradeSetting.id,
      amount: tradeSetting.amount,
      exchange: tradeSetting.exchange,
      currency: tradeSetting.currency,
      risk_reference: tradeSetting.risk_reference,
    },
  });

  const mutation = useMutation({
    mutationFn: async ({ id, input }: { id: number; input: TradeSetting }) => {
      await axios.patch(
        `https://api.besttrade.company/api/v1/user/trade-setting/${id.toString()}`,
        { amount: input.amount, risk_reference: input.risk_reference },
        {
          headers,
        }
      );
    },
    onSuccess: () => {
      toast.success('設定成功');
    },
    onError: () => {
      toast.error('設定失敗');
    },
  });

  const onSubmit = (formData: TradeSetting) => {
    mutation.mutate({ id: formData.id, input: formData });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3} sx={{ display: 'flex', alignItems: 'center' }}>
        <Grid item>
          <FormControl sx={{ width: '150px' }} disabled>
            <InputLabel>交易所</InputLabel>
            <OutlinedInput value={tradeSetting.exchange} label="交易所" />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl sx={{ width: '150px' }} disabled>
            <InputLabel>幣種</InputLabel>
            <OutlinedInput value={tradeSetting.currency} label="幣種" />
          </FormControl>
        </Grid>
        <Grid item>
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <FormControl sx={{ width: '150px' }} required>
                <InputLabel>金額</InputLabel>
                <OutlinedInput {...field} label="金額" />
              </FormControl>
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            name="risk_reference"
            control={control}
            render={({ field }) => (
              <FormControl sx={{ width: '150px' }} required>
                <InputLabel>風險偏好</InputLabel>
                <Select {...field} label="風險偏好">
                  <MenuItem value="Conservative">保守型</MenuItem>
                  <MenuItem value="Balanced">均衡型</MenuItem>
                  <MenuItem value="Aggressive">積極型</MenuItem>
                </Select>
              </FormControl>
            )}
          />
        </Grid>
        <Grid item>
          <Button variant="outlined" type="submit">
            更新
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default SettingForm;
