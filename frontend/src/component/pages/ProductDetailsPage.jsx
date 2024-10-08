import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ApiService from "../../service/ApiService";



const ProductDetailsPage = () => {

    const {productId} = useParams();
    const {cart, dispatch} = useCart();
    const [product, setProduct] = useState(null);

    useEffect(()=>{
        fetchProduct();
    }, [productId])

    const fetchProduct = async () => {
        try {
            const response = await ApiService.getProductById(productId);
            setProduct(response.product);
            
        } catch (error) {
            console.log(error.message || error)
        }
    }

    
    const addToCart = () => {
        if (product) {
            dispatch({type: 'ADD_ITEM', payload: product});   
        }
    }

    const incrementItem = () => {
        if(product){
            dispatch({type: 'INCREMENT_ITEM', payload: product});
 
        }
    }

    const decrementItem = () => {
        if (product) {
            const cartItem = cart.find(item => item.id === product.id);
            if (cartItem && cartItem.quantity > 1) {
                dispatch({type: 'DECREMENT_ITEM', payload: product}); 
            }else{
                dispatch({type: 'REMOVE_ITEM', payload: product}); 
            }
            
        }
    }

    if (!product) {
        return <p>Loading product details ...</p>
    }

    const cartItem = cart.find(item => item.id === product.id);

    return(
        <div className="product-detail max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
  <img 
    src={product?.imageUrl} 
    alt={product?.name} 
    className="w-full h-64 object-cover rounded-lg mb-4" 
  />
  
  <h1 className="text-3xl font-bold mb-2">{product?.name}</h1>
  <p className="text-gray-700 mb-4">{product?.description}</p>
  <span className="text-xl font-semibold text-blue-600">${product.price.toFixed(2)}</span>
  
  {cartItem ? (
    <div className="quantity-controls mt-4 flex items-center space-x-4">
      <button 
        onClick={decrementItem} 
        className="px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-400 transition duration-200"
      >
        -
      </button>
      <span className="text-lg">{cartItem.quantity}</span>
      <button 
        onClick={incrementItem} 
        className="px-3 py-1 bg-gray-300 rounded-md hover:bg-gray-400 transition duration-200"
      >
        +
      </button>
    </div>
  ) : (
    <button 
      onClick={addToCart} 
      className="mt-4 w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
    >
      Add To Cart
    </button>
  )}
</div>

    )

}

export default ProductDetailsPage;