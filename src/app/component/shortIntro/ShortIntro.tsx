  import React from 'react'

  const ShortIntro = () => {
    return (
      <div className='w-full max-w-7xl mx-auto px-4 py-12 flex justify-center items-center gap-8'>
        {/* Image container - 40% width with animation */}
        <div className='w-[40%] animate-slide-in-left'>
          <img 
            src='/cosplayergroup.png' 
            alt='cosplayergroup' 
            className='w-full h-auto object-cover rounded-lg shadow-2xl hover:scale-105 transition-transform duration-500 hover:shadow-purple-500/30'
          />
        </div>
        
        {/* Text container - 60% width with animation */}
        <div className='w-[60%] space-y-4 animate-slide-in-right'>
          <h2 className='text-3xl md:text-4xl font-bold text-black dark:bg-gradient-to-r dark:from-purple-600 dark:to-red-600 dark:bg-clip-text dark:text-transparent'>
            Your Imagination, Our Collection
          </h2>
          <p className='text-lg leading-relaxed text-gray-700 dark:text-white'>
            Unikloh offers an easy and convenient solution for people to escape mundaneness and enter the world of their imagination. 
          </p>
          <p className='text-lg leading-relaxed text-gray-700 dark:text-white'>
            We provide a wide range of high-quality cosplay costumes for rent, from anime and superheroes to traditional and wedding attire.
          </p>
          <p className='text-xl font-semibold text-black dark:bg-gradient-to-r dark:from-purple-600 dark:to-red-600 dark:bg-clip-text dark:text-transparent'>
            With 1000+ collections, truly <span className='italic text-red-600 dark:text-red-400'>Unik Loh!</span>
          </p>
        </div>
      </div>
    )
  }

  export default ShortIntro

