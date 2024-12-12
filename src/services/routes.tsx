import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages/Homepage";
import { Error } from "../pages/Error";
import Layout from "../components/Layout";
import ProductDetails from "../pages/ProductDetails";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout><Homepage /></Layout>,
        errorElement: <Error />,
    },
    {
        path: "/product/:pid",
        element: <Layout><ProductDetails/></Layout>,
        errorElement: <Error />,
    }
]);