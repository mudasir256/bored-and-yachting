import { PaymentElement } from '@stripe/react-stripe-js';
import Input from '@/components/Input'

export default function StripeSetupIntentForm() {

	const handlePaymentElement = (e) => {
		e.preventDefault()
		console.log('handle')
		try {

		} catch(err) {
			console.log(err)
		}
	}

	return (
	  <form className="space-y-4" onSubmit={handlePaymentElement}>
	    <PaymentElement />
	    <Input type="submit" placeholder="Submit" />
	  </form>
	)
}