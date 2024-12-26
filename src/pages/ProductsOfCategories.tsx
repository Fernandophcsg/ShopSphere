import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Product } from "../types/Product"
import { getProducts } from "../services/APIs"
import ProductCard from "../components/ProductCard"
import { motion } from "framer-motion"
import { icons } from "../constants/constants"

const ProductsOfCategories = () => {
    const { category = "" } = useParams<{ category: string }>()
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [productsquantity, setProductsQuantity] = useState<number>(10)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts(productsquantity, 0);
                setProducts(response.data.products);
                console.log("Products:", response.data.products);
                setLoading(false);
            } catch (error) {
                console.error("Error getting products:", error);
            }
        }
        fetchProducts();
    }, [category,productsquantity])

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
    <div className="w-full min-h-screen px-28 py-20 bg-gray-100 grid grid-cols-5 gap-3">
        {
            products.filter((product)=>{
                if (category === "all") {
                    return product
                }
                else if(product.category !== category){
                    return product.title.toLocaleLowerCase().includes(category.toLocaleLowerCase())
                } 
                else {
                    return product.category === category
                }
            }).map((product, index) => (
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
        <div className="w-full flex py-10 bg-gray-100 justify-center">
        <button className="w-max px-6 border-2 border-customGreen rounded-md hover:bg-customGreen hover:text-white transition-all duration-200 py-2" onClick={handleProductQuantity}>Load More</button>
        </div>
        </>
  )
}

export default ProductsOfCategories