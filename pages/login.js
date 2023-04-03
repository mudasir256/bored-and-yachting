import Head from 'next/head'
import Input from '@/components/Input'
import Header from '@/components/small/Header'
import MainPageLayout from '@/components/layouts/MainPageLayout'
import { useState } from 'react'
import { login } from '@/endpoints/post'
import { saveLoginCredentials } from '@/helpers/index'
import { useRouter } from 'next/router'
import { USER_TYPES } from '@/helpers/index'

export default function Login() {
	const router = useRouter()

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState('')

	const handleLogin = async (e) => {
		e.preventDefault()
		setErrorMessage('')
		try {
			const result = await login({ email, password })
			console.log(result)
			if (result.success) {
				saveLoginCredentials({ ...result.user })
				if (result.user.roles.includes(USER_TYPES.BOAT_OWNER)) {
					router.push('/boat-owner/dashboard')
				} else if (result.user.roles.includes(USER_TYPES.CAPTAIN)) {
					router.push('/captain/dashboard')
				} else if (result.user.roles.includes(USER_TYPES.CUSTOMER)) {
					router.push('/dashboard')
				} else {
					router.reload()
				}
				return
			}
			setErrorMessage(result?.message)
		} catch (err) {
			console.log(err)
			setErrorMessage(err?.message || err)
		}
	}

	return (<>
		<Head>
		  <title>Bored and Yachting | Login</title>
		  <meta name="description" content="" />
		</Head>
		<MainPageLayout>
			<Header text="Login to Bored and Yachting" />
			<form className="space-y-2" onSubmit={handleLogin}>
				<Input 
					type="text" 
					id="email"
					onChange={(e) => setEmail(e.target?.value)}
					value={email}
				 	placeholder="Email Address" 
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
				 {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
				 <Input
				 	type="submit"
				 	value="Login" 
				 />
			</form>
		</MainPageLayout>
	</>)
}