import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Auth from './pages/auth';
import Home from './pages/home';
import Post from './pages/individualReq/Post';
import Notification from './pages/notifications/notification';
import MyProfile from './pages/myProfiles';
import Token from './pages/Tokens';
import Initiate from './pages/initiate';
import Profile from './pages/Profile';
import { useEffect, useState } from 'react';
import { useEthereum } from './context/contractContext';
import EditProfile from './pages/myProfiles/editProfile';
import DisconnectInstructions from './components/deleteMetamask';

interface MyDetail {
  id: string | null;
  name: string | null;
  bloodType: string | null;
  dateOfBirth: null | string;
  gender: null | string;
  medicalReport: string | undefined;
  emergencyContact: null | string;
  myAddress: null | string;
}

function App() {
      const { account, contract } = useEthereum();
      const [myData, setMyData] = useState<MyDetail | undefined>(undefined);
      const navigate = useNavigate();

  const getMyData = async () => {
        
        const transaction = await contract?.profile(account);
        setMyData(transaction);
       
      };

      useEffect(() => {
       getMyData();
      }, [contract , account]);

  
      useEffect(() => {
        if (account?.toLowerCase() != (myData && myData.id?.toLowerCase())) {
          navigate('/auth');
        }
      }, [ myData ]);

  return (
    <>
      <Routes>
      <Route path='/auth' element={<Auth/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/post/:id' element={<Post/>}/>
      <Route path='/notifications' element={<Notification/>}/>
      <Route path='/myProfile' element={<MyProfile/>}/>
      <Route path='/editProfile' element={<EditProfile/>}/>
      <Route path='/profile/:id' element={<Profile/>}/>
      <Route path='/Token' element={<Token/>}/>
      <Route path='/myPendingRequests' element={<Initiate/>}/>
      <Route path='/disconnectMetamask' element={<DisconnectInstructions/>}/>
      </Routes>
    </>
  );
}

export default App
