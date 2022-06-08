import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Todo from './Todo';
import {auth} from '../firebase'

export default function Navbar({user}) {
  const navigate= useNavigate()
  return (
    <>
     <nav className='px-5  #2979ff blue accent-3' style={{padding:"0 20px"}}>
    <div className="nav-wrapper">
        <Link to={"/"}>Home</Link>
      <ul  className="right">
        {
          user ? 
          <li><button type='button' className='btn red' onClick={()=>{
            auth.signOut()
            setTimeout(()=>{
              navigate("/")
              window.M.toast({html: `Signed Out Successfully`, classes:"orange"})
            }, 1000)
          }}>Logout</button></li> :
            <>
            <li><Link to={"/login"}>Login</Link></li>
            <li><Link to={"/signup"}>SignUp</Link></li>
            </>
        }
      </ul>
    </div>
  </nav>
    </>
  )
}
