import Head from 'next/head'
import { useBoat } from '@/endpoints/get'
import { useRouter } from 'next/router'
import Loading from '@/components/small/Loading'

export default function BoatAndYachtRentals() {
	const router = useRouter()
	const { boatId } = router.query

	const { boat, isLoading } = useBoat(boatId)

	if (isLoading) {
		return <div className="flex justify-center mt-12"><Loading /></div>
	}

	return(<>
		<Head>
		  <title>Bored and Yachting | {boat.name}</title>
		  <meta name="description" content="" />
		</Head>
		<main>
			Boat / yacht pictures + info
			{JSON.stringify(boat)}
			<button>Instant Book</button>
			<button>Request Reservation</button>
		</main>
	</>)
}