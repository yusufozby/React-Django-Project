
import './App.css';
import Login from './includes/Account/Login';
import Register from './includes/Account/Register';
import ChangePassword from './includes/Changepassword/ChangePassword';
import Discover from './includes/Discover/Discover';
import EditProfile from './includes/EditProfile/EditProfile';
import Navbar from './includes/Navbar/Navbar';
import UserProfile from './includes/Profile/Profile';
import User from './includes/User/User';
import Home from './includes/home/Home';
import { BrowserRouter as Router,Routes,Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAccounts } from './redux/slices/AccountSlice';
import { getTwits } from './redux/slices/twitSlice';
import { getLikes } from './redux/slices/LikeSlice';
import { getFollowings } from './redux/slices/FollowingSlice';
import ViewProfile from './includes/viewprofile/Viewprofile';
import Pagenotfound from './Pagenotfound';
function App() {
const dispatch = useDispatch();


const {user} = useSelector(state => state.loginReducer);



useEffect(()=>{
  dispatch(getAccounts())
  },[])
  useEffect(()=>{
  dispatch(getTwits())
  },[])
  useEffect(()=>{
    dispatch(getLikes());
  },[])
useEffect(()=>{
dispatch(getFollowings());
},[])





  return (
    <div className="App">
      <Navbar/>
<Router>
<Routes>
<Route
element={
  user !== null
  ?
  <Home/>:
  <Login/>
}
path='/'
/>
<Route 

element={
  user !== null
 ?
<Discover/>
: <Login/>
  
  }
path='/discover'
/>
<Route 
element={
  
 user !== null?
  <UserProfile/> 
 : <Login/>
  
}
path='/profile'
/>
<Route element={user !== null ? <EditProfile/> : <Login/>} path='/editprofile' />
<Route element={ user !== null ?<ChangePassword/> : <Login/>} path='/changepassword' />
<Route element={ user !== null ?<User/> : <Login/>} path='/user' />
<Route element={ user !== null ?<Login/> : <Login/>} path='/login' />
<Route element={ <Register/> } path='/register' />
<Route element={ user !== null ?<ViewProfile/> : <Login/>} path='/viewprofile/:id' />
<Route element={ <Pagenotfound/>} path="*" />
</Routes>




</Router>
    </div>
  );
}

export default App;
