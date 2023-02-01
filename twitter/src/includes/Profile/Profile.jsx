import React from 'react'

import './Profile.css';
import twitterImg from '../../images/anounymous.jpg';
import {FaTwitter} from 'react-icons/fa';
import {MdLocationPin,MdDateRange} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import  anounymous  from '../../images/anounymous.jpg';
import axios from 'axios';
import { getFollowings } from '../../redux/slices/FollowingSlice';

const UserProfile = () => {
  const {user} = useSelector(state =>state.loginReducer)
const {followings} = useSelector(state => state.FollowingSlice);

const dispatch = useDispatch();
  const {twits} = useSelector(state => state.twitSlice);
  const userTwits = twits.filter(item => item.createdBy.user.id === user.user.id);
  const {likes} = useSelector(state => state.LikeSlice);

  const deleteFollowing = async (id) => {
    
    await axios.delete("http://localhost:8000/api/deletefollowing/"+id).then((res) => {
      
    dispatch(getFollowings());
    alert(res.data)
  });

  }

 const userLikes = likes.filter((element) => element.like === user.user.username);

const userFollowings = followings.filter((element) => element.follower === user.user.username);
const followIndices = followings.reduce((x,y)=>{
  if(y.followed.id === user.id){
return x+1;
  }
  else {
return x;
  }  
},0)
console.log(followIndices);



  return (
    <div className='container'>
<div className="row">
    <div className="col-full">
        <div className='profile-img'>
            <div className='profile-img-container' style={{"backgroundColor": user.profileImg === "" ? "#00acee" : "white"   }}>
              {
                user.profileImg === ""  ?<FaTwitter className='profile-twitter-logo' size ={35}/> : <img src={user.profileImg} alt='' className='user-activated-img' />
              }
         
       </div></div>
       <div className='edit-profile-btn-wrapper'>
          <a  href='/editprofile'>Profili Düzenle</a>
       </div>
       <div>
          <h3>{user.user.username}</h3>
          <h5 className='follower-text'>{user.accountName}</h5>
          <p className='user-profile-description'>{user.description}</p>
       <div className='user-details'>
       <span className='user-location'><MdLocationPin  style={{"transform":"translateY(2px)"}} size={16}/> {user.Address}</span>
       <br/>
       <span className='user-date'><MdDateRange/> Oluşturulma Tarihi   {new Date().getFullYear()}  </span>
       </div>
       <div className='user-following-info'>
        <div className='user-following-info-details'>
        <strong className='user-followings'>{userFollowings.length}</strong> <span className='user-followings-text'>Takip Edilen Sayısı</span>
        </div>
        <div className='user-following-info-details'>
        <strong className='user-followings'>{followIndices}</strong> <span className='user-followings-text'>Takip Sayısı</span>
        </div>
       </div>

     <div className='user-sharings'>
        <h3>Paylaşımlar</h3>
{
  userTwits.length !== 0 ?
  userTwits.map((item) => (
    <div className="twit-card">
    <div className='twit-card-header'>
<img className='shared-twit-img' src={user.profileImg !== "" ? user.profileImg : twitterImg} alt='' />
<span>{user.user.username}</span>

</div>
<div className="twit-card-body">
    <p style={{"marginLeft":item.twitImg !== "" ? "10px" : "0px"}}>
    {item.twit}
    </p>
    <div className='twit-sharing'>
       {
          item.twitImg !== "" ?    <img className='edited-img' src={item.twitImg}   alt='' /> : null }
       
       </div>
</div>
</div>
  ))
  : <div className="box">
  <h1>Henüz bir paylaşımınız yok</h1>
  </div>
}

     </div>
     <div className='divider'/>

     <div className='user-sharings'>
        <h3>Beğenilenler</h3>
{

userLikes.length !== 0 ? 

  userLikes.map((item) => (
    <div className="twit-card">
    <div className='twit-card-header'>
<img className='shared-twit-img' src={item.sharing.createdBy.profileImg !== "" ? item.sharing.createdBy.profileImg  : twitterImg} alt='' />
<span>{item.sharing.createdBy.user.username}</span>

</div>
<div className="twit-card-body">
    <p style={{"marginLeft":item.sharing.twitImg !== "" ? "10px" : "0px"}}>
    {item.sharing.twit}
    </p>
    <div className='twit-sharing'>
       {
          item.sharing.twitImg !== "" ?    <img className='edited-img' src={item.sharing.twitImg}   alt='' /> : null }
       
       </div>
</div>
</div>
  ))
 : 
<div className="box">
 <h1>Henüz bir twit beğenmediniz !!</h1>
 </div>
}


     </div>
     <div className='divider'/>
     <div className='user-sharings'>
        <h3 className=''>Takip Ettiklerim</h3>
          <div className='user-followings-container'>
            {
              userFollowings.length !== 0 ? 
              userFollowings.map((item) => (
                <div className='user-following-card'>
                <h3 className='user-following-card-user'>{item.followed.user.username}</h3>
                
                <h5 className='user-following-card-account-name'>{item.followed.accountName}</h5>
                <img className='shared-twit-img make-bigger mt-5' src={item.followed.profileImg ? item.followed.profileImg : anounymous} alt='' />
                <a href={'/viewprofile/'+item.followed.id} className='view-profile-btn'>Profili Görüntüle</a>
                <button style={{"border":"0","backgroundColor":"crimson","padding":"5px 20px","fontWeight":"400","cursor":"pointer"}} onClick={()=>deleteFollowing(item.id)} className='view-profile-btn'>Takibi iptal et</button>
              </div>
              ))
              : 
              <div className="box">
 <h1>Henüz Takip ettiğiniz biri yok.</h1>
 </div>
            }
          
            
      
          </div>
     </div>


       </div>
    </div>
</div>

    </div>
  )
}

export default UserProfile