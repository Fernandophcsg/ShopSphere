import { useEffect, useRef, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { getAllCategoryList } from "../services/APIs";
import { useNavigate } from "react-router-dom";


const Dropdownbtn = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [categoryList, setCategoryList] = useState<string[]>([]);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const showMenuItems = () => {
    setShowMenu(!showMenu);
  };

  const handleListItemClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const category = e.currentTarget.textContent;
    if (category === "All") {
      navigate(`/products`);
      setShowMenu(false); // Close the menu
      return;
    }
    navigate(`/products/${category}`);
    setShowMenu(false); // Close the menu
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchCategoryList = async () => {
      try {
        const response = await getAllCategoryList();
        setCategoryList(response);
      } catch (error) {
        console.error("Error getting categories:", error);
      }
    };
    fetchCategoryList();
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="border flex gap-1 items-center border-gray-500 bg-gray-300/30 text-white/65 px-5 py-2 rounded-tl-md rounded-bl-md border-r-0"
        type="button"
        onClick={showMenuItems}
      >
        All Categories
        <TiArrowSortedDown
          className={`text-white/65 text-xl ${
            showMenu === true ? "-rotate-180" : "rotate-0"
          } transition-all duration-100`}
        />
      </button>
      {showMenu && (
        <ul
          className="absolute z-10 top-11 h-48 min-w-[180px] overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 focus:outline-none"
        >
          <li
            className="cursor-pointer text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
            onClick={handleListItemClick}
          >
            All
          </li>
          {categoryList.map((item, index) => (
            <li
              key={index}
              className="cursor-pointer capitalize text-slate-800 flex w-full text-sm items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100"
              onClick={handleListItemClick}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdownbtn;
