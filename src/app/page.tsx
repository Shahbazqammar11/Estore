import React from 'react'
import Homebanner from './components/banner'
import Brandsnames from './components/brandsnames'
import NewArrival from './components/newarrival'
import TopSelling from './components/topselling'
import BrowseByDressStyle from './components/dressbystyle'
import CustomerComments from './components/customercomments'
import Footer from './components/footer'

const Homepage = () => {
  return (
    <div className=''>
      <Homebanner/>
      <Brandsnames/>
      <NewArrival/>
      <TopSelling/>
      <BrowseByDressStyle/>
      <CustomerComments/>
      <Footer/>
    </div>
  )
}

export default Homepage