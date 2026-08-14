import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const BestSelling = () => {
 return (
  <div
    className="text-center w-full mt-5 p-10 overflow-hidden"
    style={{
      background: "var(--background)",
      color: "var(--foreground)",
    }}
  >
    {/* Title with enhanced styling */}
    <div className="mb-12 animate-fade-in">
      <h2 className="text-4xl md:text-5xl font-bold tracking-wide mb-3  text-black dark:bg-gradient-to-r dark:from-purple-600 dark:to-red-600 dark:bg-clip-text dark:text-transparent">
        BEST SELLING ITEMS
      </h2>
      <div className="flex items-center justify-center gap-4 mt-4">
        <div className="h-1 w-20 bg-gradient-to-r from-transparent via-purple-500 to-red-500 rounded-full"></div>
        <span className="text-sm font-semibold tracking-widest text-gray-500 dark:text-gray-400">TOP PICKS</span>
        <div className="h-1 w-20 bg-gradient-to-l from-transparent via-red-500 to-purple-500 rounded-full"></div>
      </div>
    </div>

    {/* Images Layout with staggered animations */}
    <div className="flex flex-wrap items-center justify-center gap-8 max-w-7xl mx-auto">
      {[ 
        { src: "/introduction.png", label: "Featured Collection", delay: "0ms" }, 
        { src: "/shinobu.png", label: "Anime Favorites", delay: "200ms" }, 
        { src: "/honkai.png", label: "Gaming Cosplay", delay: "400ms" } 
      ].map((item, index) => (
        <div
          key={index}
          className="group relative rounded-2xl overflow-hidden shadow-xl border-2 border-transparent hover:border-purple-500 transition-all duration-500 animate-scale-in"
          style={{ 
            width: "28%", 
            minWidth: "280px",
            animationDelay: item.delay
          }}
        >
          {/* Image container */}
          <div className="relative overflow-hidden">
            <Image
              src={item.src}
              alt="Best Selling Banner"
              width={0}
              height={0}
              sizes="30vw"
              unoptimized
              className="w-full h-[450px] object-cover transform transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Label badge */}
            <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-red-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg transform translate-x-32 group-hover:translate-x-0 transition-transform duration-500">
              POPULAR
            </div>
            
            {/* Text overlay on hover */}
            <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-white text-xl font-bold mb-2">{item.label}</h3>
              <button className="bg-white text-purple-600 px-6 py-2 rounded-full font-semibold text-sm hover:bg-purple-600 hover:text-white transition-colors duration-300 shadow-lg">
                View Details
              </button>
            </div>
          </div>
          
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
        </div>
      ))}
    </div>

    {/* View All Button */}
    <div className="mt-12 animate-fade-in-up" style={{ animationDelay: "600ms" }}>
      <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-red-600 text-white font-bold text-lg rounded-full overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50">
        <span className="relative z-10 flex items-center gap-2">
          <Link href="/Products">
          View All Products
          </Link>
          <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </button>
    </div>
  </div>
);
}

export default BestSelling
