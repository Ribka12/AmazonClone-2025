import React, { useEffect, useState } from "react";
import styles from "./product.module.css";
import SingleProduct from "./SingleProduct";
import Loder from "../../Loder/Loder";

function Product() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(true)
      }
      )
      .catch((err) => {
        setLoading(false);
        console.log(err);
       
      });
  }, []);

  return (
    <div className={styles.grid}>
      {loading ? (
        data?.map((pro) => (
          <SingleProduct
            key={pro.id}
            product={pro}
          />
        ))
      ) : (
        <Loder />
      )}
    </div>
  );
}

export default Product;
