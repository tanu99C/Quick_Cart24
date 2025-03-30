import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import StoreItem from "../components/StoreItem.jsx";
import {useShoppingItems} from "../context/ShoppingItemsContext.jsx";
import {useNavBar} from "../context/NavBarContext.jsx";
import {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleInfo, faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {useShoppingCart} from "../context/ShoppingCartContext.jsx";
import {Tooltip} from "react-tooltip";
import {ReactSearchAutocomplete} from "react-search-autocomplete";
import {useMediaQuery} from 'react-responsive'

export default function Store()
{
    const {products} = useShoppingItems();
    const [filteredProducts, setFilteredProducts] = useState(products)
    const {setNavButtons} = useNavBar();
    const {cartQuantity, setIsCartOpen} = useShoppingCart();
    const isMobile = useMediaQuery({query: '(max-width: 420px)'})

    const searchBar = <ReactSearchAutocomplete
        placeholder='Search store'
        className='search-bar'
        key='storeSearchBar'
        styling={{
            fontFamily: 'inherit',
        }}
        items={products}
        onSearch={(_, results) => setFilteredProducts(results.length > 0 ? results : products)}
        fuseOptions={{threshold: 0.3}}
    />;

    useEffect(() =>
    {
        let navBarButtons = [];

        if (!isMobile) navBarButtons.push(searchBar);

        if (cartQuantity > 0)
            navBarButtons.push(
                <Button onClick={() => setIsCartOpen(current => !current)}
                        style={{width: '3rem', height: '3rem'}}
                        className='position-relative rounded-circle '
                        variant='outline-primary'>
                    <FontAwesomeIcon color='var(--bs-dark)' size='lg' icon={faShoppingCart}></FontAwesomeIcon>
                    <div
                        className='position-absolute d-flex justify-content-center align-items-center rounded-circle bg-primary text-white'
                        style={{
                            width: '1.5rem',
                            height: '1.5rem',
                            bottom: 0,
                            right: 0,
                            transform: 'translate(25%, 25%)'
                        }}>
                        {cartQuantity}
                    </div>
                </Button>);

        setNavButtons(navBarButtons)

        // Cleanup function to remove the button when the component unmounts
        return () => setNavButtons([]);
    }, [setNavButtons, cartQuantity]);

    return (
        <>
            <h1 className='mt-4'>Store</h1>

            <a data-tooltip-id="store-page-info" className='text-muted  opacity-50 position-absolute'
               style={{right: '11px', top: '80px'}}>
                <FontAwesomeIcon size='xl' icon={faCircleInfo}/>
            </a>
            <Tooltip id="store-page-info" variant='light'>
                This page is exclusively for customers.
                Here, you can browse the store products, view
                product information, and add items to your cart.
            </Tooltip>

            {isMobile && searchBar}
            
            <Row className='g-3 pb-5' xs={1} md={2} lg={3}>
                {
                    filteredProducts.map(item => (
                        <Col key={item.id}>
                            <StoreItem item={item}></StoreItem>
                        </Col>
                    ))
                }
            </Row>
        </>
    );
}