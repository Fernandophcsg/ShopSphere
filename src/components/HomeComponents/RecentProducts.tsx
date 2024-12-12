// import ProductCard from "../ProductCard"

import { useEffect, useState } from "react"
import { getProducts } from "../../services/APIs"
import { Product } from "../../types/Product"
import ProductCard from "../ProductCard"
import { motion } from "framer-motion"
import { icons } from "../../constants/constants"

const RecentProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        getProducts(5, 10).then((res) => {
            setProducts(res.data.products)
            setLoading(false)
        }).then((err) => {
            console.error(err)
        })
    }, [])

    if (loading) {
        return (
            <div className="w-full bg-white h-auto min-h-80 rounded-xl mb-2 p-5 shadow-md flex justify-center items-center">
                <img src={icons.loading} alt="Loading..." className="w-20 h-20" />
            </div>
        )
    }

  return (
    <div className="w-full bg-white h-auto min-h-80 rounded-xl shadow-md mb-2 p-5 overflow-hidden">
        <h1 className="text-2xl mb-2 font-semibold font-sans">Recent Products</h1>
        <div className="grid grid-cols-5 gap-5 w-full">
        {
            products.map((product, index) => (
              <motion.div
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

export default RecentProducts