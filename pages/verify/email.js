import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Loading from '@/components/small/Loading'
import ContentPageLayout from '@/components/layouts/ContentPageLayout'
import Link from 'next/link'
import { verifyEmailToken } from '@/endpoints/get'

export default function Email() {
	
	const router = useRouter()
	const { token } = router.query

	const [isLoading, setIsLoading] = useState(true)
	const [errorMessage, setErrorMessage] = useState('')

	useEffect(() => {
		const handleVerify = async () => {
			const result = await verifyEmailToken(token)
			console.log(result)
			if (result.success) {
				setIsLoading(false)
				return
			}
			setIsLoading(false)
			setErrorMessage(result.message)
		}
		handleVerify()
	}, [token])

	if (isLoading) {
		return <div className="pt-4 flex justify-center items-center"><Loading /></div>
	}

	return (
		<ContentPageLayout>
			{errorMessage ? <p>{errorMessage}</p>
				: <p>Your email has been verified. Please <Link className="underline hover:text-gray-400" href="/login">login</Link>.</p>
			}
		</ContentPageLayout>
	)
}