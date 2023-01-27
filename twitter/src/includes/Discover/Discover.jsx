import React from 'react'
import Popular from '../Popular/Popular';
import { FaHashtag,FaHome } from 'react-icons/fa';

const Discover = () => {
  return (
    <div className='mt-100'>
    <div  className="container ">
        <div className="row">
        <div className="col-quarter p-0">
            <ul className='home-side-list'>
                <li className='home-side-item'>    <a className='home-side-link' href="/discover"><FaHashtag className='home-hash-link-icon'/>Keşfet</a></li>
                <li className='home-side-item'>
       <a className='home-side-link' href="/"> <FaHome className='home-hash-link-icon'/>Ana Sayfa</a></li>
       
            </ul>
       
       
       </div>
<Popular/>
       </div>
    </div>


    </div>
  )
}

export default Discover