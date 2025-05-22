    import React, { useEffect, useState } from 'react'
    import axios from 'axios'
    import { Sidebar } from './SideBar'
    import './AdminHome.css'

    const ViewUser = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
        const res = await axios.get('http://localhost:8000/api/sellers')
        setUsers(res.data)
        } catch (err) {
        console.error('Error fetching users:', err)
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
        try {
            await axios.delete(`http://localhost:8000/api/deleteuser/${id}`)
            setUsers(users.filter((user) => user._id !== id))
        } catch (err) {
            console.error('Error deleting user:', err)
        }
        }
    }

    return (
        <div className="admin-home-container">
        <Sidebar />
        <main className="admin-main-content">
            <h2 className="dashboard-title">Registered Users</h2>

            <table className="users-table">
            <thead>
                <tr>
                <th>Sl. No</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Address</th>
                <th>Date</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.role}</td>
                    <td>
                    {user.address?.street}, {user.address?.city}, {user.address?.zipCode}
                    </td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>
                    <button className="delete-button" onClick={() => handleDelete(user._id)}>
                        Delete
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </main>
        </div>
    )
    }

    export default ViewUser
