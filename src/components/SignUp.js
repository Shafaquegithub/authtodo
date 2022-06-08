import React from 'react';
import { useState } from 'react';
import "./Login_Signup.css"
import {auth,db} from '../firebase'
import {useNavigate} from 'react-router-dom';

export default function SignUp() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const handleSubmit= async (e)=>{
        e.preventDefault();
        console.log(email, password);
        try{
            const result = await auth.createUserWithEmailAndPassword(email,password)
           window.M.toast({html: 'SignedUp Successfully!'})
           navigate("/")
        }
        catch(err){
            window.M.toast({html:`${err.message}`})
        }
    }
  return (
    <>
        <div className='login-div'>
            <form className='center container loginform' onSubmit={handleSubmit}>
                <h5>SignUp</h5>
                <div style={{marginTop:"40px"}}>
                    <input type="email" placeholder='Username' name="email" value={email}  onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div>
                    <input type="password" placeholder='Password' name="password"  minLength="8" maxLength="12" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button type="submit" className='btn  #2979ff blue accent-3'>SignUp</button>
            </form>
        </div>
    </>
  )
}