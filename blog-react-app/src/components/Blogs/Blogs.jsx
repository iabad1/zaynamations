import "./Blogs.css";

import {React, useState, useEffect} from "react";
import Blog from "../Blog";
import FeaturedBlogs from '../FeaturedBlogs';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Blogs = ({blogs}) => {

  const [hideFeatures, setHideFeatures] = useState(true);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  
  useEffect(()=>{
    const feat = blogs.filter(f=>f.isFeatured);
    setFeaturedBlogs(feat);
  }, [blogs])

  /*

  useEffect(()=>{
    axios.get('/blogs/featured-sorted')
    .then(result=>{
        setFeaturedBlogs(result.data);
    })
    .catch(err=>{
        console.log(err);
    });
}, [blogs]);
*/
  return (
    <>
    
    <section className="featured-blogs">
          <div className="featured-blogs-header">
            <Link to="create">Create Post +</Link>
            <button onClick={()=>{setHideFeatures(!hideFeatures)}} className={!hideFeatures && 'hideFeatures'}><u>Customize Features</u></button>
            <div className={hideFeatures && 'hideFeatures'} >
              <FeaturedBlogs setHideFeatures={setHideFeatures}/>
            </div>
          </div>
          {/* Create a new parent component for featured and all blogs*/}
          <div className="featured-blogs-container">
            
          <ul> 
            {
             featuredBlogs.map((oneBlog, index) =>(
                 <Blog key={oneBlog._id} oneBlog={oneBlog} index={index} />
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
