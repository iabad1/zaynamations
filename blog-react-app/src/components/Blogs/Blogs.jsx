import "./Blogs.css";

import {React, useEffect, useState} from "react";
import Blog from "../Blog";
import BlogForm from "../BlogForm";
import axios from 'axios';


function Blogs() {

  const [blogs, setBlogs] = useState([]);

  useEffect(()=>{
    axios.get('/blogs')
    .then(res => {
      const blogsList = res.data;
      setBlogs( blogsList );
      console.log(blogs);
    })
    .catch(err=>{
      console.log(err);
    })
  }, [])
  

  return (
    <>
    {
      blogs.length === 0 ? 
      <p>No Blogs Found.</p> :
      blogs.map(oneBlog =>(
        <a href={`/blogs/${oneBlog._id}`}>
          <Blog key={oneBlog._id} oneBlog={oneBlog} ></Blog>
        </a>
      ))

    }

    </>
    
  );
};

export default Blogs;
