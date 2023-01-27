import React from 'react'
import anounymous from '../../images/anounymous.jpg'
import './Popular.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getFollowings } from '../../redux/slices/FollowingSlice';
const Popular = () => {
const {Accounts} = useSelector((state) => state.AccountSlice);
const {user} = useSelector(state => state.loginReducer);
const {followings} = useSelector(state => state.FollowingSlice);
const dispatch = useDispatch();
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
const filteredUsers = Accounts.filter((element) => element.user.username !== user.user.username);
   return (




<div className='col-4_3'>
    <div className="popular-card" >

{
   filteredUsers.map((item)=>(

      <>
    <div className='row responsive-row popular-choose-user' key={item.id}  style={{"flexWrap":"nowrap"}}>
    <div className='row responsive-row align-items'>
 <div className='card-avatar'>
    <img className='card-img' src={item.profileImg ? item.profileImg : anounymous} alt=''/>
 </div>
<div className="card-text-field " >
<span className='card-name'>{item.user.username}</span>

<div  > <p className='card-text'>{item.accountName}</p>
</div>
</div>
</div>
<div>
   <button onClick={()=>addFollowing(item.id)}  className='follow-button'>Takip Et</button>
</div>
 </div>
 {

 }
 <hr className='popular-divider' />
      </>
   ))




}

 </div>
 </div>
  )
}

export default Popular