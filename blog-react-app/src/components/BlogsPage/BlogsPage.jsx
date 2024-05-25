import "./BlogsPage.css";
import React from "react";
import Blogs from '../Blogs';
import {Link} from 'react-router-dom';

function BlogsPage() {
  return (
    <div className="blogs-page">
      <header>
        <h2>ZAY BLOGS</h2>
        <h1>Art & Animation Process</h1>
        <p>Learn about the inspiration and thought process my ideas to real life.</p>
      </header>

      <div className="blogs-container">

        <section className="featured-blogs">
          <div className="featured-blogs-header">
            <h3>Featured</h3>
            <Link to="create">Create Post +</Link> 
          </div>
          {/* Create a new parent component for featured and all blogs*/}
          <div className="featured-blogs-container">
            <Blogs />
          </div>
        </section>

        <section className="all-blogs">
          <div className="all-blogs-container">
          </div>
        </section>

      </div>
    </div>
  );
};

export default BlogsPage;
