import React from 'react'
import {Link} from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="flex h-screen flex-col items-center">
      <img src={`${process.env.PUBLIC_URL}/assets/images/illustration-notfound.jpg`} alt="Opps we lost you"/>
      <h1 className="text-3xl text-gray-900 mt-12">Opps! We're lost</h1>
      <p className="text-lg text-gray-900 mt-4 mtb-8 lg:w-3/12 mx-auto text-center">
        The page that you requested is not found in your system
      </p>
      <Link className="bg-orange-500 hover:bg-orange-400 transition-all duration-200 focus:outline-none shadow-inner 
      text-white px-6 py-3 mt-5" to="/" >
        Back to Home
      </Link>
    </section>
  )
}
