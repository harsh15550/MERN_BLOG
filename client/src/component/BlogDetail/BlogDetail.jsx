import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './BlogDetail.css'
import { StoreContext } from '../../Context/contextProvider';
import CardComponent from '../CardComponent/CardComponent';
import Loading from '../Loading/Loading';

const BlogDetail = () => {
  const [findBlog, setFindBlog] = useState(null);
  const [loader, setLoader] = useState(true);
  const { id } = useParams();

  const { loading, allPost, url, user, showSuccessToast, showErrorToast } = useContext(StoreContext);
  const navigate = useNavigate();

  console.log(findBlog?.posts?.auther?._id);
  useEffect(() => {
    console.log(user._id);
  },[])

  const fetchBlog = async () => {
    try {
      const response = await fetch(`${url}/api/findBlog/blog/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const resData = await response.json();
      setFindBlog(resData);
      setLoader(false);
    } catch (error) {
      console.error("Error fetching blog:", error);
    }
  };

  const deletePost = async () => {
    try {
      const res = await fetch(`${url}/${findBlog?.posts?._id}`, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json", 
        },
      });
  
      const data = await res.json();
  
      if (data.success) {
        showSuccessToast(data.message); 
        navigate("/blogs"); 
      } else {
        showErrorToast(data.message);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      showErrorToast("An error occurred while trying to delete the post.");
    }
  };
  

  useEffect(() => {
    if (id) {
      fetchBlog();
    }
  }, [id]);

  useEffect(() => {
    if (findBlog) {
    }
  }, [findBlog]);

  if (loader) {
    return <Loading />;
  }

  if (!findBlog) {
    return <h1>Blog not found</h1>;
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className='blog-detail' onScroll={scrollTo(0, 0)}>
      <div className="blog-data">
        <div className="blog-image">
          <img src={`${findBlog?.posts?.image}`} alt="" />
        </div>
        <div className="blog-bottom-content">
          <div className="blog-detail-title">
            <h1>{findBlog?.posts?.title}</h1>
          </div>
          <div className="" style={{display:'flex' , justifyContent:'space-between'}} >

            <div className="blog-userdetail">
              <Link to={`/profile/${findBlog?.posts?.auther._id}`}>
                <div className="blog-detail-profile-img">
                  <img src={`${findBlog?.posts?.auther.profile}`} alt="" />
                </div>
              </Link>

              <div className="blog-userdetail-date">
                <h2>{findBlog?.posts?.auther.username}</h2>
                <p>{formatDate(findBlog?.posts?.date)}</p>
              </div>
            </div>
            {
              findBlog?.posts?.auther?._id === user._id ? <button onClick={() => deletePost()} className="deletebtn" >Delete Post</button> : <></>
            }
          </div>
          <div style={{ color: "grey", marginTop: "20px" }} className="blog-detail-summary">
            {findBlog?.posts?.summary}
          </div>
          <div
            className='blog-origian-content'
            dangerouslySetInnerHTML={{ __html: findBlog?.posts?.description.replace(/<img/g, '<img style="height: 500px; margin : 20px 0px;"') }}
            style={{ maxWidth: '900px' }}
          />
        </div>
      </div>
      <div className="top-blog">
        {loading ? (
          <Loading />
        ) : (
          allPost.slice().reverse().map((post, index) => {
            if (index < 4) {
              return (
                <div key={index}>
                  <CardComponent {...post} />
                </div>
              )
            }

          })
        )}
      </div>
    </div>
  );
};

export default BlogDetail;
