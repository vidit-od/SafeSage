import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Signup } from './pages/signup'
import { Signin } from './pages/signin'
import { Blog } from './pages/blog'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element = {<Signup/>}/>
          <Route path='/signin' element = {<Signin/>}/>
          <Route path='/blog/:id' element = {<Blog/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
