const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    author: 'Matti',
    title: 'Cats',
    url: 'mattisblog.com/cats',
    likes: 15
  },
  {
    author: 'Teppo',
    title: 'Dogs',
    url: 'tepposblog.com/dogs',
    likes: 25
  },
]

const initialUsers = [
  {
    username: 'mluukkai',
    _id: 123456,
  },
  {
    username: 'hellas',
    _id: 141414,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', url: 'willremovethissoon' })
  await blog.save()
  await blog.remove()
  
  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}
  
module.exports = {
  initialBlogs, initialUsers, nonExistingId, blogsInDb, usersInDb
}