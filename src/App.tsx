import { BrowserRouter , Routes , Route } from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage"
import UsersLayout from "./components/header/Users-header/Layout"
import useAuth from "./zustand/data"
import AdminDashboardPage from "./pages/AdminDashboardPage/AdminDashboardPage"

function App() {

  const {isLogin , role } = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        {
          isLogin === true && role === "admin" ? <Route path="/" element={<AdminDashboardPage />} /> : <></>
        }
        {
          isLogin === true && role === "user" || role === "client" ? <Route path="/" element={<AdminDashboardPage />} /> : <></>
        }
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
