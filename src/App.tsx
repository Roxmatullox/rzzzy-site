import { BrowserRouter , Routes , Route } from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage"
import UsersLayout from "./components/header/Users-header/Layout"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UsersLayout />}>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<HomePage/>}/>
          <Route path="/register" element={<HomePage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
