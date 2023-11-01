import { AppProps } from 'next/app'
import '@/assets/globals.css'
import 'react-toastify/dist/ReactToastify.css'
import { HistoryProviderWrapper } from '@/contexts/HistoryProvider'
import { StateProvider } from '@/state/store'
import { ToastContainer } from 'react-toastify'

function MyApp({ Component, pageProps }: AppProps & { Component: { Header?: React.FC } }) {
  return (
    <StateProvider>
      <HistoryProviderWrapper>
        <Component {...pageProps} />
      </HistoryProviderWrapper>
      <ToastContainer
        autoClose={3000}
        closeOnClick
        hideProgressBar={false}
        theme={'dark'}
        icon={false}
        newestOnTop={false}
        position="bottom-right"
        rtl={false}
      />
    </StateProvider>
  )
}

export default MyApp
