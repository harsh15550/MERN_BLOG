import React, { useContext, useEffect, useState } from 'react';
import './Navbar.css';
import { IoSearch } from "react-icons/io5";
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/logo.jpg';
import { StoreContext } from '../../Context/contextProvider';
import profile from '../../assets/profile-png-icon-2.jpg';
import { ImCross } from "react-icons/im";

const Navbar = () => {
    const { logoutFunction, logindata, token , user} = useContext(StoreContext);    
    const [searchData, setSearchData] = useState("");
    const [searchBox, setSearchBox] = useState(false);
    const [originalData, setOriginalData] = useState({ postData: [] });

    
    // USER DATA IS STORE IN LOCALSTORAGE 

    const fetchSearchData = async () => {
        try {
            if (searchData.trim() !== "") {
                const response = await fetch(`http://localhost:3000/api/post/search?title=${searchData}`, {
                    method: "GET"
                });
                const data = await response.json();
                setOriginalData(data);
                setSearchBox(true);                    
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        console.log(originalData.postData);
    }, [originalData]);


    return (
        <div>
            <div className="navbar-content">
                <Link style={{textDecoration: 'none'}} to={"/"}>
                    <div className="logo">
                        <img src={logo} alt="" />
                        <h1>BLOG</h1>
                    </div>
                </Link>
                <div className="search-box">
                    <input 
                        className='nav-input'
                        type="text" 
                        value={searchData}
                        onChange={(e) => setSearchData(e.target.value)}
                        name="search" 
                        placeholder="Search blog..." 
                        style={{ padding: '14px 10px', borderRadius: '20px', border: '1px solid #ccc', width: '400px', outline: 'none' }} 
                    />
                    <button onClick={fetchSearchData}><IoSearch/></button>
                    {
                        searchBox && (
                            <div className="main-search-box">
                                <div onClick={() =>{ setSearchBox(false); setSearchData("")}} className="cross-icon">
                                    <ImCross/>
                                </div>
                                <div className="search-data">
                                    {
                                        originalData.postData.length > 0 ? (
                                            originalData.postData.map((creEle, index) => (
                                                <div key={index} className='search-data-profile' onClick={() =>{ setSearchBox(false); setSearchData("")}}>
                                                    <Link to={`/profile/${creEle.auther._id}`}><img src={`http://localhost:3000/image/${creEle.auther.profile}`} alt="" /></Link>
                                                    <Link style={{textDecoration : "none" , color : "white"}} to={`/blogDetail/${creEle._id}`}><div >{creEle.title}</div></Link>
                                                </div>
                                            ))
                                        ) : (
                                            <div style={{color : "white" , fontSize : "20px"}}>No results found</div>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="nav-li">
                    <ul>
                        <NavLink className='link' to={"/"}><li>Home</li></NavLink>
                        <NavLink className='link' to={"/blogs"}><li>Blogs</li></NavLink>
                        <NavLink className='link' to={"/about"}><li>About</li></NavLink>
                        <NavLink className='link' to={"/contact"}><li>ContactUs</li></NavLink>
                    </ul>
                </div>
                <div className="nav-btn">
                    {token ? (
                        <div className="create-post">
                            <Link to={"/createPost"}><button>Create Blog</button></Link>
                            <div className="profile-container">
                                <img className="profile-image" src={"http://localhost:3000/image/"+user?.profile} alt="Profile" />
                                <div className="createpost-bottom">
                                    <button onClick={logoutFunction}>Logout</button>
                                    <Link to={`/profile/${user?._id}`}><button>Profile</button></Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="nav-buttons">
                            <Link to="/login"><button>Login</button></Link>
                            <Link to="/register"><button>Register</button></Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
