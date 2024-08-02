import React, { useContext, useState } from 'react';
import './Register.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StoreContext } from '../../Context/contextProvider';
const Register = () => {

  const {showSuccessToast , showErrorToast, url} = useContext(StoreContext);

  const navigate = useNavigate();

  const [data , setData] = useState({
    username : "",
    email : "",
    password : "",
    cpassword : ""
  });


  const onsubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if(data.password === data.cpassword){
    const response = await fetch(`${url}/api/user/register`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(({
          username: data.username,
          email: data.email,
          password: data.password,
          cpassword: data.cpassword
        }))
      })
      const res = await response.json();
        console.log(response);
        if(res.success === true){
          setData({
            email : "",
            password : "",
            username : "",
            cpassword : ""
          })
          showSuccessToast(res.message)
          navigate("/login");  
        }
        else{
          showErrorToast(res.message);
        }
        
      }
      else{
        showErrorToast("Password and Confirm Password does not match");
      }
      
    } catch (error) {
      console.log(error);
    }
    finally{
      console.log(res)
    }
      
  }


  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(prev => ({...prev , [name] : value}))
  }

  return (
    <div className="container">
      <input type="checkbox" id="signup_toggle" />
      <form className="form" onSubmit={onsubmitHandler}>
        <div className="form_front">
          <div className="form_details">Register</div>
          <input onChange={onChangeHandler} type="email" className='input' name='email' value={data.email} placeholder='Email' />
          <input onChange={onChangeHandler} placeholder="Username" name='username' value={data.username} className="input" type="text" />
          <input onChange={onChangeHandler} placeholder="Password" name='password' value={data.password} className="input" type="password" />
          <input onChange={onChangeHandler} placeholder="Conform Password" name='cpassword' value={data.cpassword} className="input" type="password" />
          <button className="btn">Create Account</button>
          <span className="switch">Already have an account  
            <Link style={{color:"orange"}} className='loginlink' to={"/login"}>Login</Link>
          </span>
        </div>
        
      </form>
    </div>
  );
};

export default Register;
