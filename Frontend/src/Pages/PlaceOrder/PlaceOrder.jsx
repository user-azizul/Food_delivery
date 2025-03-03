import React, { useContext, useState } from "react";
import axios from "axios";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";

function PlaceOrder() {
  const { totalCartAmount, token, foodList, cartItems, backendUrl } =
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

  const [loading, setLoading] = useState(false);
  const onChangeHandler = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const cartTotal = totalCartAmount();

  const placeOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    let orderItems = [];

    foodList.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: cartTotal + 2
    };

    try {
      const response = await axios.post(
        backendUrl + "/order/place",
        orderData,
        {
          headers: { Authorization: "Bearer " + token }
        }
      );

      if (response.data.success) {
        console.log("Order placed successfully");
        const { sessionUrl } = response.data;
        window.location.replace(sessionUrl);
      } else {
        console.error("Order placement failed:", response.data.message);
      }
    } catch (error) {
      console.error("Order placement failed:", error);
    } finally {
      setLoading(false);
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (cartTotal === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <form className="place-order" onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            type="text"
            value={data.firstName}
            name="firstName"
            onChange={onChangeHandler}
            placeholder="First Name"
            required
          />
          <input
            type="text"
            value={data.lastName}
            name="lastName"
            onChange={onChangeHandler}
            placeholder="Last Name"
            required
          />
        </div>
        <input
          type="email"
          value={data.email}
          name="email"
          onChange={onChangeHandler}
          placeholder="Email Address"
          required
        />
        <input
          type="text"
          value={data.street}
          name="street"
          onChange={onChangeHandler}
          placeholder="Street"
          required
        />
        <div className="multi-fields">
          <input
            type="text"
            name="city"
            value={data.city}
            onChange={onChangeHandler}
            placeholder="City"
            required
          />
          <input
            type="text"
            value={data.state}
            name="state"
            onChange={onChangeHandler}
            placeholder="State"
            required
          />
        </div>
        <div className="multi-fields">
          <input
            type="text"
            value={data.zipCode}
            name="zipCode"
            onChange={onChangeHandler}
            placeholder="Zip Code"
            required
          />
          <input
            type="text"
            value={data.country}
            name="country"
            onChange={onChangeHandler}
            placeholder="Country"
            required
          />
        </div>
        <input
          type="number"
          value={data.phoneNumber}
          name="phoneNumber"
          onChange={onChangeHandler}
          placeholder="Phone Number"
          required
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
          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "PROCEED TO PAYMENT"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
