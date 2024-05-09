import "./Blog.css";
import React from "react";

const createDate = (blogDate) =>{
  let date = new Date(blogDate);
  let month = date.toLocaleString('default', {month: 'long'})
  let stringDate = month + ' ' + date.getDate() + ', ' + date.getFullYear();
  return stringDate;
}

function Blog({oneBlog}) {

  return (
  
   <ul>
    <li className="blog">
      <h2>{createDate(oneBlog.createdAt)}</h2>
      <h2>{oneBlog.title}</h2>
      <h3>{oneBlog.snippet}</h3>
      <p>{oneBlog.body}</p>
    </li>
   </ul>
   
  );
};

export default Blog;
