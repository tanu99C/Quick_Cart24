import formatCurrency from "../utils/formatCurrency.js";
import {useShoppingCart} from "../context/ShoppingCartContext.jsx";
import Button from "react-bootstrap/Button";
import {useShoppingItems} from "../context/ShoppingItemsContext.jsx";

function CartItem({id, quantity})
{
    const {products} = useShoppingItems()
    const item = products.find(i => i.id === id);
    const {removeItem} = useShoppingCart()

    return (
        <>
            <div className=' text-muted d-flex align-items-center gap-3'>
                <img height='75px' width='150px' style={{objectFit: 'cover', borderRadius: '6px'}}
                     src={item.imgUrl || './imgs/placeholder-image.png'}
                     alt={item.name + ' image.'}/>
                <div className='d-flex flex-column gap-3'>
                    <div>
                        <span className='fs-5'>{item.name}</span>
                        &nbsp;
                        <span className='fs-6'>{quantity}x</span>
                    </div>
                    <span className='fs-6'>{formatCurrency(item.price)}</span>
                </div>
                <div style={{marginLeft: 'auto'}} className='d-flex flex-column gap-2'>
                    <span className='text-primary fs-5 fw-medium'>{formatCurrency(quantity * item.price)}</span>
                    <Button
                        style={{
                            width: '2.5rem',
                            height: '2.5rem',
                            marginLeft: 'auto'
                        }}
                        variant='outline-primary'
                        onClick={() => removeItem(id)}>

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path
                                d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                        </svg>
                    </Button>
                </div>
            </div>
            <hr style={{borderColor: 'var(--bs-primary)'}}/>
        </>
    );
}

export default CartItem;