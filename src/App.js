
import './App.css';

import { BrowserRouter, Switch, Route } from 'react-router-dom'
import React ,{useState} from 'react';//動的な機能
import Modal from './componets/Modal';
import Home from './componets/Home';
import Post from './componets/Post';
import Hellow from './componets/Hellow';
import Header from './componets/Header';


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
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"} component={Home} />
          <Route exact path={"/dashboard"} component={Dashboard} />
          <Route exact path={"/posts/new"} component={Post} />
        </Switch>
      </BrowserRouter>

      
      <Hellow/>
      <Post onContact ={toggleModalHandler}/>
     {showModal && <Modal onClose ={toggleModalHandler}/>}
    </main>
  );
}

export default App;
