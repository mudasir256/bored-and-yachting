import Head from 'next/head'
import { useBoats } from '@/endpoints/get'
import Loading from '@/components/small/Loading'
import BoatGrid from '@/components/combined/utility/BoatGrid'
export default function Home() {

  const { boats, isLoading } = useBoats()

  return (
    <>
      <Head>
        <title>Bored and Yachting</title>
        <meta name="description" content="" />
      </Head>
      <main>
          {isLoading 
            ? <div className="flex justify-center mt-12"><Loading /></div> 
            : <BoatGrid boats={boats} />
          }
      </main>
    </>
  )
}
