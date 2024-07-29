import React, { useContext, useEffect, useRef, useState } from 'react';
import "./EditProfile.css";
import { StoreContext } from '../../Context/contextProvider';
import { useNavigate } from 'react-router-dom';
import { BiSolidPencil } from 'react-icons/bi';
import profile_img from "../../assets/profile.jpg";


const EditProfile = () => {
  const { showSuccessToast , setLogindata , user  } = useContext(StoreContext);

  console.log(user);
  console.log(user);

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profile , setProfile] = useState("")
  const [banner , setBanner] = useState("");

  useEffect(() => {
    setUsername(user?.username);
    setEmail(user?.email);
  }, [user]);

  // USE REF
  const profileChange = useRef(null);

  const handleProfile = () => {
    profileChange.current.click();
  }

  const bannerChange = useRef(null);

  const handleBanner = () => {
    bannerChange.current.click();
  }
    

  const userUpdate = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();

    formData.append("username" , username)
    formData.append("email" , email)

    if(profile){
      formData.append("profile" , profile);
    }

    if(banner){
      formData.append("banner" , banner);
    }

    try {
      const response = await fetch(`https://blog-app-q9u5.onrender.com/api/findUser/update/${user?._id}`, {
        method: "PUT",
        body: formData,
      });

      const resData = await response.json();
      console.log(resData);
      if(resData.success === true){
        showSuccessToast(resData.message)
        navigate(`/profile/${user?._id}`);
        setLogindata(resData.user)
        localStorage.setItem("user" , JSON.stringify(resData.user))
      }
      console.log(resData);
    } catch (error) {
      console.error("Error updating user?:", error);
    }
  };

  return (
    <div className='edit-main'>
      <div className="edit-container">
        <form onSubmit={userUpdate} className="edit-form">
          <div className="edit-image">

            <div className="edit-banner">
              <img src={!user?.banner ? "" :"https://blog-app-q9u5.onrender.com/image/"+ user?.banner} alt="" />
              <input ref={profileChange} onChange={e => setBanner(e.target.files[0])} type="file" name='image' hidden />
              <BiSolidPencil onClick={handleProfile} style={{color : "white" , backgroundColor : "rgb(30, 28, 28)" , padding:"4px"}} className='edit-banner-icon'/>
            </div>
            
            <div className="edit-profile-img">
                <img className="edit-profile" src={!user?.profile ? "" : "https://blog-app-q9u5.onrender.com/image/"+ user?.profile} alt="" />
              <input ref={bannerChange} onChange={e => setProfile(e.target.files[0])} type="file" name='image' hidden />
              <BiSolidPencil onClick={handleBanner} style={{color : "white" , backgroundColor : "rgb(30, 28, 28)" , padding:"4px"}} className='edit-profile-icon'/>
            </div>

          </div>
          <div className="edit-form-content">
            <div className="edit-content">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder='Enter username'
                required
              />
            </div>
            <div className="edit-content">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter email'
                required
              />
            </div>
            <div className="submit-btn">
              <button type='submit'>Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
