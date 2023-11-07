import {useEffect} from "react"

import { Progress } from "antd"
import useEducation from "../../zustand/education"
import useSkills from "../../zustand/skills"

import "./AdminDashboard.scss"
import useExperiences from "../../zustand/experiences"
import useUsers from "../../zustand/users"
import usePortfolios from "../../zustand/portfolios"

const AdminDashboardPage = () => {

  const {total : educationTotal , getData : getEducation , loading : educationLoadnig} = useEducation()

  const {total : skillsTotal , getData : getSkills , loading : skillsLoading} = useSkills()  

  const {total : experiencesTotal , getData : getExperiences , loading : experiencesLoading} = useExperiences() 

  const {total : usersTotal , getData : getUsers , loading : usersLoading} = useUsers() 

  const {total : portfoliosTotal , getData : getPortfolios , loading : portfoliosLoading} = usePortfolios()  
  

  useEffect(()=>{
    getSkills()
    getEducation()
    getExperiences()
    getUsers()
    getPortfolios()
  } , [getSkills , getEducation , getUsers , getExperiences , getPortfolios])
  

  return (
    <div className="dashboard-admin">
      <div className="container">
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Skills : ({skillsLoading ? <div className="loader"></div> : skillsTotal})</h3>
            <hr />
            <h4>From 200 :</h4>
            <Progress type="dashboard" percent={skillsTotal / 2} />
          </div>
          <div className="dashboard-card">
            <h3>Educations : ({educationLoadnig ? <div className="loader"></div> : educationTotal})</h3>
            <hr />
            <h4>From 200 :</h4>
            <Progress type="dashboard" percent={educationTotal / 2} />
          </div>
          <div className="dashboard-card">
            <h3>Users : ({usersLoading ? <div className="loader"></div> : usersTotal})</h3>
            <hr />
            <h4>From 200 :</h4>
            <Progress type="dashboard" percent={usersTotal / 2} />
          </div>
          <div className="dashboard-card">
            <h3>Portfolios : ({portfoliosLoading ? <div className="loader"></div> : portfoliosTotal})</h3>
            <hr />
            <h4>From 200 :</h4>
            <Progress type="dashboard" percent={portfoliosTotal / 2} />
          </div>
          <div className="dashboard-card">
            <h3>Experiences : ({experiencesLoading ? <div className="loader"></div> : experiencesTotal})</h3>
            <hr />
            <h4>From 200 :</h4>
            <Progress type="dashboard" percent={experiencesTotal / 2} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardPage