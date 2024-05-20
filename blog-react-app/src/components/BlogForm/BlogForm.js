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
        <p>Feature?</p>
       
        <p>
        Radio buttons:
        <label>
          <input type="radio" name="myRadio" value="option1" />
          Option 1
        </label>
        <label>
          <input
            type="radio"
            name="myRadio"
            value="option2"
            defaultChecked={true} 
          />
          Option 2
        </label>
        
        
      </p>

      <p>
        BUTTT
      <label>
          <input 
          type='radio'
          name='oneRadio'
          value='yes'
          />
          Yes
        </label>
        <label>
          <input 
          type='radio'
          name='oneRadio'
          value='no'
          />
          No
        </label>
        </p>

        
        

        {/* Add radio input for featured*/}
        <button>Submit</button>
    </form>

  </div>
  );
}


export default BlogForm;
