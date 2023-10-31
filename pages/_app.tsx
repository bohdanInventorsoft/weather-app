import { AppProps } from 'next/app'
import '@/assets/globals.css'
import { HistoryProviderWrapper } from '@/contexts/HistoryProvider'
import { StateProvider } from '@/state/store'

function MyApp({ Component, pageProps }: AppProps & { Component: { Header?: React.FC } }) {
  return (
    <StateProvider>
      <HistoryProviderWrapper>
        <Component {...pageProps} />
      </HistoryProviderWrapper>
    </StateProvider>
  )
}

export default MyApp
