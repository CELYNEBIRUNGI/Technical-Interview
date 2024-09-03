import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Params } from "react-router-dom";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const params = useParams();
  const url = `http://makeup-api.herokuapp.com/api/v1/products/${params.id}.json`;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [product, setProduct] = useState({
    api_featured_image: "",
    name: "",
    brand: "",
    category: "",
    price: 0,
    description: "",
  });
  console.log(product);

  //should probably use a custom hook, or once again react query or rtk-query
  useEffect(() => {
    const getData = async () => {
      try {
        const apiData = await fetch(url);
        const data = await apiData.json();
        setProduct(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  if (isLoading) return <h1>Fetching data...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <main className="product">
      <img src={product && product?.api_featured_image} alt={product?.name} />
      <h2>{product?.name}</h2>
      <p>
        <span>Brand:</span> {product.brand}
      </p>
      <p>
        <span>Category:</span> {product.category}
      </p>
      <p>
        <span>Price:</span> {product.price}
      </p>
      <p>
        <span>Description:</span> {product.description}
      </p>
    </main>
  );
};

export default ProductPage;
