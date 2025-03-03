import React, { useEffect, useState } from "react";
import "./Order.css";
import { toast } from "react-toastify";
import { assets } from "../../admin_assets/assets";

function Order() {
  const [orders, setOrders] = useState([]);
  const url = "http://localhost:4000";
  const fetchAllOrders = async () => {
    try {
      const response = await fetch(url + "/order/all-orders", {
        method: "GET"
      });
      if (response.ok) {
        const { data } = await response.json();
        console.log(data);
        setOrders(data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching orders");
    }
  };
  useEffect(() => {
    fetchAllOrders();
  }, []);
  return (
    <div className="order add">
      <h3>Order List</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div className="order-item" key={index}>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + " , ";
                  }
                })}
              </p>
              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + " , "}</p>
                <p>
                  {order.address.city +
                    " , " +
                    order.address.state +
                    " , " +
                    order.address.country +
                    " , " +
                    order.address.zipCode}
                </p>
                <p className="order-item-phone">{order.address.phone}</p>
              </div>
            </div>
            <p>items: {order.items.length}</p>
            <p>Amount: ${order.amount}</p>
            <select>
              <option value="Food Processing">Food Processing</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Deliverd">Deliverd</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Order;
