import { useClickAway, useDebounce } from 'react-use'
import { useRef, useState } from 'react'
import { City } from '@models/City'
import Typo from '@ui/Typo'
import WeatherService from '@services/WeatherService'
import { Input } from '@ui/Input'
import Card from '@ui/Card'
export const CityInput = ({ onChange }: { onChange: (val: { name: string; country: string }) => void }) => {
  const [search, setSearch] = useState('')
  const [citiesList, setCities] = useState<Array<City>>([])
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const ref = useRef(null)
  useClickAway(ref, () => {
    setShow(false)
  })

  useDebounce(
    () => {
      const pull = async () => {
        setLoading(true)
        try {
          if (search) {
            const resp = await WeatherService.getCities(search, 10)
            setCities(resp)
            setShow(true)
          } else {
            setCities([])
          }
        } catch (err: any) {
          console.log(err)
        }
        setLoading(false)
      }
      pull()
    },
    250,
    [search]
  )

  const selectCity = (name: string, country: string) => {
    onChange({ name, country })
    setSearch('')
  }

  return (
    <div className={'flex relative w-full h-fit'}>
      <Input
        name={'city-search'}
        className={'w-full '}
        variant={'primary'}
        value={search}
        placeholder={'Choose city'}
        onFocus={() => setShow(true)}
        autoComplete="new-password"
        onChange={(e) => {
          setSearch(e.target.value)
        }}
      />

      {show ? (
        <Card
          className={
            'absolute w-full bottom-0 left-0 border border-[#23292c] bg-[#080e12] px-2 translate-y-full rounded-lg'
          }
          variant={'grey1'}
        >
          <div className={'w-full h-full'} ref={ref}>
            {loading ? 'Loading...' : null}
            {citiesList.length
              ? citiesList?.map((city) => (
                  <div
                    className={'flex items-center gap-1 text-white h-9 cursor-pointer'}
                    key={city.id}
                    onClick={() => selectCity(city.name, city.country)}
                  >
                    <Typo variant={'grey'}>{city.name}</Typo>
                    <Typo variant={'grey'}>({city.country})</Typo>
                  </div>
                ))
              : null}
          </div>
        </Card>
      ) : null}
    </div>
  )
}
