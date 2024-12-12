// import ProductCard from "../ProductCard"

import { useEffect, useState } from "react"
import { getProducts } from "../../services/APIs"
import { Product } from "../../types/Product"
import ProductCard from "../ProductCard"
import { motion } from "framer-motion"

const RecentProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
      useEffect(() => {
          getProducts(5, 10).then((res) => {
              setProducts(res.data.products)
              console.log(res.data.products)
          }).then((err) => {
              console.error(err)
          })
      }, [])
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