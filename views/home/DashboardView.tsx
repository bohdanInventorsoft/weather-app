import React from 'react'
import { CityInput } from '@views/home/components/CityInput'
import { HistoryBoard } from '@views/home/components/HistoryBoard'
import { useStateContext } from '@state/store'
import useCitiesWeather from '@fetchers/useCitiesWeather'
import { ActionType } from '@state/actions'
import WeatherInfo from '@views/home/components/WeatherInfo'
import { City } from '@models/City'

const DashboardView = () => {
  const [weatherForecast, dispatch] = useStateContext((store) => store.weatherForecast)
  useCitiesWeather()
  const setCurrentCity = (c:City) => {
    dispatch({ type: ActionType.SELECT_CITY, payload: c })
  }

  return (
    <main className="grid grid-col-2 md:grid-cols-5 gap-4 lg:max-w-[560px] p-4 pt-[120px] mx-auto">
      <div className={'grid-col-2 md:col-span-5 z-10 relative'}>
        <CityInput onChange={setCurrentCity} />
      </div>
      <div className={'grid-col-2 md:col-span-2'}>
        <WeatherInfo {...weatherForecast} />{' '}
      </div>

      <div className={'grid-col-2 md:col-span-3'}>
        <HistoryBoard />
      </div>
    </main>
  )
}

export default DashboardView
