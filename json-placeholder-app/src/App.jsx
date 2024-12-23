import { Routes, Route } from "react-router-dom"
import PostList from "./components/PostList"
import EditPost from "./components/EditPost"
import PostForm from "./components/PostForm"


function App() {
 
  return (
    <>
    <Routes>
      <Route path='list' element={<PostList/>}/>
      <Route path='add-post' element={<PostForm/>}/>
      <Route path='edit-post/:id' element={<EditPost/>}/>
    </Routes>
    
    </>
  )
}

export default App
