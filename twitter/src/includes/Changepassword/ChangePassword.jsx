import React from 'react'
import './Changepassword.css';
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import {MdError} from 'react-icons/md';
import {GiConfirmed} from 'react-icons/gi'
const ChangePassword = () => {
  const [isClicked,setIsClicked] = useState(false);
  const [err,setErr] = useState(false);
  const [message,setMessage] = useState(''); 
  const [repeat_password,setRepeatPassword] = useState('');
  const [new_password,setNewPassword] = useState('');
const {user} = useSelector(state =>state.loginReducer);

  const changePassword = async () => {
 setIsClicked(true);
    
 if(repeat_password === new_password) {
    const passwordContent = {
  accountId:user.user.id,
  new_password
 }


    await axios.post("http://localhost:8000/api/changepassword/",passwordContent).then(()=>{
      setErr(false);
      setMessage("şifreniz değiştirildi")
}
    ).catch(() => {
setErr(true);
setMessage('şifre değiştirilirken hatayla karşılaşıldı');
    });
}
else {
  setErr(true);
  setMessage("şifreler birbirleriyle uyuşmuyor");
}
  }
  return (
    <div className='container'>
        <div className="row">
            <div className="col-full">
              <div  className=' change-password-form'>
                <div className="edit-form ">
                  <h2>Şifre Değiştir</h2>
                    <div className='row'>
                    <div className="col-full">
                  <input type="password" onChange={e=>setNewPassword(e.target.value)} value={new_password} placeholder='Yeni Şifre'   />
                  </div>
                  <div className="col-full">
                  <input type="password" onChange={e=>setRepeatPassword(e.target.value)} value={repeat_password} placeholder='Yeni Şifre Tekrarı'   />
                  </div>
                  <div  className='password-update'>
                  <button onClick={changePassword}>Şifreyi Güncelle</button>
                  </div>
                    </div>
                </div>
                { isClicked ? 
        <div className='col-full'>
        
        <div id={err ? "alert-error" : "alert-success"} className="alert">
            <span>{err  ?  <MdError style={{"transform":"translateY(2px)"}} />  : <GiConfirmed style={{"transform":"translateY(2px)"}} />} {message} </span> 
        </div>
</div> : null}
            </div>
        </div></div>

    </div>
  )
}

export default ChangePassword