import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./verify.css";
import axios from "axios";

// Spinner Component (Simple CSS-based)
const Spinner = () => (
  <div className="spinner">
    <div className="loading"></div>
  </div>
);

function Verify() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const verifyOrder = useCallback(async () => {
    try {
      const response = await axios.post("http://localhost:4000/order/verify", {
        orderId,
        success
      });
      if (response.data.success) {
        setError(null);
        navigate("/my-orders");
      } else {
        navigate("/");
        setError("Failed to verify the order. Please try again later.");
      }
      console.log("Verification Response:", response.data);
    } catch (error) {
      console.error("Verification Error:", error);
      setError("Failed to verify the order. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [orderId, success]);

  useEffect(() => {
    const successParam = searchParams.get("success");
    const orderIdParam = searchParams.get("orderId");
    setSuccess(successParam === "true" ? "true" : "false");
    setOrderId(orderIdParam);
  }, [searchParams]);

  useEffect(() => {
    if (orderId !== null && success !== null) {
      verifyOrder();
    }
  }, [orderId, success, verifyOrder]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="verify-container">
      <h1>Order Verification</h1>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          <p>Order ID: {orderId}</p>
          <p>Payment Status: {success ? "Success" : "Failed"}</p>
        </>
      )}
    </div>
  );
}

export default Verify;
