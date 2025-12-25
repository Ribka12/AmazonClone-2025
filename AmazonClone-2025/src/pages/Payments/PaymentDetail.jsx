import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import styles from "./payment.module.css";
import { useContext, useState } from "react";
import { context } from "../../Utility/Reducer";
import ProductUI from "../ProductDetail/ProductUI";
import instance from "../../Utility/axios";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { db } from "../../Utility/firebase";
import numeral from "numeral";

function PaymentDetail() {
  const stripe = useStripe();
  const elements = useElements();

  const { state, total, dispatch } = useContext(context);
  const cart = state[0];

  const [err, seterr] = useState("");
  const [payment, setpayment] = useState(false);

  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    setpayment(true);
    if (!stripe || !elements) return;
    try {
      if (state[0].length === 0) {
        seterr("Your cart is empty");
        setpayment(false);
        return;
      }
      const res = await instance.post(`payment/create?total=${total * 100}`);

      const clientSecret = res.data.clientSecret;
      let conformation = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      await db
        .collection("users")
        .doc(state[1].user.uid)
        .collection("orders")
        .doc(conformation.paymentIntent.id)
        .set({
          cart: state[0],
          amount: conformation.paymentIntent.amount / 100,
          created: conformation.paymentIntent.created,
        });
      dispatch({ type: "EMPTY_CART" });
      setpayment(false);
      navigate("/orders");
    } catch (err) {
      console.log(err);
      setpayment(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Checkout ({state[0].reduce((acc, cur) => acc + cur.totalItem, 0)} items)
      </h1>

      {/* Address */}
      <section className={`${styles.section} ${styles.deliverSection}`}>
        <h2>Delivery Address</h2>
        <div>
          <p>Name: {state[1].user?.email.split("@")[0]}</p>
          <br />
          <p>Email: {state[1].user ? state[1].user.email : ""}</p>
        </div>
      </section>

      {/* PRODUCTS (reusing ProductUI) */}
      <section className={`${styles.section} ${styles.productsSection}`}>
        <h2>Review items and delivery</h2>

        <div className={styles.products}>
          {cart.map((item) => (
            <div key={item.id} className={styles.productWrapper}>
              <ProductUI product={item} isCart={true} />
            </div>
          ))}
        </div>
      </section>

      {/* Payment */}
      <section className={styles.section}>
        <h2>Payment Method</h2>

        <p
          style={{
            color: "red",
            padding: "10px 0",
            fontStyle: "italic",
          }}
        >
          {err}
        </p>

        <form action="" onSubmit={handlesubmit}>
          <CardElement
            onChange={(e) => {
              seterr(e.error ? e.error.message : "");
            }}
            className={styles.cardElement}
          />

          <div className={styles.btncontainer}>
            <p>Total Order | ${numeral(total).format("0,0.00")} </p>
            <button type="submit" className={styles.payBtn}>
              {payment ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "20px",
                  }}
                >
                  <ClipLoader color="#fff" size={28} /> <p>please wait...</p>
                </div>
              ) : (
                "Pay Now"
              )}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default PaymentDetail;
