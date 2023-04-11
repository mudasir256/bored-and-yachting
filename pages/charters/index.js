import ContentPageLayout from '@/components/layouts/ContentPageLayout'
import Searchbar from '@/components/combined/utility/Searchbar'
import BoatGrid from '@/components/combined/utility/BoatGrid'
import { useBoatsSearch } from '@/endpoints/get'
import { useState } from 'react'
import Loading from '@/components/small/Loading'

export default function Charters() {

	const [query, setQuery] = useState('')

	const onSearch = ({ address, date, numberOfGuests }) => {		
		setQuery({
			lat: address.lat,
			lng: address.lng,
			date: date.toLocaleString(),
			numberOfGuests
		})
	}

	const Table = ({ query }) => {
		const { boats, isLoading } = useBoatsSearch({ ...query })
		console.log(boats)
		if (isLoading) return <Loading />
		return <BoatGrid boats={boats} />
	}

	return (<>
		<div className="my-4 flex justify-center">
			<Searchbar onSearch={onSearch} />
		</div>
		<ContentPageLayout>
			{query && <Table query={query} />}
		</ContentPageLayout>
	</>)
}