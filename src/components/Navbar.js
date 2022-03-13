import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../Firebase'
import { signOut } from 'firebase/auth'
import { AuthContext } from '../contex/auth'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

const Navbar = () => {

  let navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/login");
    console.log("Logged out");
  }

  return (
    <nav>
        <div className='logo'>
            <h2>
                <Link to="/">TODO</Link>
            </h2>
        </div>
        <div className='nav-buttons'>
          {user ? 
          <>
            <p>Hello {user.email}!</p>
            <Link to="/login" className='btn-nav'>
              <Button variant="outlined" onClick={handleSignOut}>Logout</Button>
            </Link>
          </>  : (
          <>
            <Link to="/register" className='btn-nav'>
              <Button variant="text">Register</Button>
            </Link>
            <Link to="/login" className='btn-nav'>
              <Button variant="contained">Login</Button>
            </Link>
          </>
          )}
        </div>
    </nav>
  )
}

export default Navbar