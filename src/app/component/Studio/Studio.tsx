import React from 'react'

const Studio = () => {
  return (
    <div className='w-full max-w-7xl mx-auto px-4 py-12 flex justify-center items-center gap-8'>
        <div className='w-[60%] animate-slide-in-left'>
            <img src='LargeStudio.png' alt='LargeStudio' className='w-full h-auto object-cover rounded-lg shadow-2xl hover:scale-105 transition-transform duration-500 hover:shadow-purple-500/30'/>
            <div className='text-center mt-4 text-lg font-semibold text-white dark:text-purple-400'>
                Complete studio setup for your perfect photoshoot
            </div>
        </div>
      
      {/* Text container - 60% width with animation */}
      <div className='w-[4  0%] space-y-4 animate-slide-in-right'>
            <div className='text-center mt-4 text-lg font-semibold text-white dark:text-purple-400'>
                Portable Studio Container for On-the-Go Photoshoots
            </div>
            <img src='ContainerStudio.png' alt='ContainerStudio' className='w-full h-auto object-cover rounded-lg shadow-2xl hover:scale-105 transition-transform duration-500 hover:shadow-purple-500/30'/>
       
      </div>
    </div>
  )
}

export default Studio

