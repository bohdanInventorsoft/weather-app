import { findCitiesByString, getCitiesWeather } from '@/pages/api/weather/weather.service'
import { ApiReducer, ApiRequestI, ApiResponse } from '@/models/Api'
export enum WeatherActions {
  GET_CITIES = 'GET_CITIES',
  GET_WEATHER = 'GET_WEATHER',
}

export class WeatherReducer extends ApiReducer<WeatherActions> {
  public async pass(post: ApiRequestI<WeatherActions>): Promise<ApiResponse> {
    if (!this.isValid(post)) {
      return { status: 400, message: 'Invalid request' }
    }
    const payload = post.payload

    switch (post.action) {
      case WeatherActions.GET_CITIES:
        return await findCitiesByString(payload.name, payload.limit)
      case WeatherActions.GET_WEATHER:
        return await getCitiesWeather(payload.name, payload.country)
    }

    return Promise.reject({ status: 400, text: 'No action' })
  }
}
