import React from 'react'
import './User.css';
import anounymous from '../../images/anounymous.jpg'
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {MdError} from 'react-icons/md';
import {GiConfirmed} from 'react-icons/gi'
const User = () => {

const [twitImg,setTwitImg] = useState('');
const [twit,setTwit] = useState('');
const [err,setErr] = useState(false);
const [isClicked,setIsClicked] = useState(false);
const [message,setMessage] = useState(''); 
const {user} = useSelector(state => state.loginReducer);

const twitImgUpload = () => {
  document.getElementById("twit-file-upload").click();
}
const twitImgFileUpload = (e) => {
  const file = e.target.files[0]
   const fileReader = new FileReader();
   fileReader.readAsDataURL(file);
   fileReader.onload = (evt) => {
         setTwitImg(evt.target.result);
     
   }

}

const addTwit = async () => {
setIsClicked(true);
if(!twit){
   setErr(true);
   setMessage('Paylaşım metni boş bırakılmamalıdır.')


}

else {
  const newTwit = {
    accountId : user.id,
    twitImg,
    twit

  }
   await axios.post("http://localhost:8000/api/createtwit/",newTwit).then((res) => console.log(res.data));
   setErr(false);
   setMessage('Paylaşım başarılı bir şekilde oluşturuldu')
}
}
  return (
  
  
  
  
  <div className='container'>
        <div className="row">
            <div className="col-quarter">
                
        <div className="profile-card">
            <h3>Profil</h3>
            <h5 className='profile-sub-title'>{user.accountName}</h5>
            <div className='add-update-button'> 
<img className='user-profile-img' alt='' src={user.profileImg  ? user.profileImg :   anounymous} />

</div> 
<div className="user-info-field">
<label className='user-account-info-title'>İsim</label>

<small className='profile-sub-title user-account-info'>{user.user.username}</small>
<hr/>
</div>
<label className='user-account-info-title'>Soyisim</label>

<small className='profile-sub-title user-account-info'>{user.accountName}</small>
<hr/>


            
            </div>      
        </div>
        <div className='col-4_3'>
          <div className="profile-card">
           <h3>Paylaşım Yap</h3>
           <textarea placeholder='paylaşımı yaz' value={twit} onChange={(e)=>setTwit(e.target.value)}  className='twit-paragraph'></textarea>
           <div className='add-share-btn-group'>
            <input type="file" id='twit-file-upload'  onChange={twitImgFileUpload} hidden   />
           <button className='add-file' onClick={twitImgUpload} >
Resim Ekle +
           </button>
           <button className='send-sharing' onClick={addTwit} >
Gönder
           </button>
          </div>
          { isClicked ? 
        <div className='col-full p-0'>
        
        <div id={err ? "alert-error" : "alert-success"} className="alert">
            <span>{err  ?  <MdError style={{"transform":"translateY(2px)"}} />  : <GiConfirmed style={{"transform":"translateY(2px)"}} />} {message} </span> 
        </div>
</div> : null}
        </div>
        </div></div>
    </div>
  )
}

export default User