import { icons } from "../constants/constants"
import { BiSearch } from "react-icons/bi"
import Dropdownbtn from "./Dropdownbtn"
import { useLocation, useNavigate } from "react-router-dom"
import { BsBag } from "react-icons/bs"
import { useContext, useEffect, useState } from "react"
import CartDrawer from "./CartDrawer"
import LoginModal from "./LoginModal"
import { AvatarWithUserDropdown } from "./ProfileMenuIcon"
import { AuthContext } from "../Contexts/AuthContext"
import { CartContext } from "../Contexts/CartContext"

const Navbar = () => {
    const navigate = useNavigate();
    const { pathname} = useLocation()
    const { cartItems } = useContext(CartContext)
    
    const [openRight, setOpenRight] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const openDrawerRight = () => setOpenRight(true);
    const closeDrawerRight = () => setOpenRight(false);
    const isUserLoggedin = localStorage.getItem('user') || sessionStorage.getItem('user')
    const { setIsLoggedin } = useContext(AuthContext)

    useEffect(() => {
        if(isUserLoggedin){
            setIsLoggedin(true)
        }else{
            setIsLoggedin(false)
        }
    }, [isUserLoggedin])
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        navigate(`/products/${e.target.value}`)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    const handleOpen = () => {
        setOpenModal(!openModal)
    }

  return (
    <>
    <div className="w-full relative gap-10 bg-black h-20 flex items-center px-20 justify-between">
        <div className="flex items-center gap-1 cursor-pointer" onClick={()=>navigate('/')}>
            <img src={icons.logo} alt="logo" className="w-10 aspect-square" />
            <p className="text-white text-xl uppercase">ShopSphere</p>
        </div>
        <div className="flex grow items-center justify-center ">
            <Dropdownbtn />
            <input type="text" placeholder="Search Products here..." className="w-1/2  border text-white border-gray-500 bg-transparent p-2"  onChange={(e)=>handleSearchChange(e)} />
            <div className="bg-customGreen p-2 border border-gray-500 cursor-pointer rounded-tr-md rounded-br-md">
                <BiSearch className="text-white text-2xl " />
            </div>
        </div>
        <div className="flex items-center gap-4">
            <div className="relative">
            <BsBag className="text-white text-3xl cursor-pointer" onClick={openDrawerRight}/>
            {
                cartItems.length > 0 && 
                <div className="absolute w-5 aspect-square text-[8px] flex items-center justify-center -top-2 -right-2 bg-red-500 text-white rounded-full p-1">
                    {cartItems.length}
                </div>
            }
            </div>
            {
                isUserLoggedin  ? 
                <AvatarWithUserDropdown /> :
                <>
                <button className="text-white w-max cursor-pointer bg-customGreen px-8 py-2 rounded-md"
                onClick={handleOpen}>login</button>
                </>
                
            }
        </div>

    </div>
    <div className="fixed top-0 h-full right-0 bg-white z-[200]">
        <CartDrawer openRight={openRight} closeDrawerRight={closeDrawerRight} />
    </div>
    <div className="fixed top-0 h-full right-0 bg-trasparent z-50">
        <LoginModal open={openModal} handleOpen={handleOpen} />
    </div>
    </>
  )
}

export default Navbar

