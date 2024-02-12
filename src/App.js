import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Auth from './Components/Auth';
import Dashboard from './pages/Dashboard';
import Incident from './pages/Incident';
import Footer from './Components/Footer';
import './bootstrap.min.css'
import Profile from './pages/Profile';
import SolvedIncident from './pages/SolvedIncident';
import { useContext } from 'react';
import { isAuthTokenContext } from './Context/ContextShare';
import Admin from './pages/Admin';


function App() {
  const {isAuthenticated, setIsAuthenticated}=useContext(isAuthTokenContext)
  return (
    <div className="App" style={{overflow:'hidden'}}>

      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/login" element={<Auth/>} />
        <Route path="/register" element={<Auth register/>} />
        <Route path="/dashboard" element={isAuthenticated? <Dashboard/>:<Auth/>} />
        <Route path="/incident" element={isAuthenticated? <Incident/>:<Auth/>} />
        <Route path="/profile" element={isAuthenticated? <Profile/>:<Auth/>} />
        <Route path="/solved-incident" element={isAuthenticated? <SolvedIncident/>:<Auth/>} />
        <Route path="/admin" element={isAuthenticated? <Admin/>:<Auth/>} />
      </Routes>
      <Footer/>  

     
    </div>
  );
}

export default App;
