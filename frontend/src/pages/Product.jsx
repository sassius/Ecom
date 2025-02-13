import React from "react";
import { useParams } from "react-router";

const Product = () => {
  const { productId } = useParams();
  return <div>Product is {productId}</div>;
};

export default Product;
