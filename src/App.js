import React, {useState} from 'react';
import { Routes,Route } from 'react-router-dom';
import Register from './services/users/Register'; 
import MyPage from './services/users/MyPage';
import Login from './services/users/Login';
import './App.css';

function App() {
const [token,setToken]= useState('')
return (
    <div>
    <Routes>
      <Route path='/signup' element={<Register setToken={setToken}/>} />
      <Route path='mypage' element={<MyPage token={token}/>} />
      <Route path='login' element={<Login setToken={setToken}/>} />
    </Routes>
    </div> 
  );
}

export default App;
