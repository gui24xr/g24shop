import './App.css'
import { useEffect } from 'react';
import { Routes,Route,BrowserRouter } from 'react-router-dom'
import { auth } from './firebase/firebaseappconfig';
import { onAuthStateChanged } from 'firebase/auth';
import { Navbar,LoginForm,RegisterForm } from './components/index.js';
import { UsersRepositories } from './repositories/users.repositories.js';
import { useSelector, useDispatch } from 'react-redux';


function App() {

  const onAuthState = useSelector(state => state.onAuth)

  const unsubscribe = onAuthStateChanged(auth,(user) => {
    if (user) {
      console.log('Cambio el user: ',user.uid)// Usuario autenticado
    } else {
      console.log('user error') // No hay usuario autenticado
    }
  });


  useEffect(() => {
    
    // Limpieza al desmontar el componente
    return () => unsubscribe();
  }, [unsubscribe]); // Dependencias vacías para ejecutar solo una vez


  useEffect(()=>{ 
    console.log('Cambio authState=> ',onAuthState)
  },[onAuthState])

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
