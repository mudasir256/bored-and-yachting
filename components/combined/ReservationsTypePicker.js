import Button from '@/components/small/Button'
import { RESERVATION_STATUS, RESERVATION_STATUS_TEXT, USER_TYPES } from '@/helpers/index'

export default function ReservationsTypePicker({ selected, setSelected, role }) {
	
	return (<div className="space-x-2">
		<Button 
			onClick={() => setSelected(RESERVATION_STATUS.UPCOMING)} 
			text={RESERVATION_STATUS_TEXT[RESERVATION_STATUS.UPCOMING]} 
			isOutlined={selected !== RESERVATION_STATUS.UPCOMING} 
		/>
		{role !== USER_TYPES.CAPTAIN &&
			<Button 
				onClick={() => setSelected(RESERVATION_STATUS.PENDING_REVIEW)} 
				text={RESERVATION_STATUS_TEXT[RESERVATION_STATUS.PENDING_REVIEW]} 
				isOutlined={selected !== RESERVATION_STATUS.PENDING_REVIEW} 
			/>
		}
		<Button 
			onClick={() => setSelected(RESERVATION_STATUS.COMPLETED)} 
			text={RESERVATION_STATUS_TEXT[RESERVATION_STATUS.COMPLETED]} 
			isOutlined={selected !== RESERVATION_STATUS.COMPLETED} 
		/>
		<Button 
			onClick={() => setSelected(RESERVATION_STATUS.CANCELED)} 
			text={RESERVATION_STATUS_TEXT[RESERVATION_STATUS.CANCELED]} 
			isOutlined={selected !== RESERVATION_STATUS.CANCELED} 
		/>
	</div>)
}