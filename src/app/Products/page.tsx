"use client";
import { api } from '@/lib/api/api';
import AddToCartButton from '../component/addtocartbutton/AddToCartButton';
import { useState, useEffect } from 'react';
import Link from "next/link";
import {Product} from '@/types/product'
import FormDeleteProduct from '@/app/component/formDeleteProduct/page';
import { updateProduct } from '@/types/product';
import {FormUpdateProduct} from '@/app/component/formUpdateProduct/FormUpdateProduct';
import {MockProducts} from '@/app/data/Product';
import BannerCosplayNight from '../component/banner/BannerCosplayNight';

export async function deleteProductAction(id: number) {
  await fetch(`https://revoubackend6-production.up.railway.app/products/${id}`, {
    method: "DELETE",
  });
}

const page = () => {
  const [limit, setLimit] = useState(12);
  const [fetchedData, setFetchedData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await api.getProducts(limit);
        setFetchedData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch products');
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [limit]);
  return (
    <>
    <BannerCosplayNight></BannerCosplayNight>

    <div className='m-4'   
    style={{
      background: "var(--background)",
      color: "var(--foreground)",
    }}
    >
    <div className='m-4 flex gap-6 justify-center items-center flex-wrap'>
      <button 
        className="group relative px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none" 
        onClick={() => setLimit(Math.max(12, limit - 12))}
        disabled={limit <= 12}
      >
        <span className="relative z-10 flex items-center gap-2">
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous ({Math.max(12, limit - 12)})
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </button>
      
      <div className='flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-100 to-red-100 dark:from-purple-900/30 dark:to-red-900/30 rounded-lg shadow-md'>
        <span className='font-bold text-lg bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent'>Showing:</span>
        <span className='text-2xl font-bold text-red-600 dark:text-red-400 animate-pulse-slow'>{limit}</span>
      </div>
      
      <button 
        className="group relative px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-500/50" 
        onClick={() => setLimit(limit + 12)}
      >
        <span className="relative z-10 flex items-center gap-2">
          Next ({limit + 12})
          <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </button>
    </div>

    {loading && <div className='text-center py-8 text-lg'>Loading products...</div>}
    {error && <div className='text-center py-8 text-lg text-red-600'>Error: {error}</div>}

        <div className='flex flex-wrap '>

        {fetchedData.map((item:any)=>{
          return (
            <div className='m-5 h-[70svh] p-6 md:w-[30%] w-[35%] flex flex-col items-center rounded-xl shadow-lg bg-white hover:shadow-2xl hover:scale-105 transition-transform duration-300' key={item.id}>
              <Link href={`/Products/${item.id}`} className="flex min-h-0 w-full flex-1 flex-col text-center">              
                <img className='min-h-0 w-full flex-1 object-cover rounded-lg' src={item.image} alt={item.title} width={150} height={150}/> 
                <h2 className="mt-4 text-2xl font-semibold text-gray-800 hover:text-red-600 transition-colors duration-200">{item.title}</h2>  
                <div className="mt-2 text-xl font-bold text-gray-900">${item.price}</div>
              </Link>
                <div className="mt-4 w-full flex justify-center gap-4">
                    <AddToCartButton product={item} />
                    <FormDeleteProduct productId={item.id} />
                </div>

              {/* <FormUpdateProduct
                  productId={item?.id} 
                  productTitle={item?.title} 
                  productPrice={item?.price} 
                  productDescription={item?.description} 
              /> */}
            </div>
          )
        })}

        </div>

            <div className='m-4 flex gap-6 justify-center items-center flex-wrap'>
      <button 
        className="group relative px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none" 
        onClick={() => setLimit(Math.max(12, limit - 12))}
        disabled={limit <= 12}
      >
        <span className="relative z-10 flex items-center gap-2">
          <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous ({Math.max(12, limit - 12)})
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </button>
      
      <div className='flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-100 to-red-100 dark:from-purple-900/30 dark:to-red-900/30 rounded-lg shadow-md'>
        <span className='font-bold text-lg bg-gradient-to-r from-purple-600 to-red-600 bg-clip-text text-transparent'>Showing:</span>
        <span className='text-2xl font-bold text-red-600 dark:text-red-400 animate-pulse-slow'>{limit}</span>
      </div>
      
      <button 
        className="group relative px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-bold rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-red-500/50" 
        onClick={() => setLimit(limit + 12)}
      >
        <span className="relative z-10 flex items-center gap-2">
          Next ({limit + 12})
          <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </button>
    </div>
      
    </div>
        </>
  )
}

export default page
