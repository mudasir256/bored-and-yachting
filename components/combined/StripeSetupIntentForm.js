import {
	useStripe, 
	useElements, 
	PaymentElement
} from '@stripe/react-stripe-js';
import Input from '@/components/Input'

export default function StripeSetupIntentForm() {

	const stripe = useStripe();
	const elements = useElements();

	const handlePaymentElement = async (e) => {
		e.preventDefault()
		if (!stripe || !elements) {
		   return null;
		}

		const {error} = await stripe.confirmSetup({
	     //`Elements` instance that was used to create the Payment Element
	    elements,
	    confirmParams: {
	      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/user/billing`,
	    },
	  });

		if (error) {
	     // This point will only be reached if there is an immediate error when
	     // confirming the payment. Show error to your customer (for example, payment
	     // details incomplete)
	     setErrorMessage(error.message);
	   } else {
	     // Your customer will be redirected to your `return_url`. For some payment
	     // methods like iDEAL, your customer will be redirected to an intermediate
	     // site first to authorize the payment, then redirected to the `return_url`.
	   }
	}

	return (
	  <form className="space-y-4" onSubmit={handlePaymentElement}>
	    <PaymentElement />
	    <Input type="submit" placeholder="Submit" />
	  </form>
	)
}