import { createBrowserRouter } from "react-router-dom";
import Home from "./Routes/Home";
import { RouterProvider } from "react-router-dom";
import ProductPage from "./Routes/ProductPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/products/:id",
    element: <ProductPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
