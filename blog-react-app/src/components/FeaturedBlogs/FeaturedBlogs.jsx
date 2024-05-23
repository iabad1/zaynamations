import {React, useEffect } from "react";
import './FeaturedBlogs.css'
import {useState} from 'react';

const FeaturedBlogs = ({blogs}) =>{
    
    
    //setting initial values 
    const [currentFeatCount, setCurrentFeatCount] = useState(0);
    const [remainCount, setRemainCount] = useState(0);
    
    const [initialFeatures, setInitialFeatures] = useState([]);
    const [updatedFeatures, setUpdatedFeatures] = useState([]);

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
            setInitialFeatures(featuredBlogs);
            console.table(initialFeatures);
            const FEATURED_BLOG_COUNT = featuredBlogs.length;
            setCurrentFeatCount(FEATURED_BLOG_COUNT);
        }, [blogs])
        
        useEffect(()=>{
            const FEATURED_TOTAL = 5;
            
            //const FEATURED_BLOG_COUNT = featuredBlogs.length;
            //let REMAIN_COUNT = FEATURED_TOTAL - FEATURED_BLOG_COUNT;
            setRemainCount(FEATURED_TOTAL - currentFeatCount);
        }, [currentFeatCount])
        
    
    //This function sets the newly updated list for update request
    const setChecked = (checked, oneBlog) =>{
        //check if the current input is selected or not
        
        let newFeatures = {};
        
        if(remainCount >= 0 && remainCount <= 5){
            if(checked){
                setCurrentFeatCount(currentFeatCount + 1);
            }
            else{
                setCurrentFeatCount(currentFeatCount - 1);
            }
            newFeatures = {id: oneBlog._id, isFeatured: checked};

            
            //Determining the blogs in need of an update
            const foundBlog = initialFeatures.find(b1 => b1._id === oneBlog._id);
            if(foundBlog){
                
                const needsUpdating = foundBlog.isFeatured !== newFeatures.isFeatured;
                
                if(needsUpdating){
                    //set updated array
                    setUpdatedFeatures([...updatedFeatures, newFeatures]);
                }
                else{
                    //remove from updated array if initially unchecked, checked, then unchecked
                    if(updatedFeatures.find(u=> u._id === newFeatures._id )){
                        setUpdatedFeatures(updatedFeatures.filter(upFeat => upFeat.id !== newFeatures.id ));
                    }
                }
            }
            //not found in initial list
            else{
                //check in updated list
                const foundUpdated = updatedFeatures.find(f1 => f1.id === oneBlog._id);
                if(foundUpdated){
                    setUpdatedFeatures(updatedFeatures.filter(upFeat => upFeat.id !== newFeatures.id ));
                }
                else{
                    setUpdatedFeatures([...updatedFeatures, newFeatures]);
                }
            }

        }
        
    }

    

    //on submit, get the list of updated objects with given isFeatured values
    // {filter: <blogId>, isFeatured}
    // [{id: <id1>, isFeatured: false }, {id: <id2>, isFeatured: true } ]

    const onFeaturesSubmit = (updatedFeatures) =>{
        console.log('Saving Features...');
        console.log(updatedFeatures);

    }
  

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
             <button onClick={()=>{onFeaturesSubmit(updatedFeatures)}} disabled={updatedFeatures.length === 0}>Save Featured</button>
    

            <p>Initial Selected:</p>
            
            {
                initialFeatures.map(f=>(
                    <p>
                    {f._id}</p>
                ))
            }

            <p>Needs Updating:</p>
                
               
                {
                    updatedFeatures.map(f=>(
                        <p>
                        {f.id}</p>
                    ))
                }
                
               
        </div>
    )

}

export default FeaturedBlogs;