import { useNavigate } from "react-router-dom";
import { categoryProps, HandleClickCategory } from "../types/Category"


const TypicalButton = ({category,color}:{category:categoryProps,color:string}) => {
  const navigate = useNavigate();

 

  const handleClickCategory: HandleClickCategory = (slug) => {
    navigate(`/products/${slug}`);
  }
  return (
    <button 
      onClick={()=>handleClickCategory(category.slug)}
      style={{backgroundColor: color}}
      className="w-max px-7 py-4 rounded-lg grow opacity-85 text-white text-md relative overflow-hidden">
        <div className="absolute bg-slate-800/30 w-5 h-16 -top-3 right-3 -z-10 rotate-12" />
        <div className="absolute bg-slate-800/30 w-5 h-12 -top-5 right-10 -z-10 rotate-12" />
        <div className="absolute bg-slate-800/30 w-5 h-10 -bottom-6 left-3 -z-10 rotate-12" />
        {category.name}
    </button>
  )
}

export default TypicalButton