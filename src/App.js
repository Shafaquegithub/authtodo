import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Todo from './components/Todo';
import {Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import {auth} from './firebase';
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState()
  useEffect(()=>{
    auth.onAuthStateChanged(user=>{
      if(user) {
        setUser(user)
      }
      else {
        setUser(null)
      }
    })
  },[])
  return (
    <>
    <Navbar user={user}/>
    <Routes>
      <Route path="/" element={<Todo user={user}/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>}/>
    </Routes>
    </>
  );
  }

export default App;
