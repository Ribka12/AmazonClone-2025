import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Product from "../../components/HomePageCP/Product/Product";
import Rating from "@mui/material/Rating";
import numeral from "numeral";
import styles from "../../components/HomePageCP/Product/product.module.css";
import style2 from "./result.module.css";
import SingleProduct from "../../components/HomePageCP/Product/SingleProduct";
import Loder from "../../components/Loder/Loder";
import { context } from "../../Utility/Reducer";

function Result() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/category/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h2 className={style2.resulth2}>Results for Category: {id}</h2>
      <hr />
      {loading ? (
        <div className={`${styles.grid} ${style2.gridadd}`}>
          {product?.map((product) => (
            <SingleProduct
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <Loder />
      )}
    </>
  );
}

export default Result;
