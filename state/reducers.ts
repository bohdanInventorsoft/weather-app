import { StateContext } from '@/state/store'
import { Action, ActionType } from '@/state/actions'

export function reducer(state: StateContext, action: Action) {
  switch (action.type) {
    case ActionType.SET_CITIES_WEATHER:
      return { ...state, weatherForecast: action.payload }
    case ActionType.SELECT_CITY:
      return { ...state, selectedCity: action.payload }
    default:
      return state
  }
}