import React, { useContext, useEffect, useState } from "react";
import { context } from "../../Utility/Reducer";
import Rating from "@mui/material/Rating";
import numeral from "numeral";
import styles from "./order.module.css";

import { auth } from "../../Utility/firebase";
import Loder from "../../components/Loder/Loder";
import { db } from "../../Utility/firebase";
import SingleProduct from "../../components/HomePageCP/Product/SingleProduct";
import { Link } from "react-router-dom";
function Orders() {
  const { state, dispatch } = useContext(context);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!state[1].user?.uid) return;

    db.collection("users")
      .doc(state[1].user.uid)
      .collection("orders")
      .orderBy("created", "desc")
      .onSnapshot(
        (snapshot) => {
          setOrder(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        },
        (error) => {
          console.error("Firestore error:", error);
        }
      );
  }, [state[1]?.user]);

  if (!order) {
    return <Loder />;
  }

  return (
    <>
      <div>
        <h2
          style={{ textAlign: "center", marginTop: "2rem", fontSize: "2rem" }}
        >
          Your Order
        </h2>
        <br />
        <br />
        <br />
      </div>
      <div>
        {order.length === 0 && (
          <h2 style={{ textAlign: "center", marginTop: "2rem" }}>
            No Orders Placed Yet
          </h2>
        )}
        {order?.map((orderItem, index) => {
          return (
            <div key={index} className={styles.orderContainer}>
              <h1>Order ID --- {orderItem.id}</h1>
              {orderItem.data?.cart?.map((product, idx) => {
                return (
                  <div key={idx}>
                    <div className={styles.singlecard}>
                      <Link>
                        <div className={styles.imgBox}>
                          <img src={product.image} alt={product.title} />
                        </div>
                      </Link>
                      <div className="descont">
                        <h2 className={styles.title}>
                          {product.title.length > 140
                            ? `${product.title.slice(0, 35)}...`
                            : product.title}
                        </h2>

                        <div className={styles.ratingRow}>
                          <Rating
                            name="product-rating"
                            value={product.rating.rate}
                            precision={0.1}
                            size="small"
                          />
                          <span className={styles.count}>
                            {product.rating.count}
                          </span>
                        </div>

                        <p className={styles.price}>
                          ${numeral(product.price).format("0,0.00")}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Orders;
