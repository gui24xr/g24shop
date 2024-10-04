import React from 'react'
import { NavLink } from 'react-router-dom'
import './styles/Navbar.css'
import { auth } from '../firebase/firebaseappconfig'
import { signOut } from 'firebase/auth'


export default function Navbar() {
  const handleSignOutButton = () => {
    signOut(auth)
  }

  return (
    <div className='navbar-container'>
      <ul className='navbar-list'>
         <NavLink className='navbar-item' to='/login'>LOGIN</NavLink>
         <NavLink className='navbar-item' to='/register'>REGISTER</NavLink>
         <NavLink className='navbar-item' to='/register'>GET</NavLink>
      </ul>
      <button onClick={handleSignOutButton}>CERRAR SESION</button>

    </div>
  )
}
