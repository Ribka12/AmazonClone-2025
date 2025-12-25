import React, { useContext } from "react";
import styles from "./product.module.css";
import Rating from "@mui/material/Rating";
import numeral from "numeral";
import { Link } from "react-router-dom";
import { context } from "../../../Utility/Reducer";

function SingleProduct({ product }) {
  const { state, dispatch, addToCart, setActive, removeFromCart } = useContext(context);

  const isInCart = state[0].some((item) => item.id === product.id);
  return (
    <>
      <div key={product.id} className={styles.singlecard}>
        <Link to={`/product/${product.id}`}>
          <div className={styles.imgBox}>
            <img src={product.image} alt={product.title} />
          </div>
        </Link>

        <h2 className={styles.title}>
          {product.title.length > 40
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
          <span className={styles.count}>{product.rating.count}</span>
        </div>

        <p className={styles.price}>
          ${numeral(product.price).format("0,0.00")}
        </p>

        <button
          className={styles.btn}
          onClick={() => {
            if (!isInCart) addToCart(product);
            else removeFromCart(product);
          }}
        >
          {isInCart ? "Remove" : "Add to Cart"}
        </button>
      </div>
    </>
  );
}

export default SingleProduct;
