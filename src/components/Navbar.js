import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
        <div className='logo'>
            <h2>
                <Link to="/">HOME</Link>
            </h2>
        </div>
        <div className='nav-buttons'>
            <Link to="/register" className='btn-nav'>Save!</Link>
        </div>
    </nav>
  )
}

export default Navbar