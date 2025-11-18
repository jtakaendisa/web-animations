import { clients } from '../_data';

export type Client = (typeof clients)[number];

export type ActiveIndex = number | null;
