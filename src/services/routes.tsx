import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages/Homepage";
import { Error } from "../pages/Error";
import Layout from "../components/Layout";
import ProductDetails from "../pages/ProductDetails";
import ProductsOfCategories from "../pages/ProductsOfCategories";
import AllProducts from "../components/HomeComponents/AllProducts";
import MyProfile from "../pages/MyProfile";

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
    },
    {
        path: "/products",
        element: <Layout><AllProducts/></Layout>,
        errorElement: <Error />,
    },
    {
        path: "/products/:category",
        element: <Layout><ProductsOfCategories/></Layout>,
        errorElement: <Error />,
    },
    {
        path: "/profile",
        element: <Layout><MyProfile/></Layout>,
        errorElement: <Error />,
    }
],
{ basename: "/ShopSphere" }
);