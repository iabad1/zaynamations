import React from 'react';
import styles from './BlogForm.css';

function BlogForm(){

  return(
  <div className={styles.BlogForm}>
    <form action='/blogs' method='POST'>
        <label for="title">Title</label>
        <input type='text' name='title' />
        <label for='snippet'>Snippet</label>
        <input type='text' name='snippet'/>
        <label for='body'>Body</label>
        <input type='textarea' name='body'/>
        <button>Submit</button>
    </form>

  </div>
  );
}


export default BlogForm;
