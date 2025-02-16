import React, { useState } from "react";
import "./Home.css";
import Header from "../../Component/Header/Header";
import ExploreMenu from "../../Component/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../Component/FoodDisplay/FoodDisplay";
import Appdownload from "../../Component/AppDownLoad/AppFownload";

function Home() {
  const [category, setCategory] = useState("All");
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <Appdownload />
    </div>
  );
}

export default Home;
