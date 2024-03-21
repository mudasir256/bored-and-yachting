import Image from 'next/image'
import Link from 'next/link'
import Icon from '@/components/Icon'
import { useState, useEffect } from 'react'
import useComponentVisible from '@/hooks/useComponentVisible'
import Button from '@/components/small/Button'
import { USER_TYPES, removeLoginCredentials } from '@/helpers/index'
import { useRouter } from 'next/router'

export default function Navbar() {
	const router = useRouter()

	const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)

	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [roles, setRoles] = useState([])

	useEffect(() => {
		window.addEventListener('storage', handleStorageChange, false);
		handleStorageChange()
		return () => {
		    window.removeEventListener('storage', handleStorageChange, false);
		};
	}, [])

	const handleStorageChange = () => {
		setIsLoggedIn(localStorage.getItem('isLoggedIn'))
		setRoles(localStorage.getItem('roles'))
	}

	const handleLogout = () => {
		removeLoginCredentials()
		router.push('/')
	}

	const DropdownMenu = () => (
		<div className="w-36 bg-white shadow p-4 rounded-lg">
			<ul>
				{!isLoggedIn && <>
					<li><Link href="/login">Log in</Link></li>
					<li><Link href="/sign-up">Sign up</Link></li>
				</>}
				{isLoggedIn && <>
					{/*Make account switching / dashboard based on roles */}
					{roles.includes(USER_TYPES.CUSTOMER) && <li><Link href="/dashboard">Rentals</Link></li>}
					{roles.includes(USER_TYPES.BOAT_OWNER) && <li><Link href="/boat-owner/dashboard">My Boats</Link></li>}
					{roles.includes(USER_TYPES.CAPTAIN) && <li><Link href="/captain/dashboard">Captain Dashboard</Link></li>}
					<li><p onClick={() => handleLogout()}>Logout</p></li>
				</>}
			</ul>
		</div>
	)

	return (
		<nav className="p-4 shadow flex flex-row items-center justify-between">
			<Link href="/"><Image src="/logo.png" alt="Bored and Yachting Logo" width="290" height="57" /></Link>
			
			<div className="flex flex-row gap-8 items-center">
				{/* Site links */}
				<div className="space-x-6 text-sm">
					<Link className="hover:underline" href="/become-a-captain">Become a Captain</Link>
					<Link className="hover:underline" href="/list-my-boat">List your Boat</Link>
					<Link className="hover:underline" href="/become-an-affiliate">Become an Affiliate</Link>
					<Link className="hover:underline" href="/contact-us">Contact Us</Link>
				</div>

				{/* Login menus */}
				<div className="mr-4 cursor-pointer" onClick={() => setIsComponentVisible(true)}>
					<Icon name="menu" />
					<div className="absolute">
						<div className="relative -left-28 top-2 z-30" ref={ref} data-action="navbar">
							{isComponentVisible && <DropdownMenu />}
						</div>
					</div>
				</div>
			</div>
		</nav>
	)
}