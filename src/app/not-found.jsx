import Link from 'next/link'
import React from 'react'

const NotFoundPage = () => {
  return (
    <div>
      This Page is Not Found.

      <Link className='bg-black text-white p-3 cursor-pointer rounded' href={'/'}>Back to home</Link>
    </div>
  )
}

export default NotFoundPage
