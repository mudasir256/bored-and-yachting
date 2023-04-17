import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Searchbar from '@/components/combined/utility/Searchbar'

export default function SearchbarModal({ onSearch }) {
	const [isBrowser, setIsBrowser] = useState(false);

	useEffect(() => {
	  setIsBrowser(true);
	}, []);


	const modalContent = (
		<div data-action="close-modal" className="fixed w-screen h-screen top-0 left-0 flex justify-center items-center bg-black bg-opacity-50">
			<div data-action="close-modal" className="rounded p-16">
				<Searchbar onSearch={onSearch} />
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