import { categoryProps } from "../../types/Category"
import CategoryCard from "../CategoryCard"

const Categories = ({categories}:{categories : categoryProps[]}) => {
  return (
    <div className="grid grid-cols-5 gap-2">
      {
        categories.slice(0,5).map((category, index) => (
          <CategoryCard key={index} 
            category={category as categoryProps}
          />
        ))
      }
    </div>
  )
}

export default Categories