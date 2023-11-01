import { WeatherI } from '@/models/WeatherI'
import { City } from '@models/City'

export enum ActionType {
  'SET_CITIES_WEATHER' = 'SET_CITIES_WEATHER',
  'SELECT_CITY' = 'SELECT_CITY'
}

export type Action =
    | { type: ActionType.SELECT_CITY; payload: City }
    | { type: ActionType.SET_CITIES_WEATHER; payload: WeatherI }