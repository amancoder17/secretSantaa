import React, { useState } from "react";
import './css/login.css';
import axios from 'axios';
const Register = () => {

const [user,setUser]= useState({
  name:"",
  email:"",
  password:""
})

const handlechange= (e) =>{
  e.preventDefault();
  const {name,value}=e.target
  setUser({
  ...user,[name]:value
  })
}

const register= ()=>{
  const {name,email,password}=user
  if(name && email && password)
  {
    axios.post("http://localhost:9002/register",user)
    .then(res=> console.log(res))
    window.location.replace('/')
  }
  else{
    alert("invalid")
  }
  

  
}

  return (
    <>
      <div className="maino">
        <div className="head">
          <h1 className="ms-4">Secret Santa</h1>
          <img className="logo" src="https://www.shutterstock.com/image-vector/santa-hat-600nw-209018503.jpg" alt="" />
        </div>
        <div className="main">
          <form className="form w-75">
            <div className="mb-3 w-100 mx-auto p-2">
              <label for="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" name="email" value={user.email} onChange={handlechange} className="form-control inpq" placeholder="Enter your Email ID" id="exampleInputEmail1" aria-describedby="emailHelp" required/>
            </div>
            <div className="mb-3 w-100 mx-auto p-2">
              <label className="form-label">Name</label>
              <input type="text" name="name" className="form-control inpq" value={user.name} onChange={handlechange} placeholder="Enter your name" id="examplename" required/>
            </div>
            <div className="mb-3 w-100 mx-auto p-2">
              <label for="exampleInputPassword1" className="form-label">Password</label>
              <input type="password" name="password" className="form-control inpq" value={user.password} onChange={handlechange} placeholder="Enter your Password" id="exampleInputPassword1" required/>
            </div>
            
            <div className="mb-3 mx-auto p-2 sbtn">
              <div className="btn btn-primary sub" onClick={register}>Register</div>
              
             
              
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register;