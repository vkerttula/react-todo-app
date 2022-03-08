import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../Firebase'
import { signOut } from 'firebase/auth'
import { AuthContext } from '../contex/auth'
import { useNavigate } from 'react-router-dom'

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
                <Link to="/">HOME</Link>
            </h2>
        </div>
        <div className='nav-buttons'>
          {user ? 
          <>
            <button className='btn' onClick={handleSignOut}>Logout</button>
          </>  : (
          <>
            <Link to="/register" className='btn-nav'>Register</Link>
            <Link to="/login" className='btn-nav'>Login</Link>
          </>
          )}
        </div>
    </nav>
  )
}

export default Navbar