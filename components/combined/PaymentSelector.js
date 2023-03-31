
import { useStripePaymentMethods } from '@/endpoints/get'

export default function PaymentSelector({ paymentSelected, setPaymentSelected }) {

	const { paymentMethods, isLoading } = useStripePaymentMethods()

	return(
		<select className="border rounded-md p-1" data-action="click" value={paymentSelected} onChange={(e) => setPaymentSelected(e.target?.value)}>
			<option value="">Select a payment method</option>
			{paymentMethods?.data?.map(item => (
				<option value={item.id} key={item.id}>			
					•••• •••• •••• {item.card.last4} &nbsp;|&nbsp;
					{item.card.brand.toUpperCase()}, {item.card.exp_month} / {item.card.exp_year}
				</option>
			))}
		</select>
	)
}