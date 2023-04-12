import ContentPageLayout from '@/components/layouts/ContentPageLayout'
import { useRouter } from 'next/router'

export default function PostCharter() {

	const router = useRouter()
	const { bookingId } = router.query

	return (<ContentPageLayout>
		
	</ContentPageLayout>)
}