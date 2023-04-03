import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'

export default function PhotosModal({ photoUrls = [] }) {
	const [isBrowser, setIsBrowser] = useState(false);

	useEffect(() => {
	  setIsBrowser(true);
	}, []);

	const modalContent = (
		<div data-action="close-modal" className="fixed w-screen h-screen top-0 left-0 flex justify-center items-center bg-black bg-opacity-50">
			<div data-action="close-modal" className="overflow-auto bg-white w-screen h-screen rounded p-16">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-2 justify-center items-center">
				{photoUrls.map(url => (<div key={url} className="relative w-full h-72">
					<Image src={url} alt={url} layout="fill" className="object-cover" />
				</div>))}
				</div>
			</div>
		</div>
	)

	if (isBrowser) {
	  return createPortal(
	    modalContent, 
	    document.getElementById("modal-root")
	  );
	} 
	return null;
}