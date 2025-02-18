import React from 'react'
import "./Sidebar.css"
import { assets } from '../../admin_assets/assets'
import { NavLink } from 'react-router-dom'

function Sidevar() {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/add'className="sidebar-inner-option">
          <img src={assets.add_icon} alt="" />
          <p>Add Items</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-inner-option">
          <img src={assets.order_icon} alt="" />
          <p>List Items</p>
        </NavLink>
        <NavLink to='/orders' className="sidebar-inner-option">
          <img src={assets.add_icon} alt="" />
          <p>Order</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidevar
