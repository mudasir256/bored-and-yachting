import Link from 'next/link'
import Image from 'next/image'
import { 
	formatAddressLine, 
	formatMoney, 
	boatHasAllValidInformation,
	RATE_LENGTHS
} from '@/helpers/index'

import { getRateWithoutFees } from '@/helpers/money'

export default function BoatGrid({ boats = [] }) {
	const cards = boats?.filter(boat => boatHasAllValidInformation(boat))
		.map(boat => {
	    return (
	      <Link href={`/charters/${boat._id}`} key={boat._id} className="rounded m-4 cursor-pointer">
	        <div className="shadow relative w-80 h-72">
	          <Image className="rounded object-cover" alt={boat.name} layout="fill" src={boat.photos[0]} />
	        </div>
	        <div className="mt-2 space-y-1">
	          <p className="font-bold">{boat.name}</p>
	          <p className="text-sm">{formatAddressLine(boat.parkingLocation.address)}</p>
	          <p><span className="text-sm">starting at&nbsp;</span><span className="font-bold">{formatMoney(getRateWithoutFees(boat, RATE_LENGTHS.HALF_DAY))}</span></p>
	        </div>
	      </Link>
	    )
	})


	return <div className="flex flex-row p-4 gap-2">
	  {cards.length > 0 ? cards : <p>No vessels found</p>}
	</div>
}