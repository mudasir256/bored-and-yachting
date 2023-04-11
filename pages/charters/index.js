import ContentPageLayout from '@/components/layouts/ContentPageLayout'
import Searchbar from '@/components/combined/utility/Searchbar'
import BoatGrid from '@/components/combined/utility/BoatGrid'
import { useBoatsSearch } from '@/endpoints/get'
import { useState } from 'react'
import Loading from '@/components/small/Loading'
import { getDayTextFromIso, getAvailableTimeslotsForDay } from '@/helpers/availability'

export default function Charters() {

	const [query, setQuery] = useState('')

	const onSearch = ({ address, date, numberOfGuests }) => {		
		setQuery({
			lat: address.lat,
			lng: address.lng,
			date: date.toLocaleString(),
			day: getDayTextFromIso(date.toLocaleString()),
			numberOfGuests
		})
	}

	const Table = ({ query }) => {
		const { boats, isLoading } = useBoatsSearch({ ...query })
		if (isLoading) return <Loading />

		const withAvailabilityBoats = boats?.filter(boat => {
			const result = getAvailableTimeslotsForDay(boat, boat.blockedTimes, query.date)
			return result.length > 0
		}) || []

		return <BoatGrid boats={withAvailabilityBoats} />
	}

	return (<>
		<div className="flex justify-center mt-8">
			<Searchbar onSearch={onSearch} />
		</div>
		<ContentPageLayout>
			{query && <Table query={query} />}
		</ContentPageLayout>
	</>)
}