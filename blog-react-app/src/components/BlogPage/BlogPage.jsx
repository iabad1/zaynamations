import "./BlogPage.css";
import {React, useState, useEffect} from "react";
import { redirect, useParams } from "react-router-dom";
import EditForm from '../EditForm';
import axios from 'axios';



function BlogPage() {

  const [blogs, setBlogs] = useState([]);
  const [inEdit, setInEdit] = useState(false);
  const [outEdit, setOutEdit] = useState(true);

  const [title, setTitle] = useState('');
  const [snippet, setSnippet] = useState('');
  const [body, setBody] = useState('');
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
  
  const submitEditBlog = () =>{

    if(window.confirm('Finish Editing?')){
      const updatedBlog = {title, snippet, body};
      axios.put(`/blogs/${id}`, updatedBlog)
      .then(result=>{
      //setBlogs(updatedBlog);
      //console.log('CLIENT RESULT '+ result.data);
    })
    .catch(err =>{
      console.log(err);
    })

      setInEdit(false);
      setOutEdit(true);
    }    
    //const sBlog = JSON.stringify(updatedBlog);
    //console.log('CLIENT OBJ ' + JSON.stringify(updatedBlog));
    
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
      //console.table(blogs);
    })
    .catch(err=>{
      console.log(err);
    })
  }, [blogs])

  // use useForm instead
  useEffect(()=>{
    setTitle(blogs.title)
    setSnippet(blogs.snippet)
    setBody(blogs.body)
  }, [])


  return (
    <div className="blog-page">
      <div className="blog-container">
        <div className={'blog-header ' + (inEdit ? 'hidden' : '')}>
          <h1 className={'title '}>{blogs.title}</h1>
          <h2>
            {
              blogs.updatedAt > blogs.createdAt ? createDate(blogs.createdAt) + ' | ' + 'Edited'
              : createDate(blogs.createdAt)
            }
          </h2>
          <h3>{blogs.snippet}</h3>
          <p>{blogs.body}</p>
          <div className='blog-header-del-edit'>
            <button onClick={()=>deleteBlog(id)}>Delete</button>
            <button onClick={()=>editBlog(id)}>Edit</button>
          </div>
        </div>
      </div>

      <div className={'edit-blog-container ' + (outEdit ? 'hidden' : '')}>

        <EditForm />

      </div>
      
      
    </div>
  );
};

export default BlogPage;
