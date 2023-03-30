import ContentPageLayout from '@/components/layouts/ContentPageLayout'
import Link from 'next/link'

export default function Dashboard() {
	return (<>
		<ContentPageLayout>
			<div>
				<h2 className="text-lg mb-2">Other Features</h2>
				<div className="flex flex-row gap-2">
					<Link href="/user/profile?redirect=true" className="cursor-pointer underline text-sm">Update profile</Link>
					<Link href="/user/billing-connect?redirect=true&key=boat-owner" className="cursor-pointer underline text-sm">Update billing</Link>
					<p className="cursor-pointer underline text-sm" onClick={() => handleAddRole(USER_TYPES.BOAT_OWNER)}>List a vessel</p>
					<p className="cursor-pointer underline text-sm" onClick={() => handleAddRole(USER_TYPES.CUSTOMER)}>Create a customer account</p>
				</div>
			</div>
		</ContentPageLayout>
	</>)
}