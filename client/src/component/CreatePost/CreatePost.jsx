import React, { useContext, useEffect, useRef, useState } from 'react';
import './CreatePost.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { StoreContext } from '../../Context/contextProvider';
import { useNavigate } from 'react-router-dom';

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  ["blockquote", "code-block"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }],
  ["clean", "link", "image"]
];

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
];

const CreatePost = () => {
  const fileRef = useRef();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [summary, setSummary] = useState('');
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('News');

  const navigate = useNavigate();

  const {showSuccessToast , showErrorToast, url} = useContext(StoreContext);

  useEffect(() => {
    console.log({ title, description, image, category });
  }, [title, description, image, category]);

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleQuillChange = (value) => {
    setDescription(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('summary', summary);
    formData.append('image', image);

    try {
      const response = await fetch(`${url}/api/post/add`, {
        method: "POST",
        body: formData,
        credentials: 'include',
        
      });

      const resData = await response.json();
      navigate("/")
      showSuccessToast(resData.message)
    } catch (error) {
      showErrorToast("Somthing went wrong");
    }
  };

  return (
    <div>
      <div className="createpost-container">
        <h1>New Blog Creation</h1>
        <form onSubmit={handleSubmit} className='formContent'>
          <div className="createBlogTitle">
            <label htmlFor="title">Title: </label>
            <input type="text" required onChange={e => setTitle(e.target.value)} value={title} name='title' placeholder="Title" />
          </div>
          <div className="createBlogTitle">
            <label htmlFor="title">Summary: </label>
            <input type="text" required onChange={e => setSummary(e.target.value)} value={summary} name='title' placeholder="Summary" />
          </div>
          <div className="flex-content">
            <div className="createBlogTitle">
              <label htmlFor="file">Choose File:</label>
              <input type="file" required onChange={handleFileChange} hidden ref={fileRef} />
            </div>
            <button type="button" className='chooseFile' onClick={() => fileRef.current.click()}>Choose File</button>

            <div className="createBlogTitle">
              <label htmlFor="category">Category: </label>
              <select name="category" id="category" required onChange={e => setCategory(e.target.value)} value={category}>
                <option value="News">News</option>
                <option value="Food and Cooking">Food and Cooking</option>
                <option value="Education and Career">Education and Career</option>
                <option value="Sports">Sports</option>
                <option value="Nature">Nature</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
                <option value="Technology">Technology</option>
                <option value="Health and Wellness">Health and Wellness</option>
                <option value="Travel">Travel</option>
                <option value="Lifestyle">Lifestyle</option>
              </select>
            </div>
          </div>
          <ReactQuill onChange={handleQuillChange} required modules={{ toolbar: toolbarOptions }} formats={formats} value={description} theme="snow" />
          <button className='submitBtn' type='submit'>CREATE BLOG</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
