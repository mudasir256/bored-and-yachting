import '@/styles/globals.css'
import Head from 'next/head'

import Navbar from '@/components/Navbar'
import FooterNav from '@/components/FooterNav'

export default function App({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return (<>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <Navbar />
    {getLayout(<Component {...pageProps} />)}
    <FooterNav />
  </>)
}
