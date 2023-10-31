import { ApiRequestI } from '@/models/Api'
import { WeatherActions } from '@/pages/api/weather/weather.reducer'
import { ROUTES } from '@/pages/api/v1'

class WeatherService {
  public async call<ActionType>(data: ApiRequestI<ActionType>) {
    try {
      const response = await fetch('/api/v1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      return response.json()
    } catch (err: any) {
      err.description = 'API Error'
      return Promise.reject(err)
    }
  }

  public async getCities(name: string, limit: number) {
    return await this.call<WeatherActions>({
      route: ROUTES.WEATHER,
      action: WeatherActions.GET_CITIES,
      payload: { name, limit },
    })
  }

  public async getCitiesWeather(name: string, country: string) {
    return await this.call<WeatherActions>({
      route: ROUTES.WEATHER,
      action: WeatherActions.GET_WEATHER,
      payload: { name, country },
    })
  }
}

// const weatherService = new WeatherService()

export default new WeatherService()
