import React from 'react'

const ClosetIntro = () => {
  return (
    <div className='w-full max-w-7xl mx-auto px-4 py-12 flex justify-center items-center gap-8'>
          {/* Text container - 60% width with animation */}
      <div className='w-[60%] space-y-4 animate-slide-in-right'>
        <h2 className='text-3xl md:text-4xl font-bold  text-black dark:bg-gradient-to-r dark:from-purple-600 dark:to-red-600 dark:bg-clip-text dark:text-transparent'>
          Come visit Unikloh.
        </h2>
        <p className='text-lg leading-relaxed text-gray-700 dark:text-gray-300'>
          Enter our closet room filled with thousands of your favourite costumes.
        </p>
        <p className='text-lg leading-relaxed text-gray-700 dark:text-gray-300'>
          Choose to purchase or rent, and complete your transformation with a photoshoot in our professional studio
        </p>
        <p className='text-xl font-semibold text-black dark:bg-gradient-to-r dark:from-purple-600 dark:to-red-600 dark:bg-clip-text dark:text-transparent mt-4'>
          <span className='italic text-red-600 dark:text-red-400'>— all in one place.</span>
        </p>
      </div>
      {/* Image container - 40% width with animation */}
      <div className='w-[40%] animate-slide-in-left'>
        <img 
          src='/Closet.jpg' 
          alt='Closet' 
          className='w-full h-auto object-cover rounded-lg shadow-2xl hover:scale-105 transition-transform duration-500 hover:shadow-purple-500/30'
        />
                <img 
          src='/Photo Session.png' 
          alt='Photo Session' 
          className='w-full h-auto object-cover rounded-lg shadow-2xl hover:scale-105 transition-transform duration-500 hover:shadow-purple-500/30'
        />
      </div>
      

    </div>
  )
}

export default ClosetIntro

