import { createContext, useEffect, useState } from "react";

export interface cartItems {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    size: string;
}


interface CartContextType {
    cartItems: cartItems[];
    increaseQuantity: (pid: number) => void;
    decreaseQuantity: (pid: number) => void;
    addToCart: (product: cartItems) => void;
    removeFromCart: (pid: number) => void;
}


export const CartContext = createContext<CartContextType>({
    cartItems: [],
    addToCart: () => {},
    increaseQuantity: () => {},
    decreaseQuantity: () => {},
    removeFromCart: () => {}
});

const CartProvider = ({children}:{children:React.ReactNode}) => {
    const [cartItems, setCartItems] = useState<cartItems[]>([]);
    const items = localStorage.getItem('cartItems') || '[]';

    const addToCart = (product: cartItems) => {
        if(product.id !== -1){
            const existingProduct = cartItems.find((item) => item.id === product.id);
            if(existingProduct){
                if(existingProduct.quantity !== product.quantity){
                setCartItems(cartItems.map((item) => item.id === product.id ? {...item, quantity: product.quantity} : item));
                }
                else if(existingProduct.size !== product.size){
                    setCartItems(cartItems.map((item) => item.id === product.id ? {...item, size: product.size} : item));
                }
                else{
                    setCartItems(cartItems);
                }
            }
            else{
                setCartItems([...cartItems, product]);
            }
        }
        else{
            setCartItems([...cartItems, product]);
        }
    };

    const increaseQuantity = (pid: number) => {
        setCartItems(cartItems.map((item) => (item.id === pid && item.quantity < 8 ) ? {...item, quantity: item.quantity + 1} : item));
    };

    const decreaseQuantity = (pid: number) => {
        if(cartItems.find((item) => item.id === pid)?.quantity === 1){
            removeFromCart(pid);
            return;
        }
        setCartItems(cartItems.map((item) => item.id === pid ? {...item, quantity: item.quantity - 1} : item));
    };



    const removeFromCart = (pid: number) => {
        setCartItems(cartItems.filter((item) => item.id !== pid));
    };

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems,removeFromCart]);

    useEffect(() => {
        if(items){
            setCartItems(JSON.parse(items));
        }
    }, []);

    
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <CartContext.Provider value={{ cartItems, addToCart,increaseQuantity,decreaseQuantity, removeFromCart}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider