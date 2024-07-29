import React, { useContext, useEffect, useState } from 'react'
import Card from '../component/Card/Card'
import './Blogs.css'
import { StoreContext } from '../Context/contextProvider'
// import CardComponent from '../component/CardComponent/CardComponent'

const Blogs = () => {
  const { findAllPost } = useContext(StoreContext);
  const [categorys , setCategorys] = useState("All");

  useEffect(()=>{
    findAllPost();
  },[])
  return (
    <div>
      <div className="category-btns">
        <button onClick={() => setCategorys("All")}>All</button>
        <button onClick={() => setCategorys("Marketing")}>Marketing</button>
        <button onClick={() => setCategorys("News")}>News</button>
        <button onClick={() => setCategorys("Food and Cooking")}>Food and Cooking</button>
        <button onClick={() => setCategorys("Education and Career")}>Education and Career</button>
        <button onClick={() => setCategorys("Sports")}>Sports</button>
        <button onClick={() => setCategorys("Nature")}>Nature</button>
        <button onClick={() => setCategorys("Finance")}>Finance</button>
        <button onClick={() => setCategorys("Technology")}>Technology</button>
        <button onClick={() => setCategorys("Travel")}>Travel</button>
        <button onClick={() => setCategorys("Health and Wellness")}>Health and Wellness</button>
        <button onClick={() => setCategorys("Lifestyle")}>Lifestyle</button>
        
      </div>
      <div className="cards fedIn">
        <Card categorys={categorys}/>
      </div>
    </div>
  )
}

export default Blogs