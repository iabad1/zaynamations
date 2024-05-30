import React from 'react';
import './Root.css';
import NavBar from '../NavBar';
import { Outlet } from 'react-router-dom';

const Root = () =>{
    
    return(
        <>
        
            <NavBar/>
            <Outlet />
        </>
    )
}

export default Root;