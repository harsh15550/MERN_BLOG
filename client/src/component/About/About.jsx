import React from 'react'
import image from '../../assets/about.png'
import './About.css'
import aboutImg from '../../assets/aboutus.jpg'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div>
        <div className="contact">
            <div className="contact-img">
                <img src={image} alt="" />
                <h1>About</h1>
            </div>
            <div className="about-bottom">
                <div className="about-bottom-left">
                    <div className="about-left-img">
                        <img src={aboutImg} alt="" />
                    </div>
                </div>
                <div className="about-bottom-right">
                    <h3>About Us</h3>
                    <h1>We Always Make The Best</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae natus quia perferendis porro ullam, fugit quis molestias officia alias, corrupti labore impedit, recusandae molestiae tempore inventore aut ratione nisi? Facere.</p>
                    <Link to={"/contact"}><button>Contact Us</button></Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default About