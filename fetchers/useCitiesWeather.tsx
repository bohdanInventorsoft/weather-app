import React, { useEffect } from 'react'
import { useStateContext } from '@/state/store'
import { ActionType } from '@/state/actions'
import WeatherService from '@services/weather'
import { useHistory } from '@/contexts/HistoryProvider'
import { toast } from 'react-toastify'

const useCitiesWeather = () => {
  const [selectedCity, dispatch] = useStateContext((store) => store.selectedCity);
  const { add } = useHistory()
  const fetch = async () => {
    if (!selectedCity.name) {
      return;
    }
    const resp = await WeatherService.getCitiesWeather(selectedCity);
    if(resp?.status === 200) {
      const data = await resp.json()
      add(selectedCity.name, {
        id: selectedCity.name,
        city: selectedCity,
        country: selectedCity.country,
        timestamp: Date.now(),
      });
      dispatch({ type: ActionType.SET_CITIES_WEATHER, payload: data });
      return
    }
    toast.error(resp.status === 404 ? 'Cities weather not found' : resp.statusText)
  };
  useEffect(() => {
    if (selectedCity) {
      fetch();
    }
  }, [selectedCity]);
};

export default useCitiesWeather
