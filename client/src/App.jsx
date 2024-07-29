import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Navbar from './component/Navbar/Navbar'
import Login from './component/Login/Login'
import Register from './component/Register/Register'
import Footer from './component/Footer/Footer'
import Blogs from './Blogs/Blogs'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreatePost from './component/CreatePost/CreatePost'
import Profile from './component/profile/Profile'
import BlogDetail from './component/BlogDetail/BlogDetail'
import EditProfile from './component/EditProfile/EditProfile'
import Home from './component/Home/Home'
import About from './component/About/About'
import Contact from './component/Contact/Contact'

// import profile from "../../assets/profile.jpg";

const App = () => {
  return (
    <>
    <div>
      <ToastContainer/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/createPost' element={<CreatePost/>} />
        <Route path='/profile/:userId' element={<Profile/>} />
        <Route path='/blogDetail/:id' element={<BlogDetail/>} />
        <Route path='/edit/:loginId' element={<EditProfile/>} />
      </Routes>

      <Footer/>
    </div>
    </>
  )
}

export default App