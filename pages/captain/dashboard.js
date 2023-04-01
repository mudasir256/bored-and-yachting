import ContentPageLayout from '@/components/layouts/ContentPageLayout'
import Link from 'next/link'
import Subheader from '@/components/small/Subheader'
import ActionItemCard from '@/components/combined/dashboard/ActionItemCard'

export default function Dashboard() {



	return (<>
		<ContentPageLayout>
			<div className="space-y-8">
				<div className="flex flex-col md:flex-row gap-4">
					<ActionItemCard 
						title="Basic profile information" 
						text="This information allows us to keep a safe and secure network, and is needed before you're allowed to book a rental."
						href="/user/profile?redirect=true"
						buttonText="Add information"
						checkCompleted="BASIC_PROFILE"
					/>
					<ActionItemCard 
						title="Billing Information" 
						text="This information allows us to keep a safe and secure network, and is needed before you're allowed to book a rental."
						href="/user/billing-connect?redirect=true&key=captain"
						buttonText="Add information"
						checkCompleted="BILLING_INFORMATION"
					/>
				</div>

				<div>
					<Subheader text="Your Charters" />
				</div>
				<div>
					<h2 className="text-lg mb-2">Other Features</h2>
					<div className="flex flex-row gap-2">
						<Link href="/user/profile?redirect=true" className="cursor-pointer underline text-sm">Update profile</Link>
						<Link href="/user/billing-connect?redirect=true&key=boat-owner" className="cursor-pointer underline text-sm">Update billing</Link>
						<p className="cursor-pointer underline text-sm" onClick={() => handleAddRole(USER_TYPES.BOAT_OWNER)}>List a vessel</p>
						<p className="cursor-pointer underline text-sm" onClick={() => handleAddRole(USER_TYPES.CUSTOMER)}>Create a customer account</p>
					</div>
				</div>
			</div>
		</ContentPageLayout>
	</>)
}