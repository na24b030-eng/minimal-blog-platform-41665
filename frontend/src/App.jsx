import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-gray-50 min-h-screen font-sans antialiased">
        <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
            <Link to="/" className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Minimal Blog</Link>
            <div>
              <Link to="/posts" className="text-gray-600 hover:text-indigo-600 font-medium transition-all text-sm px-3 py-2 rounded-lg hover:bg-indigo-50">Posts</Link>
              <Link to="/categories" className="text-gray-600 hover:text-indigo-600 font-medium transition-all text-sm px-3 py-2 rounded-lg hover:bg-indigo-50">Categories</Link>
              <Link to="/comments" className="text-gray-600 hover:text-indigo-600 font-medium transition-all text-sm px-3 py-2 rounded-lg hover:bg-indigo-50">Comments</Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={
            <div className="hero min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 relative overflow-hidden pt-20">
              <div className="absolute w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl -top-20 -left-20 animate-pulse"></div>
              <h1 className="text-6xl md:text-8xl font-black text-white leading-none tracking-tight mb-6 text-center">Welcome to Minimal Blog</h1>
              <p className="text-xl text-indigo-200 max-w-2xl mx-auto leading-relaxed mb-10 text-center">A minimal blog platform with categories and comments</p>
              <Link to="/posts" className="px-10 py-5 bg-white text-indigo-900 rounded-2xl font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-2xl">Get Started</Link>
            </div>
          } />

          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:id" element={<CategoryDetail />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/comments/:id" element={<CommentDetail />} />
        </Routes>

        <footer className="bg-gray-900 text-white mt-20 py-12 px-8 border-t border-gray-800">
          <p>&copy; 2024 Minimal Blog Platform</p>
        </footer>
      </div>
    </BrowserRouter>
  )
}

function Posts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    try {
      fetch('https://minimal-blog-platform-15102-api.onrender.com/api/posts')
        .then(response => response.json())
        .then(data => {
          setPosts(data)
          setLoading(false)
        })
    } catch (error) {
      console.error(error)
    }
  }, [])

  if (loading) {
    return (
      <div className="spinner flex flex-col items-center justify-center py-24">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
      </div>
    )
  }

  return (
    <div className="page max-w-7xl mx-auto px-6 py-12 pt-28">
      <h1 className="section-title text-4xl font-black text-gray-900 mb-3">Posts</h1>
      <div className="underline w-16 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-12"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <div key={post.id} className="card group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-2 cursor-pointer" onClick={() => navigate(`/posts/${post.id}`)}>
            <div className="card-strip h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            <div className="card-body p-6">
              <h2 className="card-title text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{post.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PostDetail() {
  const { id } = useParams()
  const [post, setPost] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      fetch(`https://minimal-blog-platform-15102-api.onrender.com/api/posts/${id}`)
        .then(response => response.json())
        .then(data => {
          setPost(data)
          setLoading(false)
        })
    } catch (error) {
      console.error(error)
    }
  }, [id])

  if (loading) {
    return (
      <div className="spinner flex flex-col items-center justify-center py-24">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
      </div>
    )
  }

  return (
    <div className="page max-w-7xl mx-auto px-6 py-12 pt-28">
      <h1 className="section-title text-4xl font-black text-gray-900 mb-3">{post.title}</h1>
      <div className="underline w-16 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-12"></div>
      <p>{post.content}</p>
    </div>
  )
}

function Categories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    try {
      fetch('https://minimal-blog-platform-15102-api.onrender.com/api/categories')
        .then(response => response.json())
        .then(data => {
          setCategories(data)
          setLoading(false)
        })
    } catch (error) {
      console.error(error)
    }
  }, [])

  if (loading) {
    return (
      <div className="spinner flex flex-col items-center justify-center py-24">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
      </div>
    )
  }

  return (
    <div className="page max-w-7xl mx-auto px-6 py-12 pt-28">
      <h1 className="section-title text-4xl font-black text-gray-900 mb-3">Categories</h1>
      <div className="underline w-16 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-12"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(category => (
          <div key={category.id} className="card group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-2 cursor-pointer" onClick={() => navigate(`/categories/${category.id}`)}>
            <div className="card-strip h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            <div className="card-body p-6">
              <h2 className="card-title text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{category.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CategoryDetail() {
  const { id } = useParams()
  const [category, setCategory] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      fetch(`https://minimal-blog-platform-15102-api.onrender.com/api/categories/${id}`)
        .then(response => response.json())
        .then(data => {
          setCategory(data)
          setLoading(false)
        })
    } catch (error) {
      console.error(error)
    }
  }, [id])

  if (loading) {
    return (
      <div className="spinner flex flex-col items-center justify-center py-24">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
      </div>
    )
  }

  return (
    <div className="page max-w-7xl mx-auto px-6 py-12 pt-28">
      <h1 className="section-title text-4xl font-black text-gray-900 mb-3">{category.name}</h1>
      <div className="underline w-16 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-12"></div>
      <p>{category.description}</p>
    </div>
  )
}

function Comments() {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    try {
      fetch('https://minimal-blog-platform-15102-api.onrender.com/api/comments')
        .then(response => response.json())
        .then(data => {
          setComments(data)
          setLoading(false)
        })
    } catch (error) {
      console.error(error)
    }
  }, [])

  if (loading) {
    return (
      <div className="spinner flex flex-col items-center justify-center py-24">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
      </div>
    )
  }

  return (
    <div className="page max-w-7xl mx-auto px-6 py-12 pt-28">
      <h1 className="section-title text-4xl font-black text-gray-900 mb-3">Comments</h1>
      <div className="underline w-16 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-12"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {comments.map(comment => (
          <div key={comment.id} className="card group bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:-translate-y-2 cursor-pointer" onClick={() => navigate(`/comments/${comment.id}`)}>
            <div className="card-strip h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
            <div className="card-body p-6">
              <h2 className="card-title text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{comment.content}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CommentDetail() {
  const { id } = useParams()
  const [comment, setComment] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      fetch(`https://minimal-blog-platform-15102-api.onrender.com/api/comments/${id}`)
        .then(response => response.json())
        .then(data => {
          setComment(data)
          setLoading(false)
        })
    } catch (error) {
      console.error(error)
    }
  }, [id])

  if (loading) {
    return (
      <div className="spinner flex flex-col items-center justify-center py-24">
        <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
      </div>
    )
  }

  return (
    <div className="page max-w-7xl mx-auto px-6 py-12 pt-28">
      <h1 className="section-title text-4xl font-black text-gray-900 mb-3">{comment.content}</h1>
      <div className="underline w-16 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-12"></div>
      <p>{comment.postId}</p>
    </div>
  )
}