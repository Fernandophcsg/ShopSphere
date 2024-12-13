import { useNavigate } from "react-router-dom";
import { categoryProps, HandleClickCategory } from "../types/Category";
import { icons } from "../constants/constants";
import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../types/Product";


export const CategoryCard = ({category}:{category:categoryProps}) => {
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${category.url}/?limit=1`);
        setProduct(response.data.products);
      } catch (error) {
        console.error("Error getting categories:", error);
      }
    }
    fetchCategories();
  }, [category])

  const findImage = product[0]?.images?.[0] || icons.loading;

  const handleClickCategory: HandleClickCategory = (slug) => {
    navigate(`/products/${slug}`);
  }
  return (
    <div className="w-full cursor-pointer aspect-square border border-gray-400 p-2 rounded-xl" onClick={()=>handleClickCategory(category.slug)}>
      <div className="w-full h-2/3 overflow-hidden flex items-center justify-center">
        <img src={findImage} alt={category.slug} width={45}  />
      </div>
        <h1 className="text-center text-sm font-semibold py-2">{category.name.split(" ")[0] }</h1>
    </div>
  )
}

export default CategoryCard