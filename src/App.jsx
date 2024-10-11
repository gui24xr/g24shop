import './App.css'
import { useEffect } from 'react';
import { Routes,Route,BrowserRouter } from 'react-router-dom'
import { auth } from './firebase/firebaseappconfig';
import { onAuthStateChanged } from 'firebase/auth';
import { Navbar,LoginForm,RegisterForm } from './components/index.js';
import { UsersRepositories } from './repositories/users.repositories.js';
import { useSelector, useDispatch } from 'react-redux';



function App() {


    useEffect(()=>{
      
    const currentUser = auth.currentUser;

      if (currentUser) {
        console.log('Currentuser', currentUser);
      } else {
        console.log('No hay usuario autenticado');
      }
        },[])




  return (
    <>
      <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<h1>G24 SHOP</h1>}/>
          <Route path='/login' element={<LoginForm/>}/>
          <Route path='/register' element={<RegisterForm/>}/>
        </Routes>
      </BrowserRouter>
    </>
    </>
  )
}

export default App


/*
  const onAuthState = useSelector(state => state.onAuth)

  const unsubscribe = onAuthStateChanged(auth,(user) => {
    /*
      Si cambio el user, firebase nos envio notificacion por alguna de 3 posibilidades:
        1- Persistencia al inicio/recarga de la app.
        2- Inicio de sesion.
        3- Se registro un usuario nuevo.

        Pedimos a la base de datos el user desde la coleccion users... 

          SIEMPRE TENER EN CUENTA QUE LOS NUEVOS USERS
          * Si hay user en la colecccion users estamos en presencia caso 1 o 2, por lo cual en redux cargamos el user en redux. 
          
          * Si por caso 3 tengo que con datos guardados del form de registro, crear este nuevo user y luego cargar sus datos en redux, una vez que el user fue creado..
    
         if (user) {
            console.log('Cambio el user: ',user)// Usuario autenticado
            //Existe el user???
            UsersRepositories.getUser({userId:user.uid})
            .then( res => {
              console.log('El user: ', res)
              
      
            })
            .catch(err => console.log(err))
          } else {
            console.log('user error') // No hay usuario autenticado
          }
        });
      
      //5657665
        useEffect(() => {
          // Limpieza al desmontar el componente
          return () => unsubscribe();
        }, [])
        */