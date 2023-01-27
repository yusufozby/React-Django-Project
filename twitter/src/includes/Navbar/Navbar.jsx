import React, { useState } from 'react'
import './Navbar.css';
import {FaTwitter} from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';
import { FaBars } from 'react-icons/fa';
import {IoCloseOutline} from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/Actions';
const Navbar = () => {
  const [drawer,setDrawer] = useState(false);
  const [subMenu,setSubMenu] = useState(false);
  const  {user} = useSelector(state => state.loginReducer); 
  const dispatch = useDispatch();
  const Logout = () => {
     
    localStorage.removeItem("user");
    dispatch(logout());
    window.location.href = "/login";
  }
  return (
    <>
    <div className='navbar'>
      <div>
   <FaTwitter className='navbar-icon' size={30}/>     
   </div>
 <ul className='navbar-list'>
  <li className='navbar-list-item'>
    
    <a href= { user !== null ? "/" : "/login"} className='navbar-list-link'>Ana Sayfa</a>
  </li>
  <li className='navbar-list-item'>
    <a href={user !== null ? "/user" : "/login"} className='navbar-list-link'>Profil</a> 
  </li>
  <li className='navbar-list-item'> 
    <a href={user !== null  ? "/discover" : "/login"} className='navbar-list-link'>Keşfet</a>
  </li>
  
  <li className='navbar-list-item'>
    <div className='navbar-dropdown-surrounder'>
    <button id='navbar-dropdown'  className='navbar-list-link'>Ayarlar <IoMdArrowDropdown className='navbar-dropdown-icon'/></button>
    <div className='navbar-dropdown-content'>
           <ul className='navbar-dropdown-list'>
        
          { user !== null ?
          <>
          <li className='navbar-dropdown-item'>
            <a href="/profile" className='navbar-dropdown-link' >Kullanıcı Profili</a>
          </li>
          
          <li className='navbar-dropdown-item'>
            <a href="/changepassword" className='navbar-dropdown-link'>Şifre Değiştir</a>
          </li>
          <li>
            <a className='navbar-dropdown-link' href="/editprofile">Profil Düzenle</a>
          </li>
          <li>
            <button id='dropdown-btn' onClick={Logout} className='navbar-dropdown-link'>Çıkış Yap</button>
          </li>
        
          </>         :   <>  <li>
            <a className='navbar-dropdown-link' href="/login">Giriş Yap</a>
          </li>
          
          <li>
            <a className='navbar-dropdown-link' href="/register">Kaydol</a>
          </li>  
         
            </> }
          </ul> 
    </div>
    </div>
  </li>

 </ul>
<FaBars  className='navbar-responsive-menu'  onClick={()=>setDrawer(true)}  size={30}/>

<div className='drawer-menu' id={drawer ? "opened-drawer-menu" : "closed-drawer-menu"}>
  <div className="drawer-menu-header">
<IoCloseOutline className='drawer-menu-close' onClick={()=>setDrawer(false)} size={30}/>
<div className='drawer-menu-twitter-surround'>
<FaTwitter className='navbar-icon' size={50}/> 
</div>
<div className='drawer-menu-user-info'>
  <span>Yusuf Özbay</span><br/>
  <span id='drawer-menu-user-email'>Ozbay.yusuf02@gmail.com</span>
</div>

</div>
<div className="drawer-menu-body">
<ul className='drawer-menu-list'>
  <li><a href="/">Ana Sayfa</a></li>
  <li><a href="/user">Profil</a></li>
  <li><a href="/discover">Keşfet</a></li>
  <li><button id='drawer-menu-settings-dropdown' onClick={()=>setSubMenu(!subMenu)}>Ayarlar <IoMdArrowDropdown className='navbar-dropdown-icon'/></button></li>

</ul>
<ul id={subMenu? "drawer-submenu-list-opened" : "drawer-submenu-list-closed"} className='drawer-submenu-list'>
  <li> <a href="/profile">Kullanıcı Profili</a></li>
  <li> <a href="/changepassword">Şifreyi Değiştir</a></li>
  <li> <a href="/editprofile">Profili Düzenle </a></li>
</ul>

</div>
</div>

    </div>
    <div className='drawer-menu-surround' onClick={()=>setDrawer(false)} id={drawer ? "opened-drawer-menu-surround" : "closed-drawer-menu-surround"} />
    </>
  )
}

export default Navbar