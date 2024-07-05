'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useQuery } from '@tanstack/react-query';
import { DatePicker } from 'antd';
import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs';

import { paths } from '@/paths';
import { NoData } from '@/components/core/no-data';
import { Reports } from '@/components/dashboard/overview/reports';

// import { Sales } from '@/components/dashboard/overview/sales';

export interface ReportData {
  amount: string;
  crypto: string;
  exchange: string;
  id: number;
  price: string;
  report_time: number;
  trade_rate: string;
  user_id: number;
}

const { RangePicker } = DatePicker;

export default function Main(): React.JSX.Element {
  const router = useRouter();
  const [exchange, setExchange] = React.useState('Binance');
  const [value, setValue] = React.useState<[start: Dayjs | null, end: Dayjs | null]>([
    dayjs().subtract(1, 'month'),
    dayjs(),
  ]);

  let authToken;
  if (typeof window !== 'undefined') {
    authToken = sessionStorage.getItem('auth-token') ? sessionStorage.getItem('auth-token') : '';
  }
  const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
  const { isLoading, data, error, refetch } = useQuery<ReportData[]>({
    queryKey: ['getReport'],
    queryFn: async () => {
      const res = await axios.get<{ data: ReportData[] }>('https://api.besttrade.company/api/v1/report', {
        headers,
        params: {
          exchange: exchange,
          start_time: value[0]?.valueOf() ? value[0]?.valueOf() / 1000 : 0,
          end_time: value[1]?.valueOf() ? value[1]?.valueOf() / 1000 : 0,
        },
      });
      return res.data.data;
    },
  });

  React.useEffect(() => {
    if (error) {
      router.replace(paths.auth.signIn);
    }
  }, [error, router]);

  const handleRefetch = async () => {
    try {
      await refetch();
    } catch (err) {
      router.replace(paths.auth.signIn);
    }
  };

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises  -- We know the promise will be handled elsewhere
    handleRefetch();
  }, [refetch, value, exchange]);

  const handleChange = (event: SelectChangeEvent) => {
    setExchange(event.target.value);
  };

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Grid lg={12} xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="h4" gutterBottom>
                損益報表
              </Typography>
              <Box sx={{ display: 'flex', gap: '20px' }}>
                <Select value={exchange} onChange={handleChange}>
                  <MenuItem value="Binance">Binance</MenuItem>
                  <MenuItem value="Bitfinex">Bitfinex</MenuItem>
                </Select>
                <RangePicker
                  picker="date"
                  id={{
                    start: 'startInput',
                    end: 'endInput',
                  }}
                  onChange={(dates) => {
                    if (dates !== null) {
                      setValue(dates);
                    }
                  }}
                />
              </Box>
            </Box>
          </Grid>
          {data ? (
            <>
              {/* <Grid lg={12} xs={12}>
                <Sales
                  chartSeries={[{ name: '損益', data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20] }]}
                  sx={{ height: '100%' }}
                />
              </Grid> */}
              <Grid lg={12} md={12} xs={12}>
                <Reports reports={data} sx={{ height: '100%' }} />
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
