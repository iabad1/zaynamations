import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import About from './components/About';
import BlogPage from './components/BlogPage';
import BlogForm from './components/BlogForm';
import Root from './components/Root'
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider, Route,
} from "react-router-dom";
import BlogsPage from './components/BlogsPage/BlogsPage';
import BlogsLayout from './components/BlogsLayout/BlogsLayout';

/*
[
  {
    path: "/blogs",
    element: <BlogsPage />,
  },
  {
    path: "/blogs/:id",
    element: <BlogPage />
  },
  {
    path: "/blogs/create",
    element: <BlogForm />
  }
]
*/

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index path="about" element={<About />} />
      <Route path="blogs" element={<BlogsLayout />} >
        <Route index element={<BlogsPage />} />
        <Route path="create" element={<BlogForm />} />
        <Route path=":id" element={<BlogPage />} />
      </Route>
    </Route>
  )

);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
