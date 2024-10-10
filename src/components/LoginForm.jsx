import React from 'react'
import './styles/forms.css'
import { useDispatch,useSelector } from 'react-redux'
import { initLoggedState } from '../redux/userSlice.js'
import { setOnAuthState } from '../redux/onAuthSlice.js'

import { UsersRepositories } from '../repositories/users.repositories.js'

const LoginForm = () => {

  const dispatch = useDispatch()

  const handleSubmit = async (event) =>{
    event.preventDefault()
    const formData = new FormData(event.target)
    const {username,password} = Object.fromEntries(formData.entries())
    console.log('Extraidoo del form: ',username,password)


    try{
      UsersRepositories.login({userName:username, password:password})
      //dispatch(setOnAuthState('login'))
    }catch(error){
      console.log(error)
    }
    
  
    
  }

  return (
    <div>
      <form className='myform' onSubmit={handleSubmit}>
        <span>INICIAR SESION</span>
        <label>Usuario</label>
        <input type='email' name='username' required/>
        <label>Contraseña</label>
        <input type='text' name='password' required/>
        <button type='submit'>Aceptar</button>
      </form>
    </div>
  )
}

export default LoginForm