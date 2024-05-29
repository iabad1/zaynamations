import React from 'react';
import styles from './BlogForm.css';

function BlogForm(){

  return(
  <div className={styles.BlogForm}>
    <form action='/blogs' method='POST'>
        <label for="title">Title</label>
        <input type='text' name='title' placeholder='Enter blog title'/>
        <label for='snippet'>Snippet</label>
        <input type='text' name='snippet' placeholder='Enter blog snippet'/>
        <label for='body'>Body</label>
        <textarea name='body' rows={15} cols={50} placeholder='Enter body'/>
        <input type="hidden" name="isFeatured" value="false" />
         
        {/* Add radio input for featured*/}
        <button>Submit</button>
    </form>
  </div>

  );
}


export default BlogForm;
