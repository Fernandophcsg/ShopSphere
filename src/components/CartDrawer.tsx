import { Drawer, Typography, IconButton } from "@material-tailwind/react";
import { TbTrash } from "react-icons/tb";
import { CartContext, cartItems } from "../Contexts/CartContext";
import { useContext, useEffect, useState } from "react";

interface CartDrawerProps {
  openRight: boolean;
  closeDrawerRight: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({
  openRight,
  closeDrawerRight,
}) => {
  const [cartItems, setCartItems] = useState<cartItems[]>([]);
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  const localStorageCartItems = localStorage.getItem("cartItems") || "[]";

  useEffect(() => {
    setCartItems(JSON.parse(localStorageCartItems));
  }, [localStorageCartItems,removeFromCart]);

  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }

  return (
    <>
      <Drawer
        placement="right"
        open={openRight}
        onClose={closeDrawerRight}
        className="p-4 w-[500px] overflow-auto"
        size={500}
        placeholder=""
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
      >
        <div className="mb-6 flex items-center justify-between">
          <Typography
            variant="h5"
            color="blue-gray"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            Cart Items
          </Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={closeDrawerRight}
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>

        <div className="flex flex-col gap-10 mb-10">
          {
            cartItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex gap-4">
                  <img src={item.image} alt="" className="w-16" />
                  <div>
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      placeholder=""
                      onPointerEnterCapture={() => {}}
                      onPointerLeaveCapture={() => {}}
                    >
                      {item?.name.split(" ").slice(0, 2).join(" ")}
                    </Typography>
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      placeholder=""
                      onPointerEnterCapture={() => {}}
                      onPointerLeaveCapture={() => {}}
                    >
                      $ {item.price}
                    </Typography>
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      placeholder=""
                      onPointerEnterCapture={() => {}}
                      onPointerLeaveCapture={() => {}}
                    >
                      {item.size}
                    </Typography>
                  </div>
                </div>
                <div className="flex gap-2">
                  {/* quantity button*/}
                  <div className="flex gap-2 items-center rounded-md px-2">
                    <IconButton
                      onClick={() => decreaseQuantity(item.id)}
                      variant="text"
                      color="blue-gray"
                      placeholder=""
                      className="flex items-center justify-center"
                      onPointerEnterCapture={() => {}}
                      onPointerLeaveCapture={() => {}}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-5 w-5 bg-slate-300 rounded-full p-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20 12H4"
                        />
                      </svg>
                    </IconButton>
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      placeholder=""
                      onPointerEnterCapture={() => {}}
                      onPointerLeaveCapture={() => {}}
                    >
                      {item.quantity}
                    </Typography>
                    <IconButton
                      onClick={() => increaseQuantity(item.id)}
                      variant="text"
                      color="blue-gray"
                      placeholder=""
                      className="flex items-center justify-center"
                      onPointerEnterCapture={() => {}}
                      onPointerLeaveCapture={() => {}}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-5 w-5 bg-slate-300 rounded-full p-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </IconButton>
                  </div>

                  <IconButton
                    onClick={() => removeFromCart(item.id)}
                    variant="text"
                    color="blue-gray"
                    placeholder=""
                    className="flex items-center justify-center"
                    onPointerEnterCapture={() => {}}
                    onPointerLeaveCapture={() => {}}
                  >
                    <TbTrash className="h-5 w-5 text-red-500" />
                  </IconButton>
                </div>
              </div>
            ))
          }
        
        </div>
        <div className="flex justify-between items-center">
          <Typography
            variant="h6"
            color="blue-gray"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            Total
          </Typography>
          <Typography
            variant="h6"
            color="blue-gray"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
          >
            ${calculateTotal().toFixed(2)}
          </Typography>
        </div>
        <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md mt-5">
          Checkout
        </button>
      </Drawer>
    </>
  );
};

export default CartDrawer;
