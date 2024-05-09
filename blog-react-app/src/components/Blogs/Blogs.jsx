import "./Blogs.css";
import Blog from "../Blog";
import React from "react";


function Blogs({blogs}) {

  return (
    
      blogs.map(oneBlog =>(
        <a href={`/blogs/${oneBlog._id}`}>
          <Blog key={oneBlog._id} oneBlog={oneBlog}></Blog>
        </a>
      ))
    
  );
};

export default Blogs;
