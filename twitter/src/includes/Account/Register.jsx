import React from 'react'
import '../Account/Account.css'
import { createUser } from '../../services/userService'
import { useState } from 'react'
import {MdError} from 'react-icons/md';
import {GiConfirmed} from 'react-icons/gi'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { success } from '../../redux/actions/Actions';

const Register = () => {


const dispatch = useDispatch();

    const navigate = useNavigate();
   const [err,setErr] = useState(false);
   const [message,setMessage] = useState(''); 
     const [repPswd,setRepPswd] = useState('');
    const [isClicked,setIsClicked] = useState(false);
   const [newUser,setNewUser] = useState({
    username:'',
    password:'',
    email:'',
    description:'',
    Address:'',
 
    profileImg:'',
    accountName:'',
    
    });
const handleRegister = (e) => {
    setIsClicked(true);
   if(!newUser.email  || !newUser.username || !newUser.password || !newUser.description || !newUser.Address ){
     setMessage('Hiçbir alan boş bırakılamaz');
     setErr(true);
   }
   else if(newUser.username.length < 8){
        setMessage('Kullanıcı adı 8 karakterden az olamaz');
        setErr(true);
   }
   else if(repPswd !== newUser.password){
    setMessage('Şifreler birbiriyle eşleşmiyor');
    setErr(true);
}
else {
createUser(newUser);
dispatch(success());

navigate("/login");
}



}

  return (
<div className='container'>
    <div className='account-card-form'>
        <h3>Register</h3>
       <div className="col-full">
            <input type="text" onChange={(e)=>setNewUser({...newUser,username:e.target.value})} placeholder='Kullanıcı Adı' className='account-text' />
        </div>
        <div className="col-full">
            <input type="password"  onChange={(e)=>setNewUser({...newUser,password:e.target.value})} placeholder='Şifre' className='account-text' />
        </div>
        <div className="col-full">
            <input type="password" onChange={(e)=>setRepPswd(e.target.value)} value={repPswd}  placeholder='Şifre Tekrarı' className='account-text' />
        </div>
        <div className="col-full">
            <input type="email"  onChange={(e)=>setNewUser({...newUser,email:e.target.value})} value={newUser.email} placeholder='Email' className='account-text' />
        </div>
       
        <div className="col-full">
            <input type="text" placeholder='Hesap Adı'  onChange={(e)=>setNewUser({...newUser,accountName:e.target.value})} className='account-text' />
        </div> 
        <div className="col-full">
            <textarea placeholder='Kendinizi tanıtın'  onChange={(e)=>setNewUser({...newUser,description:e.target.value})} id='account-text-area-field' height="300" className='account-text' ></textarea>
        </div> 
        <div className="col-full">
            <textarea placeholder='Adresinizi girin'  onChange={(e)=>setNewUser({...newUser,Address:e.target.value})} id='account-address-text-area-field' className='account-text' ></textarea>
        </div> 
        <div className="col-full">
      <button onClick={handleRegister}>Register</button>
        </div>
        { isClicked ? 
        <div className='col-full'>
        
        <div id={err ? "alert-error" : "alert-success"} className="alert">
            <span>{err  ?  <MdError style={{"transform":"translateY(2px)"}} />  : <GiConfirmed style={{"transform":"translateY(2px)"}} />} {message} </span> 
        </div>
</div> : null}
        </div>
    </div>
  )
}

export default Register