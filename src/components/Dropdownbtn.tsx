import { useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";

type MenuItem = { id: number; name: string; };


const menuItems : MenuItem[] = [
    { id: 1, name: 'All Categories' },
    { id: 2, name: 'Menu Item 2' },
    { id: 3, name: 'Menu Item 3' },
    { id: 4, name: 'Menu Item 4' },
    { id: 5, name: 'Menu Item 5' },
]

const Dropdownbtn = () => {
    const [showMenu, setShowMenu] = useState(false);

    const showMenuItems = () => {
        setShowMenu(!showMenu);
    }
  return (
    <div className="relative">
    <button className="border flex gap-1 items-center border-gray-500 bg-gray-300/30 text-white/65 px-5 py-2 rounded-tl-md rounded-bl-md border-r-0" type="button" onClick={showMenuItems}>
        All Categories
        <TiArrowSortedDown  className= {`text-white/65 text-xl ${showMenu === true ? '-rotate-180':'rotate-0'} transition-all duration-100`} />
  </button>
  {
    showMenu &&
  <ul
    className="absolute z-10 top-11 min-w-[180px] overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 focus:outline-none"
  >
    { 
    menuItems.map((item: MenuItem & { id: number; name: string }) => (
            <li
              key={item.id}
              className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
            >
              {item.name}
            </li>
        ))
    }
  </ul>
  }
  </div>
  )
}

export default Dropdownbtn