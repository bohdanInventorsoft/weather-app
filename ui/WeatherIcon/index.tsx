import React from 'react'
import Image from 'next/image'

const WeatherIcon = ({ code, name, size }: { code: string; name: string; size: number }) => {
  return <Image alt={name} src={`https://openweathermap.org/img/wn/${code}.png`} width={size} height={size} />
}
export default WeatherIcon
