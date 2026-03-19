import React from 'react'
import HeroSection from '../components/home/Hero'
import AboutPreview from '../components/home/About'
import ServicesPreview from '../components/home/ServicePreview'
import PodcastPreview from '../components/home/PodcastPreview'


const Home = () => {
  return (
    <div>
      <HeroSection/>
      <AboutPreview/>
      <ServicesPreview/>
      <PodcastPreview/>
    </div>
  )
}

export default Home
