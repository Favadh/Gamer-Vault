import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './AdminHome.css'
import { useNavigate } from 'react-router-dom'
import { Sidebar } from './SideBar'


const AdminHome = () => {
  const [users, setUsers] = useState([])
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/sellers')
        setUsers(res.data)
      } catch (err) {
        console.error('Failed to fetch users:', err)
      }
    }

    const fetchReviews = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/viewreviews')
        setReviews(res.data)
      } catch (err) {
        console.error('Failed to fetch reviews:', err)
      }
    }

    fetchUsers()
    fetchReviews()
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    alert('Logged out!')
    window.location.href = '/login'
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:8000/api/deleteuser/${id}`)
        setUsers(users.filter((user) => user._id !== id))
      } catch (err) {
        console.error('Failed to delete user:', err)
      }
    }
  }

  return (
    <div className="admin-home-container">
      <Sidebar onLogout={handleLogout} />
      <main className="admin-main-content">
        <h2 className="dashboard-title">Users Review</h2>


        <table className="users-table">
          <thead>
            <tr>
              <th>Slno</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((r, i) => (
              <tr key={r._id}>
                <td>{i + 1}</td>
                <td>{r.userId?.username}</td>
                <td>{r.userId?.email}</td>
                <td>{r.userId?.role}</td>
                <td>{r.rating}</td>
                <td>{r.comment}</td>
                <td>{new Date(r.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  )
}

export default AdminHome
