import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

//to made it more dynamic
const URL =
  "http://makeup-api.herokuapp.com/api/v1/products.json?brand=dior&product_type=Lipstick";
const transitionDuration = 500;
const interval = 10000;

const Home = () => {
  //better handle with react query or rtk-query
  //should also use separate component for reusability
  //there are some duplicated codes
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  //should probably add a delay to the search bar so the
  //the user can have the time to finish to write a word
  const searchProduct = searchQuery
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery)
      )
    : [];

  useEffect(() => {
    const getData = async () => {
      try {
        const apiData = await fetch(URL);
        const data = await apiData.json();
        setProducts(data);
        setTopProducts(selectRandomItems(data, 2));
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeout(() => {
        setTopProducts(selectRandomItems(products, 2));
      }, transitionDuration);
    }, interval);

    return () => clearInterval(intervalId);
  }, [products, interval, transitionDuration]);

  if (isLoading) return <h1>Fetching data...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <main>
      <div>
        <form action="">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search"
          />
        </form>
        <h2>Searched Product</h2>
        <DisplayProducts data={searchProduct} />
        <br />
      </div>
      <h1>Top products</h1>
      <DisplayProducts data={topProducts} />
      <br />

      <h2>All product</h2>
      <DisplayProducts data={products} />
    </main>
  );
};

export default Home;

const selectRandomItems = (array, n) => {
  const result = [];
  const usedIndices = new Set();

  while (result.length < n) {
    const randomIndex = Math.floor(Math.random() * array.length);

    if (!usedIndices.has(randomIndex)) {
      usedIndices.add(randomIndex);
      result.push(array[randomIndex]);
    }
  }

  return result;
};

const DisplayProducts = ({ data }) => {
  return (
    <ul>
      {data.map((product) => (
        <li key={product?.id}>
          <h3>{product?.name}</h3>
          <p>{product?.type}</p>
          <Link to={`/products/${product?.id}`}>See product</Link>
        </li>
      ))}
    </ul>
  );
};
