import React from 'react';
import './BlogsLayout.css';
import { Outlet } from 'react-router-dom';

const BlogLayout = () =>{
    return(
        <Outlet />
    )
}

export default BlogLayout;