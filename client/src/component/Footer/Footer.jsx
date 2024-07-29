import React from 'react'
import './Footer.css'
import logo from '../../assets/logo.jpg'
import { Link } from 'react-router-dom'


const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();
  return (
    <>
    <div className='footer-container'>
        <div className="logo-content">
            <div className="logo">
                <img src={logo} alt="" />
                <h1>BLOG</h1>
            </div>
            <div className="footer-content">
                Most blog footers highlight the most important information from a business or brand. Users look to footers primarily when they wish to find important business information, hours, or addresses.
            </div>
        </div>
        <div className="footer-links">
            <h2>Links</h2>
            <ul>
                <Link><li>Home</li></Link>
                <Link><li>About</li></Link>
                <Link><li>Contact</li></Link>
            </ul>
        </div>
        <div className="footer-links">
            <h2>Pages</h2>
            <ul>
                <Link><li>Food</li></Link>
                <Link><li>News</li></Link>
                <Link><li>Design</li></Link>
            </ul>
        </div>
        <div className="contactus">
            <h3>abc@gmail.com</h3>
            <p>+91 89373 73652</p>
        </div>
    </div>
    <p className='copyright'>@ {year} Copyright <span>blog.com</span></p>
    </>
  )
}

export default Footer