import { BrowserRouter , Routes , Route, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage/HomePage"
import UsersLayout from "./components/header/Users-header/Layout"
import useAuth from "./zustand/auth"
import AdminDashboardPage from "./pages/AdminDashboardPage/AdminDashboardPage"
import ClientDashboardPage from "./clientPages/ClientDashboardPage/ClientDashboardPage"
import SkillsPageAdmin from "./pages/SkillsPage/SkillsPageAdmin"
import AdminsLayout from "./components/header/Admins-header/AdminLayout"
import EducationPageAdmin from "./pages/AdminEducationPage/EducationPage"
import AccountPage from "./pages/AccountPage/AccountPage"
import AdminExperiences from "./pages/AdminExperiencesPage/AdminExperiences"
import AdminUsersPage from "./pages/AdminUsersPage/AdminUsersPage"
import AdminPortfolios from "./pages/AdminPortfoliosPage/AdminPortfolios"
import ClientLayout from "./components/header/Client-header/ClientLayout"
import ClientSkillsPage from "./clientPages/ClientSkillsPage/ClientSkillsPage"
import ClientPortfoliosPage from "./clientPages/ClientPortfolios/ClientPortfoliosPage"
import ClientExperiencesPage from "./clientPages/ClientExperiencesPage/ClientExperiencesPage"
import ClientEducationsPage from "./clientPages/ClientEducationsPage/ClientEducationsPage"
import MessagesPage from "./pages/MessagesPage/MessagesPage"

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
            <Route path="/admin-skills" element={<SkillsPageAdmin/>} />
            <Route path="/admin-education" element={<EducationPageAdmin/>} />
            <Route path="/admin-users" element={<AdminUsersPage/>} />
            <Route path="/admin-experiences" element={<AdminExperiences/>} />
            <Route path="/admin-portfolios" element={<AdminPortfolios/>} />
            <Route path="/messages" element={<MessagesPage/>} />
            <Route path="/my-account" element={<AccountPage />} />
          </Route>
          : <></>
        }
        {
          isLogin === true && role === "user" || role === "client" ?
          <Route element={<ClientLayout />} >
            <Route path="/" element={<Navigate to="/client-dashboard" />} /> 
            <Route path="/client-dashboard" element={<ClientDashboardPage />} />
            <Route path="/client-skills" element={<ClientSkillsPage />} />
            <Route path="/client-portfolios" element={<ClientPortfoliosPage />} />
            <Route path="/client-experiences" element={<ClientExperiencesPage />} />
            <Route path="/client-education" element={<ClientEducationsPage />} />
            <Route path="/my-account" element={<AccountPage />} />
          </Route>
           : <></>
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
