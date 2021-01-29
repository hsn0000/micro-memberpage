import React from 'react'
import {Link} from 'react-router-dom'

export default function Unauthenticated({fallbackUrl, fallbackText, external}) {
  return (
    <section className="flex h-screen flex-col items-center">
      <img src={`${process.env.PUBLIC_URL}/assets/images/illustration-private.jpg`} alt="you are not support here, please login"/>
      <h1 className="text-3xl text-gray-900 mt-12">Wow! How are you here?</h1>
      <p className="text-lg text-gray-900 mt-4 mtb-8 lg:w-3/12 mx-auto text-center">
        Seems like you do not have access for this page. we are sorry.
      </p>
      {
        external ? <a className="bg-orange-500 hover:bg-orange-400 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3" 
        href={fallbackUrl}>{fallbackText || "Loggin me in"}</a> : 
        <Link className="bg-orange-500 hover:bg-orange-400 transition-all duration-200 focus:outline-none shadow-inner text-white px-6 py-3 mt-5" to={fallbackUrl || "/login"} >
          {fallbackText || "Loggin me in"}
        </Link>
      }
    </section>
  )
}
