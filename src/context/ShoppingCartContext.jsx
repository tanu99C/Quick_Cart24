import {createContext, useContext, useEffect, useState} from "react";
import {useLocalStorage} from "../hooks/useLocalStorage.js";
import {useShoppingItems} from "./ShoppingItemsContext.jsx";

const ShoppingCartContext = createContext({});
export const useShoppingCart = () => useContext(ShoppingCartContext);
export const ShoppingCartProvider = props =>
{
    const [cartItems, setCartItems] = useLocalStorage('cart-items', [])
    const [isCartOpen, setIsCartOpen] = useState(false)
    const cartQuantity = cartItems.reduce((previousSum, item) => previousSum + item.quantity, 0);
    const {products, isLoadingProducts} = useShoppingItems()

    function getItemQuantity(id)
    {
        return cartItems.find(item => item.id === id)?.quantity || 0;
    }

    function increaseItemCount(id)
    {
        let itemIndex = cartItems.findIndex(item => item.id === id);
        const newCart = cartItems.slice();

        if (itemIndex === -1)
            newCart.push({id: id, quantity: 1});
        else
            newCart[itemIndex].quantity++;

        setCartItems(newCart);
    }

    function decreaseItemCount(id)
    {
        let newCart = cartItems.slice();
        let item = newCart.find(item => item.id === id);

        if (!item) return;

        if (item.quantity === 1)
            setCartItems(newCart.filter(i => i.id !== id));
        else
        {
            item.quantity--;
            setCartItems(newCart);
        }
    }

    function removeItem(id)
    {
        setCartItems(cartItems.filter(i => i.id !== id));
    }

    // Effect to remove invalid cart items when products change.
    useEffect(() =>
    {
        // Ignore the initial products change on page load. 
        if (isLoadingProducts) return;
        if (!products) return;

        const updatedCartItems = cartItems.filter(cartItem =>
            products.some(product => product.id === cartItem.id)
        );
        setCartItems(updatedCartItems);
    }, [products]);

    return (
        <ShoppingCartContext.Provider
            value={{
                getItemQuantity,
                increaseItemCount,
                decreaseItemCount,
                removeItem,
                cartQuantity,
                cartItems,
                isCartOpen,
                setIsCartOpen
            }}>
            {props.children}
        </ShoppingCartContext.Provider>
    );
};