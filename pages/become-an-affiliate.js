import Image from 'next/image'
import Header from '@/components/small/Header'
import Subheader from '@/components/small/Subheader'
import Button from '@/components/small/Button'
import ContentPageLayout from '@/components/layouts/ContentPageLayout'
import Icon from '@/components/Icon'

export default function BecomeAnAffiliate(){

	const handleSignUp = () => {
		//TODO:
	}

	const IconRow = ({ iconName, header, content }) => (
		<div className="text-center w-96">
			<div className="mx-auto mb-1 w-14 h-14 flex items-center justify-center rounded-full bg-blue-500">
				<Icon name={iconName} color="white" size="lg" />
			</div>
			<Subheader text={header} />
			<p>{content}</p>
		</div>
	)

	return (<>
			<div className="relative w-full h-96">
				<div className="flex justify-center items-center pt-20">
					<div className="text-white z-10 text-center">
						<Header text="Become an Affiliate" />
						<p>Earn up to 5% of every charter you help book.</p>
					</div>
				</div>
				<Image src="/content/boat-2.jpg" layout="fill" className="absolute brightness-50 object-cover" />
				<div className="absolute bottom-10 transform -translate-x-1/2 left-1/2">
					<div className="z-10">
						<Button text="Sign up as an affiliate" onClick={() => handleSignUp()} />
					</div>
				</div>
			</div>

			<ContentPageLayout>

				<div className="space-y-20">
					<div className="text-center">
						<Subheader text="Bored and Yachting's affiliate program..." />
						<p>Earn while...</p>
				
					</div>

					<hr />	

					<div className="flex flex-row">
						<div className="p-4 ">
							<Header text="Earn 5%, for every charter" />
							<ul class="max-w-md pt-2 space-y-3 text-lg text-gray-600 list-inside dark:text-gray-400">
							    <li class="flex items-center">
							        <svg class="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
							        Sign up a user to get 5% from their lifetime spend
							    </li>
							    <li class="flex items-center">
							        <svg class="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
							        Automatic payouts via Stripe
							    </li>
							    <li class="flex items-center">
							    	<svg class="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
							 			Earn a real living by being an affiliate
							    </li>
							</ul>
						</div>
						<div className="ml-auto relative w-1/2 h-96">
							<Image src="/content/captain.jpg" layout="fill" className="object-cover rounded-lg" />
						</div>
					</div>

				</div>
			</ContentPageLayout>
			<div className="p-20 bg-blue-200 flex flex-row justify-between flex-wrap gap-4">
				<IconRow 
					iconName="anchor"
					header="USCG Compliance"
					content="Captains & Crew paid directly and signed paperwork on every charter. Done the right way." 
				/>
				<IconRow 
					iconName="boat"
					header="Better vessels"
					content="We require the vessels on our platform meet minimum mechanical maintenance standards." 
				/>
				<IconRow 
					iconName="ship"
					header="Placeholder"
					content="Placeholder....." 
				/>
			</div>
			<div className="text-center bg-blue-200 pb-12">
				<Button text="Sign up and earn more" onClick={() => handleSignUp()} />
			</div>
	</>)
}