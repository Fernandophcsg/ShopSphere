// import ProductCard from "../ProductCard"

import { useEffect, useState } from "react"
import { getProducts } from "../../services/APIs"
import { Product } from "../../types/Product"
import ProductCard from "../ProductCard"
import { motion } from "framer-motion"
import { icons, sliderSettings } from "../../constants/constants"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Mousewheel, Keyboard, Autoplay } from "swiper/modules";
import { FaArrowLeftLong, FaArrowRight } from "react-icons/fa6";

const RecentProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
   const [isBeginning, setIsBeginning] = useState(true);
   const [isEnd, setIsEnd] = useState(false);
   
 
   useEffect(() => {
     if (!swiperInstance) return;
 
     const handleSlideChange = () => {
       setIsBeginning(swiperInstance.isBeginning);
       setIsEnd(swiperInstance.isEnd);
     };
 
     swiperInstance.on("slideChange", handleSlideChange);
     swiperInstance.on("reachBeginning", handleSlideChange);
     swiperInstance.on("reachEnd", handleSlideChange);
 
     return () => {
       swiperInstance.off("slideChange", handleSlideChange);
       swiperInstance.off("reachBeginning", handleSlideChange);
       swiperInstance.off("reachEnd", handleSlideChange);
     };
   }, [swiperInstance]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts(10, 10);
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
            <div className="w-full bg-white h-auto min-h-80 rounded-xl mb-2 p-5 shadow-md flex justify-center items-center">
                <img src={icons.loading} alt="Loading..." className="w-20 h-20" />
            </div>
        )
    }

  return (
    <div className="relative">
        <button
        className={`absolute z-50 left-2 top-1/2 transform -translate-y-1/2 text-xl p-2 bg-white rounded-full shadow-lg ${
          isBeginning ? "text-gray-600 cursor-not-allowed" : "text-black"
        }`}
        onClick={() => swiperInstance?.slidePrev()}
        disabled={isBeginning}
      >
        <FaArrowLeftLong size={20} />
      </button>
      <button
        className={`absolute z-50 right-2 top-1/2 transform -translate-y-1/2 text-xl p-2 bg-white rounded-full shadow-lg ${
          isEnd ? "text-gray-600 cursor-not-allowed" : "text-black"
        }`}
        onClick={() => swiperInstance?.slideNext()}
        disabled={isEnd}
      >
        <FaArrowRight size={20} />
      </button>
    <div className="w-full bg-white h-auto min-h-80 rounded-xl shadow-md mb-2 p-5 overflow-hidden">
        <h1 className="text-2xl mb-2 font-semibold font-sans">Recent Products</h1>
        <Swiper
            keyboard
            draggable
            freeMode
            slidesPerGroupSkip={1}
            autoplay={{
                delay: 7000,
                disableOnInteraction: false,
            }}
            grabCursor
            {...sliderSettings}
            modules={[Autoplay, Mousewheel, Keyboard]}
            onSwiper={setSwiperInstance} 
            className="grid grid-cols-5 gap-5 w-full">
        {
            products.map((product, index) => (
                <SwiperSlide key={index}>
                    <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.1*index, ease: "easeInOut", type: "spring" }}
                        >
                    <ProductCard pid={product.id}/>
                    </motion.div>
                </SwiperSlide>
            ))
        }
        </Swiper>
    </div>
    </div>
  )
}

export default RecentProducts