// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import './login.css';

// function Login() { 
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [userId, setUserId] = useState(''); 
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:8000/api/login', {
//                 username,
//                 password,
//             });
            
//             const { id: userId, role } = response.data.user;
            
//             // Store user ID in localStorage
//             localStorage.setItem('userid', userId);
//             setUserId(userId);

//             // Navigate based on user role
//             if (role === 'buyer') {
//                 navigate('/buyer');
//             } else if (role === 'seller') {
//                 navigate('/seller');
//             } else if (role === 'admin') {
//                 navigate('/admin');
//             } else {
//                 // Default case if role is undefined or unknown
//                 alert('Unknown user role');
//             }
            
//             console.log('User ID:', userId); 
//             alert('Login successful');
//         } catch (err) {
//             setError('Invalid credentials');
//         }
//     };

//     return (
//         <div className='body'>
//             <form onSubmit={handleLogin} className='cards'>
//                 <h2>Login</h2>
//                 <div>
//                     <label>Username:</label>
//                     <input
//                         type="text"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label>Password:</label>
//                     <input
//                         type="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                 </div>
//                 {error && <p style={{ color: 'red' }}>{error}</p>}
//                 <div className='btn'>
//                     <button type="submit" className='buton'>Login</button>
//                 </div>
//                 <p>If you don't have an account? <Link to='/signup'>Signup</Link></p>
//             </form>
//             {userId && <p>User ID: {userId}</p>} 
//         </div>
//     );
// };

// export default Login;



// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import './login.css';

// function Login() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [userId, setUserId] = useState('');
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:8000/api/login', {
//                 username,
//                 password,
//             });
            
//             const { id: userId, role } = response.data.user;
//             localStorage.setItem('userid', userId);
//             setUserId(userId);

//             if (role === 'buyer') {
//                 navigate('/buyer');
//             } else if (role === 'seller') {
//                 navigate('/seller');
//             } else if (role === 'admin') {
//                 navigate('/admin');
//             } else {
//                 alert('Unknown user role');
//             }
            
//             alert('Login successful');
//         } catch (err) {
//             setError('Invalid credentials');
//         }
//     };

//     return (
//         <div className="body">
//             <div className="login-card">
//                 <h2>Login</h2>
//                 <form onSubmit={handleLogin}>
//                     <div className="input-group">
//                         <label>Username:</label>
//                         <input
//                             type="text"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="input-group">
//                         <label>Password:</label>
//                         <input
//                             type="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                     </div>
//                     {error && <p className="error-message">{error}</p>}
//                     <button type="submit" className="login-button">Login</button>
//                 </form>
//                 <p className="signup-link">Don't have an account? <Link to='/signup'>Signup</Link></p>
//                 {userId && <p className="user-id">User ID: {userId}</p>}
//             </div>
//         </div>
//     );
// };

// export default Login;



import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

function  Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/login', {
                username,
                password,
            });
            
            const { id: userId, role } = response.data.user;
            localStorage.setItem('userid', userId);
            setUserId(userId);

            if (role === 'buyer') {
                navigate('/game');
            } else if (role === 'seller') {
                navigate('/seller');
            } else if (role === 'admin') {
                navigate('/admin');
            } else {
                alert('Unknown user role');
            }
            
            alert('Login successful');
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="body">
            <div className="login-card">
                <h2 className='ku'><b>Login</b></h2>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            id="username"
                            type="text"
                            className="input-field"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            id="password"
                            type="password"
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="login-button">Login</button>
                </form>
                <p className="signup-link">Don't have an account? <Link style={{color: '#7301FF'}} to='/signup'>Signup</Link></p>
                {userId && <p className="user-id">User ID: {userId}</p>}
            </div>
        </div>
    );
}

export default Login;
