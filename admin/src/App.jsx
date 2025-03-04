import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar/Navbar";
import Sidebar from "./Component/Sidebar/Sidebar";
import Add from "./Pages/Add/Add";
import List from "./Pages/List/List";
import Order from "./Pages/Orders/Order";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="app-container">
      <ToastContainer />
      {/* Navbar */}
      <Navbar />
      <hr />

      {/* Sidebar and Main Content */}
      <div className="app-content">
        <Sidebar />

        <div className="main-content">
          <Routes>
            <Route path="/add" element={<Add />} />
            <Route path="/list" element={<List />} />
            <Route path="/my-orders" element={<Order />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
