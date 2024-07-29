import React from 'react'
import image from '../../assets/contact.jpg'
import './Contact.css'
import { Link } from 'react-router-dom'
import { MdEmail } from "react-icons/md";
import { FaPhoneFlip } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { FaLinkedin } from "react-icons/fa";

const Contact = () => {
    const position = [51.505, -0.09];
  return (
    <div>
        <div className="contact">
            <div className="contact-img">
                <img src={image} onScroll={scrollTo(0,0)} alt="" />
                <h1>CONTACT US</h1> 
            </div>
            <div className="contact-container">
            <div className="contact-left">
                <h2>Contact Me</h2>
                <div className="contact-info">
                    <p style={{ fontSize : "20px"}}><Link href="mailto:contact@example.com"><MdEmail style={{color : "#d62828"}} /> contact@example.com</Link></p>
                    <p style={{ fontSize : "20px"}}><Link href="tel:0123456789"><FaPhoneFlip style={{color : "#d62828"}}/> 0123456789</Link></p>
                    <div className="social-media">
                        <Link href="#"><i className="fab fa-facebook"><FaFacebookSquare/></i></Link>
                        <Link href="#"><i className="fab fa-twitter"><FaTwitter/></i></Link>
                        <Link href="#"><i className="fab fa-instagram"><AiFillInstagram/></i></Link>
                        <Link href="#"><i className="fab fa-linkedin"><FaLinkedin/></i></Link>
                    </div>
                </div>
                <Link href="#" className="download-cv-button">Download CV</Link>
            </div>
            <div className="contact-right">
                <form action="">
                    <input type="text" placeholder="Your Name" />
                    <input type="email" placeholder="Your Email" />
                    <textarea placeholder="Your Message"></textarea>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
        
        </div>
    </div>
  )
}

export default Contact