import { useCaptains } from '@/endpoints/get'

export default function CaptainsForm() {

	const { captains, isLoading } = useCaptains()
	

	const handleCaptainSubmit = (e) => {
		e.preventDefault()
	}

	return(
		<form onSubmit={handleCaptainSubmit}>

		</form>
	)
}