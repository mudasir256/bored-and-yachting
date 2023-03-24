import Button from '@/components/small/Button'
import useComponentVisible from '@/hooks/useComponentVisible'
import PhotosModal from '@/components/modals/PhotosModal'

export default function ViewPhotosButton ({ text, photoUrls }) {
	
	const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

	return (<>
			<Button onClick={() => setIsComponentVisible(true)} text={text} />
			<div ref={ref}>
				{isComponentVisible && <PhotosModal photoUrls={photoUrls} />}
			</div>
		</>
	)
}