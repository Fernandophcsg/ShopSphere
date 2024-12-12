import { useEffect, useState } from "react"
import ProductCard from "../ProductCard"
import { getProducts } from "../../services/APIs"

import { Product } from "../../types/Product"
import { motion } from "framer-motion"

const AllProducts = () => {

    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        getProducts(10, 0).then((res) => {
            setProducts(res.data.products)
            console.log(res.data.products)
        }).then((err) => {
            console.error(err)
        })
    }, [])

  return (
    <div className="w-full h-auto min-h-[40rem] grid grid-cols-5 gap-5 overflow-hidden ">
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
  )
}

export default AllProducts