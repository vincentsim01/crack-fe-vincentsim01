"use client"

import React from 'react';
import { useState } from 'react';
import { useLoading } from '../context/loadingContext';
import PhotoshootBanner from '../component/photoshootBanner/PhotoshootBanner';
import CheckoutPhotoShoot from "@/app/component/checkoutPhotoShoot/page";  
import { useCart } from '@/app/context/cartContext';
import { useTheme } from '../context/themeContext';
import Studio from '../component/Studio/Studio';

interface Product {
  id?: number;
  title?: string;
  price?: number;
  images?: string[];
  // totalItems: number;
}

interface Props {
  product: Product;
}
const page = () => {

  const { isLoading, setIsLoading } = useLoading();
  const { addToCart } = useCart();
  const { theme } = useTheme();
  const [thedate, setthedate] = useState('')

  const initialValue = {
    photoshootDate: '1 January 2024',
    name: 'arthur',
    email: 'arthur@gmail.com',
    package: 'premium',
    phone: '12345678'
  };

  const PhotoshootPackage = [
    {
      id:10001,
      title: "BASIC",
      price: 100,
      service: [
         "1 hour",
        "1 Costume Look",
        "5 Edited Photos",
        "All Preview Files",
        "Plain Backdrop"
      ],
        image:"/BASIC.png"
    },
    {
      id:10002,
      title: "PREMIUM",
      price: 200,
      service: [
        "2 hours",
        "2 Costume Looks",
        "15 Edited Photos",
        "Prop & Effects",
        "Themed Backdrop"


      ],
        image:"/PREMIUM.png"
    },
    {
      id:10003,
      title: "PLATINUM",
      price: 300,
      service: [
        "3 hours",
        "Up to 4 People",
        "20 Edited Photos",
        "Group Posing Guide",
        "Smoke/Fog Effect"
      ],
        image:"/PLATINUM.png"
    }
  ]

    const saveDate = () => {
    if (!thedate) {
      alert("Please select a date");
      return;
    }

    localStorage.setItem("photoshootDate",thedate);
    console.log("Saved:", thedate);
  };

  const [formData, setFormData] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setIsLoading(true);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
  <div
    id="photoshootContainer"
    className="mt-5 transition-colors duration-300"
    style={{
      background: "var(--background)",
      color: "var(--foreground)",
    }}
  >
    <PhotoshootBanner />



    {/* INFO GRID */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 mb-10 px-8">
      {/* Card 1 */}
      <div
        className="border rounded-xl p-6 shadow-lg text-center flex flex-col items-center group hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden relative"
        style={{ borderColor: "var(--foreground)" }}
      >
        <div className="absolute top-0 left-0 w-full h-full opacity-10 group-hover:opacity-20 transition-opacity duration-300">
          <img src="/cosplay.png" alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 mb-4">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-3 relative z-10">Photoshoot With A Heart</h2>
        <p className="opacity-80 relative z-10">
          Our photographer will ensure you get the best and most memorable photo.
        </p>
      </div>

      {/* Card 2 */}
      <div
        className="border rounded-xl p-6 shadow-lg text-center flex flex-col items-center group hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden relative"
        style={{ borderColor: "var(--foreground)" }}
      >
        <div className="absolute top-0 left-0 w-full h-full opacity-10 group-hover:opacity-20 transition-opacity duration-300">
          <img src="/cosplay2.png" alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 mb-4">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-3 relative z-10">
          Don't Put A Hole In Your Pocket
        </h2>
        <p className="opacity-80 relative z-10">More photos, lower cost.</p>
      </div>

      {/* Card 3 */}
      <div
        className="border rounded-xl p-6 shadow-lg text-center flex flex-col items-center group hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden relative"
        style={{ borderColor: "var(--foreground)" }}
      >
        <div className="absolute top-0 left-0 w-full h-full opacity-10 group-hover:opacity-20 transition-opacity duration-300">
          <img src="/cosplay3.png" alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 mb-4">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-3 relative z-10">We Follow What You Want</h2>
        <p className="opacity-80 relative z-10 ">
          We listen closely to your requests to give you the perfect shoot.
        </p>
      </div>
    </div>

        <Studio></Studio>

    {/* SPECIAL OFFER + GALLERY */}
    <div className="max-w-5xl mx-auto mb-10 px-6">
      <div className="bg-gradient-to-r from-green-50 to-white rounded-xl p-6 shadow-md flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <h2 className="text-3xl font-bold">Capture Moments That Last</h2>
          <p className="mt-3 text-gray-700">
            Unik Loh menyediakan jasa foto untuk kamu yang telah menjadi pelanggan
            setia kami. Dapatkan <strong>1x sesi foto dengan potongan harga 40%</strong>
            apabila kamu telah belanja satu set baju.
          </p>
          <div className="mt-4">
            <button
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            style={{
              background:"var(--background)",
              color:"var(--foreground)"
            }}
            >
              Book Now
            </button>
          </div>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-3">
          {/* small gallery */}
          {[
            '/cosplay.png',
            '/cosplay2.png',
            '/cosplay3.png',
            '/cosplay4.png',
          ].map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Photoshoot ${i + 1}`}
              className="w-full h-28 object-cover rounded-md shadow-sm"
            />
          ))}
        </div>
      </div>
    </div>

    {/* FORM TITLE */}
    <h1 className="text-center text-4xl font-extrabold mt-5 mb-8">BOOK A PHOTO SESSION</h1>

{/* {!thedate && ( */}
  <div className='flex justify-center  rounded-md'>
  <input
    type="date"
    value={thedate}
onChange={(e) => {
  const value = e.target.value;
  setthedate(value);
  localStorage.setItem("photoshootDate", value);
}}
    className="border p-2 rounded-md m-3"
  />
  </div>
{/* // )} */}

    <div>



    </div>


    {/* <div className='grid grid-cols-3 mt-5 mb-5 ml-3 mr-3 border rounded-md p-5 gap-5'>
      <div className='border rounded-md flex flex-col items-center'>
        BASIC
      </div>
      <div className='border rounded-md'>PREMIUM</div>
      <div className='border rounded-md'>DELUXE</div>
    </div> */}
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6 mb-10">
      {PhotoshootPackage.map((pack) => {
        const id = pack.id;
        const name = pack.title;
        const price = pack.price;
        const image = pack.image;

        function handlePackageButtonClick() {
          const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
          const isExisting = existingCart.some((item: Product) => item.id === id);
          if (isExisting) {
            alert('Item is already in your cart!');
            return;
          }
          addToCart({ id: id, title: name, price: price, quantity: 1 });
          const updatedCart = [...existingCart, { id: id, title: name, price: price, quantity: 1 }];
          localStorage.setItem('cart', JSON.stringify(updatedCart));
          alert(`${name} Package added to cart!`);
        }

        return (
          <div
            key={id}
            className="group border rounded-xl p-5 flex flex-col items-center text-center shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 overflow-hidden relative animate-scale-in"
            style={{ borderColor: 'var(--foreground)', animationDelay: `${id - 10001}00ms` }}
          >
            {/* Badge for popular package */}
            {id === 10002 && (
              <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-red-600 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse-slow">
                POPULAR
              </div>
            )}
            
            {/* Image container with zoom effect */}
            <div className="w-full h-48 mb-4 overflow-hidden rounded-md relative">
              <img 
                src={image} 
                alt={name} 
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Shine effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            </div>
            
            {/* Package name with gradient */}
            <h3
              className={`text-2xl font-semibold mb-1 bg-clip-text text-transparent ${
                theme === 'light'
                  ? 'bg-gradient-to-r from-white via-gray-100 to-white'
                  : 'bg-gradient-to-r from-purple-600 to-red-600'
              }`}
            >
              {name}
            </h3>
            
            {/* Price with animation */}
            <div className="text-red-600 dark:text-red-400 font-bold text-2xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
              ${price}
            </div>
            
            {/* Service list with icons */}
            <ul className="text-sm text-gray-600 dark:text-gray-400 mb-4 space-y-2 w-full text-left">
              {pack.service.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 transform transition-all duration-300 hover:translate-x-2">
                  <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            
            {/* Enhanced button with animation */}


            <button
              onClick={handlePackageButtonClick}
              className={`mt-auto group/btn relative px-6 py-3 rounded-lg font-bold overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl w-full ${
                theme === 'light'
                  ? 'bg-black text-white hover:bg-gray-800 hover:shadow-black/50'
                  : 'bg-white text-black hover:bg-gray-200 hover:shadow-white/50'
              }`}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg className="w-5 h-5 transform group-hover/btn:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to cart
              </span>
            </button>
          </div>
        );
      })}
    </div>


    {/* <CheckoutPhotoShoot/> */}

    {/* FORM */}
    {/* <form
      className="max-w-xl mx-auto m-8 p-10 rounded-xl flex flex-col gap-6 shadow-md transition-colors duration-300"
      style={{
        border: "2px solid var(--foreground)",
        background: "var(--background)",
        color: "var(--foreground)",
      }}
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="photoshootDate" className="font-medium">
          Select Photoshoot Date:
        </label>
        <input
          type="date"
          id="photoshootDate"
          name="photoshootDate"
          onChange={handleChange}
          value={formData.photoshootDate}
          className="p-2 rounded border"
          style={{
            borderColor: "var(--foreground)",
            background: "var(--background)",
            color: "var(--foreground)",
          }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="font-medium">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleChange}
          value={formData.name}
          className="p-2 rounded border"
          placeholder="Arthur"
          style={{
            borderColor: "var(--foreground)",
            background: "var(--background)",
            color: "var(--foreground)",
          }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="font-medium">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          value={formData.email}
          className="p-2 rounded border"
          placeholder="arthur@example.com"
          style={{
            borderColor: "var(--foreground)",
            background: "var(--background)",
            color: "var(--foreground)",
          }}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="package" className="font-medium">
          Select Package:
        </label>
        <select
          id="package"
          name="package"
          onChange={handleChange}
          value={formData.package}
          className="p-2 rounded border"
          style={{
            borderColor: "var(--foreground)",
            background: "var(--background)",
            color: "var(--foreground)",
          }}
        >
          <option value="basic">Basic</option>
          <option value="premium">Premium</option>
          <option value="deluxe">Deluxe</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="phone" className="font-medium">
          Phone Number:
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          onChange={handleChange}
          value={formData.phone}
          className="p-2 rounded border"
          placeholder="+1234567890"
          style={{
            borderColor: "var(--foreground)",
            background: "var(--background)",
            color: "var(--foreground)",
          }}
        />
      </div>


      <button
        type="submit"
        className="px-4 py-3 rounded-lg border font-medium mt-4 active:scale-95 transition-all duration-200"
        style={{
          background: "var(--foreground)",
          color: "var(--background)",
          borderColor: "var(--foreground)",
        }}
      >
        Submit
      </button>
    </form> */}
  </div>
);
}

export default page
