import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Pagenotfound = () => {
    const navigate = useNavigate();
    useEffect(()=>{
  navigate('/');
    },[])
  return (
    <div>Pagenotfound</div>
  )
}

export default Pagenotfound