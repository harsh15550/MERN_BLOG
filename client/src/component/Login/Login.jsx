import React, { useContext } from 'react';
import './Login.css'
import { Link } from 'react-router-dom';
import { StoreContext } from '../../Context/contextProvider';

const Login = () => {

  const {loginHandler, data , setData} = useContext(StoreContext);
  
  const onChangeHandler = (event) => {
    const name = event.target.name
    const value = event.target.value
    
    setData(prev =>  ({...prev , [name] : value }))
  }

  return (
    <div className="container">
      <input type="checkbox" />
      <form className="form" onSubmit={loginHandler}>
        <div className="form_front">
          <div className="form_details">Login</div>
          <input onChange={onChangeHandler} placeholder="username" value={data.username} name='username' className="input" type="text" />
          <input onChange={onChangeHandler} placeholder="Password" value={data.password} name='password' className="input" type="password" />
          <button type='submit' className="btn">Login</button>
          <span className="switch">Don't have an account? 
            <Link style={{color:'orange'}} className='loginlink' to={"/register"}>Register</Link>
          </span> 
        </div>
        
      </form>
    </div>
  );
};

export default Login;
