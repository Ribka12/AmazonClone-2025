import React, { useContext } from "react";
import styles from "./productdetail.module.css";
import sty from '../Cart/cart.module.css'
import Rating from "@mui/material/Rating";
import numeral from "numeral";
import { context } from "../../Utility/Reducer";
import { Link } from "react-router-dom";

function ProductUI({ product ,isCart }) {

  const {state,dispatch,removeFromCart,addToCart, active,setActive}=useContext(context);
  const isInCart = state[0].some((item) => item.id === product.id);

  return (
    <>
      <div className={styles.container}>
        {/* LEFT: LARGE IMAGE */}
        <Link to={`/product/${product.id}`}>
          <div className={isCart ? styles.cartimgbot : styles.imageBox}>
            <img src={product.image} alt={product.title} />
          </div>
        </Link>

        {/* RIGHT: PRODUCT INFORMATION */}
        <div className={isCart ? styles.cartinfo : styles.info}>
          <h1 className={isCart ? styles.cartfont : styles.title}>
            {product.title}
          </h1>

          {/* RATING */}
          <div className={styles.ratingRow}>
            <Rating
              name="product-rating"
              value={product?.rating?.rate || 0}
              precision={0.1}
              size="medium"
            />
            <span className={styles.count}>{product?.rating?.count || 0}</span>
          </div>

          {/* PRICE */}
          <p className={isCart ? styles.cartfont : styles.price}>
            ${numeral(product.price).format("0,0.00")}
          </p>

          {/* DESCRIPTION */}
          <p className={styles.desc}>{isCart ? "" : product.description}</p>

          <button
            className={`${styles.btn}`}
            onClick={() => {
              if (isInCart) removeFromCart(product);
              else addToCart(product);
            }}
          >
            {isInCart ? "Remove" : "Add to Cart"}
          </button>
        </div>
      </div>
    </>
  );
}

export default ProductUI;
