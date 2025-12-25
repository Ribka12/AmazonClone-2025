import React, { useContext, useEffect, useState, } from "react";
import { useParams } from "react-router-dom";
import Loder from "../../components/Loder/Loder";
import { context } from "../../Utility/Reducer";
import ProductUI from "./ProductUI";


function ProductDetail() {
  const [product, setproduct] = useState({});
  const [loading, setLoading] = useState(false);
  const { productid } = useParams();

  const {state,dispatch,addToCart}= useContext(context);


  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${productid}`)
      .then((res) => res.json())
      .then((data) => {
        setproduct(data);
        setLoading(true);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);



  return (
    <>
      {loading ? (<ProductUI product={product} isCart={false}/>): (
        <Loder />
      )}
    </>
  );
}

export default ProductDetail;
