import './App.css'
import { useEffect } from 'react';
import { Routes,Route,BrowserRouter } from 'react-router-dom'
import { auth } from './firebase/firebaseappconfig';
import { onAuthStateChanged } from 'firebase/auth';
import { Navbar,LoginForm,RegisterForm } from './components/index.js';
import { UsersRepositories } from './repositories/users.repositories.js';


function App() {

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,  (currentUser) => {
      if (!currentUser) {
        console.log('Cerro sesion, voy a setear el store a null ')
      }
        else{
          console.log('Cambiois en la sesion: ',currentUser.uid , ' Ah iniicado sesion:')
          //Pido los datos del user:
          UsersRepositories.getUser({userId:currentUser.uid})
          .then(res => console.log('Con estos datos setear el store', res ))
          .catch(err =>console.log(err))
          
      }
      
      //Ahora debo pedir al repo de usuarios el user coneste uid y setear el store
    });

    return unsubscribe;   

  }, []);


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
