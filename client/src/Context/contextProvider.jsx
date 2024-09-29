import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export const StoreContext = createContext();

// CONTEXT 
const StoreContextdata = ({children}) => {

  const [allPost, setAllPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loginUser, setLoginUser] = useState({});
  const [logindata , setLogindata] = useState(localStorage.getItem("user") || {});
  const [user , setUser] = useState({});

  // const url = "https://blog-app-q9u5.onrender.com";
  const url = "http://localhost:3000";


  const navigate = useNavigate();

    const [token , setToken] = useState(localStorage.getItem("token"));
    const [data , setData] = useState({
      name : '',
      username : "",
      profile : ""
    });

    // SUCCESS TOAST  
    const showSuccessToast = (message) => {
      toast.success(message, {
        position: "bottom-right",
        theme: "dark"
      });
    };
  
    // ERROR TOAST
    const showErrorToast = (message) => {
      toast.error(message, {
        position: "bottom-right",
        theme: "dark"
      });
    };

    // LOGIN FUNCTION 
    const loginHandler = async (event) => {
      event.preventDefault();
    
      try {
        const response = await fetch(`${url}/api/user/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            username: data.username,
            password: data.password
          })
        });
    
        console.log('Response:', response); 
    
        const res = await response.json();
        console.log('Response JSON:', res); 
    
        if (res.success) {
          setData({
            username: "",
            password: "",
          });
          localStorage.setItem("token", res.token);
          localStorage.setItem("user", JSON.stringify(res.userData));
          setLogindata(res.userData);
          showSuccessToast(res.message);
          setToken(res.token);
          navigate("/");
        } else {
          showErrorToast(res.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    

    // FIND ALL BLOG 
    const findAllPost = async () => {
      try {
        const response = await fetch(`${url}/api/post/findpost`, {
          method: 'GET',
        });
        const resData = await response.json();
        setAllPost(resData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    useEffect(()=>{
      findAllPost();
    },[])
    
    // LOGOUT FUNCTION  
    const logoutFunction = async () => {
      const response = await fetch(`${url}/api/user/logout` , {
        method: "POST",
        credentials : 'include'
      })
      var resData = await response.json();
      if(resData.success === true){
        showSuccessToast(resData.message)
        localStorage.removeItem("token");
        localStorage.removeItem("user")
        setToken("");
        navigate("/");
      }

    }

    // LOGIN USER DATA STORE IN LOCALSTORAGE 
    const userDataStore = localStorage.getItem("user")

    useEffect(()=>{
      if(logindata){
          try {
              var data = JSON.parse(userDataStore);
              setUser(data);
          } catch (error) {
              console.log(error);
          }
      }
  },[logindata])

    const contextData = {
        token,
        showErrorToast,
        showSuccessToast,
        logoutFunction,
        setToken,
        loginHandler,
        url,
        data,
        setData,
        loginUser,
        setLoginUser,
        logindata,
        setLogindata,
        findAllPost,
        allPost,
        loading,
        user
      }

    return(
        <StoreContext.Provider value={contextData}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreContextdata