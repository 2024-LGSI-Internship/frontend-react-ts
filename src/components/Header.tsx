import React from 'react'
import lg_logo from '../assets/lg-logo-black-and-white.png' 

export default function Header() {
  return (
    <header className='Header'>
      <a href="/" className="justify-content-center align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
        <img className="mt-2" src={lg_logo} style={{ width: '13%' }} alt="this is lg logo"></img>
        <h3 style={{ fontWeight: '600' }} className="fs-4"> Smart AI Air Conditioner</h3>
      </a>
    </header>
  )
}
