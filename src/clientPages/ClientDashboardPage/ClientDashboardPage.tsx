import {useEffect} from "react"

import { Progress } from "antd"
import useClientEducation from "../../zustand/client/educations"
import useClientSkills from "../../zustand/client/clientSkills"
import useClientExperiences from "../../zustand/client/clientExperiences"
import useClientPortfolios from "../../zustand/client/clientPortfolios"
import useEducation from "../../zustand/education"
import useSkills from "../../zustand/skills"
import useExperiences from "../../zustand/experiences"
import usePortfolios from "../../zustand/portfolios"

const ClientDashboardPage = () => {

  
  const {total : educationTotal , getData : getEducation} = useEducation()

  const {total : skillsTotal , getData : getSkills} = useSkills()  

  const {total : experiencesTotal , getData : getExperiences} = useExperiences() 

  const {total : portfoliosTotal , getData : getPortfolios} = usePortfolios() 



  const {total : educationTotalClient , getData : getDucationClient , loading : educationLoadnig} = useClientEducation()

  const {total : skillsTotalClient , getData : getSkillsClient , loading : skillsLoading} = useClientSkills()  

  const {total : experiencesTotalClient , getData : getExperiencesClient , loading : experiencesLoading} = useClientExperiences() 

  const {total : portfoliosTotalClient , getData : getPortfoliosClient , loading : portfoliosLoading} = useClientPortfolios()  
  

  useEffect(()=>{
    getSkills()
    getEducation()
    getExperiences()
    getPortfolios()
    getDucationClient()
    getSkillsClient()
    getExperiencesClient()
    getPortfoliosClient()
  } , [getSkills , getEducation ,  getPortfoliosClient  , getExperiences , getPortfolios , getDucationClient , getSkillsClient , getExperiencesClient])
  

  return (
    <div className="dashboard-admin">
      <div className="container">
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <h3>Skills : ({skillsLoading ? <div className="loader"></div> : skillsTotalClient})</h3>
            <hr />
            <h4>From ({skillsTotal}) :</h4>
            <Progress type="dashboard" percent={skillsTotalClient / (skillsTotal / 100)} />
          </div>
          <div className="dashboard-card">
            <h3>Educations : ({educationLoadnig ? <div className="loader"></div> : educationTotalClient})</h3>
            <hr />
            <h4>From ({educationTotal}) :</h4>
            <Progress type="dashboard" percent={educationTotalClient / (educationTotal / 100)} />
          </div>
          <div className="dashboard-card">
            <h3>Portfolios : ({portfoliosLoading ? <div className="loader"></div> : portfoliosTotalClient})</h3>
            <hr />
            <h4>From ({portfoliosTotal}) :</h4>
            <Progress type="dashboard" percent={portfoliosTotalClient / (portfoliosTotal / 100)} />
          </div>
          <div className="dashboard-card">
            <h3>Experiences : ({experiencesLoading ? <div className="loader"></div> : experiencesTotalClient})</h3>
            <hr />
            <h4>From ({educationTotal}) :</h4>
            <Progress type="dashboard" percent={experiencesTotalClient / (experiencesTotal / 100)} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientDashboardPage