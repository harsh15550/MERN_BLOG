import React, { useContext, useEffect, useState } from 'react';
import './Home.css'; // Assuming you have a CSS file for styling
import hero_img1 from '../../assets/hero_img1.jpg'
import hero_img2 from '../../assets/hero_img2.jpg'
import hero_img3 from '../../assets/hero_img3.jpg'
import CardComponent from '../CardComponent/CardComponent';
import { StoreContext } from '../../Context/contextProvider';
import HomeBottom from '../HomeBottom/HomeBottom';
import SubscriptionForm from '../Subscription/Subscription';
import Loading from '../Loading/Loading';

const Home = () => {
  const [expandedImage, setExpandedImage] = useState("image1");

  const {allPost, findAllPost, loading} = useContext(StoreContext);

  const handleImageClick = (imageId) => {
    setExpandedImage(imageId);
  };

  useEffect(()=>{
    findAllPost();
  },[])

  return (
        <div className='hero-container'>
            <div className="hero-section">
                <div className="hero-left">
                    <div className="hero-left-content">
                        <h1>Grow Your Knowledge.</h1>
                        <p style={{fontSize : "15px"}}>Explore diverse topics, read widely, engage with experts, experiment, and reflect to continually expand your knowledge and skills.</p>
                        <button style={{width : "150px" , marginTop : "20px" , height : "35px" , backgroundColor : "rgb(47, 2, 47)" , color : "white" , borderRadius : "8px"}}>Get Started</button>
                    </div>
                </div>
                <div className="hero-images">
                    <div className={`hero-image ${expandedImage === "image1" ? "expanded" : ""}`} onClick={() => handleImageClick('image1')}>
                        <img src={hero_img1} alt="" />
                        <div className="hero-img-content">
                            <h3>Writing cources</h3>
                            <h3>100 People</h3>
                        </div>
                    </div>
                    <div className={`hero-image ${expandedImage === "image2" ? "expanded" : ""}`} onClick={() => handleImageClick("image2")}>
                        <img src={hero_img2} alt="" />
                        <div className="hero-img-content">
                            <h3>Business cources</h3>
                            <h3>100 People</h3>
                        </div>
                    </div>
                    <div className={`hero-image ${expandedImage === "image3" ? "expanded" : ""}`} onClick={() => handleImageClick("image3")}>
                        <img src={hero_img3} alt="" />
                        <div className="hero-img-content">
                            <h3>Design cources</h3>
                            <h3>100 People</h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className="home-latest-blog">
                <h1>Latest Blogs...</h1>
                <div className="top-latest-blog">
                {
                    loading ? (<div style={{position:'absolute'}}> <Loading /> </div>) : (
                    allPost.slice().reverse().map((posts , index)=>{
                        if(index <= 2){
                            return (
                                <div key={index}>
                                    <CardComponent {...posts}/>
                                </div>
                                
                            )
                        }
                        
                    }) )
                }
                </div>
            </div>
            <HomeBottom/>
            <SubscriptionForm/>
        </div>
  );
};

export default Home;