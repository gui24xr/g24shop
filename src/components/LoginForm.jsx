import React from 'react'
import './styles/forms.css'
import { useDispatch,useSelector } from 'react-redux'
import { initLoggedState } from '../redux/userSlice.js'


import { UsersRepositories } from '../repositories/users.repositories.js'

const LoginForm = () => {

  const dispatch = useDispatch()

  const handleSubmit = async (event) =>{
    event.preventDefault()
    const formData = new FormData(event.target)
    const {username,password} = Object.fromEntries(formData.entries())
    console.log('Extraidoo del form: ',username,password)


    UsersRepositories.login({userName:username, password:password})
    .then(res => {
      //Voy a iniciar sesion del user en el estado de redux y guardar su token en localStorage.
      console.log('Al iniciar sesion: ',res)
      dispatch(initLoggedState({
        userName:res.userName,
        email:res.email,
        name:res.name,
        lastName: res.lastName,
        profilePicture: res.profilePic,
        cartId: res.cartId
    }))

    localStorage.setItem('firebaseToken',JSON.stringify(res.authToken))
   
    })
    .catch(err => console.log(err))
    
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