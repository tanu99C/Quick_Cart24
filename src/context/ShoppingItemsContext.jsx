import {createContext, useContext, useEffect, useState} from "react";
import {createClient} from "@supabase/supabase-js";

const supabase =
    createClient("https://urlznusnzjxlkusrpzpn.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVybHpudXNuemp4bGt1c3JwenBuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM3MTY4OTYsImV4cCI6MjAzOTI5Mjg5Nn0.tLx4b5x3WXC_M-mICE5tbAxG_RemvyVsOJ2MEZ29p8A");

const ShoppingItemsContext = createContext({});

export const useShoppingItems = () => useContext(ShoppingItemsContext);

export const ShoppingItemsProvider = props =>
{
    const [products, setProducts] = useState([]);
    // Whether currently the products are fetching their data on page load from server or not.
    const [isLoadingProducts, setIsLoadingProducts] = useState(true)

    useEffect(() =>
    {
        getProducts();
    }, []);

    async function getProducts()
    {
        const {data} = await supabase.from("products").select();
        setProducts(data);
        setIsLoadingProducts(false);
    }

    async function addProduct(product)
    {
        const {data, error} = await supabase.from("products").insert([product]).select();

        if (!error) setProducts([...products, ...data]);
        return error;
    }

    async function updateProduct(id, newProduct)
    {
        const {error} = await
            supabase.from("products").update(newProduct).eq('id', id);

        if (!error)
            setProducts(prevProducts =>
            {
                return prevProducts.map(item =>
                    item.id === id ?
                        {...item, ...newProduct} :
                        item
                );
            });

        return error;
    }

    async function deleteProduct(id)
    {
        const {error} = await
            supabase.from("products").delete().eq('id', id);

        if (!error)
            setProducts(prevProducts =>
            {
                return prevProducts.filter(item => item.id !== id);
            });

        return error;
    }

    return (
        <ShoppingItemsContext.Provider value={{products, addProduct, updateProduct, deleteProduct, isLoadingProducts}}>
            {props.children}
        </ShoppingItemsContext.Provider>
    );
};