import "./Blogs.css";

import {React, useEffect, useState} from "react";
import Blog from "../Blog";
import FeaturedBlogs from '../FeaturedBlogs';

import axios from 'axios';


function Blogs() {

  const [blogs, setBlogs] = useState([]);
  //const [featuredBlogs, setFeaturedBlogs] = useState([]);

  useEffect(()=>{
    axios.get('/blogs')
    .then(res => {
      console.log(res.data);
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
        
          <Blog key={oneBlog._id} oneBlog={oneBlog} ></Blog>
        
      ))
      }

      <div className='featured-blogs'>
        <FeaturedBlogs blogs={blogs} />
      </div>
    

    </>
    
  );
};

export default Blogs;
