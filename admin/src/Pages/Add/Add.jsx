import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../admin_assets/assets";
import axios from "axios";

function Add() {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("image", image);

      const response = await axios.post(
        "http://localhost:4000/api/food/add",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        });
        setImage(null);
      }
    } catch (error) {
      console.error("Error adding food item:", error);
    }
  };

  React.useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="add">
      <form onSubmit={onSubmitHandler} className="flex-col">
        {/* Image Upload */}
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt="Upload"
            />
          </label>
          <input
            type="file"
            id="image"
            hidden
            required
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {/* Product Name */}
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            value={data.name}
            onChange={onChangeHandler}
          />
        </div>

        {/* Product Description */}
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea
            name="description"
            rows={6}
            placeholder="Write description"
            required
            value={data.description}
            onChange={onChangeHandler}
          ></textarea>
        </div>

        {/* Category & Price */}
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select
              name="category"
              required
              value={data.category}
              onChange={onChangeHandler}
            >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Dessert">Dessert</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="price flex-col">
            <p>Product Price</p>
            <input
              type="number"
              name="price"
              placeholder="$20"
              required
              min="0"
              value={data.price}
              onChange={onChangeHandler}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="add-btn">
          Add
        </button>
      </form>
    </div>
  );
}

export default Add;
