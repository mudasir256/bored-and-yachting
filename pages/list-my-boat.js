import Image from 'next/image'
import Header from '@/components/small/Header'
import Subheader from '@/components/small/Subheader'
import Button from '@/components/small/Button'
import ContentPageLayout from '@/components/layouts/ContentPageLayout'
import Icon from '@/components/Icon'

export default function ListMyBoat() {

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
			<ContentPageLayout>

				<div className="">
					
					<div className="flex flex-row h-[80vh] mt-20">
						<div className="p-4 text-center">
							<Header text="You could earn ..." />
							<ul>
								<li>TODO: price slider / pricing matrix</li>
							</ul>
						</div>
						<div className="ml-auto relative w-1/2 h-96">
							<Image src="/content/view.jpg" layout="fill" className="object-cover rounded-lg" />
						</div>
					</div>

					<div className="text-center">
						<Header text="Earnings that work for you" />
						<ul class="flex flex-row items-center gap-4 justify-center pt-2 text-lg text-gray-600 list-inside dark:text-gray-400">
						    <li class="flex items-center">
						      <svg class="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
						      List your boat for free
						    </li>
						    <li class="flex items-center">
						        <svg class="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
						        Set your rates & availability
						    </li>
						    <li class="flex items-center">
						    		<svg class="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
						 				Add captains to your roster
						    </li>
						    <li class="flex items-center">
						    	<svg class="w-4 h-4 mr-1.5 text-green-500 dark:text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
						    	Sit back & earn
						    </li>
						</ul>
					</div>
				</div>
			</ContentPageLayout>

			<div className=" relative w-full h-80">
				<Image src="/content/captain.jpg" layout="fill" className="object-cover rounded-lg" />
			</div>
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
				<Button text="Sign up and start earning" onClick={() => handleSignUp()} />
			</div>
	</>)
}