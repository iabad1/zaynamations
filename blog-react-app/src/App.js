import './App.css';
import {React, useState} from "react";
import NavBar from './components/NavBar';
import Blogs from './components/Blogs';
import BlogForm from './components/BlogForm';
import axios from 'axios';

function App() {

  const [blogs, setBlogs] = useState([]);
  
  //get blogs

  /*
  useEffect(()=>{
    fetch('http://localhost:5000/blog')
    .then((res) => res.data.json())
        .then((data) => setBlogs(data.message));
    }, []
);
*/

  axios.get('/blogs')
  .then(res => {
    const blogsList = res.data;
    setBlogs( blogsList );
    //console.log(blogs);
  })
  .catch(err=>{
    console.log(err);
  })

  return (
    <>
    
    <NavBar></NavBar>
    {(typeof blogs === 'undefined') ? <h1>Loading...</h1> : <Blogs blogs={blogs}></Blogs>}
    <BlogForm></BlogForm>
    
    </>
  );
}

export default App;
