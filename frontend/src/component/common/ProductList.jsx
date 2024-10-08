import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";



const ProductList = ({products}) => {
    const {cart, dispatch} = useCart();

    const addToCart = (product) => {
        dispatch({type: 'ADD_ITEM', payload: product});
    }

    const incrementItem = (product) => {
        dispatch({type: 'INCREMENT_ITEM', payload: product});
    }

    const decrementItem = (product) => {

        const cartItem = cart.find(item => item.id === product.id);
        if (cartItem && cartItem.quantity > 1) {
            dispatch({type: 'DECREMENT_ITEM', payload: product}); 
        }else{
            dispatch({type: 'REMOVE_ITEM', payload: product}); 
        }
    }


    return (
        <div className="product-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {products.map((product, index) => {
                const cartItem = cart.find(item => item.id === product.id);
                return (
                    <div className="product-item bg-white shadow-lg rounded-lg p-4" key={index}>
                        <Link to={`/product/${product.id}`} className="block">
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="product-image w-full h-64 object-cover rounded-lg mb-4 transition-transform duration-300 hover:scale-105"
                            />
                            <h3 className="text-lg font-semibold mb-2 text-gray-800">{product.name}</h3>
                            <p className="text-gray-500 text-sm mb-4">{product.description}</p>
                            <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                        </Link>
                        {cartItem ? (
                            <div className="quantity-controls flex items-center mt-4">
                                <button
                                    onClick={() => decrementItem(product)}
                                    className="px-2 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                                >
                                    -
                                </button>
                                <span className="mx-2">{cartItem.quantity}</span>
                                <button
                                    onClick={() => incrementItem(product)}
                                    className="px-2 py-1 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
                                >
                                    +
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => addToCart(product)}
                                className="mt-4 w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Add To Cart
                            </button>
                        )}
                    </div>
                );
            })}
        </div>
    );
    
};

export default ProductList;