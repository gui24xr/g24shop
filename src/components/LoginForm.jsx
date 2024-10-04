import React from 'react'
import './styles/forms.css'



import { UsersRepositories } from '../repositories/users.repositories.js'

const LoginForm = () => {

  const handleSubmit = async (event) =>{
    event.preventDefault()
    const formData = new FormData(event.target)
    const {username,password} = Object.fromEntries(formData.entries())
    console.log('Extraidoo del form: ',username,password)

    UsersRepositories.login({userName:username, password:password})
    .then(res => console.log('Desde el repo: ', res))
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