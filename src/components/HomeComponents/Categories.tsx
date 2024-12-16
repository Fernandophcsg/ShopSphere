import { useEffect, useState } from "react";
import { sliderSettings } from "../../constants/constants";
import { categoryProps } from "../../types/Category";
import CategoryCard from "../CategoryCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Mousewheel, Keyboard, Autoplay } from "swiper/modules";
import { FaArrowLeftLong, FaArrowRight } from "react-icons/fa6";

const Categories = ({ categories }: { categories: categoryProps[] }) => {
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  

  useEffect(() => {
    if (!swiperInstance) return;

    const handleSlideChange = () => {
      setIsBeginning(swiperInstance.isBeginning);
      setIsEnd(swiperInstance.isEnd);
    };

    swiperInstance.on("slideChange", handleSlideChange);
    swiperInstance.on("reachBeginning", handleSlideChange);
    swiperInstance.on("reachEnd", handleSlideChange);

    return () => {
      swiperInstance.off("slideChange", handleSlideChange);
      swiperInstance.off("reachBeginning", handleSlideChange);
      swiperInstance.off("reachEnd", handleSlideChange);
    };
  }, [swiperInstance]);

  return (
    <div className="relative">
      <button
        className={`absolute z-50 left-2 top-1/2 transform -translate-y-1/2 text-xl p-2 bg-white rounded-full shadow-lg ${
          isBeginning ? "text-gray-600 cursor-not-allowed" : "text-black"
        }`}
        onClick={() => swiperInstance?.slidePrev()}
        disabled={isBeginning}
      >
        <FaArrowLeftLong size={20} />
      </button>
      <button
        className={`absolute z-50 right-2 top-1/2 transform -translate-y-1/2 text-xl p-2 bg-white rounded-full shadow-lg ${
          isEnd ? "text-gray-600 cursor-not-allowed" : "text-black"
        }`}
        onClick={() => swiperInstance?.slideNext()}
        disabled={isEnd}
      >
        <FaArrowRight size={20} />
      </button>

      <Swiper
        keyboard
        draggable
        freeMode
        slidesPerGroupSkip={1}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        grabCursor
        {...sliderSettings}
        modules={[Autoplay, Mousewheel, Keyboard]}
        onSwiper={setSwiperInstance}
        className="grid grid-cols-5 gap-2 my-swiper"
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index}>
            <CategoryCard category={category as categoryProps} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Categories;
