import { icons } from "../constants/constants";

interface CategoryProps {
    type:string;
}

const CategoryCard:React.FC<CategoryProps> = ({type}) => {
  return (
    <div className="w-full cursor-pointer aspect-square border border-gray-400 p-2 rounded-xl" >
        <img src={icons.logo} alt={type} className="w-full h-2/3 object-cover rounded-xl" />
        <h1 className="text-center text-sm font-semibold py-2">{type}</h1>
    </div>
  )
}

export default CategoryCard