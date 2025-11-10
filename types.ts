export enum LinodeStatus {
  RUNNING = 'running',
  OFFLINE = 'offline',
  BOOTING = 'booting',
  PROVISIONING = 'provisioning',
}

export interface Region {
  id: string;
  country: string;
  label: string;
}

export interface Image {
  id: string;
  label: string;
  vendor: string;
}

export interface Plan {
  id: string;
  label: string;
  price: number;
  memory: number;
  disk: number;
  cpus: number;
}

export interface Linode {
  id: number;
  label: string;
  status: LinodeStatus;
  ipv4: string;
  region: string;
  image: string;
  plan: string;
  tags: string[];
  created: string;
}

export type ViewState = 'dashboard' | 'linodes' | 'create' | 'detail';