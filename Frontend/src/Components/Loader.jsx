import React from 'react'

export default function Loader() {
  return (
    <div className=' container flex justify-center items-center min-h-[80vh]'>
        <div className=' animate-spin h-16 w-16 rounded-full border-t-8 border-b-8 border-black' ></div>
    </div>
  )
}
