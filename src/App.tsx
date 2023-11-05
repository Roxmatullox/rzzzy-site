import { BrowserRouter , Routes , Route, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage"
import UsersLayout from "./components/header/Users-header/Layout"
import useAuth from "./zustand/auth"
import AdminDashboardPage from "./pages/AdminDashboardPage/AdminDashboardPage"
import ClientDashboardPage from "./pages/ClientDashboardPage/ClientDashboardPage"
import SkillsPageAdmin from "./pages/SkillsPage/SkillsPageAdmin"
import AdminsLayout from "./components/header/Admins-header/AdminLayout"

function App() {

  const {isLogin , role } = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        {
          isLogin === true && role === "admin" ? 
          <Route element={<AdminsLayout />}>
            <Route path="/" element={<Navigate to="/admin-dashboard" />} /> 
            <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
            <Route path="admin-skills" element={<SkillsPageAdmin/>} />
          </Route>
          : <></>
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
          isLogin === true && role === "user" || role === "client" ? <Route path="/client-dashboard" element={<ClientDashboardPage />} /> : <></>
        }
      </Routes>
    </BrowserRouter>
  )
}

export default App
