import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router";
import axios from "axios";

function Cart() {
  const {
    cartItems,
    foodList,
    removeItemFromCart,
    totalCartAmount,
    backendUrl
  } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Tittle</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {foodList.map((food) => {
          if (cartItems[food._id] > 0) {
            return (
              <div key={food._id}>
                <div className="cart-items-title cart-title-item">
                  <img
                    src={`${backendUrl}/images/${food.image}`}
                    alt={food.name}
                  />
                  <p> {food.name}</p>
                  <p> {food.price}</p>
                  <p> {cartItems[food._id]}</p>
                  <p> {cartItems[food._id] * food.price}</p>
                  <p
                    className="cross"
                    onClick={() => {
                      removeItemFromCart(food._id);
                    }}
                  >
                    X
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{totalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{totalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>{totalCartAmount() === 0 ? 0 : totalCartAmount() + 2}</b>
            </div>
          </div>
          <button onClick={() => navigate("/order")}>
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className="cart-promo">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className="promo-code">
              <input type="text" placeholder="Enter promo code" />
              <button>Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
