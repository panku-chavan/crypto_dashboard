import React from 'react'

const Navbar = () => {
  return (
    <nav className='w-full flex flex-rows justify-start px-2 py-1'>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8eG1vOpSNEppPuCWNvmd8y00pbriJAj7ooQ&usqp=CAU" alt="" className='mx-5 h-10' />
        <h3 className=' mt-2 text-xl font-bold font-mono text-transparent  bg-clip-text bg-gradient-to-r from-pink-400 to-red-600'>Cryptocurrency Dashboard</h3>
    </nav>
  )
}

export default Navbar
