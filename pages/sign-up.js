import Input from '@/components/Input'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { createAccount } from '@/endpoints/post'

export default function SignUp() {

	const [email, setEmail] = useState('')
	const [phoneNumber, setPhoneNumber] = useState(null)
	const [password, setPassword] = useState('')
	const [roleSelected, setRoleSelected] = useState(null)

	const createAccount = async (e) => {
		//TODO: create account
		e.preventDefault()
		const result = await createAccount({ email, phoneNumber, password })
		console.log(result)
	}

	const Card = ({ id, header, description, src , alt = '' }) => (
		<div onClick={() => setRoleSelected(id)}  className="rounded-lg bg-white shadow w-60 cursor-pointer hover:shadow-lg">
			<div className="w-60 h-40 relative">
			<Image src={src} alt={alt} layout="fill" objectFit="cover" />
			</div>
			<div className="p-4">
				<h1 className="font-bold text-lg">{header}</h1>
				<p>{description}</p>
			</div>
		</div>
	)

	return(<>
		<main className="max-w-3xl mx-auto py-4">
			<h1 className="text-xl font-bold my-2">Sign Up for Bored and Yachting</h1>
			{roleSelected === null && <div>
				<p>Tell us a little more about what you&apos;re looking for:</p>
				
				<div className="my-2 flex flex-row flex-start gap-4 flex-wrap">
					<Card 
						id="CAPTAIN"
						header="I'm a captain" 
						description="I'd like to connect with boat owners and renters and make up to $<amount>/hr."
						src="/content/boat.jpg"
					/>
					<Card 
						id="BOAT_OWNER"
						header="I'm a boat owner" 
						description="I'd like to connect with boat renters and captains and earn money renting."
						src="/content/boat.jpg"
					/>
					<Card
						id="CUSTOMER"
						header="I'm a renter"
						description="I'd like to discover and explore over <amount> boats with ease."
						src="/content/boat.jpg"
					/>

				</div>
			</div>}
			{roleSelected && <div>
				<p className="text-sm mb-2">Great! Create an account to access these features and more from your account.</p>
				<form className="space-y-2" onSubmit={(e) => createAccount(e)}>
					<Input 
						type="text" 
						id="email"
						onChange={(e) => setEmail(e.target? .value)}
						value={email}
					 	placeholder="Email*" 
					 	isRequired={true} 
					 />
					<Input 
						type="number" 
						id="phoneNumber"
						onChange={(e) => setPhoneNumber(e.target? .value)}
						value={phoneNumber}
					 	placeholder="Phone Number" 
					 	isRequired={true} 
					 />
					 <Input
					 	type="password"
					 	id="password"
					 	onChange={(e) => setPassword(e.target?.value)}
					 	value={password}
					 	placeholder="Password"
					 	isRequired={true}
					 />
					 <p className="text-xs">*You'll receive an email to confirm and activate your account. <Link className="underline text-blue-500" href="/legal/privacy-policy" target="_blank">Privacy Policy</Link></p>
					 <Input type="submit" />
				</form>
			</div>
			}
		</main>
	</>)
}