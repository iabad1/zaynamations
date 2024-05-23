import {React, useEffect } from "react";
import './FeaturedBlogs.css'
import {useState} from 'react';

const FeaturedBlogs = ({blogs}) =>{
    
    
   
    //console.log(REMAIN_COUNT);

    //setting initial values 
    
    
    const [currentFeatCount, setCurrentFeatCount] = useState(0);
    const [remainCount, setRemainCount] = useState(0);
    const [updatedFeatures, setUpdatedFeatures] = useState([]);

    

   // useEffect(()=>{
        blogs.sort((b1, b2) =>{
            if(b1.isFeatured === b2.isFeatured){
                return 0;
            }
            else if(b1.isFeatured){
                return -1;
            }
            else{
                return 1;
            }
        })
        
        useEffect(()=>{
            const featuredBlogs = blogs.filter(oneBlog => (oneBlog.isFeatured === true));
            const FEATURED_BLOG_COUNT = featuredBlogs.length;
            setCurrentFeatCount(FEATURED_BLOG_COUNT);
        }, [blogs])
        
        useEffect(()=>{
            const FEATURED_TOTAL = 5;
            
            //const FEATURED_BLOG_COUNT = featuredBlogs.length;
            //let REMAIN_COUNT = FEATURED_TOTAL - FEATURED_BLOG_COUNT;
            setRemainCount(FEATURED_TOTAL - currentFeatCount);
        }, [currentFeatCount])
        
        
       
        //setRemainCount(REMAIN_COUNT);
        //console.log('Current remain count :' + REMAIN_COUNT);
    //}, []);
   
    
    const setChecked = (checked, oneBlog) =>{
        //check if the current input is selected or not
        
        let newFeatures = {};
        
        if(remainCount >= 0 && remainCount <= 5){
            if(checked){
                setCurrentFeatCount(currentFeatCount + 1);
                newFeatures = {id: oneBlog._id, isFeatured: true};
            }
            else{
                setCurrentFeatCount(currentFeatCount - 1);
                newFeatures = {id: oneBlog._id, isFeatured: false};
            }
            //setRemainCount(5 - currentFeatCount);
            //check if the checked or unchecked blog was updated
            //compare features to updatedFeatures
            //console.log(._id);
            /*
            const foundBlog = featuredBlogs.find(b1 => b1._id === oneBlog._id);
            const needsUpdating = foundBlog.isFeatured === newFeatures.isFeatured;
            console.log(foundBlog);
            
            if(needsUpdating){
                //set updated array
                setUpdatedFeatures([...updatedFeatures, newFeatures])
            }
            else{
                //remove from updated array if initially unchecked, checked, then unchecked
                if(updatedFeatures.find(u=> u._id === newFeatures._id )){
                    setUpdatedFeatures(updatedFeatures.filter(upFeat => upFeat.id !== newFeatures.id ))
                }
            }
            */
            
        }
        
    }

    

    //on submit, get the list of updated objects with given isFeatured values
    // {filter: <blogId>, isFeatured}
    // [{id: <id1>, isFeatured: false }, {id: <id2>, isFeatured: true } ]
  

    return(
        
        <div className="blogs-list-container">
        <p>{currentFeatCount}/5 featured</p>
        <p>{remainCount} remaining </p>
        
            {   
                blogs.map((oneBlog) =>(
                <div className="blogs-list">
            
                    <label>
                        <input type='checkbox' name='blogCheckBox' defaultChecked={oneBlog.isFeatured} 
                            disabled={remainCount === 0} onChange={e=> setChecked(e.target.checked, oneBlog)}/>
                        {oneBlog.title}
                    </label>
                </div>
                ))
                
                
            }

            <p>Currently Selected:
                {}

            </p>
        
        </div>
    )

}

export default FeaturedBlogs;