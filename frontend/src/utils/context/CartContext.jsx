import { createContext, useContext, useEffect, useState} from "react";
import { AuthContext } from "./AuthContext";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children}) => {
    const { auth } = useContext(AuthContext);
    const [ cart, setCart] = useState([]);

    useEffect(() => {
        if(auth?.user?.email) {
            const storedCart = localStorage.getItem(`cart_${auth.user.email}`);
            
            setCart(storedCart ? JSON.parse(storedCart) : []);
        }else {
            setCart([]);
        }
    }, [auth]);

    useEffect(() => {
        if(auth?.user?.email) {
            localStorage.setItem(`cart_${auth.user.email}`, JSON.stringify(cart));
        }
    }, [cart, auth]);

    const addToCart = (product, quantity) => {
        if(quantity === 0) return;
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item._id === product._id);
            if (existingProduct) {
              const updatedQuantity = existingProduct.quantity + quantity;
              if (updatedQuantity < 1) {
                return prevCart.filter((item) => item._id !== product._id); 
              }
              return prevCart.map((item) =>
                item._id === product._id
                  ? { ...item, quantity: updatedQuantity }
                  : item
              );
            } else {
              return [...prevCart, { ...product, quantity }];
            }
          });
        };

    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
    };

    const clearCart = () => setCart([]);
    
    const totalQuantity = () => cart.reduce((acc, item) => acc + item.quantity, 0);

    const totalPrice = () => cart.reduce((acc, item) => acc + item.prix * item.quantity, 0);


    return (
        <CartContext.Provider value={{ 
            cart, 
            addToCart, 
            removeFromCart, 
            clearCart, 
            totalQuantity, 
            totalPrice 
            }}
            >
            {children}
        </CartContext.Provider>
    );
};
