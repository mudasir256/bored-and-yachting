import ContentPageLayout from '@/components/layouts/ContentPageLayout'
import Header from '@/components/small/Header'
import Subheader from '@/components/small/Subheader'
import ReservationsTypePicker from '@/components/combined/ReservationsTypePicker'
import Link from 'next/link'
import { useUser } from '@/endpoints/get'

export default function Dashboard() {

		const { user, isLoading } = useUser()

		const Card = ({ title, text, buttonText, href }) => (
			<div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
			    <a href="#">
			        <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
			    </a>
			    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{text}</p>
			    <Link href={href} class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
			        {buttonText}
			        <svg aria-hidden="true" class="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
			    </Link>
			</div>
		)

		const isBasicProfileFilled = () => {
			
		}

	 return(
	 	<ContentPageLayout>
	 		<div className="space-y-8">
		 		<div className="space-y-4">
		 			<Header text="Verify your account:"/ >
		 			<div className="flex flex-col md:flex-row gap-4">
			 			<Card 
			 				title="Basic profile information" 
			 				text="This information allows us to keep a safe and secure network, and is needed before you're allowed to book a rental."
			 				href="/user/profile?redirect=true"
			 				buttonText="Add information"
			 			/>
			 			<Card 
			 				title="Driver's license photos" 
			 				text="This information allows us to keep a safe and secure network, and is needed before you're allowed to book a rental."
			 				href="/user/drivers-license"
			 				buttonText="Add license"
			 			/>
			 			<Card 
			 				title="Billing details" 
			 				text="This information allows us to keep a safe and secure network, and is needed before you're allowed to book a rental."
			 				href="/user/billing"
			 				buttonText="Add payment method"
			 			/>
		 			</div>
		 		</div>
		 		<div className="space-y-2">
		 			<Subheader text="Your reservations" />
		 			<div className="flex flex-row items-center">
		 				<ReservationsTypePicker />
		 				<div className="ml-auto">
		 					<p className="underline cursor-pointer">All reservations</p>
		 				</div>
		 			</div>
		 			{/* Load reservations here */}
		 			<p className="pt-6 text-center">No reservations found.</p>
		 		</div>
	 		</div>
	 	</ContentPageLayout>
	 )
}