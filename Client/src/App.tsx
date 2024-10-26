import { Route, Routes } from 'react-router-dom';
import './App.css';

import Auth from './pages/auth';
import Home from './pages/home';
import Post from './pages/individualReq/Post';
import Notification from './pages/notifications/notification';
import MyProfile from './pages/myProfiles';
import Token from './pages/Tokens';
import Initiate from './pages/initiate';
import Profile from './pages/Profile';

function App() {
  

  return (
    <>
      <Routes>
      <Route path='/auth' element={<Auth/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/post/:id' element={<Post/>}/>
      <Route path='/notifications' element={<Notification/>}/>
      <Route path='/myProfile' element={<MyProfile/>}/>
      <Route path='/profile/:id' element={<Profile/>}/>
      <Route path='/Token' element={<Token/>}/>
      <Route path='/myPendingRequests' element={<Initiate/>}/>
      </Routes>
    </>
  );
}

export default App
