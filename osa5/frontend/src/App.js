import { useEffect, useRef, useState } from 'react'
import blogService from "./services/blogs"
import Notification from './components/Notification'
import './index.css'
import BlogForm from './components/blogForm'
import LoginForm from './components/loginForm'
import loginService from './services/login'
import Togglable from './components/Togglable'
import Blog from './components/Blog'

const App = () => {
  const [blogs, setBlogs] = useState([]) 
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null) 

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])


  useEffect(() => {
    const loggedIn = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
    if (loggedIn) {
      setUser(loggedIn)
      blogService.setToken(loggedIn.token)
    }
  }, [])

  const addBlog = (blogObject) => {
      blogFormRef.current.toggleVisibility()
      blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))

        setMessage(
          `A new blog ${returnedBlog.title} added`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
        let errorMessage = error.response.data.error
        setMessage(`ERROR! ${errorMessage}`)

        setTimeout(() => {
          setMessage(null)
        }, 5000)
        console.log(error.response.data);
      })
  }

  const updateBlog = (id, blogObject) => {
    blogService
      .update(id, blogObject)
      .then((response) =>
        setBlogs(blogs.map((blog) => (blog.id === id ? response : blog)))
      );
  }

  const removeBlog = (blogDelete) => {
   //const blogi = blogs.find(b => b.id === blogi.id)
    if (window.confirm(`Delete ${blogDelete.title} ?`)){
      blogService
      .remove(blogDelete.id)
      
        setBlogs(blogs.filter(blog => blog.id !== blogDelete.id))

        setMessage(
          `Removed ${blogDelete.title}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
    
  }
  }


  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('ERROR! wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div className='app'>
      <h1>Blogbook</h1>
      <Notification message={message} />
      
      {user === null ?

      <LoginForm 
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />  
      :
      <div>
        <div>{user.name} logged in <button onClick={handleLogout} type="submit">
        Logout
        </button>
        </div>
        <div className='createBlog'>
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>

        <BlogForm createBlog={addBlog} />
        </Togglable>
        </div>
      
        <h2>Blogs</h2>
      
        {blogs.sort(byLikes).map(blog =>
        <Blog key={blog.id} blog={blog} removeBlog={removeBlog} updateBlog={updateBlog} user={user}/>
        )}
        </div>
      }
    </div>
  )
}


export default App

