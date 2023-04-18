import Head from 'next/head'
import ContentPageLayout from '@/components/layouts/ContentPageLayout'
import Header from '@/components/small/Header'
import Input from '@/components/Input'
import { useState } from 'react'
import { submitContactForm } from '@/endpoints/post'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Contact() {

	const [email, setEmail] = useState('')
	const [name, setName] = useState('')
	const [message, setMessage] = useState('')

	const [saved, setSaved] = useState('')

	const handleContactSubmit = async (e) => {
		e.preventDefault()
		try {
			const result = await submitContactForm({ email, name, message })
			if (result.success) {
				setSaved(true)
				return
			}
			toast.error(result.message || 'Something went wrong. Please try again')
		} catch (err) {
			console.log(err)
			toast.error('Something went wrong. Please try again')
		}

	}

	return (<>
		<Head>
		  <title>Bored and Yachting | Contact</title>
		  <meta name="description" content="" />
		</Head>
		<ToastContainer />
		<ContentPageLayout>
			<div className="flex flex-col md:flex-row justify-center gap-8">
				<div>
					<Header text="Contact Us" />
					<p className="max-w-xl" >We&apos;re always available to help. If you have any questions or comments, please use our contact form or email us at <a className="underline text-blue-500" href="mailto:info@boredandyachting.com">info@boredandyachting.com</a></p>
				</div>
				<form 
					onSubmit={handleContactSubmit}
					className="w-full md:w-96 rounded shadow p-4 space-y-4"
				>
					<Input 
						type="text" 
						label="Name"
						id="name"
					 	placeholder="Name" 
					 	onChange={(e) => setName(e.target?.value)}
					 	value={name}
					 />
					 <Input 
					 	type="email" 
					 	label="Email"
					 	id="email"
				  	placeholder="Email" 
				  	onChange={(e) => setEmail(e.target?.value)}
				  	value={email}
				  	isRequired={true} 
					 />
					 <div>
						<label className="text-sm">Message</label>
					 	<textarea className="mt-2 p-1 border w-full h-48" onChange={(e) => setMessage(e.target?.value)}></textarea>
					</div>
					<Input 
						type="submit" 
						value={saved ? '✓' : "Send Message"} 
					/>
				</form>

			</div>
		</ContentPageLayout>
	</>)
}