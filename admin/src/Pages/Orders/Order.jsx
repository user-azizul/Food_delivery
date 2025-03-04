import React, { useEffect, useState } from "react";
import "./Order.css";
import { toast } from "react-toastify";
import { assets } from "../../admin_assets/assets";

function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const url = "http://localhost:4000";

  // Fetch all orders
  const fetchAllOrders = async () => {
    try {
      const response = await fetch(url + "/order/all-orders", {
        method: "GET"
      });
      if (response.ok) {
        const { data } = await response.json();
        setOrders(data);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching orders");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await fetch(url + "/order/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status }) // Correct body format
      });
      if (response.ok) {
        const { message } = await response.json();
        toast.success(message);
        await fetchAllOrders(); // Refresh the order list
      } else {
        toast.error("Failed to update order status");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating order status");
    }
  };

  // Fetch orders on component mount
  useEffect(() => {
    fetchAllOrders();
  }, []);

  // Render loading state
  if (loading) {
    return <div className="order add">Loading orders...</div>;
  }

  return (
    <div className="order add">
      <h3>Order List</h3>
      <div className="order-list">
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order, index) => (
            <div className="order-item" key={index}>
              <img src={assets.parcel_icon} alt="Parcel Icon" />
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
              <p>Items: {order.items.length}</p>
              <p>Amount: ${order.amount}</p>
              <select
                value={order.status}
                onChange={(e) => updateOrderStatus(order._id, e.target.value)}
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out For Delivery">Out For Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Order;
