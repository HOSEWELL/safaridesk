import React from 'react'

import HeroSection from '../Components/HomePage-Components/Hero'
import Review from '../Components/HomePage-Components/Review'
import Support from '../Components/HomePage-Components/Support'

export default function HomePage() {
  return (
    <div className='overflow-x-hidden'>
        <HeroSection />
        <Review/>
        <Support/>
    </div>
  )
}
