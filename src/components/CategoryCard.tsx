import { useNavigate } from "react-router-dom";
import { categoryProps, HandleClickCategory } from "../types/Category";
import { icons } from "../constants/constants";


export const CategoryCard = ({category}:{category:categoryProps}) => {
  const navigate = useNavigate();


  const handleClickCategory: HandleClickCategory = (slug) => {
    navigate(`/products/${slug}`);
  }
  return (
    <div className="w-full cursor-pointer aspect-square border border-gray-400 p-2 rounded-xl" onClick={()=>handleClickCategory(category.slug)}>
      <div className="w-full h-2/3 flex items-center justify-center">
        <img src={icons.loading} alt={category.slug} width={45}  />
      </div>
        <h1 className="text-center text-sm font-semibold py-2">{category.name}</h1>
    </div>
  )
}

export default CategoryCard