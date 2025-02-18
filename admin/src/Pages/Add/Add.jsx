import React from 'react'
import './Add.css'
import { assets } from "../../admin_assets/assets"

function Add() {
  return (
    <div className='add'>
      <form className="flex-col">
        <div className="add-img-upload flex-coll">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={assets.upload_area} alt="" />
          </label>
          <input type="file" id='image' hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input type="text" name='name' placeholder='Name' />
        </div>
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea name="description" rows={6} placeholder='Write description'></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-categor flex-col">
            <p>Product Category</p>
            <select name="category" >
              <option value="Salad"></option>
              <option value="Rolls"></option>
              <option value="Desert"></option>
              <option value="Sandwich"></option>
              <option value="Cake"></option>
              <option value="Pure Veg"></option>
              <option value="Pasta"></option>
              <option value="Noddles"></option>
            </select>
          </div>
          <div className="price flex-col">
            <p>Product Price</p>
            <input type="numper" name='price' placeholder='$20' />
          </div>
        </div>
        <button type='submit' className='add-button'>Add</button>
      </form>
    </div>


  )
}

export default Add
