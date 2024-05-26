import "./Blog.css";
import React from "react";
import {Link} from 'react-router-dom';


const createDate = (blogDate) =>{
  let date = new Date(blogDate);
  let month = date.toLocaleString('default', {month: 'long'})
  let stringDate = month + ' ' + date.getDate() + ', ' + date.getFullYear();
  return stringDate;
}

function Blog({oneBlog, index}) {

  return (
  
    <li className="blog">
      <Link to={oneBlog._id}>
        <h2>{createDate(oneBlog.createdAt)}</h2>
        <h2>{oneBlog.title}</h2>
        {index === 0 && <p> Snippet : {oneBlog.snippet}</p>}
        <p>{(oneBlog.isFeatured  ? 'True' : 'False')}</p>
      </Link>
    </li>
   
  );
};

export default Blog;
