import "./BlogPage.css";
import {React, useState, useEffect} from "react";
import { redirect, useParams } from "react-router-dom";
import axios from 'axios';



function BlogPage() {

  const [blogs, setBlogs] = useState([]);
  const [inEdit, setInEdit] = useState(false);
  const [outEdit, setOutEdit] = useState(true);
  const {id} = useParams();

  //helper methods
  const createDate = (blogDate) =>{
    let date = new Date(blogDate);
    let month = date.toLocaleString('default', {month: 'long'})
    let stringDate = month + ' ' + date.getDate() + ', ' + date.getFullYear();
    return stringDate;
  }
  
  const deleteBlog = (id) =>{
    axios.delete(`/blogs/${id}`)
      .then(res => {
        window.location.href = res.data.redirect;
      })
      .catch(err=>{
        console.log(err);
      })
  }
  const editBlog = () =>{
  
    setInEdit(true);
    setOutEdit(false);
    
  }
  
  const submitEditBlog = () =>{
  
    setInEdit(false);
    setOutEdit(true);
    
  }

  const discardEditBlog = () =>{
    if(window.confirm('Discard Changes?')){
      setInEdit(false);
      setOutEdit(true);
    }
  }

  
//on first render
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
  }, [])

  return (
    <div className="blog-page">
      <div className="blog-header">
        <h1 className={'title ' + (inEdit ? 'hidden' : '')}>{blogs.title}</h1>
        <input className={'title ' + (outEdit ? 'hidden' : '')} defaultValue={blogs.title}></input>
        
        <button className={'title ' + (outEdit ? 'hidden' : '')} onClick={()=>{discardEditBlog()}}>Discard Changes</button>
        <button className={'title ' + (outEdit ? 'hidden' : '')} onClick={()=>{submitEditBlog()}}>Finish Editing</button>
        <h2>
          {
            blogs.updatedAt > blogs.createdAt ? createDate(blogs.createdAt) | createDate(blogs.updateAt) 
            : createDate(blogs.createdAt)
          }
        </h2>
        <div className="blog-header-del-edit">
          <button onClick={()=>deleteBlog(id)}>Delete</button>
          <button onClick={()=>editBlog(id)}>Edit</button>
        </div>
      </div>
      
      <h3>{blogs.snippet}</h3>
      <p>{blogs.body}</p>
      <p>{id}</p>
    </div>
  );
};

export default BlogPage;
