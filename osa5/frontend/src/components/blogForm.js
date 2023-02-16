import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [newAuthor, setNewAuthor] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLikes, setNewLikes] = useState()

 

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      author: newAuthor,
      title: newTitle,
      url: newUrl,
      likes: newLikes
    })

    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
    setNewLikes('')
  }

  const handleAuthorChange = (event) => {
    console.log(event.target.value)
    setNewAuthor(event.target.value)
  }

  const handleTitleChange = (event) => {
    console.log(event.target.value)
    setNewTitle(event.target.value)
  }

  const handleUrlChange = (event) => {
    console.log(event.target.value)
    setNewUrl(event.target.value)
  }

  const handleLikesChange = (event) => {
    console.log(event.target.value)
    setNewLikes(event.target.value)
  }

  return (
    <div>
      
      <div>  
      <h3>Add new</h3>
        <form onSubmit={addBlog}>
        <div className='form'>
          author: <input
                  value={newAuthor}
                  onChange={handleAuthorChange}
                />  
        </div>
        <div className='form'>
          title: <input
                  value={newTitle}
                  onChange={handleTitleChange}
                />  
        </div>
        <div className='form'>
          url: <input
                  value={newUrl}
                  onChange={handleUrlChange}
                />  
        </div>
        <button className='button' type='submit'>add</button>
        </form>
        </div>
      
       
      
    </div>
  )
}

export default BlogForm