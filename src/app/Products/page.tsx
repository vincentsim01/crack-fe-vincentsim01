"use client";
import { api } from '@/lib/api/api';
import AddToCartButton from '../component/addtocartbutton/AddToCartButton';
import { useState, useEffect } from 'react';
import Link from "next/link";
import FormDeleteProduct from '@/app/component/formDeleteProduct/page';
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

    <main className='mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8'   
    style={{
      background: "var(--background)",
      color: "var(--foreground)",
    }}
    >
    <div className='mb-8 flex items-center justify-between border-b border-black/15 pb-4'>
      <div>
        <p className='text-xs font-medium uppercase tracking-[0.16em] text-red-600'>Product catalogue</p>
        <h1 className='mt-1 text-2xl font-semibold text-black dark:text-white'>Featured products</h1>
      </div>
      <p className='text-sm text-black/60 dark:text-white/60'>Showing {fetchedData.length} products</p>
    </div>

    <div className='mb-8 flex items-center justify-center gap-3'>
      <button 
        className="inline-flex items-center gap-2 border border-black/20 px-4 py-2 text-sm font-medium transition-colors hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-40" 
        onClick={() => setLimit(Math.max(12, limit - 12))}
        disabled={limit <= 12}
      >
        <span className="flex items-center gap-2">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </span>
      </button>
      <button 
        className="inline-flex items-center gap-2 bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700" 
        onClick={() => setLimit(limit + 12)}
      >
        <span className="flex items-center gap-2">
          Next
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </button>
    </div>

    {loading && <div className='text-center py-8 text-lg'>Loading products...</div>}
    {error && <div className='text-center py-8 text-lg text-red-600'>Error: {error}</div>}

        <div className='grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 sm:gap-x-4 lg:grid-cols-4 lg:gap-x-5'>

<a href="https://ibb.co/NdW2jtWP"><img src="https://i.ibb.co/67D0PrDx/Goku.png" alt="Goku" border="0"></a>


        {fetchedData.map((item:any)=>{
          console.log(item)
          return (
            <article className='group min-w-0' key={item.id}>
              <Link href={`/Products/${item.id}`} className="block">
                <div className='aspect-[4/5] overflow-hidden bg-zinc-100'>
                  <img
                    className='h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]'
                    src={item.image || '/logo.png'}
                    alt={item.title}
                    width={400}
                    height={500}
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = '/logo.png';
                    }}
                  />
                </div>
                <div className='pt-3'>
                  <p className='text-[11px] text-black/55 dark:text-white/55'>Women, XS-XXL</p>
                  <h2 className="mt-1 truncate text-sm font-medium text-black hover:text-red-600 dark:text-white">{item.title}</h2>
                  <div className="mt-1 text-sm font-semibold text-red-600">${item.price}</div>
                  <p className='mt-1 text-[11px] text-black/55 dark:text-white/55'>Limited store collection</p>
                </div>
              </Link>
                <div className="mt-3 flex items-center gap-2">
                    <AddToCartButton product={item} />
                    <FormDeleteProduct productId={item.id} />
                </div>
            </article>
          )
        })}

        </div>

            <div className='mt-10 flex items-center justify-center gap-3'>
      <button 
        className="inline-flex items-center gap-2 border border-black/20 px-4 py-2 text-sm font-medium transition-colors hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-40" 
        onClick={() => setLimit(Math.max(12, limit - 12))}
        disabled={limit <= 12}
      >
        <span className="flex items-center gap-2">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </span>
      </button>
      <button 
        className="inline-flex items-center gap-2 bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700" 
        onClick={() => setLimit(limit + 12)}
      >
        <span className="flex items-center gap-2">
          Next
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </button>
    </div>
    </main>
    </>
  )
}

export default page
