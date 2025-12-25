import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import PaymentDetail from "./PaymentDetail";

function Payment() {
  const stripePromise = loadStripe(
    "pk_test_51Sf5C50Q7m3Wt0sZOC7I4z9wgzn2aoU6VqJ47YHsxGZyEpPY4yBouezKMXJ5JtVrOmZZrXpx29r318Z8XOgZOOsc00W8y0wz2f"
  );

  return (
    <Elements stripe={stripePromise}>
      <PaymentDetail />
    </Elements>
  );
}

export default Payment;
