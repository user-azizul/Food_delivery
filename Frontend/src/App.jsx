import React from "react";
import Navbar from "./Component/Navbar/Navbar";
import { Route, Routes } from "react-router";
import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/Cart";
import PlaceOrder from "./Pages/PlaceOrder/PlaceOrder";
import Footer from "./Component/Footer/Footer";
import LoginPopup from "./Component/LoginPopup/LoginPopup";
import Verify from "./Pages/Verify/Verify";
import MyOrder from "./Pages/MyOrder/MyOrder";

function App() {
  const [showLogin, setShowLogin] = React.useState(false);
  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <> </>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/my-orders" element={<MyOrder />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
