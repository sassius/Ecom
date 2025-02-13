import React from "react";
import { useParams } from "react-router";

const Category = () => {
  const { category } = useParams();
  return <div>Category is {category}</div>;
};

export default Category;
