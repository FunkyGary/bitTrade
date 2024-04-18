import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: '損益報表', href: paths.dashboard.overview, icon: 'chart-pie' },
  // { key: 'customers', title: 'Customers', href: paths.dashboard.customers, icon: 'users' },
  { key: 'integrations', title: '下單記錄', href: paths.dashboard.customers, icon: 'plugs-connected' },
  // { key: 'settings', title: 'Settings', href: paths.dashboard.settings, icon: 'gear-six' },
  { key: 'account', title: '帳戶管理', href: paths.dashboard.account, icon: 'user' },
  // { key: 'error', title: 'Error', href: paths.errors.notFound, icon: 'x-square' },
] satisfies NavItemConfig[];
