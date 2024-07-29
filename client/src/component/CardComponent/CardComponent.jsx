import React, { useContext, useEffect, useState } from 'react'
import './CardComponent.css'
import { HiDotsVertical } from "react-icons/hi";
import { Link } from 'react-router-dom';
import { StoreContext } from '../../Context/contextProvider';

const CardComponent = (posts) => {

  const { findAllPost} = useContext(StoreContext);

    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };  

    useEffect(()=>{
      // setLoginData();
    },[ findAllPost ])

  return (
    <div>
        <div className='card-main-container'>
          
            <div className="card-container">
                <Link className='card-link' to={"/blogDetail/"+posts._id}>
                  <img src={"https://blog-app-q9u5.onrender.com/image/"+posts.image} alt="" />
                </Link> 
              <div className="card-bottom">
                <div className="bottom-top-profile">
                  
                </div>
                <div className="bottom-center">

                  <div className="title">
                    <h3 className="truncated-title">{posts.title}</h3>
                  </div>       
                  <div className="summary">
                    <p className="summary">{posts.summary}</p>  
                  </div>   
                  <div className="category">
                      <h3 className='category-name'>{posts.category}</h3>
                  </div>
                  <div className="user-detail">
                    <div className="profile">
                       <Link className='profile-img' to={`/profile/${posts.auther._id}`}> <img src={"https://blog-app-q9u5.onrender.com/image/"+posts.auther.profile} alt="" /></Link>
                    </div>
                    <div className="creator-name">
                      <h3>{posts.auther.username}</h3>
                    </div>
                    <div className="date">
                      <p>{formatDate(posts.date)}</p>
                    </div>
                    
                  </div>
                </div>                
              </div>
            </div> 

      </div> 
    </div>
  )
}

export default CardComponent