import React from 'react'
import { Link } from 'react-router'
import { TiShoppingCart } from "react-icons/ti";

const Navbar = () => {

  return (
    <div className='flex justify-between'>
      <div className='left-nav space-x-5'>
        <img src="" alt="" />
            <Link to=''>Everything</Link>
            <Link to=''>Groceries</Link>
            <Link to=''>Juice</Link>
      </div>
      <div className='right-nav space-x-5'>
        <Link to=''>About</Link>
        <Link>Contact</Link>
        <Link className='flex space-x-1'>
          <span>Rs 0.0</span>
          <TiShoppingCart />
        </Link>
      </div>
    </div>
  )
}

export default Navbar
