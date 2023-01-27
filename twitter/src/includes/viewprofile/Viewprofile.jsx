import React from 'react'

import '../Profile/Profile.css';
import twitterImg from '../../images/anounymous.jpg';
import {FaTwitter} from 'react-icons/fa';
import {MdLocationPin,MdDateRange} from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import  anounymous  from '../../images/anounymous.jpg';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {getFollowings} from '../../redux/slices/FollowingSlice';


const ViewProfile = () => {

const {id} = useParams();
const dispatch = useDispatch();
  const {user} = useSelector(state =>state.loginReducer)
const {followings} = useSelector(state => state.FollowingSlice);
const {Accounts} = useSelector(state => state.AccountSlice)
const selected_user = Accounts.filter((item) => item.id === Number(id));



  const {twits} = useSelector(state => state.twitSlice);
  const userTwits = twits.filter(item => item.createdBy.id === Number(id));
  const {likes} = useSelector(state => state.LikeSlice);
 

 const userFollowings = followings.filter((element) => element.followerId === Number(id));


 const addFollowing = async  (accountId)  => {
   
  var userAccesableFollowings = followings.filter((element) =>(element.follower === (user.user.username)) );

  var checkMultipleFollowings = userAccesableFollowings.every((item) =>{
     
  
     return ( item.followed.id !== accountId )  });
 

  if(checkMultipleFollowings && user.id !== accountId) {
  
  
  const followingContent = {
    accountId,
    follower:user.user.username,
    followerId : user.id
  }
  await axios.post("http://localhost:8000/api/createfollowing/",followingContent).then((res)=>{
   dispatch(getFollowings());
    console.log(res.data);
    alert("Kullanıcı takip edilmeye başladı.")
  });
  
}
else {
  alert("Bu kullanıcıyı zaten takip ediyorsunuz")
}




};


const userLikes = likes.filter((element) => element.likeId === Number(id));
const followerIndices = followings.reduce((x,y)=>{
  if(Number(id) === y.followed.id) {
    return x+1;
  }
  else {
    return x;
  }
},0)




  return (
    <div className='container'>
<div className="row">
    <div className="col-full">
    
{
selected_user.map((item) => (
    <>
    <div className='profile-img'>
    <div className='profile-img-container' style={{"backgroundColor": item.profileImg === '' ? "#00acee" : "white"   }}>
      {
        item.profileImg === ""  ?<FaTwitter className='profile-twitter-logo' size ={35}/> : <img src={item.profileImg} alt='' className='user-activated-img' />
      }
 
</div></div>
<div className='edit-profile-btn-wrapper'>
<button  onClick={()=>addFollowing(item.id)}>Takip Et</button>
</div>

<div  >
  <h3 >{item.user.username}</h3>
  <h5 className='follower-text'>{item.accountName}</h5>
  <p className='user-profile-description'>{item.description}</p>
<div className='user-details'>
<span className='user-location'><MdLocationPin  style={{"transform":"translateY(2px)"}} size={16}/> {item.Address}</span>
<br/>
<span className='user-date'><MdDateRange/> Oluşturulma Tarihi   {new Date().getFullYear()}  </span>
</div>
<div className='user-following-info'>
<div className='user-following-info-details'>
<strong className='user-followings'>{userFollowings.length}</strong> <span className='user-followings-text'>Takip Edilen Sayısı</span>
</div>
<div className='user-following-info-details'>
<strong className='user-followings'>{followerIndices}</strong> <span className='user-followings-text'>Takip Sayısı</span>
</div>
</div>
</div> 
</> 
))

        
        
}
        
     <div className='user-sharings'>
        <h3>Paylaşımlar</h3>
{
  userTwits.length !== 0 ?
  userTwits.map((item) => (
    <div className="twit-card">
    <div className='twit-card-header'>
<img className='shared-twit-img' src={item.createdBy.profileImg !== "" ? item.createdBy.profileImg : twitterImg} alt='' />
<span>{item.createdBy.user.username}</span>

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
  )
}

export default ViewProfile;