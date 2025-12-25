import React, { useContext } from "react";
import ProductUl from "../ProductDetail/ProductUI";
import styles from "./cart.module.css";
import { context } from "../../Utility/Reducer";
import { Link } from "react-router-dom";
import numeral from "numeral";

function Cart() {
  const { state, dispatch, removeFromCart, total } = useContext(context);

  return (
    <div className={styles.cartContainer}>
      <h1 className={styles.title}>Your Cart</h1>

      <br />
      <hr />

      {state[0].length === 0 ? (
        <p className={styles.empty}>Your cart is empty.</p>
      ) : (
        <div className={styles.cartGrid}>
          {state[0].map((product) => (
            <div key={product.id} className={styles.row}>
              <ProductUl product={product} isCart={true} />

              {/* Quantity Controls */}
              <div className={styles.qtyControl}>
                <button
                  className={styles.qtyBtn}
                  onClick={() =>
                    dispatch({ type: "INCREASE_QTY", data: { product } })
                  }
                >
                  +
                </button>

                <div className={styles.qtyDisplay}>
                  {product.totalItem ?? 1}
                </div>

                <button
                  className={styles.qtyBtn}
                  onClick={() =>
                    dispatch({ type: "DECREASE_QTY", data: { product } })
                  }
                >
                  -
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.topright}>
        <div className={styles.checkcard}>
          <div className={styles.checkrow}>
            <span className={styles.checklabel}>
              Subtotal ({state[0].reduce((acc, cur) => acc + cur.totalItem, 0)}{" "}
              items)
            </span>

            <span className={styles.checkamount}>
              ${numeral(total).format("0,0.00")}
            </span>
          </div>

          <label className={styles.checkgiftRow}>
            <input type="checkbox" />
            <span>This order contains a gift</span>
          </label>

          <Link to="/payments">
            <button className={styles.checkoutBtn}>Continue to Checkout</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
