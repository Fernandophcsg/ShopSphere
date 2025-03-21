import AllProducts from "../components/HomeComponents/AllProducts"
import BestProducts from "../components/HomeComponents/BestProducts"
import RecentProducts from "../components/HomeComponents/RecentProducts"
import HomeSlider from "../components/HomeComponents/HomeSlider"
import TypicalButton from "../components/TypicalButton"
import { colors, icons } from "../constants/constants"
import { useEffect, useState } from "react"
import { categoryProps } from "../types/Category"
import { getAllCategories } from "../services/APIs"
import Categories from "../components/HomeComponents/Categories"

const Homepage = () => {
  const [categories, setCategories] = useState<categoryProps[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response);
        setLoading(false);

      } catch (error) {
        console.error("Error getting categories:", error);
      }
    }
    fetchCategories();
  }, [])

  
  return (
    <div>
        <h1 className="text-black">
            <div className="relative px-10 md:px-16 lg:px-28 h-auto bg-gray-100 pb-3 flex flex-col">
                <HomeSlider />
                <div className="w-full pt-[calc(18rem-11rem/3)] relative flex gap-3 pb-5">
                    {
                      loading ? (
                        <div className="w-1/2 bg-white h-auto rounded-xl shadow-lg py-3 px-5">
                          <h1 className="text-xl mb-2 font-semibold font-sans">Categories</h1>
                          <div className="w-full h-20 flex justify-center items-center">
                            <img src={icons.loading}  alt="Loading..." className="w-20 h-20"/>
                          </div>
                        </div>
                      ) : 
                      <>
                        <div className="bg-white w-1/2 h-auto rounded-xl shadow-lg py-3 px-5">
                          <h1 className="text-xl mb-2 font-semibold font-sans">Categories</h1>
                          <Categories categories={categories}/>
                        </div>
                      </>
                    }
                    {
                      loading ? (
                        <div className="w-1/2 bg-white h-auto rounded-xl shadow-lg py-3 px-5">
                          <h1 className="text-xl mb-2 font-semibold font-sans">Categories</h1>
                          <div className="w-full h-20 flex justify-center items-center">
                            <img src={icons.loading}  alt="Loading..." className="w-20 h-20"/>
                          </div>
                        </div>
                      ) : 
                      <>
                        <div className="bg-white w-1/2 h-auto rounded-xl shadow-lg py-3 px-5">
                          <h1 className="text-xl mb-2 font-semibold font-sans">Categories</h1>
                          <Categories categories={categories}/>
                        </div>
                      </>
                    }

                    
                </div>
                <RecentProducts />
                <BestProducts />
                <div className="flex gap-5 mb-10 w-full overflow-auto ">
                {
                  categories.slice(0,8).map((category, index) => (
                    <TypicalButton key={index} category={category as categoryProps} color={colors[index%6]}/>
                  ))
                }
                </div>
                <AllProducts/>
                
            </div>
        </h1>
    </div>
  )
}

export default Homepage
