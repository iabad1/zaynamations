import "./BlogsPage.css";
import {React, useState, useEffect} from "react";
import Blogs from '../Blogs';
import axios from 'axios';


function BlogsPage() {

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
    <div className="blogs-page">
      <header>
        <h2>ZAY BLOGS</h2>
        <h1>Art & Animation Process</h1>
        <p>Learn about the inspiration and thought process my ideas to real life.</p>
      </header>

      <div className="blogs-container">

        <Blogs blogs={blogs} />

      </div>
    </div>
  );
};

export default BlogsPage;
