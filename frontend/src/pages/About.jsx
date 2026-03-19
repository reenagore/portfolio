import React, { useEffect } from 'react'
import AboutHero from '../components/about/AboutHero'
import AboutExecutiveSummary from '../components/about/ExecutiveSummary'
import AboutApproach from '../components/about/Approach'

const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
  return (
    <div>
      <AboutHero/>
      <AboutExecutiveSummary/>
      <AboutApproach/>
    </div>
  )
}

export default About
