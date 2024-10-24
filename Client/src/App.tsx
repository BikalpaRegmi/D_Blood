import { Route, Routes } from 'react-router-dom';
import './App.css';
import ConnectMetamask from './pages/auth/connection';
import Login from './pages/auth/login';
import Auth from './pages/auth';

function App() {
  

  return (
    <>
      <Routes>
      <Route path='/auth' element={<Auth/>}/>
      </Routes>
    </>
  );
}

export default App
