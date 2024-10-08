import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";
import { useCart } from "../context/CartContext";


const CartPage = () => {
    const { cart, dispatch } = useCart();
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();


    const incrementItem = (product) => {
        dispatch({ type: 'INCREMENT_ITEM', payload: product });
    }

    const decrementItem = (product) => {

        const cartItem = cart.find(item => item.id === product.id);
        if (cartItem && cartItem.quantity > 1) {
            dispatch({ type: 'DECREMENT_ITEM', payload: product });
        } else {
            dispatch({ type: 'REMOVE_ITEM', payload: product });
        }
    }

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);



    const handleCheckout = async () => {
        if (!ApiService.isAuthenticated()) {
            setMessage("You need to login first before you can place an order");
            setTimeout(() => {
                setMessage('')
                navigate("/login")
            }, 3000);
            return;
        }

        const orderItems = cart.map(item => ({
            productId: item.id,
            quantity: item.quantity
        }));

        const orderRequest = {
            totalPrice,
            items: orderItems,
        }

        try {
            const response = await ApiService.createOrder(orderRequest);
            setMessage(response.message)

            setTimeout(() => {
                setMessage('')
            }, 5000);

            if (response.status === 200) {
                dispatch({ type: 'CLEAR_CART' })
            }

        } catch (error) {
            setMessage(error.response?.data?.message || error.message || 'Failed to place an order');
            setTimeout(() => {
                setMessage('')
            }, 3000);

        }

    };


    return (
        <div className="cart-page max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-4">Cart</h1>
        {message && <p className="text-green-600 mb-4">{message}</p>}
      
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <div>
            <ul className="space-y-4">
              {cart.map(item => (
                <li key={item.id} className="flex border-b pb-4">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md mr-4"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="text-gray-600">{item.description}</p>
                    <div className="flex items-center space-x-2 my-2">
                      <button
                        onClick={() => decrementItem(item)}
                        className="bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-400 transition duration-200"
                      >
                        -
                      </button>
                      <span className="text-lg">{item.quantity}</span>
                      <button
                        onClick={() => incrementItem(item)}
                        className="bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-400 transition duration-200"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-semibold">${item.price.toFixed(2)}</span>
                  </div>
                </li>
              ))}
            </ul>
            <h2 className="text-2xl font-bold mt-4">Total: ${totalPrice.toFixed(2)}</h2>
            <button
              className="mt-6 w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition duration-300"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
      
    )
}

export default CartPage;
