import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import JobList from '../components/JobList'
import Download from '../components/Download'
import Footer from '../components/Footer'

function Home() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <JobList/>
      <Download/>
      <Footer/>
    </div>
  )
}

export default Home
