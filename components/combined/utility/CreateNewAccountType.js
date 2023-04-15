import { USER_TYPES } from '@/helpers/index'

export default function CreateNewAccountType({ type }) {

	//TODO: if user already has these roles added don't show

	const handleAddRole = (role) => {
		//TODO:
	}

	return (<>
		{type === USER_TYPES.BOAT_OWNER && <p className="cursor-pointer underline text-sm" onClick={() => handleAddRole(USER_TYPES.BOAT_OWNER)}>List a vessel</p>}
		{type === USER_TYPES.CUSTOMER && <p className="cursor-pointer underline text-sm" onClick={() => handleAddRole(USER_TYPES.CUSTOMER)}>Create a customer account</p>}
		{type === USER_TYPES.CAPTAIN && <p className="cursor-pointer underline text-sm" onClick={() => handleAddRole(USER_TYPES.CAPTAIN)}>Become a captain</p>}
	</>)
}