import './App.css';
import React from 'react';
import Navigator from './component/Nav';
import Register from './pages/Register';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './component/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import Dashboard from './pages/Dashboard';
import VerifyEmail from './pages/VerifyEmail';
import Admin from './pages/Admin';
import RegisterAdmin from './pages/RegisterAdmin';
import Withdraw from './pages/Withdraw';
import Deposit from './pages/Deposit';





function App() {
  return (
    <div className="App" style={{height: '100vh'}}>
      
      <Router>
      <Navigator/>

            <Routes>
            <Route path='/' element={ <Home />}/>
            <Route path='/register' element={ <Register />}/>
            <Route path='/staff' element={ <RegisterAdmin />}/>
            <Route path='/login' element={ <Login />}/>
            <Route path='/admin' element={ <Admin />}/>
            <Route path='/verifyemail' element={ <VerifyEmail />}/>
            <Route path='/dashboard' element={ <Dashboard />}/>
            <Route path='/createaccount' element={ <CreateAccount />}/>
            <Route path='/withdraw' element={ <Withdraw />}/>
            <Route path='/deposit' element={ <Deposit />}/>
            </Routes>
            <Footer/>
            
        </Router>
      
    </div>
  );
}

export default App;
