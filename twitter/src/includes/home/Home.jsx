import React from 'react'
import './Home.css';

import Twits from '../Twits/Twits';

import { FaHashtag,FaHome } from 'react-icons/fa';
import { useSelector } from 'react-redux';


const Home = () => {

 

  var {twits} = useSelector(state => state.twitSlice) 
  

 var twitIndex = twits.reduce((x,y)=>{
  return [...x,y.id];
},[])

var sortedIndex = twitIndex.sort(()=>0.5-Math.random());
var randomTwits= [];
sortedIndex.forEach(element => {

   const foundItem = twits.find((item) => item.id === element);
   randomTwits.push(foundItem);
});
var chosenArr = randomTwits.slice(0,Math.ceil(Math.random()*3));
 







 


  return (
    <div className='mt-100'>
    <div  className="container ">
        <div className="row">
        <div className="col-quarter p-0">
            <ul className='home-side-list'>
                <li className='home-side-item'>    <a href="/discover" className='home-side-link' ><FaHashtag className='home-hash-link-icon'/> Keşfet</a></li>
                <li className='home-side-item'>
       <a className='home-side-link' href="/"> <FaHome className='home-hash-link-icon'/>Ana Sayfa</a></li>
       
            </ul>
       
       
       </div>

   <Twits chosenArr={chosenArr} sortedIndex={sortedIndex} />
       </div>
    </div>


    </div>
  )
}

export default Home