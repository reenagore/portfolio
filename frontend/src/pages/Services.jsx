import React, { useEffect } from 'react'
import ServicesHero from '../components/services/ServiceHero'
import ServicesDetails from '../components/services/ServiceDetails'
import ServicesProcess from '../components/services/ServiceApproach'

const Services = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
  return (
    <div>
      <ServicesHero/>
      <ServicesDetails/>
      <ServicesProcess/>
    </div>
  )
}

export default Services
