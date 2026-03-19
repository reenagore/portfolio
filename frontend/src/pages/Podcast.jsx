import React, { useEffect } from 'react'
import PodcastPageHero from '../components/podcast/PodcastHero'
import PodcastFilters from '../components/podcast/PodcastFilter'
import PodcastCTA from '../components/podcast/PodcastCTA'

const Podcast = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
  return (
    <div>
      <PodcastPageHero/>
      <PodcastFilters />
      <PodcastCTA />
    </div>
  )
}

export default Podcast




