import React, { useContext, useEffect, useState } from 'react';
import CardComponent from '../CardComponent/CardComponent';
import './Card.css';
import Loading from '../Loading/Loading';
import { StoreContext } from '../../Context/contextProvider';

const Card = ({categorys}) => {


  const { allPost , findAllPost } = useContext(StoreContext);
  const filteredPosts = allPost.filter(post => categorys === "All" || categorys === post.category).reverse();

  useEffect(() => {
  }, [allPost]);

  useEffect(() => {
  }, [findAllPost])
 
  return (
    <>
            <div className='cards-flex'>
                {
                        filteredPosts.length > 0 ? (
                            filteredPosts.map((post, index) => (
                                <div key={index}>
                                    <CardComponent {...post} />
                                </div>
                            ))
                        ) : (
                            <h1>No Content Uploaded . . .</h1>
                        )
                        
                      
                      
                }
            </div>
        </>
  );
};

export default Card;
