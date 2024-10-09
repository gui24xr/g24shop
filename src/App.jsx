import './App.css'
import { useEffect } from 'react';
import { Routes,Route,BrowserRouter } from 'react-router-dom'
import { auth } from './firebase/firebaseappconfig';
import { verifyIdToken } from 'firebase/auth';
import { Navbar,LoginForm,RegisterForm } from './components/index.js';
import { UsersRepositories } from './repositories/users.repositories.js';


function App() {

  useEffect(() => {
    //Miro en el local storage si hay un token valido y de acuerdo a eso seteo en redux
    const fireBaseTokenInStore = localStorage.getItem('firebaseToken')

    if (fireBaseTokenInStore){
      //Pido los datos a firebase para setearlos
      console.log('EGEEG: ', fireBaseTokenInStore)
      const { firebaseToken } = JSON.parse(fireBaseTokenInStore);
      signInWithCustomToken(auth,firebaseToken)
      .then(res => console.log('Me han respondido: ', res))
      .catch(err => console.log(err))
    }
    else{
      //deberia renderizar el login page.
      console.log('No hay token o es invalido')
    }

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
