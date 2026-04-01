import React from 'react'
import { Outlet } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = () => {
  return (
    <>
      <Helmet>
        <title>HAHA Supermarket - Quality Products at Affordable Prices</title>
        <meta name="description" content="Shop at HAHA Supermarket for fresh groceries, drinks, hygiene products, and more." />
      </Helmet>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Layout