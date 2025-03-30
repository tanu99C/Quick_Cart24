import Card from "react-bootstrap/Card";
import formatCurrency from "../utils/formatCurrency.js";
import Button from "react-bootstrap/Button";
import {useShoppingCart} from "../context/ShoppingCartContext.jsx";

export default function StoreItem({item})
{
    const {getItemQuantity, increaseItemCount, decreaseItemCount, removeItem} = useShoppingCart();
    const quantity = getItemQuantity(item.id);

    const buttonsStyle = {
        width: '2.5rem',
        height: '2.5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }

    return (
        <Card className='h-100 shadow-sm' border='light'>
            <div className='position-relative'>
                <Card.Img src={item.imgUrl || './imgs/placeholder-image.png'}
                          height={200}
                          style={{objectFit: 'cover'}}
                          variant='top'></Card.Img>

                {item.imgAttr &&
                    <div className='pt-5 pb-1 position-absolute bottom-0 text-white w-100'
                         style={{
                             textIndent: '7px',
                             background: 'linear-gradient(to top, rgba(0,0,0, 0.8), transparent 100%)',
                             fontSize: '0.8rem'
                         }}>
                        Photo by <a
                        style={{color: 'white'}} href={item.imgAttr.authorLink}>{item.imgAttr.author}</a> on <a
                        style={{color: 'white'}} href={item.imgAttr.page}>Unsplash</a>
                    </div>}
            </div>
            <Card.Body className='d-flex flex-column'>
                <Card.Title style={{
                    display: 'inline-flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    marginBottom: '2rem'
                }}>
                    <span className='fs-3'>{item.name}</span>
                    <span className='text-muted'>{formatCurrency(item.price)}</span>
                </Card.Title>
                <div className='me-auto w-100'>
                    {
                        quantity === 0 ?
                            <Button className='w-100 fw-medium d-flex align-items-center justify-content-center gap-4'
                                    style={{height: '2.5rem'}}
                                    onClick={() => increaseItemCount(item.id)}>
                                <svg width='20px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                    <path
                                        d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM252 160c0 11 9 20 20 20l44 0 0 44c0 11 9 20 20 20s20-9 20-20l0-44 44 0c11 0 20-9 20-20s-9-20-20-20l-44 0 0-44c0-11-9-20-20-20s-20 9-20 20l0 44-44 0c-11 0-20 9-20 20z"/>
                                </svg>
                                Add To Cart
                            </Button> :
                            <div className='d-flex w-100 '>
                                <div style={{display: 'flex', gap: '1rem', alignItems: 'baseline'}}>
                                    <Button style={buttonsStyle} onClick={() => decreaseItemCount(item.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                            <path
                                                d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/>
                                        </svg>
                                    </Button>

                                    <div>
                                        <span className='fs-4 fw-bold'>{quantity} </span>
                                        in cart
                                    </div>

                                    <Button style={buttonsStyle} onClick={() => increaseItemCount(item.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                            <path
                                                d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/>
                                        </svg>
                                    </Button>
                                </div>

                                <Button variant='outline-primary'
                                        style={{...buttonsStyle, marginLeft: 'auto'}}
                                        onClick={() => removeItem(item.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path
                                            d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                                    </svg>
                                </Button>
                            </div>
                    }
                </div>
            </Card.Body>
        </Card>
    );
}