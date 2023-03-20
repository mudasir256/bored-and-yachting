import Head from 'next/head'
import { useBoats } from '@/endpoints/get'
import Loading from '@/components/small/Loading'
import Link from 'next/link'

export default function Home() {

  const { boats, isLoading } = useBoats()

  const BoatGrid = () => {
    const cards = boats?.map(boat => (
      <Link href={`/charters/${boat._id}`} key={boat._id} className="rounded shadow p-4 cursor-pointer">
        boat name and pictures details
      </Link>
    ))

    return <div className="flex flex-row justify-between p-4 gap-2">
      {cards}
    </div>
  }


  return (
    <>
      <Head>
        <title>Bored and Yachting</title>
        <meta name="description" content="" />
      </Head>
      <main>
          {isLoading 
            ? <div className="flex justify-center mt-12"><Loading /></div> 
            : <BoatGrid />
          }
      </main>
    </>
  )
}
