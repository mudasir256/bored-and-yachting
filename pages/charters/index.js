import ContentPageLayout from '@/components/layouts/ContentPageLayout'
import Searchbar from '@/components/combined/utility/Searchbar'
import BoatGrid from '@/components/combined/utility/BoatGrid'
import { useBoatsSearch } from '@/endpoints/get'
import { useState, useEffect } from 'react'
import Loading from '@/components/small/Loading'
import { getDayTextFromIso, getAvailableTimeslotsForDay } from '@/helpers/availability'
import { formatCalendarDay } from '@/helpers/index'
import Icon from '@/components/Icon'
import useComponentVisible from '@/hooks/useComponentVisible'
import SearchbarModal from '@/components/modals/SearchbarModal'

export default function Charters() {

	const [query, setQuery] = useState('')
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

	const onSearch = ({ address, date, numberOfGuests }) => {		
		setQuery({
			label: address.label,
			lat: address.lat,
			lng: address.lng,
			date: date.toLocaleString(),
			day: getDayTextFromIso(date.toLocaleString()),
			numberOfGuests
		})
		setIsComponentVisible(false)
	}

	const Table = ({ query }) => {
		const { boats, isLoading } = useBoatsSearch({ ...query })
		if (isLoading) return <Loading />

		const withAvailabilityBoats = boats?.filter(boat => {
			const result = getAvailableTimeslotsForDay(boat, boat.blockedTimes, query.date)
			return result.length > 0
		}) || []

		return <BoatGrid boats={withAvailabilityBoats} dateSelected={query.date} />
	}

	return (<>
		<div onClick={() => setIsComponentVisible(true)} className="flex justify-center mt-8 cursor-pointer">
			<div className="rounded-full shadow-md flex flex-row gap-2 py-2.5 px-4 items-center">
				<p className="font-bold text-sm">{query.label}</p>
				<span className="text-gray-400">|</span> 
				<p className="font-bold text-sm">{formatCalendarDay(query.date)}</p>
				<span className="text-gray-400">|</span> 
				<p className="text-sm">{query.numberOfGuests} guests</p>
				<div className="ml-1 bg-blue-500 rounded-full w-8 h-8 flex justify-center items-center">
					<Icon name="search" color="white" size="xs" />
				</div>
			</div>
		</div>
		<div ref={ref}>
			{isComponentVisible && <SearchbarModal onSearch={onSearch} setIsComponentVisible={setIsComponentVisible} />}
		</div>
		<ContentPageLayout>
			{query && <Table query={query} />}
		</ContentPageLayout>
	</>)
}