import {React, useEffect } from "react";
import './FeaturedBlogs.css';
import {useState} from 'react';
import axios from 'axios';


const FeaturedBlogs = ({setHideFeatures}) =>{

     
    const [initFeatBlogs, setInitFeatBlogs] = useState([]);
    const [updatedFeatures, setUpdatedFeatures] = useState([]);
    const [remainCount, setRemainCount] = useState(0);
    const [currFeatCount, setCurrFeatCount] = useState(0);
    
    useEffect(()=>{
        axios.get('/blogs/featured-sorted')
        .then(result=>{ 
           //console.log(result.data);
            const init = result.data; 
            setInitFeatBlogs(init);
            const feat = init.filter(f => f.isFeatured); 
            setCurrFeatCount(feat.length);
            console.log("Re-Rendered!!");
            //return {featureSorted: blogsSortedByFilter, initFeaturedBlogs: featuredBlogs }
        })
        .catch(err=>{
            console.log(err);
        });
    }, [])

    //on re-render
    useEffect(()=>{
        
        setRemainCount(5 - currFeatCount);
        
    }, [currFeatCount]);
    

    const createDate = (blogDate) =>{
        let date = new Date(blogDate);
        let month = date.toLocaleString('default', {month: 'long'})
        let stringDate = month + ' ' + date.getDate() + ', ' + date.getFullYear();
        return stringDate;
      }

    const onChecked = (checked, oneBlog) =>{
        //update updatedFeatures list
        const id = oneBlog._id;
        const initFeatIds = initFeatBlogs.map(f=> f.id);
        
        //preventing out of bounds values
        if(remainCount >= 0 && remainCount <= 5 ){
            if(checked){
                setCurrFeatCount(count => count + 1);
            }
            else{
                setCurrFeatCount(count => count - 1);
            }
            //add to updated if blog is not in initial features
            //remove from updated if blog is not in initial and is in udpdated  
            const isInInitial = initFeatIds.includes(id);
            if(!isInInitial && !updatedFeatures.includes(id)){
                setUpdatedFeatures([...updatedFeatures, id]);
            }
            if(!isInInitial && updatedFeatures.includes(id)){
                setUpdatedFeatures(updatedFeatures.filter(f=>f !== id));
            }
        }
        
        
    }
    const onFeaturesSubmit = () =>{
        //check if the updated features are within the currentFeature blogs
        //update in mongoDB
        console.log('Updating...');
        console.log(updatedFeatures);
        
        axios.put('/blogs', updatedFeatures)
        .then(result=>{
            console.log(result.data);
            
            window.location.href = result.data.redirect;
        })
        .catch(err=>{
            console.log(err);
        })
        
    }
    const discardChanges = () =>{
        //reset to initial values
        setCurrFeatCount(initFeatBlogs.length);
        setUpdatedFeatures([]);
    }

    return(
    <div className="blogs-list-container">
        <p>{currFeatCount}/5 featured</p>
        <p>{remainCount} remaining</p>
        
        <form>
       
            {   
                initFeatBlogs.map((oneBlog) =>(
                
            
                    <div className="blogs-list-item-container">
                        <div className="blogs-list-item">
                            <label>
                                <input type='checkbox' name='blogCheckBox' defaultChecked={oneBlog.isFeatured} 
                                    onChange={(e)=>{onChecked(e.target.checked, oneBlog)}} disabled={(remainCount === 0 || remainCount > 5) && 
                                    (((!(oneBlog.isFeatured)) && !(updatedFeatures.includes(oneBlog._id))) || ((oneBlog.isFeatured) && (updatedFeatures.includes(oneBlog._id))))}/>
                                Title: {oneBlog.title}
                            </label>
                        </div>
                        <div className="blogs-list-item">
                            <label>
                                Created At: {createDate(oneBlog.createdAt)}
                            </label>
                        </div>
                    </div>
                    
                ))
                
                
            }
        
             <button  type="submit" onClick={(e)=>{e.preventDefault(); onFeaturesSubmit()}} disabled={updatedFeatures.length === 0}>Save Featured</button>
             <button  onClick={()=>{ discardChanges()}}>Discard</button>
        </form>
    

            <p>Initial Selected:</p>
            
            {
                initFeatBlogs.map(f=>(
                    <p>
                    {f._id}</p>
                ))
            }

            <p>Needs Updating:</p>
                {
                    updatedFeatures.map(f=>(
                        <p>
                        {f}</p>
                    ))
                }
                
        </div>
    )
    

    /*
    //setting initial values 
    const [initialFeatCount, setInitialFeatCount] = useState(0);
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
            //console.table(initialFeatures);
            const FEATURED_BLOG_COUNT = featuredBlogs.length;
            setInitialFeatures(featuredBlogs);
            setInitialFeatCount(FEATURED_BLOG_COUNT);
            setCurrentFeatCount(FEATURED_BLOG_COUNT);
        }, [blogs])
        
        useEffect(()=>{
            const FEATURED_TOTAL = 5;
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
        
        axios.put('/blogs', updatedFeatures)
        .then(result=>{
            window.location.href = result.data.redirect;
        })
        .catch(err=> console.log(err));

    }

    const discardChanges = () =>{
        
        //setCurrentFeatCount(initialFeatCount); 
        setUpdatedFeatures([]); 
        setHideFeatures(true);
    }
    
  

    return(
        
        <div className="blogs-list-container">
        <p>{currentFeatCount}/5 featured</p>
        <p>{remainCount} remaining </p>
        
        <form>
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
             <button onClick={(e)=>{e.preventDefault(); onFeaturesSubmit(updatedFeatures)}} disabled={updatedFeatures.length === 0}>Save Featured</button>
             <input type="reset" onClick={()=>{ discardChanges()}} value="Discard"/>
        </form>
    

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
    */
}

export default FeaturedBlogs;