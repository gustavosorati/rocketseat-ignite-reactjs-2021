import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { SessionProvider } from "next-auth/react"

import { Header } from '../components/Header';
import '../styles/global.scss';

function MyApp({ Component, pageProps} : AppProps) { 
  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch('http://localhost:3000/api/users');
  //     const json = await response.json()
  //     console.log(json)
  //   })();
  // }, [])

  return (
    <>
      <SessionProvider session={pageProps.session}>
        <Header/>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  )
}

export default MyApp
