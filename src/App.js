import React, { useState } from 'react';
import { Routes,Route } from 'react-router-dom';
import Register from './services/users/Register'; 
import MyPage from './services/users/MyPage';
import Login from './services/users/Login';
import {Child1} from "./components/Child1";
import {Child4} from "./components/Child4";

const App=()=> {
  const [token,setToken] = useState('');
  const [num,setNum] = useState(0);
  const onClickButton =() =>{
    setNum(num +1);
}
return (
    <div>
    <button onClick={onClickButton}>ボタン</button>
    <p>{num}</p>
    <Child1 />
    <Child4 />
    <Routes>
      <Route path='/' element={<Register setToken={setToken}/>} />
      <Route path='mypage' element={<MyPage token={token}/>} />
      <Route path='login' element={<Login setToken={setToken}/>} />
    </Routes>
    </div> 
  );
}


export default App;