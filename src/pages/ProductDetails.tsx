import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../types/Product";
import { getProductById } from "../services/APIs";
import { icons } from "../constants/constants";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { LuDot } from "react-icons/lu";
import { BiChat, BiShare } from "react-icons/bi";
import { BsBag } from "react-icons/bs";
import { CartContext, cartItems } from "../Contexts/CartContext";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const productSizeset  = [
  {
    size: 'XS',
    longName: 'Extra Small'
  },
  {
    size: 'S',
    longName: 'Small'
  },
  {
    size: 'M',
    longName: 'Medium'
  },
  {
    size: 'L',
    longName: 'Large'
  },
  {
    size: 'XL',
    longName: 'Extra Large'
  }
]

const ProductDetails = () => {
    const { pid } = useParams<{ pid: string }>();
    const [product, setProduct] = useState<Product>({} as Product);
    const [imageIndex, setImageIndex] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [quantity, setQuantity] = useState<number>(1);
    const [productSize, setProductSize] = useState<string>('M');
    const { addToCart } = useContext(CartContext);
    const [cartProductDetails, setCartProductDetails] = useState<cartItems>({} as cartItems);

    useEffect(() => {
      if (pid) {
        setCartProductDetails({
          id: parseInt(pid),
          name: product.title,
          quantity: quantity,
          size: findProductSize(productSize),
          price: product.price,
          image: product.images?.[0] || ""
        });
      }
    }, [pid,quantity,productSize,product.images?.[0],product.title,product.price]);

    const handleAddtoCart = () => {
      addToCart(cartProductDetails);
      toast.success(<>
        <div className="flex items-center gap-2">
          <img src={cartProductDetails.image} alt="" className="w-10 h-10" />
          <div>
            <h1 className="text-black font-bold">Added to Cart</h1>
            <p className="text-gray-500"> {cartProductDetails.name} x {cartProductDetails.quantity} </p>
          </div>
        </div>
      </>);
    }




    useEffect(() => {
      const interval = setInterval(() => {
        if(product.images?.length > 1){
          setImageIndex((imageIndex) => (imageIndex + 1) % product.images?.length)
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
            setLoading(false);
          }
        } catch (error) {
          console.error("Error getting product:", error);
        }
      }
      fetchProduct();
    }, [pid]);

    const findProductSize = (size:string) => {
      return productSizeset.find((productSize) => productSize.size === size)?.longName || "Unknown Size"
    }


  return (
    <>
      <ToastContainer />
    <AnimatePresence mode="wait">
    <div className="w-full min-h-screen bg-slate-100 flex gap-2 px-28 py-20 ">
        <div className="w-[35%] overflow-hidden h-auto flex flex-col gap-2">
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
                  <img src={image} alt={product.title} key={index} className={`w-20 aspect-square bg-slate-200 object-cover rounded-md cursor-pointer ${index === imageIndex ? 'border-2 border-customGreen' : ''} ${product.images?.length > 3 ? 'grow' : ''}`} 
                  onClick={()=>setImageIndex(index)}
                  />
                ))
              }
            </div>
        </div>

        <div className="w-[40%] h-auto  flex flex-col gap-2 px-3">
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
                productSizeset.map((size, index) => (
                  <button key={index} className={`w-16 aspect-square  rounded-md flex items-center font-bold justify-center ${productSize === size.size ? 'bg-customGreen text-white' :  'bg-gray-200 text-black'}`}
                  onClick={()=>setProductSize(size.size)}
                  >{size.size}</button>
                ))
              }
            </div>
          </div>
        </div>

        <div className="w-[25%] h-auto  flex flex-col gap-2 px-3">
          <div className="w-full aspect-[4/1] justify-between bg-customGreen rounded-xl flex pl-4 p-3">
            <div>
              <h1 className="text-white font-semibold text-xl">25% OFF</h1>
              <p className="text-white/80 text-[10px]">If order over <span className="text-white text-[10px]">$120</span></p>
            </div>
            <div className="bg-white/50 w-1/2 aspect-auto h-full flex items-center justify-center rounded-xl">
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
                  <p className="font-bold">{productSize} ({findProductSize(productSize)}) </p>
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
                  if(quantity < 8 && quantity < product.stock){
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
            <button className="w-full bg-transparent border border-customGreen text-customGreen font-bold py-2 rounded-md mt-2 flex items-center justify-center gap-2"
            onClick={handleAddtoCart}
            ><BsBag/> Add to Bag</button>

            <hr className="w-full border-1 border-gray-200 my-3" />
            <div className="flex gap-2 justify-between">
              <h1 className="text-sm font-semibold text-customGreen flex items-center gap-1"><BiChat/> Chat Seller</h1>
              <p className="text-sm font-semibold text-customGreen flex items-center gap-1"><BiShare/> Share Product</p>
            </div>
          </div>
        </div>
    </div>
    </AnimatePresence>
    </>
  )
}

export default ProductDetails