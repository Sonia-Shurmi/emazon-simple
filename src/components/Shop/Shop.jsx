import React, { useEffect, useState } from 'react';
import {addToDb, getShoppingCart} from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);
    
    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart = [];
        // step1 get id of the added product
        for(const id in storedCart){
            // step2 get product from products state by using id
            const addedProduct = products.find(product => product.id === id);
            if(addedProduct){
                // step3 added quantity
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                // step4 add the added product to the saved cart
                savedCart.push(addedProduct);
            }
        }
        // step5 set the cart
        setCart(savedCart);
    },[products])

    const handleAddToCart = (product) => {
        // cart.push(product); 
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.id);
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart = {cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;