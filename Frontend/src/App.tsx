import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signup } from './pages/signup'
import { Signin } from './pages/signin'
import { Blog } from './pages/blog'
import { BlogWrite } from './pages/blogwrite'
import { RecoilRoot } from 'recoil'
import { Stories } from './pages/stories'

function App() {

  return (
    <>
      <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element = {<Signup/>}/>
          <Route path='/signin' element = {<Signin/>}/>
          {/* <Route path='/blog/:id' element = {<Blogid/>}/> */}
          <Route path='/blog/write' element = {<BlogWrite/>}/>
          <Route path='/blog/' element = {<Blog/>}/>
          <Route path='/stories/' element = {<Stories/>}/>
        </Routes>
      </BrowserRouter>
      </RecoilRoot>
    </>
  )
}

export default App
