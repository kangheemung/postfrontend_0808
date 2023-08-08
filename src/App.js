
import './App.css';

import { Redirect, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React ,{useState} from 'react';//動的な機能
import Modal from './componets/Modal';
import Post from './componets/Post';
import Hellow from './componets/Hellow';
import Header from './componets/Header';
import Login from './componets/Railsuser/Login';
import SingIn from './componets/Railsuser/SignIn';
function App() {
  const[showModal,setShowModal]= useState(false);

  function toggleModalHandler(){
    setShowModal((isShowing) => !isShowing);
  }

  return (
    <main>
      <h1>
        ここはAPPの場所
      </h1>
      <Router>
      <div >
        <Routes>
          <Route path='/login' element={<RequireNoAuth component={<Login />} />} />
          <Route path='/new' element={<RequireAuth component={<SignIn />} />} />
        </Routes>
      </div>
    </Router>
      
      <Hellow/>
      <Post onContact ={toggleModalHandler}/>
     {showModal && <Modal onClose ={toggleModalHandler}/>}
    </main>
  );
}

export default App;
