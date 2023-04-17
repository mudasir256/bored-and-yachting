import ContentPageLayout from '@/components/layouts/ContentPageLayout'
import Input from '@/components/Input'
import Header from '@/components/small/Header'
import Icon from '@/components/Icon'
import Loading from '@/components/small/Loading'

import { updateUserFiles } from '@/endpoints/post'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@/endpoints/get'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DriversLicense() {
	
	const router = useRouter()
	const { user, isLoading } = useUser()

	const [frontDriversLicense, setFrontDriversLicense] = useState('')
	const [backDriversLicense, setBackDriversLicense] = useState('')
	const [fileFound, setFileFound] = useState(false)
	const [saved, setSaved] = useState(false)

	useEffect(() => {
		if (user && user.backDriversLicense && user.frontDriversLicense) {
			setFileFound(true)
		}
	}, [user])

	const handleVerify = async (e) => {
		e.preventDefault()
		try {
			if (frontDriversLicense && backDriversLicense) {
				const result = await updateUserFiles(frontDriversLicense[0], 'frontDriversLicense')
				console.log(result)

				const result2 = await updateUserFiles(backDriversLicense[0], 'backDriversLicense')

				console.log(result2)
				if (!result.success) {
					toast.error(result.message || 'Something went wrong. Please try again.')
				}
				if (!result2.success) {
					toast.error(result2.message || 'Something went wrong. Please try again.')	
				}

				setSaved(true)
				toast.info("We're processing your photos now and will let you know when you're verified!")
				return
			}
			toast.error("Please upload both the front and back of your driver's license to verify.")
		} catch (err) {
			console.log(err)
			toast.error(err || 'Something went wrong. Please try again.')	
		}
	}

	if (isLoading) return <div className="flex justify-center mt-4"><Loading /></div>

	return(<>
		<div className='absolute ml-4 mt-4 cursor-pointer' onClick={() => router.back()} > 
			<Icon name="left-arrow" />
		</div>
	<ToastContainer />
	<ContentPageLayout>
		<div>
			<Header text="Driver's License Photos" />
			<p>Upload or take pictures of the front and back of your driver&apos;s license to verify your identity.</p>
		</div>
		<div className="mt-8">
			{fileFound 
				&& <p className="text-green-700">
						<Icon name="circle-checkmark" color="green" />&nbsp;
						<span>Your driver&apos;s license is on file.</span>&nbsp;
						{/* <button onClick={() => setFileFound(false)} className="text-sm underline text-black">Re-upload?</button>*/}
					</p>
				
			}
			{!fileFound &&
				<form onSubmit={handleVerify} className="space-y-4 grid grid-cols-2 gap-2 items-end">
					<Input 
						type="file" 
						label="Front of Driver's License"
						id="driversLicenseFront"
					 	onChange={(e) => setFrontDriversLicense(e.target?.files)}
					 	value={frontDriversLicense?.name}
					 	isRequired={true} 
					 	multiple={false}
					 	accept="all"
					/>
					<Input 
						type="file" 
						label="Back of Driver's License"
						id="driversLicenseBack"
					 	onChange={(e) => setBackDriversLicense(e.target?.files)}
					 	value={backDriversLicense?.name}
					 	isRequired={true} 
					 	multiple={false}
					 	accept="all"
					/>
					<div className="col-span-2">
						<Input 
							type="submit"
							value={saved ? '✓' : "Verify"} 
						/>
					</div>
				</form>
			}
		</div>
	</ContentPageLayout>
	</>)
}