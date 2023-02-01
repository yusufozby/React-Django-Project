import React from 'react'
import './EditProfile.css';
import anounymous from '../../images/anounymous.jpg';
import axios from 'axios';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import {MdError} from 'react-icons/md';
import {GiConfirmed} from 'react-icons/gi'





const EditProfile = () => {

  const {user} = useSelector(state => state.loginReducer);
const [accountName,setAccountName] = useState(user.accountName);

const [isClicked,setIsClicked] = useState(false);
const [err,setErr] = useState(false);
const [message,setMessage] = useState(''); 
const [address,setAddress] = useState(user.Address);
const [description,setDescription] = useState(user.description);


const [filename,setFilename] = useState(user.profileImg);
const updateProfile = async (e) => {
e.preventDefault();
setIsClicked(true);
if((address !== user.Address ||   description  !== user.description || user.accountName !== accountName ||user.profileImg !== filename) ) {
const data = new FormData();
data.append("accountId",user.id);
data.append("userId",user.user.id);
data.append("user",user.user);
data.append("profileImg",filename);
data.append("Address",address);
data.append("description",description);
data.append("accountName",accountName);







    await axios.post("http://localhost:8000/api/updateprofile/",data).then((res)=>{
    
localStorage.setItem("user",JSON.stringify(res.data));
setErr(false);
window.location.href = "/profile"
setMessage('Kullanıcı başarılı bir şekilde güncellendi')
setAccountName('')
setAddress('');
setDescription('');

    })
  }
  else {
    setErr(true);
    setMessage('En az 1 alan doldurulmalıdır !')
  }
}

const uploadImageInput = (e) => {
const file = e.target.files[0];
const fileReader = new FileReader();
fileReader.readAsDataURL(file);
fileReader.onload = (evt) => {
  setFilename(evt.target.result)

}




}




const uploadProfileImg = () => {
  document.querySelector("#ewq").click();
}


  return (
    <div className='container'>
      <div className='row'>
         <div className='col-quarter col-md-full'>
         <div className='edit-profile-form'>
<h2>Profil Fotoğrafı</h2>
<div className='add-update-button'> 
<img className='user-profile-img' alt='' src={(!filename ) ?  anounymous : filename} />

</div>
<div className='add-update-button'> 
<input id='ewq' type="file" accept="image/png, image/jpeg, image/jpg" onChange={uploadImageInput} hidden />
<button onClick={uploadProfileImg} className='updaate-profile-img'>Fotoğrafı Değiştir</button>
</div>
         </div>
         </div>
 <div className="col-4_3">
         <div className="edit-profile-form">
              <h2>Profili Düzenle</h2>
                 <form className='edit-form'  action="">
                  <div className="row">
                  
                    <div className="col-full">
                  <input type="text" placeholder='Hesap Adı' onChange={(e)=>setAccountName(e.target.value)} value={accountName}  />
                  </div>
                  <div className="col-full">
                  <textarea type="text" placeholder='Adres' onChange={(e)=>setAddress(e.target.value)} value={address}   />
                  </div>
                  <div className="col-full">
                  <textarea type="email" placeholder='Hakkımda' onChange={(e)=>setDescription(e.target.value)} value={description}   />
                  </div>
                  <div className='col-full'>
            <button style={{"cursor":"pointer"}} onClick={(e)=>updateProfile(e)}>Profili Güncelle</button>
            </div>
                  </div>
                 </form>
                     
                 { isClicked ? 
        <div className='col-full'>
        
        <div id={err ? "alert-error" : "alert-success"} className="alert">
            <span>{err  ?  <MdError style={{"transform":"translateY(2px)"}} />  : <GiConfirmed style={{"transform":"translateY(2px)"}} />} {message} </span> 
        </div>
</div> : null}
                 </div> 
    </div>
    </div></div>
  )
}

export default EditProfile;