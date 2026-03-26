import React, { useEffect } from 'react'
import AboutHero from '../components/about/AboutHero'
import AboutExecutiveSummary from '../components/about/ExecutiveSummary'
import AboutApproach from '../components/about/Approach'
import BookPreviewSection from '../components/about/BookPreview'

const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
  return (
    <div>
      <AboutHero/>
      <AboutExecutiveSummary/>
      <AboutApproach/>
      <BookPreviewSection/>
    </div>
  )
}

export default About
