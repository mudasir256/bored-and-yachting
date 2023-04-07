import { useState } from 'react'

export default function CaptainSelector({ captainSelected, setCaptainSelected, captains = [], isFull = false }) {
	
	const [showCaptains, setShowCaptains] = useState(false)

	return(
		<div className="flex flex-col items-center">
		    <div className="w-full flex flex-col items-center">
		        <div className="w-full">
		            <div className="flex flex-col items-center relative">
		                <div className="w-full">
		                    <div className="p-1 bg-white flex border border-gray-200 rounded">
		                        <div className="flex flex-auto flex-wrap"></div>
		                        <div onClick={() => setShowCaptains(!showCaptains)} className="p-1 px-2 appearance-none outline-none w-full">
		                       		<p className={captainSelected ? 'text-black' : 'text-gray-400'}>{captainSelected ? captainSelected.firstName : 'Select a captain'}</p>
		                        </div>
		                        <div className="text-gray-300 w-8 py-1 pl-2 pr-1 border-l flex items-center border-gray-200">
		                            <button onClick={() => setShowCaptains(!showCaptains)} className="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
		                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-chevron-up w-4 h-4">
		                                    <polyline points="18 15 12 9 6 15"></polyline>
		                                </svg>
		                            </button>
		                        </div>
		                    </div>
		                </div>
		                {showCaptains &&
		                <div className="absolute shadow bg-white top-100 z-40 w-full left-0 top-14 rounded max-h-select overflow-y-auto">
		                   	{captains?.map(captain => (
		                   		<div key={captain._id} onClick={() => { setCaptainSelected(captain); setShowCaptains(false); }} className="flex flex-col w-full">
		                   		    <div className="cursor-pointer w-full border-gray-100 rounded-t border-b hover:bg-blue-200">
		                   		        <div className="flex w-full items-center p-2 pl-2 border-transparent border-l-2 relative hover:border-blue-200">
		                   		            <div className="flex flex-col items-center">
		                   		                <div className="flex relative w-8 h-8 m-1 mr-2  mt-1 rounded-full "><img className="rounded-full" alt={captain.firstName} src={captain.profilePicture} /> </div>
		                   		            </div>
		                   		            <div className="w-full items-center flex">
		                   		                <div className="mx-2 -mt-1">{captain.firstName}
		                   		                    <div className="text-xs truncate w-full normal-case font-normal -mt-1 text-gray-500"></div>
		                   		                </div>
		                   		            </div>
		                   		        </div>
		                   		    </div>
		                   		</div>
		                   	))}
		                </div>
		              	}
		            </div>
		        </div>
		    </div>
		</div>
	)
}