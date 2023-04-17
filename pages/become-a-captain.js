import Image from 'next/image'
import Header from '@/components/small/Header'
import Subheader from '@/components/small/Subheader'
import Button from '@/components/small/Button'
import ContentPageLayout from '@/components/layouts/ContentPageLayout'
import Icon from '@/components/Icon'

export default function BecomeACaptain() {

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
						<Header text="Become a Captain" />
						<p>Do more of what you love as a captain on Bored and Yachting</p>
					</div>
				</div>
				<Image src="/content/boat-2.jpg" layout="fill" className="absolute brightness-50 object-cover" />
				<div className="absolute bottom-10 transform -translate-x-1/2 left-1/2">
					<div className="z-10">
						<Button text="Sign up and earn more" onClick={() => handleSignUp()} />
					</div>
				</div>
			</div>

			<ContentPageLayout>

				<div className="space-y-20">
					<div className="text-center">
						<Subheader text="Bored and Yachting is looking for great Captains like you!" />
						<p>Earn a boatload while falling back in love with the best job on earth.</p>
				
					</div>

					<hr />

					<div className="italic text-center">
						<p className="font-bold">Now accepting Captains with USCG and RYA Certifications!</p>
					</div>			

					<div className="flex flex-row">
						<div className="p-4 text-center">
							<Header text="You could earn $50/hr" />
							<ul class="max-w-md pt-2 space-y-3 text-lg text-gray-600 list-inside dark:text-gray-400">
							    <li class="flex items-center">
							        <svg class="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
							        Sign up for free
							    </li>
							    <li class="flex items-center">
							        <svg class="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
							        Set your crew rates
							    </li>
							    <li class="flex items-center">
							    	<svg class="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
							 			Find vessels to charter for
							    </li>
							    <li class="flex items-center">
							    	<svg class="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
							    	Earn while doing what you love
							    </li>
							</ul>
						</div>
						<div className="ml-auto relative w-1/2 h-80">
							<Image src="/content/captain.jpg" layout="fill" className="object-cover rounded-lg" />
						</div>
					</div>

					<div className="pt-24 flex flex-row">
						<div className="relative w-1/2 h-80">
							<Image src="/content/captain.jpg" layout="fill" className="object-cover rounded-lg" />
						</div>

						<div className="ml-auto pt-8 pr-8">
							<Header text="Earnings that work for you" />
							<ul class="max-w-md pt-2 space-y-3 text-lg text-gray-600 list-inside dark:text-gray-400">
							    <li class="flex items-center">
							        <svg class="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
							        Get paid fast
							    </li>
							    <li class="flex items-center">
							        <svg class="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
							  			Make money on your schedule
							    </li>
							    <li class="flex items-center">
							    	<svg class="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
							 			Peace of mind, wherever you go
							    </li>
							</ul>
			
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