import React from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
function Home() {
  return (
    <div>
        <Navbar/>
        <HeroSection/>
        {/* <CategoryCarousel/>
        <LatestJobs/>
        <Footer/> */}
    </div>
  )
}

export default Home