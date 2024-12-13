import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../types/Product";
import { getProductById } from "../services/APIs";
import { icons } from "../constants/constants";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { LuDot } from "react-icons/lu";
import { BiChat, BiShare } from "react-icons/bi";
import { BsBag } from "react-icons/bs";

const ProductDetails = () => {
    const { pid } = useParams<{ pid: string }>();
    const [product, setProduct] = useState<Product>({} as Product);
    const [imageIndex, setImageIndex] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [quantity, setQuantity] = useState<number>(1);

    useEffect(() => {
      const interval = setInterval(() => {
        if(product.images.length > 1){
          setImageIndex((imageIndex) => (imageIndex + 1) % 3)
        }
      }, 5000)
  
      return () => clearInterval(interval)
    }, [imageIndex]);


    useEffect(() => {
      const fetchProduct = async () => {
        try {
          if (pid) {
            const response = await getProductById(parseInt(pid));
            setProduct(response.data);
            console.log(response.data);
            setLoading(false);
          }
        } catch (error) {
          console.error("Error getting product:", error);
        }
      }
      fetchProduct();
    }, [pid]);

  return (
    <AnimatePresence mode="wait">
    <div className="w-full min-h-screen bg-slate-100 flex px-28 py-20 ">
        <div className="w-full basis-2/5 overflow-hidden h-auto flex flex-col gap-2">
          {
            loading ? <p className="w-full aspect-square bg-slate-100 flex items-center justify-center rounded-md">
              <img src={icons.loading} alt="" className="w-20"/>
            </p> : 
            <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0}}
            transition={{ duration: 1 }}
            key= {`product-${imageIndex}`}
            src={product.images?.[imageIndex]} alt={product.title} className="w-full aspect-square bg-slate-200 object-cover rounded-md" />
          }
            <div className="w-full h-auto flex gap-2 ">
              {
                product.images?.map((image, index) => (
                  <img src={image} alt={product.title} key={index} className="w-20 aspect-square bg-slate-200 object-cover rounded-md cursor-pointer" 
                  onClick={()=>setImageIndex(index)}
                  />
                ))
              }
            </div>
        </div>

        <div className="w-full h-auto basis-2/5 flex flex-col gap-2 px-3">
          <p className="text-customGreen font-sans text-md font-bold">{product.category}</p>
          <h2 className="text-3xl font-bold text-slate-900">{product.title}</h2>
          <div className="flex items-center gap-2">
            <FaStar className="text-yellow-500" />
            <p className="text-gray-400"> {product.rating} </p>
            <LuDot className="text-gray-400" /> 
            <p className="text-gray-400"> {product.reviews?.length}+ Reviews </p>
          </div>
          <div className="w-full pt-5">
            <h1 className="font-bold font-sans">Choose size:</h1>
            <div className="flex gap-2 pt-2">
              {
                ['XS', 'S', 'M', 'L', 'XL'].map((size, index) => (
                  <button key={index} className={`w-16 aspect-square bg-gray-100 rounded-md flex items-center font-bold justify-center`}>{size}</button>
                ))
              }
            </div>
          </div>
        </div>

        <div className="w-full h-auto basis-1/5 flex flex-col gap-2 px-3">
          <div className="w-full aspect-[4/1] justify-between bg-customGreen rounded-xl flex pl-4 p-3">
            <div>
              <h1 className="text-white font-semibold text-xl">25% OFF</h1>
              <p className="text-white/80 text-[10px]">If order over <span className="text-white text-[10px]">$120</span></p>
            </div>
            <div className="bg-white/50 w-1/2 h-full flex items-center justify-center rounded-xl">
                <p className="text-[10px] text-white/80">Until Jan 01, 2025</p>
            </div>
          </div>
          
          <div className="w-full h-auto bg-white px-3 rounded-xl py-5">
            <h1 className="text-lg font-bold text-slate-900">Set Order</h1>
            <hr className="w-full border-1 border-gray-200 my-2" />
            <div className="flex">
                <img src={product.images?.[0]} alt="" className="w-12" />
                <div>
                  <h1>Selected Size</h1>
                  <p className="font-bold">M (Medium)</p>
                </div>
            </div>
            <div className="pt-5 flex justify-between items-center">
              <div className="w-1/2 aspect-auto bg-white border border-slate-200 rounded-xl flex items-center justify-between p-2">
                <button className="w-1/3 aspect-square bg-slate-200 text-black flex items-center justify-center font-bold rounded-full"
                onClick={()=>{
                  if(quantity > 1){
                    setQuantity(quantity - 1)
                  }
                }}
                >-</button>
                <p className="text-center font-bold">{quantity}</p>
                <button className="w-1/3 aspect-square bg-slate-200 text-black flex items-center justify-center font-bold rounded-full"
                onClick={()=>{
                  if(quantity < 8){
                    setQuantity(quantity + 1)
                  }
                }}
                >+</button>
              </div>
               <h3 className="text-slate-500">Stock: <span className="text-black font-bold pl-2">{product.stock}</span> </h3>
            </div>
            <div className="w-full h-auto  pt-5">
              <h1 className="text-sm text-slate-500 font-semibold flex justify-between items-center">Total Price : <span className="text-xl text-black font-bold"> ${(product.price*quantity).toFixed(2)}</span></h1>
            </div>
            <button className="w-full bg-customGreen text-white font-bold py-2 rounded-md mt-5">Buy Now</button>
            <button className="w-full bg-transparent border border-customGreen text-customGreen font-bold py-2 rounded-md mt-2 flex items-center justify-center gap-2"><BsBag/> Add to Bag</button>

            <hr className="w-full border-1 border-gray-200 my-3" />
            <div className="flex gap-2 justify-between">
              <h1 className="text-sm font-semibold text-customGreen flex items-center gap-1"><BiChat/> Chat Seller</h1>
              <p className="text-sm font-semibold text-customGreen flex items-center gap-1"><BiShare/> Share Product</p>
            </div>
          </div>
        </div>
    </div>
    </AnimatePresence>
  )
}

export default ProductDetails