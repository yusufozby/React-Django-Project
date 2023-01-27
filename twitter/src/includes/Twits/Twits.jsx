import React from 'react'
import { FaSearch} from 'react-icons/fa';

import anounymous from '../../images/anounymous.jpg'

import {AiOutlineHeart} from 'react-icons/ai';


import { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { getLikes } from '../../redux/slices/LikeSlice';
import { useMemo } from 'react';



const Twits = ({chosenArr}) => {
  const [a,setA] = useState([]);
  const dispatch = useDispatch();
  const [changed,setChanged] = useState(false);  
  const [search,setSearch] = useState('');

const {likes} = useSelector(state => state.LikeSlice);
const filterArr = () => {
  setChanged(true);

  const newTwits = chosenArr.filter(item => item.twit.toLowerCase().includes(search.toLowerCase()));
  setA(newTwits);

 

}

const {user} = useSelector(state => state.loginReducer);
const {Accounts} = useSelector(state => state.AccountSlice)
const likeTwit = async (id) => {
  var userAccesableLikes = likes.filter((element) => element.like === user.user.username);

  var checkMultipleLikes = userAccesableLikes.every((item) =>{ return ( item.sharing.id !== id ) });
  
  if(checkMultipleLikes) {
  
  
  const likeContent = {
    twitId:id,
    like:user.user.username,
    likeId:user.id
  }
  await axios.post("http://localhost:8000/api/createlike/",likeContent).then((res)=>{
    dispatch(getLikes());
    console.log(res.data);
  });
  
}

}
const getLikeIndices = (likeIndices) => {
var userAccesableLikes = likes.filter((element) => element.like === user.user.username);
likeIndices = userAccesableLikes.reduce((x,y)=>{
  return [...x,y.sharing.id];
},[]);
return likeIndices;

}
const selected_likes = useMemo(()=>getLikeIndices(likes),[likes]);

 
const otherUsers = Accounts.filter((element) => element.user.username !== user.user.username);
var userIndex = otherUsers.reduce((x,y)=>{
  return [...x,y.id];
},[])
const getRandomSelectedUsers = (chosenUsers) => {
  
var  userSortedIndecies = userIndex.sort(()=>0.5-Math.random());
var randomUsers= [];
userSortedIndecies.forEach(element => {

   const foundItem = Accounts.find((item) => item.id === element);
   randomUsers.push(foundItem);
});
 chosenUsers = randomUsers.slice(0,2);
 return chosenUsers;
}
const newUsers = useMemo(()=>getRandomSelectedUsers(Accounts),[Accounts])









  return (
  
<>


       
       <div className='col-half p-0'>
        
            <div className="home-page-twits">
            <div className="search-twit-wrapper">
       <input type="text" onChange={(e)=>setSearch(e.target.value)} value={search}  className='search-twit' placeholder="Twitter'da Ara"/>
       
       <FaSearch onClick={filterArr} className='search-twit-icon'/>
       
       
       
       </div>
       { !changed ? 
          chosenArr.map((item,index)=>(
       <div className="twit">
           <div  className="row">
            <a href={"/viewprofile/"+item.createdBy.id}>
       <div className="user-avatar">
           <img className='user-avatar-img' alt=''  src={item.createdBy.profileImg === "" ? anounymous : item.createdBy.profileImg}/>
       </div>
       </a>
       <div className='twit-text-field'>
       <div  className='twit-text'>
           <strong style={{"whiteSpace":"nowrap","textOverflow":"ellipsis","overflow":"hidden","marginTop":"5px"}}>{item.createdBy.user.username}</strong> 
           <br/>
           <span style={{"color":"rgb(83, 100, 113)",
         "marginTop":"10px","width":"100%"}}>{item.createdBy.accountName}    2021 / 12 / 11 
           </span>
           <br/> 
       </div>
       <div className='twit-text'>
         <br/>
         <p> {item.twit}</p>  </div>
         
         
       <div className='twit-sharing'>
       {
          item.twitImg ?    <img className='twit-sharing-img' src={item.twitImg} alt='' /> : null }
          <ul className='follower-selections'>
       
      
          <li>
            
              
               
                  
                 
                      <button onClick={()=>likeTwit(item.id)} id='like'> 
                      <AiOutlineHeart style={{"transform":"translateY(6px)"}} color={selected_likes.includes(item.id) ? "#F88379" : "black"} size={24}/> 
                      </button> 
 
           
                 
                
                
                
            
              
              
            
           
            
  
            
           
            
        
            </li> 
          </ul>
       </div>
       </div>
         
       
       </div>
       
       </div>
          ))
           :
           a.map((item)=>(
            <div className="twit">
                <div  className="row">
            <div className="user-avatar">
                <img className='user-avatar-img' alt=''  src={item.createdBy.profileImg === "" ? anounymous :  item.createdBy.profileImg}/>
            </div>
            <div className='twit-text-field'>
            <div  className='twit-text'>
                <strong style={{"whiteSpace":"nowrap","textOverflow":"ellipsis","overflow":"hidden","marginTop":"5px"}}>{item.createdBy.user.username}</strong> 
                <br/>
                <span style={{"color":"rgb(83, 100, 113)",
              "marginTop":"10px","width":"100%"}}>{item.createdBy.accountName}    2021 / 12 / 11 
                </span>
                <br/> 
            </div>
            <div className='twit-text'>
              <br/>
              <p> {item.twit}</p>  </div>
              
              
            <div className='twit-sharing'>
            {
               item.twitImg ?    <img className='twit-sharing-img' src={item.twitImg} alt='' /> : null }
               <ul className='follower-selections'>
               <AiOutlineHeart style={{"transform":"translateY(6px)"}} color={selected_likes.includes(item.id) ? "#F88379" : "black"} size={24}/>
     
            
               </ul>
            </div>
            </div>
              
            
            </div>
            
            </div>
           ))
           

        }
        {a.length === 0 && changed ? <h1 className='err-search-msg'>Herhangi bir twit'e rastlanılmadı.</h1> : null}
             </div>
       

       </div>
       <div className="col-quarter padding-0 ">
         <div className="card " >
            <h5 className='card-title'>Bunlarıda Beğenebilirsin</h5>
            <hr/>
            {
              newUsers.map((user) => (
                <>
                <div onClick={()=>window.location.href = "/viewprofile/"+user.id} className='row responsive-row choose-user'   style={{"flexWrap":"nowrap"}}>
                <div className='card-avatar'>
                   <img className='card-img' src={user.profileImg ? user.profileImg :anounymous} alt=''/>
                </div>
       <div className="card-text-field " >
         <span className='card-name'>{user.user.username}</span>
       
         <div  > <p className='card-text'>{user.accountName}</p>
           </div>
       </div>
       
                </div>
                <hr/>
                </>
              ))
            }
  

         </div>
       </div>
       </>
  )
}

export default Twits