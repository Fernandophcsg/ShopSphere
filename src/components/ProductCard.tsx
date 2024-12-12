import { useEffect, useState } from "react"
import { Product } from "../types/Product"
import { ProductCardProps } from "../types/ProductCard"
import { getProductById } from "../services/APIs"
import { useNavigate } from "react-router-dom"
import { icons } from "../constants/constants"

const ProductCard:React.FC<ProductCardProps> = ({ pid }) => {
  const [product, setProduct] = useState<Product>({} as Product)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    getProductById(pid).then((res) => {
      setProduct(res.data)
      setLoading(false)
    }).then((err) => {
      console.error(err)
    })
  }, [pid])

  const handleNavigate = (pid:number) => () => {
    navigate(`/product/${pid}`)
  }
    
  return (
    <>
    <div className="w-full min-h-72 cursor-pointer hover:bg-gray-200 transition-all duration-200 aspect-[4/5] bg-white shadow-md rounded-md"
    onClick={handleNavigate(pid)}
    >
    {
      loading ? <p className="w-full h-full min-h-80 flex items-center justify-center">
        <img src={icons.loading} alt="" width={50}/>
      </p> :
      <>
      <img src={product.thumbnail} alt={product.title} className="w-full h-1/2 object-cover rounded-t-md" />
      <div className="p-4 flex flex-col gap-5">
        <div>
          <h2 className="text-sm text-gray-500 font-semibold">{product.title?.split("").slice(0,20)}...</h2>
          <p className="text-black font-semibold h-11 overflow-hidden">{product.description?.split("").slice(0,50)}...</p>
        </div>
        <p className="text-customGreen font-semibold">${product.price}</p>
      </div>
      </>
    }
    </div>
    </>
  )
}

export default ProductCard