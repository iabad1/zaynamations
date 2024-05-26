import "./Blogs.css";

import {React, useState} from "react";
import Blog from "../Blog";
import FeaturedBlogs from '../FeaturedBlogs';
import {Link} from 'react-router-dom';

function Blogs({blogs}) {

  const [hideFeature, sethideFeature] = useState(true);
  return (
    <>
    
    <section className="featured-blogs">
          <div className="featured-blogs-header">
            <Link to="create">Create Post +</Link>
            <button onClick={()=>{sethideFeature(!hideFeature)}}><u>Customize Features</u></button>
            <div className={hideFeature && 'hideFeature'} >
              <FeaturedBlogs blogs={blogs}/>
            </div>
          </div>
          {/* Create a new parent component for featured and all blogs*/}
          <div className="featured-blogs-container">
            
          <ul> 
            {
              blogs.map((oneBlog, index) =>(
                 oneBlog.isFeatured && <Blog key={oneBlog._id} oneBlog={oneBlog} index={index}/>
                
              ))
            }
            </ul>
          </div>
    </section>
    <hr />
    <section className="all-blogs">
      <div className="all-blogs-container">
        
          
            {
              blogs.length === 0 ? 
              <p>No Blogs Found.</p> : 
              <ul>
                {
                  blogs.map(oneBlog =>(
                      <Blog key={oneBlog._id} oneBlog={oneBlog}/>
                  ))
                }
              </ul>
            }
        

        
      </div>
    </section>
      
    

    </>
    
  );
};

export default Blogs;
