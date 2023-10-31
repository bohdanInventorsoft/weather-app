import React from 'react'
import Card from '@/ui/Card'
import WeatherIcon from '@/ui/WeatherIcon'
import Typo from '@/ui/Typo'
import { WeatherI } from '@/models/WeatherI'

const WeatherInfo = ({ weatherIcon, name, tempMin, temp, tempMax, weather }: WeatherI) => {
  return (
    <Card className={'grid grid-cols-2 gap-1 relative p-4 w-full min-h-[200px]'} variant={'tertiaryAqua'}>
      <Typo className={'text-3xl text-center col-span-2'} as={'p'} variant={'white'}>
        Location:
      </Typo>
      {name ? (
        <>
          <Typo as={'h1'} className={'text-lg col-span-2 text-center'} variant={'grey'}>
            {name}
          </Typo>
          <Typo className={'col-span-2 text-4xl text-center'} variant={'grey'}>
            {parseFloat(temp).toFixed(0)}&deg;
          </Typo>
          <div className={'flex flex-col items-center col-span-2'}>
            <WeatherIcon code={weatherIcon} name={name} size={68} />
            <Typo variant={'grey'}>{weather}</Typo>
          </div>
          <div className={'flex justify-center gap-2 col-span-2'}>
            <Typo variant={'grey'}>H: {parseFloat(tempMax).toFixed(0)}&deg;</Typo>
            <Typo variant={'grey'}>L: {parseFloat(tempMin).toFixed(0)}&deg;</Typo>
          </div>
        </>
      ) : (
        <Typo className={'text-6xl col-span-2 text-center'} variant={'grey'}>
          -
        </Typo>
      )}
    </Card>
  )
}
export default WeatherInfo
