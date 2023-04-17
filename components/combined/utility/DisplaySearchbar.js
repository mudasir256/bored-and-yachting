import useComponentVisible from '@/hooks/useComponentVisible'
import SearchbarModal from '@/components/modals/SearchbarModal'
import Icon from '@/components/Icon'
import { formatCalendarDay } from '@/helpers/index'
import { getDayTextFromIso } from '@/helpers/availability'

export default function DisplaySearchbar({ label, date, numberOfGuests, setData }) {
	
	const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

	const onSearch = ({ address, date, numberOfGuests }) => {		
		setData({
			label: address.label,
			lat: address.lat,
			lng: address.lng,
			date: date.toLocaleString(),
			day: getDayTextFromIso(date.toLocaleString()),
			numberOfGuests
		})
		setIsComponentVisible(false)
	}

	return(<>
		<div onClick={() => setIsComponentVisible(true)} className="flex justify-center mt-8 cursor-pointer">
			<div className="rounded-full shadow-md flex flex-row gap-2 py-2.5 px-4 items-center">
				<p className="font-bold text-sm">{label}</p>
				<span className="text-gray-400">|</span> 
				<p className="font-bold text-sm">{formatCalendarDay(date)}</p>
				<span className="text-gray-400">|</span> 
				<p className="text-sm">{numberOfGuests} guests</p>
				<div className="ml-1 bg-blue-500 rounded-full w-8 h-8 flex justify-center items-center">
					<Icon name="search" color="white" size="xs" />
				</div>
			</div>
		</div>
		<div ref={ref}>
			{isComponentVisible && <SearchbarModal onSearch={onSearch} setIsComponentVisible={setIsComponentVisible} />}
		</div>
	</>)
}