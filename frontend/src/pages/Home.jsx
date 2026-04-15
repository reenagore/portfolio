import React from 'react'
import HeroSection from '../components/home/Hero'
import AboutPreview from '../components/home/About'
import ServicesPreview from '../components/home/ServicePreview'
import PodcastPreview from '../components/home/PodcastPreview'
import BookPreviewSection from '../components/about/BookPreview'
import FloatingEventPromo from '../components/common/FloatingIcon'


const Home = () => {
  return (
    <div>
      
      <HeroSection/>
      <AboutPreview/>
      <ServicesPreview/>
      <BookPreviewSection/>
      <PodcastPreview/>
      <FloatingEventPromo/>
    </div>
  )
}

export default Home
