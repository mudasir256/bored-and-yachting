import Head from 'next/head'
import { useBoat } from '@/endpoints/get'
import { useRouter } from 'next/router'
import Loading from '@/components/small/Loading'
import Header from '@/components/small/Header'
import Image from 'next/image'
import ContentPageLayout from '@/components/layouts/ContentPageLayout'

export default function BoatAndYachtRentals() {
	const router = useRouter()
	const { boatId } = router.query

	const { boat, isLoading } = useBoat(boatId)

	if (isLoading) {
		return <div className="flex justify-center mt-12"><Loading /></div>
	}

	return(<>
		<Head>
		  <title>Bored and Yachting | {boat?.name}</title>
		  <meta name="description" content="" />
		</Head>
		<ContentPageLayout>
			<div className="space-y-2">
				<Header text={boat?.name} />
				<p>address snippet</p>
				<div className="flex flex-row flex-wrap gap-2">
					{boat?.photos.map(photo => (<div key={photo} className="relative w-72 h-52">
						<Image src={photo} alt={photo} layout="fill" objectFit="cover" />
					</div>))}
				</div>
				{JSON.stringify(boat)}
				<button>Instant Book</button>
				<button>Request Reservation</button>
			</div>
		</ContentPageLayout>
	</>)
}