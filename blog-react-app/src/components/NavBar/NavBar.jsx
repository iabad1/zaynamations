import "./NavBar.css";
import React from "react";

function template() {
  return (
    <div className="nav-bar">
      <h1>zaynamations</h1>
      <ul>
        <li><a href="/about">about</a></li>
        <li><a href="/blogs">blogs</a></li>
        <li><a href="/contact">contact</a></li>
      </ul>
    </div>
  );
};

export default template;
