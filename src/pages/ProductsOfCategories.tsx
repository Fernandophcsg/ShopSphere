import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Product } from "../types/Product"
import { getProductsByCategory } from "../services/APIs"
import ProductCard from "../components/ProductCard"
import { motion } from "framer-motion"
import { icons } from "../constants/constants"

const ProductsOfCategories = () => {
    const { category } = useParams<{ category: string }>()
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProductsByCategory(category as string);
                setProducts(response.products);
                setLoading(false);
            } catch (error) {
                console.error("Error getting products:", error);
            }
        }
        fetchProducts();
    }, [category])

    if (loading) {
        return (
            <div className="w-full min-h-screen flex justify-center items-center">
                <img src={icons.loading} alt="Loading..." className="w-20 h-20" />
            </div>
        )
    }

  return (
   
    <div className="w-full min-h-screen px-28 py-20 bg-gray-100 grid grid-cols-5 gap-3">
        {
            products.map((product, index) => (
                <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.1*index, ease: "easeInOut", type: "spring" }}
                >
                <ProductCard key={index} pid={product.id} />
                </motion.div>
            ))
        }
    </div>
  )
}

export default ProductsOfCategories