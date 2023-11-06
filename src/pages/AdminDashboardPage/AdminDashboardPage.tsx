import {useEffect} from "react"

import { Progress } from "antd"
import useEducation from "../../zustand/education"
import useSkills from "../../zustand/skills"

import "./AdminDashboard.scss"

const AdminDashboardPage = () => {

  const {total : educationTotal , getData : getEducation , loading : educationLoadnig} = useEducation()

  const {total : skillsTotal , getData : getSkills , loading : skillsLoading} = useSkills()  

  useEffect(()=>{
    getSkills()
    getEducation()
  } , [getSkills , getEducation])
  

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
            <h3>Soon : ()</h3>
            <hr />
            <h4>From 200 :</h4>
            <Progress type="dashboard" percent={0} />
          </div>
          <div className="dashboard-card">
            <h3>Soon : ()</h3>
            <hr />
            <h4>From 200 :</h4>
            <Progress type="dashboard" percent={0} />
          </div>
          <div className="dashboard-card">
            <h3>Soon : ()</h3>
            <hr />
            <h4>From 200 :</h4>
            <Progress type="dashboard" percent={0} />
          </div>
          <div className="dashboard-card">
            <h3>Soon : ()</h3>
            <hr />
            <h4>From 200 :</h4>
            <Progress type="dashboard" percent={0} />
          </div>
          <div className="dashboard-card">
            <h3>Soon : ()</h3>
            <hr />
            <h4>From 200 :</h4>
            <Progress type="dashboard" percent={0} />
          </div>
          <div className="dashboard-card">
            <h3>Soon : ()</h3>
            <hr />
            <h4>From 200 :</h4>
            <Progress type="dashboard" percent={0} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardPage