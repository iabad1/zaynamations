import React, { useEffect } from "react";
import './FeaturedBlogs.css'
import {useState} from 'react';

const FeaturedBlogs = ({featuredBlogs}) =>{
    

    const FEATURED_TOTAL = 5;
    const FEATURED_BLOG_COUNT = featuredBlogs.length;
    //const [count, setCount] = useState(0);
    
    /*
    featuredBlogs.forEach(oneBlog=>{
       if( oneBlog.isFeatured){ FEATURED_BLOG_COUNT++ }
    })
    */
    
    const REMAIN_COUNT = FEATURED_TOTAL - FEATURED_BLOG_COUNT;
    //setting initial values 
    const [remainCount, setRemainCount] = useState(REMAIN_COUNT);
    const [currentSelect, setCurrentSelect] = useState(FEATURED_BLOG_COUNT);
    
    const setChecked = (checked) =>{
        //check if the current input is selected or not
        if(remainCount >= 0 && remainCount <= 5){
            if(checked){
                setCurrentSelect(currentSelect + 1);
            }
            else{
                setCurrentSelect(currentSelect - 1);
            }
            setRemainCount(FEATURED_TOTAL - currentSelect);
            
        }
        
    }
  

    return(
        
        <div className="blogs-list-container">
        <p>{FEATURED_BLOG_COUNT}/5 remaining featured blogs</p>
        
            {
                featuredBlogs.map((oneBlog) =>(
                
                
                <div className="blogs-list">
            
                    <label>
                        <input type='checkbox' name='blogCheckBox' defaultChecked={oneBlog.isFeatured} 
                            disabled={remainCount === 0} onChange={e=> setChecked(e.target.checked)}/>
                        {oneBlog.title}
                    </label>
                </div>
                ))
           
            }
        
        
        </div>
    )

}

export default FeaturedBlogs;