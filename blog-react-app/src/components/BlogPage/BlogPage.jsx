import "./BlogPage.css";
import {React, useState, useEffect} from "react";
import { redirect, useParams } from "react-router-dom";

import axios from 'axios';



function BlogPage() {

  const [blog, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [snippet, setSnippet] = useState('');
  const [body, setBody] = useState('');
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
    if(window.confirm('Delete Blog?')){
      axios.delete(`/blogs/${id}`)
        .then(res => {
          window.location.href = res.data.redirect;
        })
        .catch(err=>{
          console.log(err);
        })
    }
  }
  const editBlog = () =>{
  
    setInEdit(true);
    setOutEdit(false);
    
  }
  
  const discardEditBlog = () =>{
    if(window.confirm('Discard Changes?')){
      setTitle(blog.title)
      setSnippet(blog.snippet)
      setBody(blog.body)
      setInEdit(false);
      setOutEdit(true);
    }
  }

  const submitEditBlog = () =>{

    if(window.confirm('Finish Editing?')){
      //console.log(data, e)
      const updatedBlog = {title, snippet, body};

      //console.log('Test');
      //console.log(JSON.stringify(data))
      
      axios.put(`/blogs/${id}`, updatedBlog)
      .then(result=>{
        setBlogs(result);
      //console.log('CLIENT RESULT '+ result.data);
      })
      .catch(err =>{
        console.log(err);
      })

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
      //console.table(blogs);
    })
    .catch(err=>{
      console.log(err);
    })
  }, [blog])

  // use useForm instead
  
  useEffect(()=>{
    setTitle(blog.title)
    setSnippet(blog.snippet)
    setBody(blog.body)
  }, [blog.title, blog.snippet, blog.body])


  return (
    <div className="blog-page">
      <div className="blog-container">
        <div className={'blog-header ' + (inEdit ? 'hidden' : '')}>
          <h1 className={'title '}>{blog.title}</h1>
          <h2>
            {
              blog.updatedAt > blog.createdAt ? createDate(blog.createdAt) + ' | ' + 'Edited'
              : createDate(blog.createdAt)
            }
          </h2>
          <h3>{blog.snippet}</h3>
          <p>{blog.body}</p>
          <div className='blog-header-del-edit'>
            <button onClick={()=>deleteBlog(id)}>Delete</button>
            <button onClick={()=>editBlog(id)}>Edit</button>
          </div>
        </div>
      </div>

      <div className={'edit-blog-container ' + (outEdit ? 'hidden' : '')}>

      <div className='edit-form'>
      <form onSubmit={(e)=>{e.preventDefault(); submitEditBlog(id)}}>
          <input className={'title'} value={title} onChange={e => setTitle(e.target.value)} type='text' name="title" required></input>          
          <input className={'title'} minLength={0} value={snippet} onChange={e => setSnippet(e.target.value)} type='text' name="snippet" required></input>
          <textarea className={'title'} minLength={0} value={body}   onChange={e => setBody(e.target.value)} type='textarea' name="body" required></textarea>
          <p>{title}</p>
          <p>{body}</p>
          <p>{snippet}</p>
       
        
          <div className="button-container">
            <button type='reset' className='title' onClick={()=>discardEditBlog()}>Discard Changes</button>
            <button type='submit' className='title' >Finish Editing</button>
          </div> 
        </form>
      </div>

      </div>
      
      
    </div>
  );
};

export default BlogPage;
