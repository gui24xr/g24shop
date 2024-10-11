import React from 'react'
import './styles/forms.css'
import { useDispatch,useSelector } from 'react-redux'
import { initLoggedState } from '../redux/userSlice.js'
import { setOnAuthState } from '../redux/onAuthSlice.js'
import useSession from '../hooks/useSession.js'
import { UsersRepositories } from '../repositories/users.repositories.js'

const LoginForm = () => {

  const {login,getUser} = useSession()

  const dispatch = useDispatch()

  const handleSubmit = async (event) =>{
    event.preventDefault()
    const formData = new FormData(event.target)
    const {email,password} = Object.fromEntries(formData.entries())
    console.log('Extraidoo del form: ',email,password)

/*
    try{
      UsersRepositories.login({userName:username, password:password})
      //dispatch(setOnAuthState('login'))
    }catch(error){
      console.log(error)
    }
    */

   
      login({email:email,password:password})
      .then(res => {
        console.log('Res: ', res)
        const loggedUserId = res
        getUser({userId:loggedUserId})
        .then(res => console.log(res))
        .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
 
  
    
  }

  return (
    <div>
      <form className='myform' onSubmit={handleSubmit}>
        <span>INICIAR SESION</span>
        <label>Usuario</label>
        <input type='email' name='email' required/>
        <label>Contraseña</label>
        <input type='text' name='password' required/>
        <button type='submit'>Aceptar</button>
      </form>
    </div>
  )
}

export default LoginForm