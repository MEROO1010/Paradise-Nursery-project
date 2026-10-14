
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let totalCost = 0;
    cart.forEach((item) => {
      const numericCost = parseFloat(item.cost.replace('$', ''));
      totalCost += numericCost * item.quantity;
    });
    return totalCost.toFixed(2);
  };

  // Handle incrementing quantity
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  // Handle decrementing quantity
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  // Handle removing an item completely
  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost for a single item (unit price * quantity)
  const calculateTotalCost = (item) => {
    const numericCost = parseFloat(item.cost.replace('$', ''));
    return (numericCost * item.quantity).toFixed(2);
  };

  const handleCheckoutShopping = () => {
    alert('Coming Soon: Functionality to proceed to checkout will be added later!');
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      
      <div className="cart-total-amount">
        <h3>Total Cart Amount: ${calculateTotalAmount()}</h3>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <button className="get-started-button" onClick={onContinueShopping}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <div>
          <div className="cart-items-list">
            {cart.map((item) => (
              <div key={item.name} className="cart-item">
                <img className="cart-item-image" src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-cost">Unit Price: {item.cost}</div>
                  <div className="cart-item-quantity">
                    <button
                      className="cart-item-button cart-item-button-dec"
                      onClick={() => handleDecrement(item)}
                    >
                      -
                    </button>
                    <span className="cart-item-quantity-value">{item.quantity}</span>
                    <button
                      className="cart-item-button cart-item-button-inc"
                      onClick={() => handleIncrement(item)}
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item-total">
                    Subtotal: ${calculateTotalCost(item)}
                  </div>
                  <button
                    className="cart-item-delete"
                    onClick={() => handleRemove(item)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-actions">
            <button className="get-started-button" onClick={onContinueShopping}>
              Continue Shopping
            </button>
            <button className="get-started-button-checkout" onClick={handleCheckoutShopping}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartItem;
