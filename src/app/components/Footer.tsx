import Link from 'next/link'
import React from 'react'


const Footer = () => {
  return (
    <div className='bg-[#181717] text-white py-5 text-center'>
        <p>&copy; {new Date().getFullYear()} <Link href={'https://github.com/BlarQ'} target='_blank'>BlarQ</Link></p>
    </div>
  )
}

export default Footer