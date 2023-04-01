import ContentPageLayout from '@/components/layouts/ContentPageLayout'
import { useState, useEffect } from 'react'
import { useUser } from '@/endpoints/get'
import { updateUser, updateUserFiles, baseUrl, updateCaptainLocation } from '@/endpoints/post'
import Input from '@/components/Input'
import { useRouter } from 'next/router'
import Header from '@/components/small/Header'
import FileInputWithPicture from '@/components/small/FileInputWithPicture'
import Icon from '@/components/Icon'
import { useSWRConfig } from 'swr'
import { isCaptain, LOCATION_TYPE } from '@/helpers/index'

export default function Profile() {

	const router = useRouter()
	const { redirect } = router.query

	const { user, isLoading } = useUser()
	const { mutate } = useSWRConfig()

	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')

	const [profilePic, setProfilePic] = useState('') //fill with image from https
	const [fileSelected, setFileSelected] = useState(null)

	const [captainAddress, setCaptainAddress] = useState('')

	useEffect(() => {
		if (user) {
			setFirstName(user?.firstName)
			setLastName(user?.lastName)
			setProfilePic(user?.profilePicture)
			if (isCaptain(user)) {
				setCaptainAddress({ ...user.captainAddress, value: {}, isOld: true })
			}
		}
	}, [user])

	const handleUserInformation = async (e) => {
		e.preventDefault()
		if (fileSelected) {
			try {
				const result = await updateUserFiles(fileSelected, 'profilePicture')
				console.log(result)
				if (result.success) {
					setProfilePic(result.url)
					mutate(baseUrl(`/users/${localStorage.getItem('userId')}`))
				}	
			} catch (err) {
				console.log(err)
			}
		}

		if (captainAddress && !captainAddress.isOld) {
			const state = captainAddress.address.split(', ')[2].split(' ')[0]
			const result = await updateCaptainLocation(user?._id, { state, ...captainAddress }, LOCATION_TYPE.IS_HOME)
			console.log(result)
		}
		
		if (firstName && lastName) {
			const result = await updateUser({ firstName, lastName })
			if (result.success) {
				// redirect == 'true' ? router.back() : ''
			}
		}
	}

	const handleFileSelect = (e) => {
		e.preventDefault()
		setFileSelected(e.target?.files[0])
	}

	return (<>
		{redirect == 'true' &&
			<div className='absolute ml-4 mt-4 cursor-pointer' onClick={() => router.back()} > 
				<Icon name="left-arrow" />
			</div>
		}
		<ContentPageLayout>
			<Header text="Basic Profile Information" />
			<form className="mt-2 space-y-2" onSubmit={handleUserInformation}>
	
				<div className="grid grid-cols-3 items-center gap-4">
					<Input 
						type="text" 
						id="firstName"
						label="First Name"
						onChange={(e) => setFirstName(e.target?.value)}
						value={firstName}
					 	placeholder="First Name" 
					 	isRequired={true} 
					 />
					<Input 
						type="text" 
						label="Last Name"
						id="lastName"
						onChange={(e) => setLastName(e.target?.value)}
						value={lastName}
					 	placeholder="Last Name" 
					 	isRequired={true} 
					 />
					 <FileInputWithPicture
					 	handleFileSelect={handleFileSelect} 
					 	fileSelected={fileSelected} 
					 	src={profilePic}
					 	label="Profile Picture"
					 />
					 {isCaptain(user) &&
						 <div className="col-span-3">
						 	<Input 
						 		type="address" 
						 		label="Your Address"
						 		id="captainAddress"
						 	 	placeholder="Captain Address" 
						 	 	onChange={(data) => setCaptainAddress(data)}
						 	 	value={captainAddress}
						 	 	isRequired={true} 
						 	 />
						 	 <p className="mt-2 text-sm text-gray-500">*We use your address to match you to boat owner&apos;s that are closest and relevant to you.</p>
						 </div>
						}
					 <div className="col-span-3">
						 <Input 
						 	type="submit"
						 	value="Save"
						 />
					 </div>
				</div>
			</form>
		</ContentPageLayout>
	</>)
}