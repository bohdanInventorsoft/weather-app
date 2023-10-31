import { createContext, useCallback, useContext, useRef, useSyncExternalStore } from 'react'
import { WeatherI } from '@/models/WeatherI'
import { Action } from '@/state/actions'
import { reducer } from '@/state/reducers'

export interface StateContext {
  weatherForecast: WeatherI
  selectedCity: {name: string, country: string}
}

const defaultState = {
  weatherForecast : {
    weatherIcon: '',
    name: '',
    tempMin: '',
    temp: '',
    tempMax: '',
    windSpeed: '',
    weather: '',
    country: '',
    city: ''
  },
  selectedCity: {
    name: '',
    country: ''
  }
}
export function useStateContext<SelectorOutput>(
  selector: (store: StateContext) => SelectorOutput
): [SelectorOutput, (value: Action) => void] {
  const store = useContext(StoreContext)
  if (!store) {
    throw new Error('Store not found')
  }
  const state = useSyncExternalStore(
    store.subscribe,
    () => selector(store.get()),
    () => selector(defaultState)
  )

  return [state, store.set]
}

export function useStoreData(): {
  get: () => StateContext
  set: (value: Action) => void
  subscribe: (callback: () => void) => () => void
} {
  const store = useRef(defaultState)

  const get = useCallback(() => store.current, [])

  const subscribers = useRef(new Set<() => void>())

  const set = useCallback((value: Action) => {
    store.current = reducer(store.current, value)
    subscribers.current.forEach((callback) => callback())
  }, [])

  const subscribe = useCallback((callback: () => void) => {
    subscribers.current.add(callback)
    return () => subscribers.current.delete(callback)
  }, [])

  return {
    get,
    set,
    subscribe,
  }
}

type UseStoreDataReturnType = ReturnType<typeof useStoreData>

const StoreContext = createContext<UseStoreDataReturnType | null>(null)

export function StateProvider({ children }: { children: React.ReactNode }) {
  return <StoreContext.Provider value={useStoreData()}>{children}</StoreContext.Provider>
}