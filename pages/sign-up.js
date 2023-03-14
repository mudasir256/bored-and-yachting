import Input from '@/components/Input'
import Link from 'next/link'
import { useState } from 'react'
import { createAccount } from '@/endpoints/post'

export default function SignUp() {

	const [email, setEmail] = useState('')
	const [phoneNumber, setPhoneNumber] = useState(null)
	const [password, setPassword] = useState('')

	const createAccount = async (e) => {
		//TODO: create account
		e.preventDefault()
		const result = await createAccount({ email, phoneNumber, password })
		console.log(result)
	}

	return(<>
		<main className="max-w-xl mx-auto py-4">
			<h1 className="text-xl font-bold my-2">Sign Up for Bored and Yachting</h1>
			<form className="space-y-2" onSubmit={(e) => createAccount(e)}>
				<Input 
					type="text" 
					id="email"
					onChange={(e) => setEmail(e.target? .value)}
					value={email}
				 	placeholder="Email" 
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
				 <p className="text-xs">*We’ll call or text you to confirm your number. Standard message and data rates apply. <Link className="underline text-blue-500" href="/legal/privacy-policy" target="_blank">Privacy Policy</Link></p>
				 <Input type="submit" />
			</form>
		</main>
	</>)
}