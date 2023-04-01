import { useUser } from '@/endpoints/get'
import Icon from '@/components/Icon'
import Link from 'next/link'

export default function ActionItemCard({ title, text, buttonText, href, checkCompleted }) {
	
	const { user, isLoading } = useUser()

	const isBasicProfileFilled = () => {
		if (user?.firstName && user?.lastName && user?.profilePicture) {
			return true
		}
		return false
	}

	const isBillingInformationFilled = () => {
		if (user?.stripePreferredPaymentMethodId) {
			return true
		}
		return false
	}

	//TODO: technically need a different flag
	const isConnectProcessDone = () => {
		if (user?.stripeAccountId) {
			return true
		}
		 return false
	}

	const isCaptainLicenseFilled = () => {
		if (user?.captainLicense) { //TODO: check all fields
			return true
		}
		return false
	}

	const isComplete = () => {
		switch (checkCompleted) {
			case 'BASIC_PROFILE':
				return isBasicProfileFilled()
			case 'BILLING_INFORMATION':
				return isBillingInformationFilled()
			case 'CONNECT_FINISHED':
				return isConnectProcessDone()
			case 'CAPTAIN_LICENSE':
				return isCaptainLicenseFilled()
		
		}
	}
	return (
		<div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
				<div className="flex flex-row">
		    	<h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
					{isComplete() && <div className="ml-auto">
						<Icon name="circle-checkmark" color="green" />
					</div>
					}
				</div>
		    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{text}</p>
		    
		    {isComplete() ? <Link href={href} className="underline text-sm text-gray-500">Edit</Link>

		    : <Link href={href} className={`inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>
		        {buttonText}
		        <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
		    	</Link>
		  	}
		</div>
	)
}