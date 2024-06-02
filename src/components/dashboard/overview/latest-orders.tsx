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

import { NoData } from '@/components/core/no-data';

export interface Order {
  amount: string;
  created_at: string;
  crypto: string;
  id: number;
  price: string;
  trade_direction: string;
  trade_rate: string;
  updated_at: string;
  user_id: number;
}

export interface LatestOrdersProps {
  orders?: Order[];
  sx?: SxProps;
}

export function LatestOrders({ orders, sx }: LatestOrdersProps): React.JSX.Element {
  return (
    <Card sx={sx}>
      <Box sx={{ overflowX: 'auto' }}>
        {orders ? (
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow>
                <TableCell>created_at</TableCell>
                <TableCell>crypto</TableCell>
                <TableCell>trade_direction</TableCell>
                <TableCell>amount</TableCell>
                <TableCell>trade_rate</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => {
                return (
                  <TableRow hover key={order.id}>
                    <TableCell>{dayjs(order.created_at).format('MMM D, YYYY')}</TableCell>
                    <TableCell>{order.crypto}</TableCell>
                    <TableCell>{order.trade_direction}</TableCell>
                    <TableCell>{order.amount}</TableCell>
                    <TableCell>{order.trade_rate}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <NoData />
        )}
      </Box>
    </Card>
  );
}
