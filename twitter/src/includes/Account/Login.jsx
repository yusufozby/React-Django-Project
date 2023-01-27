import React, { useState } from 'react';
import '../Account/Account.css';
import {MdError} from 'react-icons/md';
import {GiConfirmed} from 'react-icons/gi'

import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {login} from '../../redux/actions/Actions.js';
const Login = () => {
  const [isClicked,setIsClicked] = useState(false);
  const [err,setErr] = useState(false);
  const [message,setMessage] = useState(''); 
const [user,setUser] = useState({
  username:'',
  password:''
})
const dispatch = useDispatch();
const { Accounts } = useSelector((state) => state.AccountSlice);
console.log(Accounts);
 const  handleLogin = async (user) => {
  setIsClicked(true);
   setErr(false);
  await axios.post("http://localhost:8000/api/login/",user).then((res)=> {
   
 const loginedUser = Accounts.find((element) => element.user.id === res.data.user.id);
 localStorage.setItem("user",JSON.stringify(loginedUser));
  dispatch(login());
  window.location.href = "/"


}
  ).catch(()=>{
setErr(true);
setMessage('Yanlış kullanıcı adı veya şifre');
  })

}




  return (
    <div className='container'>
        
    <div className='account-card-form'>
       <h3>Giriş Yap</h3>
       <div className="row">
        <div className="col-full">
            <input onChange={e=>setUser({...user,username:e.target.value})} type="text" placeholder='Kullanıcı Adı' className='account-text' />
        </div>
        <div className="col-full">
            <input type="password" onChange={e=>setUser({...user,password:e.target.value})} placeholder='Şifre' className='account-text' />
        </div>
        <div className="col-full">
            <button onClick={()=>handleLogin(user)}>Giriş Yap</button>
        </div>
        { isClicked && err ? 
        <div className='col-full'>
        
        <div id={err ? "alert-error" : null} className="alert">
            <span>{err  ?  <MdError style={{"transform":"translateY(2px)"}} />  : <GiConfirmed style={{"transform":"translateY(2px)"}} />} {message} </span> 
        </div>
</div> : null}

    </div>
    </div>
    </div>
  )
}

export default Login;