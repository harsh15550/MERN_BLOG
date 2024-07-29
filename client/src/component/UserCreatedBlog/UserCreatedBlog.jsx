import React from 'react'
import './UserCreatedBlog.css'
import img1 from '../../assets/hero1.jpg'

const UserCreatedBlog = () => {
  return (
    <div >
      <div className="user-created-blog">
        <div className="created-blog-content">
          <div className="blog-img">
            <img src={img1} alt="" />
          </div>
          <div className="createdBlogTitle">
            <h3>Title</h3>
            <p>Date</p>
          </div>
        </div>
        
      </div>
      </div>
  )
}

export default UserCreatedBlog