import React from 'react'
import HeroSection from '../components/home/Hero'
import AboutPreview from '../components/home/About'
import ServicesPreview from '../components/home/ServicePreview'
import PodcastPreview from '../components/home/PodcastPreview'
import BookPreviewSection from '../components/about/BookPreview'


const Home = () => {
  return (
    <div>
      <HeroSection/>
      <AboutPreview/>
      <ServicesPreview/>
      <BookPreviewSection/>
      <PodcastPreview/>
    </div>
  )
}

export default Home
