import React from 'react'
import './EditForm.css'

const EditForm = () =>{

    return(
        <form onSubmit={(e)=>{e.preventDefault(); submitEditBlog(id)}}>
          <input className={'title'} defaultValue={blogs.title} onInput={e => setTitle(e.target.value)} type='text' name="title"></input>          
          <input className={'title'} defaultValue={blogs.snippet} onInput={e => setSnippet(e.target.value)} type='text' name="snippet"></input>
          <textarea className={'title'} defaultValue={blogs.body}  onInput={e => setBody(e.target.value)} type='textarea' name="body"></textarea>
          <p>{title}</p>
          <p>{body}</p>
          <p>{snippet}</p>
       
        

          <div className="button-container">
            <button type='reset' className='title' onClick={()=>discardEditBlog()}>Discard Changes</button>
            <button type='submit' className='title' >Finish Editing</button>
          </div> 
        </form>
    )
}

export default EditForm