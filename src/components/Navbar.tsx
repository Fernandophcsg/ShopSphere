import { icons } from "../constants/constants"
import { FaShoppingCart } from "react-icons/fa"
import { BiSearch } from "react-icons/bi"
import Dropdownbtn from "./Dropdownbtn"

const Navbar = () => {
  return (
    <div className="w-full relative gap-10 bg-black h-20 flex items-center px-20 justify-between">
        <div className="flex items-center gap-1">
            <img src={icons.logo} alt="logo" className="w-10 aspect-square" />
            <p className="text-white text-xl uppercase">ShopSphere</p>
        </div>
        <div className="flex grow items-center justify-center ">
            <Dropdownbtn />
            <input type="text" placeholder="Search Products here..." className="w-1/2  border text-white border-gray-500 bg-transparent p-2 " />
            <div className="bg-customGreen p-2 border border-gray-500 cursor-pointer rounded-tr-md rounded-br-md">
                <BiSearch className="text-white text-2xl " />
            </div>
        </div>
        <div className="flex items-center gap-4">
            <FaShoppingCart className="text-white text-3xl" />
            <button className="text-white w-max cursor-pointer bg-customGreen px-5 py-2 rounded-md">login</button>
        </div>
    </div>
  )
}

export default Navbar

