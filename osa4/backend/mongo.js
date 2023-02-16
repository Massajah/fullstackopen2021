const mongoose = require('mongoose')
if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://Massajah:${password}@cluster0.kpkgvkb.mongodb.net/blogbook?retryWrites=true&w=majority`

mongoose.connect(url)

const blogSchema = new mongoose.Schema({
  author: String,
  title: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

if (process.argv.length===7) {
  const newAuthor = process.argv[3]
  const newTitle = process.argv[4]
  const newUrl = process.argv[5]
  const newLikes = process.argv[6]

  const newBlog = new Blog({
    author: newAuthor,
    title: newTitle,
    url: newUrl,
    likes: newLikes
  })

  newBlog.save().then(() => {
    console.log(`added ${newTitle} to blogbook` )
    mongoose.connection.close()
  })}

if(process.argv.length===3){
  Blog.find({}).then(result => {
    console.log('blogbook:')
    result.forEach(blog => {
      console.log(blog.author, blog.title)
    })
    mongoose.connection.close()
  })}