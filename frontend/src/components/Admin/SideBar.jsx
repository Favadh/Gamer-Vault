import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './AdminHome.css'
import { useNavigate } from 'react-router-dom'


export const Sidebar = ({ onLogout }) => {

    const navigate = useNavigate()
    
    
      const handleViewUsers = () => {
        navigate('/users')
      }
      const handleSales = () => {
        navigate('/sales')
      }
      const handleHome = () => {
        navigate('/admin')
      }
      const handleViewProducts = () => {
        navigate('/products')
      }
      const handleLogout = () => {
        localStorage.removeItem('userid')
        localStorage.removeItem('token')
      alert('logout successfully')
        navigate('/')
      }
      return (
        <div className="admin-sidebar">
          <h2 className="sidebar-title d-flex">
            <img src="/logo.png" alt="logo" className="logo" height="100px" width="120px" />
            <div className="text">Gamer Vault</div>
          </h2>
          <div className='helo'>
            <ul className="sidebar-menu">
              {/* <li onClick={handleHome}>Home</li> */}
              <li onClick={handleViewUsers}>Home</li>
              <li onClick={handleViewProducts}>View Products</li>
              <li onClick={handleSales}>View Sales</li>
            </ul>
          </div>
          
          <div className="logout-section" onClick={handleLogout}>
            <div>Log Out</div>
          </div>
        </div>
      )
    }