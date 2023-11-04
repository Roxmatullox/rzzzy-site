import { BrowserRouter , Routes , Route, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage"
import UsersLayout from "./components/header/Users-header/Layout"
import useAuth from "./zustand/data"
import AdminDashboardPage from "./pages/AdminDashboardPage/AdminDashboardPage"
import ClientDashboardPage from "./pages/ClientDashboardPage/ClientDashboardPage"

function App() {

  const {isLogin , role } = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        {
          isLogin === true && role === "admin" ? <Route path="/" element={<Navigate to="/admin-dashboard" />} /> : <></>
        }
        {
          isLogin === true && role === "user" || role === "client" ? <Route path="/" element={<Navigate to="/client-dashboard" />} /> : <></>
        }
        <Route element={<UsersLayout />}>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/login" element={<HomePage/>}/>
          <Route path="/register" element={<HomePage/>}/>
        </Route>
        {
          isLogin === true && role === "admin" ? <Route path="/admin-dashboard" element={<AdminDashboardPage />} /> : <></>
        }
        {
          isLogin === true && role === "user" || role === "client" ? <Route path="/client-dashboard" element={<ClientDashboardPage />} /> : <></>
        }
      </Routes>
    </BrowserRouter>
  )
}

export default App
