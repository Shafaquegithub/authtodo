import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import "./Login_Signup.css"

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit= async (e)=>{
        e.preventDefault();
        try{
            const result = await auth.signInWithEmailAndPassword(email, password)
           window.M.toast({html: `Welcome ${result.user.email}`, classes:"green"})
          navigate("/")
        }
        catch(err){
            window.M.toast({html:`${err.message}`, classes:"red"})
        }
    }
  return (
    <>
        <div className='login-div'>
            <form className='center container loginform' onSubmit={handleSubmit}>
                <h5>Login</h5>
                <div style={{marginTop:"40px"}}>
                    <input type="email" placeholder='Username' name="email" value={email}  onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div>
                    <input type="password" placeholder='Password' name="password"  minLength="8" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button type="submit" className='btn  #2979ff blue accent-3'>Login</button>
            </form>
        </div>
    </>
  )
}
