import axios from 'axios'
import React, {useState } from 'react'
import './css/santaform.css'

const Santaform = () => {


    const url=new URL(window.location.href);
    const idi= url.pathname;
    const sidi= idi.slice(11);



    const [Santa,setSanta]= useState({
        santaname:"",
        santaemail:"",
        ids:""

      })
      const handlechange= e =>{
        const {name,value}=e.target
        setSanta({
        ...Santa,[name]:value,ids:sidi
        })
      }

      const submit= ()=>{
        const {santaname,santaemail,ids}=Santa
        if(santaname && santaemail)
        {
          axios.post(`http://localhost:9002/santasubmit`,Santa)
          .then(res=> console.log(res))
        }
        else{
          alert("invalid")
        }
        window.location.href=`/empname?Data=${sidi}`;
      }

  return (
    <div className='mains'>
      <div className="head">
                    <h1 className="ms-4">Secret Santa</h1>
                    <img className="logo" src="https://www.shutterstock.com/image-vector/santa-hat-600nw-209018503.jpg" alt="" />
                </div>
        <form className="form w-75">
            <div className="mb-3 w-100 mx-auto p-2">
              <label for="exampleInputEmail1" className="form-label">Email address</label>
              <input type="email" name="santaemail" value={Santa.email} onChange={handlechange} className="form-control inpq" placeholder="Enter your Email ID" id="exampleInputEmail1" aria-describedby="emailHelp" required/>
            </div>
            <div className="mb-3 w-100 mx-auto p-2">
              <label className="form-label">Name</label>
              <input type="text" name="santaname" className="form-control inpq" value={Santa.name} onChange={handlechange} placeholder="Enter your name" id="examplename" required/>
            </div>
            <div className="mb-3 mx-auto p-2 sbtn">
                <div className="btn btn-primary sub" onClick={submit} >Submit</div>
                
              
              
            </div>
          </form>
    </div>
  )
}

export default Santaform