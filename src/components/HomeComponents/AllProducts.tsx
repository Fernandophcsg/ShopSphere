import { useEffect, useState } from "react"
import ProductCard from "../ProductCard"
import { getProducts } from "../../services/APIs"

import { Product } from "../../types/Product"
import { motion } from "framer-motion"
import { icons } from "../../constants/constants"
import { useLocation } from "react-router-dom"

const AllProducts = () => {

    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [productsquantity, setProductsQuantity] = useState<number>(10)
    const { pathname } = useLocation()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts(productsquantity, 0);
                setProducts(response.data.products);
                setLoading(false);
            }
            catch (error) {
                console.error("Error getting products:", error);
            }
        }
        fetchProducts();
    }, [productsquantity])

    const handleProductQuantity = () => {
        setProductsQuantity(productsquantity + 10)
      }
    
    if (loading) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center">
                <img src={icons.loading} alt="Loading..." className="w-20 h-20" />
            </div>
        )
    }
    
    return (
        <>
    <div className={`w-full h-auto min-h-[40rem] grid grid-cols-5 gap-5 overflow-hidden ${pathname !== "/" ? 'px-28 pt-12':''}`}>
        {
            products.map((product, index) => (
                <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.1*index, ease: "easeInOut", type: "spring" }}
                >
                <ProductCard 
                    key={index} 
                    pid={product.id}
                    />
                </motion.div>
            ))
        }
    </div>
    <div className="w-full flex py-10 justify-center">
        <button className="w-max px-6 border-2 border-customGreen rounded-md hover:bg-customGreen hover:text-white transition-all duration-200 py-2" onClick={handleProductQuantity}>Load More</button>
    </div>
    </>
  )
}

export default AllProducts