import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";

function PlaceOrder() {
  const { totalCartAmount, token, foodLIst, cartItems, backendUrl } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phoneNumber: ""
  });

  const onChangeHandler = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const cartTotal = totalCartAmount(); // Store to avoid multiple calls

  return (
    <form className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            type="text"
            value={data.firstName}
            name="firstName"
            onChange={onChangeHandler}
            placeholder="First Name"
          />
          <input
            type="text"
            value={data.lastName}
            name="lastName"
            onChange={onChangeHandler}
            placeholder="Last Name"
          />
        </div>
        <input
          type="email"
          value={data.email}
          name="email"
          onChange={onChangeHandler}
          placeholder="Email Address"
        />
        <input
          type="text"
          value={data.street}
          name="street"
          onChange={onChangeHandler}
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            type="text"
            name="city"
            value={data.city}
            onChange={onChangeHandler}
            placeholder="City"
          />
          <input
            type="text"
            value={data.state}
            name="state"
            onChange={onChangeHandler}
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            value={data.zipCode}
            name="zipCode"
            onChange={onChangeHandler}
            placeholder="Zip Code"
          />
          <input
            type="text"
            value={data.country}
            name="country"
            onChange={onChangeHandler}
            placeholder="Country"
          />
        </div>
        <input
          type="number"
          value={data.phoneNumber}
          name="phoneNumber"
          onChange={onChangeHandler}
          placeholder="Phone Number"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{cartTotal}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{cartTotal === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>{cartTotal === 0 ? 0 : cartTotal + 2}</b>
            </div>
          </div>
          <button>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
