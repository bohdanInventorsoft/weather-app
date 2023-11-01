import { City } from '@models/City'

export type HistoryEntry = {
  id: string;
  timestamp: number;
  city: City;
  country: string;
};