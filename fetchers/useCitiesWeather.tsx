import React, { useEffect } from 'react'
import { useStateContext } from '@/state/store'
import { ActionType } from '@/state/actions'
import WeatherService from '@services/WeatherService'
import { useHistory } from '@/contexts/HistoryProvider'

interface WithCitiesProps {
  Component: React.ElementType;
}

const useCitiesWeather = () => {
  const [selectedCity, dispatch] = useStateContext((store) => store.selectedCity);
  const { add } = useHistory()
  useEffect(() => {
    const fetch = async () => {
      if (!selectedCity.name) {
        return;
      }
      const resp = await WeatherService.getCitiesWeather(selectedCity.name, selectedCity.country);
      add(selectedCity.name, {
        id: selectedCity.name,
        city: selectedCity.name,
        country: selectedCity.country,
        timestamp: Date.now(),
      });
      dispatch({ type: ActionType.SET_CITIES_WEATHER, payload: resp });
    };

    if (selectedCity) {
      fetch();
    }
  }, [selectedCity.name]);
};

export default useCitiesWeather
