const dummy = (blogs) => {
  blogs
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  const result = blogs.reduce((max, blog) => {
    return max.likes > blog.likes ? max : blog
  }, {})
  
  return {
    author: result.author,
    title: result.title,
    likes: result.likes,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}