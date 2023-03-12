import Image from 'next/image'
import Icon from '@/components/Icon'
import { useState } from 'react'
import useComponentVisible from '@/hooks/useComponentVisible'

export default function Navbar() {

	const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

	const DropdownMenu = () => (
		<div className="w-32 bg-white shadow p-4 rounded-lg">
			<ul>
				<li>Sign in</li>
				<li>Sign up</li>
			</ul>
		</div>
	)

	return (
		<nav className="p-4 shadow flex flex-row items-center justify-between">
			<Image src="/logo.png" alt="Bored and Yachting Logo" width="290" height="57" />
			<div className="mr-4 pt-2 cursor-pointer" onClick={() => setIsComponentVisible(true)}>
				<Icon name="menu" />
				<div className="absolute">
					<div className="relative -left-28 top-2" ref={ref}>
						{isComponentVisible && <DropdownMenu />}
					</div>
				</div>
			</div>
		</nav>
	)
}