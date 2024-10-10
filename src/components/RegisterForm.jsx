import React from 'react'
import './styles/forms.css'

import { UsersRepositories } from '../repositories/users.repositories.js'

const RegisterForm = () => {

  const handleSubmit = (event) =>{
    event.preventDefault()
    const formData = new FormData(event.target)
    const datosform= Object.fromEntries(formData.entries())
    console.log('Desde el form: ',datosform)
    UsersRepositories.register({...Object.fromEntries(formData.entries())})
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  return (
    <div>
      <form className='myform' onSubmit={handleSubmit}>
        <span>REGISTRAR USUARIO</span>
        <label>email</label>
        <input type='email' name='email' required/>
        <label>Usuario</label>
        <input type='text' name='userName' required/>
        <label>Contraseña</label>
        <input type='text' name='password' required/>
        <label>Nombre</label>
        <input type='text' name='name' required/>
        <label>Apellido</label>
        <input type='text' name='lastName' required/>
        <button type='submit'>Aceptar</button>
     
       
      </form>
    </div>
  )
}

export default RegisterForm