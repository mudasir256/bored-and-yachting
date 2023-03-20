import Link from 'next/link'

export default function FooterNav() {

	const handleAddRole = (role) => {

	}

	return(
		<nav className="bg-gray-50 text-sm px-6 py-4  flex flex-row gap-2">
			<p>© 2023 Bored and Yachting, Inc.</p>
			•<Link className="hover:underline" href="/legal/terms-of-service">Terms</Link>
			•<Link className="hover:underline" href="/legal/privacy-policy">Privacy Policy</Link>
			<Link className="ml-auto hover:underline" href="/contact-us">Support / contact us</Link>
		</nav>
	)
}