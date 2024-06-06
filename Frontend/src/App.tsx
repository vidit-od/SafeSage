import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signup } from './pages/signup'
import { Signin } from './pages/signin'
import { Blog } from './pages/blog'
import { BlogWrite } from './pages/blogwrite'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element = {<Signup/>}/>
          <Route path='/signin' element = {<Signin/>}/>
          {/* <Route path='/blog/:id' element = {<Blogid/>}/> */}
          <Route path='/blog/write' element = {<BlogWrite/>}/>
          <Route path='/blog/' element = {<Blog/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
