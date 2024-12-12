import AllProducts from "../components/HomeComponents/AllProducts"
import BestProducts from "../components/HomeComponents/BestProducts"
import RecentProducts from "../components/HomeComponents/RecentProducts"
import HomeSlider from "../components/HomeComponents/HomeSlider"
import TypicalButton from "../components/TypicalButton"
import { Categories, colors } from "../constants/constants"
import CategoryCard from "../components/CategoryCard"

const Homepage = () => {
  
  return (
    <div>
        <h1 className="text-black">
            <div className="relative px-28 h-auto bg-gray-100 pb-3 flex flex-col">
                <HomeSlider />
                <div className="w-full pt-[calc(18rem-11rem/3)] relative flex gap-3 pb-5">
                    <div className="bg-white w-1/2 h-auto rounded-xl shadow-lg py-3 px-5">
                      <h1 className="text-xl mb-2 font-semibold font-sans">Categories</h1>
                      <div className="grid grid-cols-5 gap-2">
                        {
                          Categories.slice(0,5).map((type, index) => (
                            <CategoryCard key={index} type={type}/>
                          ))
                        }
                      </div>
                    </div>
                    <div className="bg-white w-1/2  h-auto rounded-xl shadow-lg py-3 px-5">
                    <h1 className="text-xl mb-2 font-semibold font-sans">Categories</h1>
                      <div className="grid grid-cols-5 gap-2">
                        {
                          Categories.slice(0,5).map((type, index) => (
                            <CategoryCard key={index} type={type}/>
                          ))
                        }
                      </div>
                    </div>
                </div>
                <RecentProducts />
                <BestProducts />
                <div className="flex gap-5 mb-10 w-full overflow-auto">
                {
                  Categories.slice(0,8).map((type, index) => (
                    <TypicalButton key={index} type={type} color={colors[index%7]}/>
                  ))
                }
                </div>
                <AllProducts />
            </div>

        </h1>
    </div>
  )
}

export default Homepage
