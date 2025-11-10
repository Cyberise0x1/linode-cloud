import { Image, Plan, Region, Linode, LinodeStatus } from './types';

export const MOCK_REGIONS: Region[] = [
  { id: 'us-east', country: 'US', label: 'Newark, NJ' },
  { id: 'us-west', country: 'US', label: 'Fremont, CA' },
  { id: 'eu-central', country: 'DE', label: 'Frankfurt, DE' },
  { id: 'ap-south', country: 'SG', label: 'Singapore, SG' },
];

export const MOCK_IMAGES: Image[] = [
  { id: 'linode/ubuntu22.04', label: 'Ubuntu 22.04 LTS', vendor: 'Ubuntu' },
  { id: 'linode/debian11', label: 'Debian 11', vendor: 'Debian' },
  { id: 'linode/arch', label: 'Arch Linux', vendor: 'Arch' },
  { id: 'linode/centos-stream9', label: 'CentOS Stream 9', vendor: 'CentOS' },
];

export const MOCK_PLANS: Plan[] = [
  { id: 'g6-nanode-1', label: 'Nanode 1GB', price: 5, memory: 1024, disk: 25, cpus: 1 },
  { id: 'g6-standard-1', label: 'Linode 2GB', price: 10, memory: 2048, disk: 50, cpus: 1 },
  { id: 'g6-standard-2', label: 'Linode 4GB', price: 20, memory: 4096, disk: 80, cpus: 2 },
  { id: 'g6-standard-4', label: 'Linode 8GB', price: 40, memory: 8192, disk: 160, cpus: 4 },
];

export const INITIAL_LINODES: Linode[] = [
  {
    id: 101,
    label: 'web-prod-01',
    status: LinodeStatus.RUNNING,
    ipv4: '192.0.2.1',
    region: 'Newark, NJ',
    image: 'Ubuntu 22.04 LTS',
    plan: 'Linode 4GB',
    tags: ['production', 'web'],
    created: '2023-10-15T10:00:00Z',
  },
  {
    id: 102,
    label: 'db-primary',
    status: LinodeStatus.RUNNING,
    ipv4: '198.51.100.12',
    region: 'Newark, NJ',
    image: 'Debian 11',
    plan: 'Linode 8GB',
    tags: ['production', 'database'],
    created: '2023-11-01T08:30:00Z',
  },
  {
    id: 103,
    label: 'dev-sandbox',
    status: LinodeStatus.OFFLINE,
    ipv4: '203.0.113.45',
    region: 'Frankfurt, DE',
    image: 'Arch Linux',
    plan: 'Nanode 1GB',
    tags: ['dev', 'experiment'],
    created: '2024-01-20T14:15:00Z',
  },
];
