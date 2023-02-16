import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, removeBlog, updateBlog, user}) => {
  const [expanded, setExpanded] = useState(false)
  const [likes, setLikes] = useState(blog.likes)


const showWhenExpanded = { display: expanded ? '' : 'none' }

const toggleExpand = () => {
  setExpanded(!expanded)
}

const handleLike = () => {
  blog.likes += 1
  setLikes(blog.likes)
  blogService.updateBlog(blog)
}

  return (
    <div className='blog'>
      <p>{blog.title} <button onClick={toggleExpand}>{expanded ? 'hide' : 'view'}</button></p> 
      {blog.author}
      <div style={showWhenExpanded}> 
        <p>Likes: {likes} <button onClick={handleLike}>like</button></p>
        <p>{blog.url}</p>
        {user.username === blog.user.username && 
        <button onClick={() => removeBlog(blog)}>delete</button>
        }
      </div>
    </div>
           
        
   
  )
}

export default Blog