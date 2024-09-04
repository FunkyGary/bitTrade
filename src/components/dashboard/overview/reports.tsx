'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import type { SxProps } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import dayjs from 'dayjs';

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

export interface LatestOrdersProps {
  reports?: ReportData[];
  sx?: SxProps;
}

export function Reports({ reports, sx }: LatestOrdersProps): React.JSX.Element {
  return (
    <Card sx={sx}>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 800 }}>
          <TableHead>
            <TableRow>
              <TableCell>report_time</TableCell>
              <TableCell>exchange</TableCell>
              <TableCell>crypto</TableCell>
              <TableCell>amount</TableCell>
              <TableCell>price</TableCell>
              <TableCell>trade_rate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports?.map((report) => {
              return (
                <TableRow hover key={report.id}>
                  <TableCell>{dayjs(report.report_time * 1000).format('MMM D, YYYY')}</TableCell>
                  <TableCell>{report.exchange}</TableCell>
                  <TableCell>{report.crypto}</TableCell>
                  <TableCell>{report.amount}</TableCell>
                  <TableCell>{report.price}</TableCell>
                  <TableCell>{report.trade_rate}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </Card>
  );
}
