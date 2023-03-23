import Head from 'next/head'
import { useBoats } from '@/endpoints/get'
import Loading from '@/components/small/Loading'
import Link from 'next/link'
import Image from 'next/image'
import { getLowestRateWithoutGratuity } from '@/helpers/money'
import { RATE_LENGTHS, formatMoney } from '@/helpers/index'

export default function Home() {

  const { boats, isLoading } = useBoats()

  const BoatGrid = () => {
    const cards = boats?.map(boat => (
      <Link href={`/charters/${boat._id}`} key={boat._id} className="rounded m-4 cursor-pointer">
        <div className="shadow relative w-80 h-72">
          <Image className="rounded" alt={boat.name} layout="fill" src={boat.photos[0]} objectFit="cover"  />
        </div>
        <div className="mt-2">
          <p className="font-bold">{boat.name}</p>
          <p>address snippet</p>
          <p><span className="text-sm">starting at&nbsp;</span><span className="font-bold">{formatMoney(getLowestRateWithoutGratuity(boat, RATE_LENGTHS.HALF_DAY))}</span></p>
        </div>
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
