import ExperienceOpening from '../components/about/experience/ExperienceOpening'
import ExperiencePhilosophy from '../components/about/experience/ExperiencePhilosophy'
import ExperienceCreate from '../components/about/experience/ExperienceCreate'
import ExperienceTeam from '../components/about/experience/ExperienceTeam'
import ExperienceImpact from '../components/about/experience/ExperienceImpact'
import ExperienceBorders from '../components/about/experience/ExperienceBorders'
import ClosingFuture from '../components/sections/ClosingFuture'

export default function AboutPage() {
  return (
    <>
      <ExperienceOpening />
      <ExperiencePhilosophy />
      <ExperienceCreate />
      <ExperienceTeam />
      <ExperienceImpact />
      <ExperienceBorders />
      <ClosingFuture sectionId="future" />
    </>
  )
}
