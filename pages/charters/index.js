import ContentPageLayout from '@/components/layouts/ContentPageLayout'
import Searchbar from '@/components/combined/utility/Searchbar'
import BoatGrid from '@/components/combined/utility/BoatGrid'
import { useBoatsSearch } from '@/endpoints/get'
import { useState, useEffect } from 'react'
import Loading from '@/components/small/Loading'
import { getDayTextFromIso, getAvailableTimeslotsForDay } from '@/helpers/availability'
import Icon from '@/components/Icon'
import useComponentVisible from '@/hooks/useComponentVisible'
import SearchbarModal from '@/components/modals/SearchbarModal'
import Subheader from '@/components/small/Subheader'
import DisplaySearchbar from '@/components/combined/utility/DisplaySearchbar'

export default function Charters() {

	const [query, setQuery] = useState('')
	const [numberOfBoatsFound, setNumberOfBoatsFound] = useState(0)
	const [showSearchbar, setShowSearchBar] = useState(false)
	const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

	useEffect(() => {
		const address = JSON.parse(localStorage.getItem('address'))
		const date = localStorage.getItem('date')
		const numberOfGuests = localStorage.getItem('numberOfGuests')

		if (address && date && numberOfGuests) {
			setQuery({
				label: address.label,
				lat: address.lat,
				lng: address.lng,
				date: date.toLocaleString(),
				day: getDayTextFromIso(date.toLocaleString()),
				numberOfGuests
			})
		}

	}, [])

	const Table = ({ query, setNumberOfBoatsFound }) => {
		const { boats, isLoading } = useBoatsSearch({ ...query })
		if (isLoading) return <Loading />

		const withAvailabilityBoats = boats?.filter(boat => {
			const result = getAvailableTimeslotsForDay(boat, boat.blockedTimes, query.date)
			return result.length > 0
		}) || []

		setNumberOfBoatsFound(withAvailabilityBoats.length)
		return <BoatGrid boats={withAvailabilityBoats} dateSelected={query.date} />
	}

	return (<>
		<DisplaySearchbar label={query.label} date={query.date} numberOfGuests={query.numberOfGuests} setData={setQuery} />
		<div ref={ref}>
			{isComponentVisible && <div>filter modal TODO</div>}
		</div>
		<ContentPageLayout>
			<div className="flex flex-row items-end">
				{numberOfBoatsFound > 0 && <Subheader text={`${numberOfBoatsFound} vessel(s) found`} />}
				<div onClick={() => setIsComponentVisible(true)} className="ml-auto cursor-pointer rounded-lg border shadow w-fit py-1 px-4 flex flex-row items-center gap-2">
					<span className="text-sm">Add Filters</span>
					<Icon name="filter" size="md" />
				</div>
			</div>
			{query && <Table query={query} setNumberOfBoatsFound={setNumberOfBoatsFound} />}
		</ContentPageLayout>
	</>)
}