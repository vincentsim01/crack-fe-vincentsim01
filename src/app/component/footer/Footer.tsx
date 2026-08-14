import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <div
      className='border border-white flex flex-col md:flex-row items-center justify-center'
      style={{
        background: "var(--foreground)",
        color: "var(--background)",
      }}
    >
      <div className='w-full md:w-[65%] inline-block'>
          <div className='bottom-0 z-50 shadow h-[50vh] text-center md:flex md:items-start md:justify-center md:m-15 font-bold'
                  // style={{
                  //     background: "var(--foreground)",
                  //     color: "var(--background)",
                  // }}
            >
              <div className='flex flex-col justify-start mr-8 gap-2 mb-10'>
                  <h2 className='font-bold text-2xl hover:scale-105 hover:underline '>About Us</h2>
                  <Link href="/Blog" className='hover:underline hover:translate-x-1 transition-all duration-200'>Our Story</Link>
                  <Link href="/CSR" className='hover:underline hover:translate-x-1 transition-all duration-200'>CSR</Link>
                  <Link href="/BusinessOpportunities" className='hover:underline hover:translate-x-1 transition-all duration-200'>Business Opportunities</Link>
                  {/* <Link href="/Contact" className='hover:underline hover:translate-x-1 transition-all duration-200'>Careers</Link> */}
              </div>
              <br></br><br></br>

              <div className='flex flex-col justify-start mr-8 gap-2'>
                  <h2 className='font-bold text-2xl hover:scale-105 hover:underline'>Need Help?</h2>
                  <Link href="/FAQ" className='hover:underline hover:translate-x-1 transition-all duration-200'>FAQ</Link>
                  <Link href="/Contact" className='hover:underline hover:translate-x-1 transition-all duration-200'>Contact Us</Link>
                  <Link href="/Privacy" className='hover:underline hover:translate-x-1 transition-all duration-200'>Privacy Policy</Link>
                  {/* <Link href="/FAQ" className='hover:underline hover:translate-x-1 transition-all duration-200'>Terms and Conditions</Link> */}
                  {/* <Link href="/Photoshoot" className='hover:underline hover:translate-x-1 transition-all duration-200'>Delivery and Pickup</Link> */}
              </div>
              <br></br><br></br>

              <div className='flex flex-col justify-start mr-8 gap-2'>
                  <h2 className='font-bold text-2xl hover:scale-105 hover:underline'>Account</h2>
                  <Link href="/Login" className='hover:underline hover:translate-x-1 transition-all duration-200'>Login</Link>
                  <Link href="/user" className='hover:underline hover:translate-x-1 transition-all duration-200'>My Account</Link>
              </div>
          </div>
        </div>
      <div className='w-full md:w-[30%] inline-block'>
          <div className='bottom flex flex-col justify-center items-center z-50 h-[50vh]'
          >
                <h2 className='font-bold text-2xl hover:scale-105 hover:underline'>Sign Up For Our Newsletter!</h2>
                <form>
                  <input type='text' className='border mr-5 rounded-md focus:ring-4'></input>
                  <button 
                      className='p-3 cursor-pointer hover:scale-105 rounded-md'
                      style={{
                          background: "var(--background)",
                          color: "var(--foreground)",
                      }}
                  
                  >
                    Newsletter</button>
                </form>
                <br></br><br></br>
                <div className='flex justify-center items-center w-70'>
                  <img src='/payment option.png'></img>
                </div>
            
            
          </div>
        </div>
    </div>
  )
}

export default Footer
