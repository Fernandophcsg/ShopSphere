// import ProductCard from "../ProductCard"

import { useEffect, useState } from "react"
import { Product } from "../../types/Product"
import { getProducts } from "../../services/APIs"
import ProductCard from "../ProductCard"
import { motion } from "framer-motion"
import { icons } from "../../constants/constants"

const BestProducts = () => {
   const [products, setProducts] = useState<Product[]>([])
   const [loading, setLoading] = useState<boolean>(true)
  
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts(5, 80);
                setProducts(response.data.products);
                setLoading(false);
            } catch (error) {
                console.error("Error getting products:", error);
            }
        }
        fetchProducts();
    }, [])

    if (loading) {
        return (
            <div className="w-full bg-white h-auto min-h-80 rounded-xl mb-10 p-5 shadow-md flex justify-center items-center">
                <img src={icons.loading} alt="Loading..." className="w-20 h-20" />
            </div>
        )
    }

  return (
    <div className="w-full bg-white h-auto min-h-80 rounded-xl shadow-md mb-10 p-5 overflow-hidden">
        <h1 className="text-2xl mb-2 font-semibold font-sans">Best Products</h1>
        <div className="grid grid-cols-5 gap-5 w-full">
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
    </div>
  )
}

export default BestProducts