import React, { useEffect } from "react";
import './FeaturedBlogs.css'
import {useState} from 'react';

const FeaturedBlogs = ({featuredBlogs}) =>{
    

    const FEATURED_TOTAL = 5;
    let FEATURED_BLOG_COUNT = 0;
    //const [count, setCount] = useState(0);
    
    
    featuredBlogs.forEach(oneBlog=>{
       if( oneBlog.isFeatured){ FEATURED_BLOG_COUNT++ }
    })

    const remain_featured_count = FEATURED_TOTAL - FEATURED_BLOG_COUNT;
  

    return(
        
        <div className="blogs-list-container">
        <p>{remain_featured_count} remaining featured blogs</p>
        
            {
                featuredBlogs.map((oneBlog) =>(
                
                <div className="blogs-list">
            
                    <label>
                        <input type='checkbox' name='blogCheckBox' defaultChecked={oneBlog.isFeatured} 
                            disabled={remain_featured_count === 0}/>
                        {oneBlog.title}
                    </label>
                </div>
                ))
           
            }
        
        
        </div>
    )

}

export default FeaturedBlogs;