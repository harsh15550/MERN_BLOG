import React, { useContext, useEffect, useState } from 'react';
import './Profile.css';
import UserCreatedBlog from '../UserCreatedBlog/UserCreatedBlog';
import { Link, useParams } from 'react-router-dom';
import { StoreContext } from '../../Context/contextProvider';
import profile_img from "../../assets/profile.jpg";
import CardComponent from '../CardComponent/CardComponent';
import Loading from '../Loading/Loading';

const Profile = () => {
  const {logindata, allPost , user } = useContext(StoreContext);

  useEffect(()=>{
  },[allPost])

  const [oldest , setOldest] = useState(0); 
  const [countBlog , setCountBlog] = useState(0); 

  const [data , setData] = useState({});

  const {userId} = useParams();

    const fetchUserData = async () => {
      try {
          const response = await fetch(`https://blog-app-q9u5.onrender.com/api/findUser/user/${userId}`, {
              method: 'GET',              
          });
          const resData = await response.json();
          setData(resData);
      } catch (error) {
          console.error('Error fetching login user data:', error);
      }
    };

  useEffect(()=>{
    fetchUserData();
  },[userId])  

  useEffect(() => {
    const userBlogs = allPost.filter(post => post.auther._id === data._id);
    setCountBlog(userBlogs.length);
  }, [allPost, data]);


  if (!logindata) {
    return <div>Loading user data...</div>;
  }

  return (
    <div className='profile-containe'>
      <div className="profile-banner">
      <img src={!data.banner ? "" :"https://blog-app-q9u5.onrender.com/image/"+ data.banner} alt="" />
        
      </div>
      <div className="profile-bottom">
        <div className="blog-creater-data">
          <div className="profile-picture">
            <img className='profile-img' src={!data.profile ? profile_img : "https://blog-app-q9u5.onrender.com/image/"+ data.profile} alt="" />
          </div>
          <div className="username-follow-flex">
            <p className='username'>@{data.username}</p>
            <div className="follow-btn">
              <button>Follow</button>
            </div>
          </div>
          <hr />
          <div className="profile-follower">
            <div className="followers-btns">
              <div className="follower-data">
                <h2>{countBlog}</h2>
                <p>Blogs</p>
              </div>
              <div className="follower-data">
                <h2>100</h2>
                <p>Followers</p>
              </div>
              <div className="follower-data">
                <h2>20K</h2>
                <p>Following</p>
              </div>
            </div>
            <hr />
            <ul className='categorys'>
              <li>News</li>
              <li>Design</li>
              <li>Food</li>
              <li>Education</li>
              <li>Traveling</li>
              <li>Tech News</li>
              <li>Life</li>
            </ul>
          </div>
        </div>

        <div className="created-blog-right-side">
          <div className="profile-btns">
            <div className="oldest-latest">
              <button onClick={() => setOldest(0) }>Oldest</button>
              <button onClick={() => setOldest(1) }>Latest</button>
            </div>
            <Link to={`/edit/${user?._id}`}>
            {
              user?._id === userId ? <button>Edit profile</button> : <></>
            }
              
            </Link>
          </div>
          
          <div className="created-blog">

            {
              oldest === 1 ? <>
                {allPost.slice().reverse().map((post, index) => {
                  
                  if(data._id === post.auther._id){
                return (
                  <>
                    <CardComponent key={index} {...post} />
                  </>
                )
              }
              })}
              </> : <>
              {allPost.map((post, index) => {
              if(data._id === post.auther._id){
                return (
                  <div key={index}>
                    <CardComponent key={index} {...post} />
                  </div>
                )
              }
            })}
              </>
            }

            

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
