import React from 'react'
import Card from '@ui/Card'
import WeatherIcon from '@ui/WeatherIcon'
import Typo from '@ui/Typo'
import { WeatherI } from '@models/WeatherI'

const WeatherInfo = ({ weatherIcon, name, tempMin, temp, tempMax, weather, windSpeed }: WeatherI) => {
  return (
    <Card className={'grid grid-cols-2 gap-1 relative p-4 w-full min-h-[200px]'} borderRadius={'rounded-none'} variant={'tertiaryAqua'}>
      <Typo className={'text-2xl text-center col-span-2'} as={'p'} variant={'white'}>
        Location:
      </Typo>
      {name ? (
        <>
          <Typo as={'h1'} className={'text-lg col-span-2 text-center'} variant={'white'}>
            {name}
          </Typo>
          <div className={'flex justify-center items-center col-span-2'}>
            <WeatherIcon code={weatherIcon} name={name} size={68} />
            <Typo variant={'white'}>{weather}</Typo>
          </div>
          <div className={'flex justify-center gap-2 col-span-2'}>
            <Typo variant={'white'}>
              T:{parseFloat(temp).toFixed(0)}&deg;
            </Typo>
            <Typo variant={'white'}>H: {parseFloat(tempMax).toFixed(0)}&deg;</Typo>
            <Typo variant={'white'}>L: {parseFloat(tempMin).toFixed(0)}&deg;</Typo>
          </div>

          <div className={'flex justify-center gap-2 col-span-2'}>
            <Typo variant={'white'}>Wind speed: {parseFloat(windSpeed).toFixed(0)}m/s</Typo>
          </div>
        </>
      ) : (
        <Typo className={'text-6xl col-span-2 text-center'} variant={'white'}>
          -
        </Typo>
      )}
    </Card>
  )
}
export default WeatherInfo
