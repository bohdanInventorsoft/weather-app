import { useClickAway, useDebounce } from 'react-use'
import { useRef, useState } from 'react'
import { City } from '@models/City'
import Typo from '@ui/Typo'
import WeatherService from '@services/weather'
import { Input } from '@ui/Input'
import Card from '@ui/Card'
import { useHistory } from '@contexts/HistoryProvider'
export const CityInput = ({ onChange }: { onChange: (val:City) => void }) => {
  const [search, setSearch] = useState('')
  const [citiesList, setCities] = useState<Array<City>>([])
  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)
  const { history, removedHistory} = useHistory()
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
            if(resp.status === 200) {
              const data = await resp.json()
              setCities(data)
              setShow(true)
            }

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
    500,
    [search]
  )

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
            'absolute w-full bottom-0 left-0 border border-[#23292c] bg-[#080e12] px-2 translate-y-full'
          }
          borderRadius={'rounded-none'}
          variant={'grey1'}
        >
          <div className={'w-full h-full'} ref={ref}>
            {loading ? 'Loading...' : null}
            {citiesList.length
              ? citiesList?.map((city) => (
                  <div
                    className={'flex items-center gap-1 text-white h-9 cursor-pointer'}
                    key={`${city.lat} + ${city.lon}`}
                    onClick={() => {
                      onChange(city)
                      setSearch('')
                    }
                  }
                  >
                    <Typo variant={'grey'}>{city.name},</Typo>
                    <Typo variant={'grey'}>{city.state}</Typo>
                    <Typo variant={'grey'}>{city.country}</Typo>
                  </div>
                ))
              : null}
          </div>
        </Card>
      ) : null}
    </div>
  )
}
