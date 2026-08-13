import axios from "axios";
import { formatMoney } from "../../utils/money";
import { useState } from "react";

export function CartItemDetails({ cartItem, loadCart }) {
  const [isQuantityBeingUpdated, setIsQuantityBeingUpdated] = useState(false);
  const [inputValue, setInputValue] = useState(cartItem.quantity);

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  }

  const updateCartItemQuantity = async () => {
    setIsQuantityBeingUpdated(!isQuantityBeingUpdated);

    if (isQuantityBeingUpdated === true) {
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity: Number(inputValue)
      });

      await loadCart();
    }
  }

  return (
    <>
      <img className="product-image"
        src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">
          {cartItem.product.name}
        </div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span className="quantity-section">
            Quantity: 
            <input 
              className="quantity-input"
              type="text"
              style={{display: isQuantityBeingUpdated ? 'inline-block' : 'none'}}
              value={inputValue}
              onChange={(event) => {
                setInputValue(event.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") updateCartItemQuantity();
              }}
            />
            <span 
              className="quantity-label"
              style={{display: isQuantityBeingUpdated ? 'none' : 'inline-block'}}
            >
              {cartItem.quantity}
            </span>
          </span>
          <span 
            className="update-quantity-link link-primary"
            onClick={updateCartItemQuantity}
          >
            Update
          </span>
          <span 
            className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
}