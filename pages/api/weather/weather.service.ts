import { OpenWeatherResponseI } from '@/models/OpenWeatherResponseI'

export const getCitiesWeather = async ({ name, country, state}:{ country: string, state:string, name: string}) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather`
    const params = new URLSearchParams()
    params.append('q', `${name},${state},${country}`)
    params.append('units', 'metric')
    params.append('appid', process.env.OPEN_WEATHER_API_KEY as string)

    const resp = await fetch(`${url}?${params.toString()}`)
    if (resp.status === 200) {
      const data = await resp.json() as OpenWeatherResponseI
      const serialized = {
        name: data.name,
        temp: data.main.temp,
        tempMin: data.main.temp_min,
        tempMax: data.main.temp_max,
        windSpeed: data.wind.speed,
        weather: data.weather[0].main,
        weatherIcon: data.weather[0].icon,
      }
      return { status: 200, body: serialized }
    }
    return { status: resp.status, statusText: resp.statusText}
  } catch(err:any) {
    console.log('getCitiesWeather', err)
    return { status: 500, statusText: 'Something went wrong'}
  }

}

export const getCities = async (city:string) => {
  try {
    const url2 = `http://api.openweathermap.org/geo/1.0/direct`
    const params2 = new URLSearchParams()
    params2.append('q', `${city}`)
    params2.append('limit', "10")
    params2.append('appid', process.env.OPEN_WEATHER_API_KEY as string)

    const resp2 = await fetch(`${url2}?${params2.toString()}`)

    if(resp2.status === 200) {
      const data = await resp2.json()
      return { status: 200, body: data }
    }
    return {status: resp2.status, statusText: resp2.statusText}
  }
  catch(err:any) {
    console.log('getCities', err)
    return {status: 500, statusText: 'Something went wrong'}
  }
}

