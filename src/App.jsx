import { BrowserRouter ,Routes ,Route } from 'react-router-dom'
import { useEffect,useState } from 'react';
import axios from 'axios';
import { Register } from './components/authentication/Register';
import { Login } from './components/authentication/Login';
import Navbar from './components/Navbar';
import HomePage from './components/Homepage';




const login = () => {
  return(
    <div>
      <Navbar />
      <Login />
    </div>
  )
}

const register = () => {
  return(
    <div>
      <Navbar />
      <Register />
    </div>
  )
}

const home = () => {
  return(
    <div>
      <Navbar />
      <HomePage />
      {/* <Footer /> */}
    </div>
  )
}

// const schedules = () => {
//   return(
//     <div>
//       <Navbar />
//       <Schedules />
//       {/* <Footer /> */}
//     </div>
//   )
// }

// const settings = () => {
//   return(
//     <div>
//       <Navbar />
//       <SettingsPage />
//       {/* <Footer /> */}
//     </div>
//   )
// }

function App() {



  return (
    <div className="App">
      <BrowserRouter>
          <Routes>
            <Route path='/' element={login()}/>
            <Route path='/register' element={register()} />
            <Route path='/home' element={home()} />

          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;