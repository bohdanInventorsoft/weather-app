import fs from 'fs'
import path from 'path'
import { OpenWeatherResponseI } from '@/models/OpenWeatherResponseI'
import { City } from '@/models/City'
export const findCitiesByString = async (name: string, limit: number) => {
  const filePath = path.join(process.cwd(), './db', 'indexedCIties.json')
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

  const citiesRes = jsonData[name[0].toLowerCase()]?.filter((city: City) => {
    const temp = city.name.toLowerCase()
    return temp.indexOf(name.toLowerCase()) > -1
  })

  return Promise.resolve({ status: 200, body: citiesRes ? citiesRes.slice(0, limit) : [] })
}

export const getCitiesWeather = async (city: string, country: string) => {
  try {
    const url = 'https://api.openweathermap.org/data/2.5/weather'
    const params = new URLSearchParams()
    params.append('q', `${city}`)
    params.append('units', 'metric')
    params.append('appid', process.env.OPEN_WEATHER_API_KEY as string)
    console.log(city, country, '===')
    const resp = await fetch(`${url}?${params.toString()}`)

    if (resp.status === 200) {
      const data = (await resp.json()) as OpenWeatherResponseI
      const serialized = {
        name: city,
        temp: data.main.temp,
        tempMin: data.main.temp_min,
        tempMax: data.main.temp_max,
        windSpeed: data.wind.speed,
        weather: data.weather[0].main,
        weatherIcon: data.weather[0].icon,
      }

      return { status: 200, body: serialized }
    }
    return { status: 400, message: 'Something went wrong' }
  } catch (err) {
    console.log('getCitiesWeather', err)
    return { status: 500, message: 'Something went wrong' }
  }
}
