import {useShoppingCart} from "../context/ShoppingCartContext.jsx";
import Offcanvas from "react-bootstrap/Offcanvas";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import CartItem from "./CartItem.jsx";
import formatCurrency from "../utils/formatCurrency.js";
import {useShoppingItems} from "../context/ShoppingItemsContext.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSackDollar} from "@fortawesome/free-solid-svg-icons";
import CheckoutModal from "./Modals/CheckoutModal.jsx";
import {useState} from "react";

export default function ShoppingCart()
{
    const {isCartOpen, setIsCartOpen, cartItems, cartQuantity} = useShoppingCart();
    const [checkoutModalIsOpen, setCheckoutModalIsOpen] = useState(false);
    const {products} = useShoppingItems()

    return (
        <>
            <CheckoutModal modalIsOpen={checkoutModalIsOpen}
                           closeModal={() => setCheckoutModalIsOpen(false)}/>

            <Offcanvas show={isCartOpen} onHide={() => setIsCartOpen(current => !current)} placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {
                        cartQuantity <= 0 ?
                            <h2 style={{textAlign: 'center'}}>Your cart is empty 😥</h2> :
                            <Stack gap='2'>
                                {cartItems.map((item) => <CartItem key={'card-item-' + item.id} {...item}></CartItem>)}

                                <div className='pt-4 text-primary fs-2 fw-medium w-100 d-flex justify-content-between'>
                                    <span>Total:</span>
                                    <span>{
                                        formatCurrency(
                                            cartItems.reduce((total, currentItem) =>
                                            {
                                                const storeItem = products.find(i => i.id === currentItem.id) || 0;
                                                return total + storeItem.price * currentItem.quantity;
                                            }, 0)
                                        )
                                    }</span>
                                </div>

                                <Button
                                    className='w-100 fw-medium d-flex align-items-center justify-content-center gap-4'
                                    style={{height: '2.5rem'}} onClick={() =>
                                {
                                    setIsCartOpen(false);
                                    setCheckoutModalIsOpen(true)
                                }}>
                                    <FontAwesomeIcon size='lg' icon={faSackDollar}></FontAwesomeIcon>
                                    Checkout
                                </Button>
                            </Stack>}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}