import {Tooltip} from "react-tooltip";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleInfo, faAdd} from '@fortawesome/free-solid-svg-icons'
import NewProductModal from "../components/Modals/NewProductModal.jsx";
import Button from "react-bootstrap/Button";
import {useEffect, useState} from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {useShoppingItems} from "../context/ShoppingItemsContext.jsx";
import ProductItem from "../components/ProductItem.jsx";
import {useNavBar} from "../context/NavBarContext.jsx";
import UpdateProductModal from "../components/Modals/UpdateProductModal.jsx";
import DeleteProductModal from "../components/Modals/DeleteProductModal.jsx";

function Admin()
{
    const [newProductModalIsOpen, setNewProductModalIsOpen] = useState(false);
    const [updateProductModalIsOpen, setUpdateProductModalIsOpen] = useState(false);
    const [deleteProductModalIsOpen, setDeleteProductModalIsOpen] = useState(false);
    const [itemToUpdate, setItemToUpdate] = useState(null)
    const [itemToDelete, setItemToDelete] = useState(null)
    const {products} = useShoppingItems();
    const {setNavButtons} = useNavBar();

    // Update the itemToUpdate's values when the database changes.
    useEffect(() =>
    {
        if (!itemToUpdate) return;
        const updatedItem = products.find(item => item.id === itemToUpdate.id);
        if (updatedItem)
        {
            setItemToUpdate(updatedItem);
        }
    }, [itemToUpdate, products]);

    useEffect(() =>
    {
        setNavButtons([
            <Button key='add-new-product-btn' className='d-flex align-items-center gap-2'
                    onClick={() => setNewProductModalIsOpen(true)}>
                <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon>
                <span className='new-product-btn-text text-nowrap'>New Product</span>
            </Button>])

        // Cleanup function to remove the button when the component unmounts
        return () => setNavButtons([]);
    }, [setNavButtons]);

    function openUpdateProductModal(item)
    {
        setUpdateProductModalIsOpen(true);
        setItemToUpdate(item);
    }

    function openDeleteProductModal(item)
    {
        setDeleteProductModalIsOpen(true);
        setItemToDelete(item);
    }

    return (
        <>
            <h1 className='mt-4'>Admin</h1>

            <a data-tooltip-id="admin-page-info" className='text-muted  opacity-50 position-absolute'
               style={{right: '11px', top: '80px'}}>
                <FontAwesomeIcon size='xl' icon={faCircleInfo}/>
            </a>
            <Tooltip id="admin-page-info" variant='light'>
                This page is exclusively for store owners.
                Here, you can manage your products,
                adjust prices, and update your store settings.
            </Tooltip>

            <UpdateProductModal modalIsOpen={updateProductModalIsOpen}
                                itemToUpdate={itemToUpdate}
                                closeModal={() => setUpdateProductModalIsOpen(false)}/>

            <DeleteProductModal modalIsOpen={deleteProductModalIsOpen}
                                itemToUpdate={itemToDelete}
                                closeModal={() => setDeleteProductModalIsOpen(false)}/>

            <NewProductModal modalIsOpen={newProductModalIsOpen}
                             closeModal={() => setNewProductModalIsOpen(false)}/>

            <Row className='g-3 pb-5' xs={1} sm={2} md={3} lg={4}>
                {
                    products.map(item => (
                        <Col key={item.id}>
                            <ProductItem item={item} onUpdateClickHandler={openUpdateProductModal}
                                         onDeleteClickHandler={openDeleteProductModal}></ProductItem>
                        </Col>
                    ))
                }
            </Row>
        </>
    );
}

export default Admin;