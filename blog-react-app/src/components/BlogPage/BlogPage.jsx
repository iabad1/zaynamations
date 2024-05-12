import "./BlogPage.css";
import {React, useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';

const createDate = (blogDate) =>{
  let date = new Date(blogDate);
  let month = date.toLocaleString('default', {month: 'long'})
  let stringDate = month + ' ' + date.getDate() + ', ' + date.getFullYear();
  return stringDate;
}

function BlogPage() {

  const [blogs, setBlogs] = useState([]);
  const {id} = useParams();

  useEffect(()=>{
    axios.get(`/blogs/${id}`)
    .then(res => {
      const blogsList = res.data;
      setBlogs( blogsList );
      console.table(blogs);
    })
    .catch(err=>{
      console.log(err);
    })
  }, [id])

  return (
    <div className="blog-page">
      <h1>BlogPage</h1>
      <h2>{createDate(blogs.createdAt)}</h2>
      <h2>{blogs.title}</h2>
      <h3>{blogs.snippet}</h3>
      <p>{blogs.body}</p>
      <p>{id}</p>
    </div>
  );
};

export default BlogPage;
