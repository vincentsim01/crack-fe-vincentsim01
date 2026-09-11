"use client";

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import {Product, ProductFormData, updateProduct} from '@/types/product';
import { api } from '@/lib/api/api';
import { API_BASE_URL } from '@/lib/config';
import { ChevronLeft, ChevronRight, PackagePlus, Pencil, Plus, Trash2, X } from 'lucide-react';


const AdminProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10);

  let updateInitialProduct: updateProduct = {
    title: "Shirt To Update",
    price: 7373,
    description: "A shirt that is made for Update",
    stock: 1,
  }


const fetchProducts = async (fetchLimit?: number) => {
  setLoading(true);
  try {
    // use api helper when possible so pagination/limit logic stays consistent
    const data = await api.getProducts(fetchLimit ?? limit);
    setProducts(data as Product[]);
  } catch (err) {
    console.error("Failed to fetch products:", err);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    // call the shared fetch function which toggles loading
    fetchProducts(limit);
    }, [offset, limit]);
    const [updateProducts, setUpdateProducts] = useState<updateProduct | null>(updateInitialProduct);
    let initialAddProduct: ProductFormData = {
    title: "Shirt A",
    price: 100,
    description: "A shirt that is made for A",
    image: "https://placehold.co/600x400",
    stock: 10
   
  }

  const [formData, setFormData] = useState<ProductFormData>(initialAddProduct);

  function nextPagination (){
    const currentLimit = limit;
    setLoading(true);
    setOffset((prev) => prev + currentLimit);
    setLimit((prev) => prev + 10);

    // ensure loading is visible for at least 1 second
    setTimeout(() => setLoading(false), 2500);
  }

  function previousPagination (){
    if (offset === 0) {
      return;
    }
    const currentLimit = limit;
    setLoading(true);
    setOffset((prev) => Math.max(0, prev - currentLimit));
    setLimit((prev) => Math.max(10, prev - 10));

    // ensure loading is visible for at least 1 second
    setTimeout(() => setLoading(false), 2500);
  }

function handleAddProduct(e: any) {
  e.preventDefault();

  fetch(`${API_BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: formData.title,
      price: formData.price,
      description: formData.description,
      stock: formData.stock,
      image: "https://placehold.co/600x400"
    }),
  })
    .then(async (res) => {
      const body = await res.json();

      // 🔥 THIS WILL SHOW THE REAL ERROR
      console.log("STATUS:", res.status);
      console.log("RESPONSE BODY:", body);

      if (!res.ok) {
        alert("API Error: " + JSON.stringify(body));
        return;
      }

      console.log("Product created:", body);
      fetchProducts();
    })
    .catch((err) => console.error("Network error:", err));
}

function openAddProductModal() {
  const modal = document.getElementById('addProductModal');
  
    modal?.classList.toggle('hidden');
  
}

function closeAddProductModal() {
  document.getElementById('addProductModal')?.classList.add('hidden');
}

function openUpdateProductModal() {
  const modal = document.getElementById('updateProductModal');
  modal?.classList.toggle('hidden');
}

function handleDeleteProduct(productId: number) {
  fetch(`${API_BASE_URL}/products/${productId}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to delete");

      // Remove product from state → triggers re-render
      setProducts((prev) => prev.filter((p) => p.id !== productId));

      console.log(`Product ${productId} deleted`);
      fetchProducts();
    })
    .catch((err) => console.error(err));
}

function handleEditProduct(productId: number) {
  // Logic to edit a product

  // console.log(updateProducts)
  fetch(`${API_BASE_URL}/products/${productId}`, {
    method: "PUT",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(
      {
        // id: productId, 
        ...updateProducts,
        image: "https://placehold.co/600x400"

      })
  })
    .then(res => res.json())
    .then(data => {
      console.log("Product updated:", data);
    });
  alert("Editing Product ID: " + productId);
  fetchProducts();
}

  return (
    <main className='min-h-screen px-5 py-10 sm:px-8 lg:px-12' style={{ background: 'var(--background)' }}>
      <div className='mx-auto max-w-7xl'>
        <header className='mb-8 flex flex-wrap items-end justify-between gap-5'>
          <div>
            <p className='mb-2 text-xs font-bold uppercase tracking-[0.16em] text-amber-700'>Unikloh / Inventory</p>
            <h1 className='text-4xl font-bold tracking-tight sm:text-5xl'>Product catalogue</h1>
            <p className='mt-3 max-w-xl text-sm opacity-70'>Manage your store collection, pricing, and stock from one place.</p>
          </div>
          <button className='flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold shadow-sm transition hover:-translate-y-0.5 hover:shadow-md' onClick={openAddProductModal} style={{ background: 'var(--foreground)', color: 'var(--background)' }}>
            <Plus size={17} /> Add product
          </button>
        </header>

        <div className='mb-7 flex flex-wrap items-center justify-between gap-4 border-y border-current/15 py-4'>
          <div className='flex items-center gap-3 text-sm opacity-70'><PackagePlus size={18} /><span>{loading ? 'Refreshing catalogue...' : `${products.length} products displayed`}</span></div>
          <div className='flex items-center gap-2'>
            <button aria-label='Previous products' className='rounded-full border border-current/20 p-2 transition hover:bg-(--foreground) hover:text-(--background) disabled:cursor-not-allowed disabled:opacity-30' onClick={previousPagination} disabled={offset === 0}><ChevronLeft size={18} /></button>
            <span className='min-w-24 text-center text-xs font-bold uppercase tracking-wider opacity-60'>Page {Math.floor(offset / 10) + 1}</span>
            <button aria-label='Next products' className='rounded-full border border-current/20 p-2 transition hover:bg-(--foreground) hover:text-(--background)' onClick={nextPagination}><ChevronRight size={18} /></button>
          </div>
        </div>


          {loading && <div className='border border-current/10 py-16 text-center text-sm opacity-70'>Loading products...</div>}




<div
  id="addProductModal"
  className="fixed inset-0 z-50 hidden overflow-y-auto bg-black/60 backdrop-blur-sm transition-all duration-300"
  onClick={closeAddProductModal}
>
  <div className="min-h-full w-full bg-(--background) px-5 py-8 text-(--foreground) shadow-2xl sm:px-8 sm:py-12 lg:px-12">
    <div className="mx-auto max-w-4xl">
    <div className="mb-8 flex items-start justify-between gap-4 border-b border-current/10 pb-6">
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-amber-700">Inventory / New item</p>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Add new product</h2>
        <p className="mt-2 max-w-xl text-sm opacity-65">Add the details customers will see in your catalogue.</p>
      </div>
    <button
      onClick={() => openAddProductModal()}
      type="button"
      aria-label="Close add product form"
      className="rounded-full border border-current/15 p-2 opacity-60 transition hover:bg-(--foreground) hover:text-(--background) hover:opacity-100"
    >
      <X size={18} />
    </button>
    </div>

    <form onSubmit={handleAddProduct} id='addNewProductForm' className="mx-auto max-w-3xl space-y-6" onClick={(event) => event.stopPropagation()}>

      <div>
        <label htmlFor="product-title" className="mb-2 block text-sm font-semibold">Product name</label>
        <input
          id="product-title"
          className="w-full rounded-lg border border-current/20 bg-transparent px-3 py-2.5 outline-none transition focus:border-current"
          type="text"
          placeholder="e.g. Moonlit warrior jacket"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div>
        <label htmlFor="product-price" className="mb-2 block text-sm font-semibold">Price</label>
        <input
          id="product-price"
          className="w-full rounded-lg border border-current/20 bg-transparent px-3 py-2.5 outline-none transition focus:border-current"
          type="number"
          min="0"
          step="0.01"
          placeholder="0.00"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
          required
        />
      </div>

      <div>
        <label htmlFor="product-description" className="mb-2 block text-sm font-semibold">Description</label>
        <textarea
          id="product-description"
          className="min-h-28 w-full resize-y rounded-lg border border-current/20 bg-transparent px-3 py-2.5 outline-none transition focus:border-current"
          rows={3}
          placeholder="Describe the product, materials, or fit."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        ></textarea>
      </div>

      <div>
        <label htmlFor="product-image" className="mb-2 block text-sm font-semibold">Image URL</label>
        <input
          id="product-image"
          className="w-full rounded-lg border border-current/20 bg-transparent px-3 py-2.5 outline-none transition focus:border-current"
          type="text"
          placeholder="https://example.com/product-image.jpg"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          required
        />
      </div>

      <div>
        <label htmlFor="product-stock" className="mb-2 block text-sm font-semibold">Stock quantity</label>
        <input
          id="product-stock"
          className="w-full rounded-lg border border-current/20 bg-transparent px-3 py-2.5 outline-none transition focus:border-current"
          type="number"
          min="0"
          placeholder="0"
          value={formData.stock}
          onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
          required
        />
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-current/10 pt-5 sm:flex-row sm:justify-end">
        <button type="button" onClick={() => openAddProductModal()} className="rounded-lg border border-current/20 px-4 py-2.5 text-sm font-semibold transition hover:bg-current/5">Cancel</button>
        <button type="submit" className="rounded-lg bg-(--foreground) px-5 py-2.5 text-sm font-bold text-(--background) transition hover:-translate-y-0.5 hover:shadow-md">Create product</button>
      </div>

    </form>
    </div>
  </div>
</div>




        <section className='grid gap-5 sm:grid-cols-2 xl:grid-cols-3'>
        {products.map(product => (
          <article key={product.id} className='group overflow-hidden rounded-2xl border border-current/15 bg-(--background) shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg'>
            <div className='relative aspect-4/3 overflow-hidden bg-current/5'>
              <img className='h-full w-full object-cover transition duration-500 group-hover:scale-105' src={product.image} alt={product.title} />
              <span className='absolute right-3 top-3 rounded-full bg-(--foreground) px-3 py-1 text-xs font-bold text-(--background)'>${product.price}</span>
            </div>
            <div className='p-5'>
              <div className='mb-3 flex items-start justify-between gap-3'><h2 className="text-xl font-semibold leading-tight">{product.title}</h2><span className='shrink-0 text-xs opacity-50'>#{product.id}</span></div>
              <p className='mb-5 line-clamp-2 min-h-10 text-sm opacity-65'>{product.description}</p>
              <div className='flex gap-2 border-t border-current/10 pt-4'>
                <button aria-label={`Edit ${product.title}`} className='flex flex-1 items-center justify-center gap-2 rounded-lg border border-current/20 px-3 py-2 text-sm font-semibold transition hover:bg-(--foreground) hover:text-(--background)' onClick={() => openUpdateProductModal()}><Pencil size={15} /> Edit</button>
                <button aria-label={`Delete ${product.title}`} className='flex items-center justify-center rounded-lg border border-red-200 px-3 py-2 text-red-700 transition hover:bg-red-700 hover:text-white' onClick={() => handleDeleteProduct(product.id)}><Trash2 size={15} /></button>
              </div>
            </div>
          
          <div
              id="updateProductModal"
              className="fixed inset-0 z-50 hidden items-center justify-center bg-black/50 backdrop-blur-sm"
              style={{background:"var(--foreground)", color:"var(--background)"}}
            >
              <div className="bg-white w-[400px] rounded-xl shadow-xl p-6 relative animate-scaleIn">
                
                <button
                  onClick={() => openUpdateProductModal()}
                  className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
                >
                  ✕
                </button>

                <h2 className="text-xl font-bold mb-4 text-center">Update Product</h2>

                <form
                  className="flex flex-col gap-3"
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleEditProduct(product.id)
                  }}
                >
                  <label className="text-sm font-semibold">Title</label>
                  <input
                    className="border p-2 rounded w-full"
                    type="text"
                    value={updateProducts?.title ?? product.title}
                    onChange={(e) =>
                      setUpdateProducts({ ...updateProducts, title: e.target.value })
                    }
                  />

                  <label className="text-sm font-semibold">Price</label>
                  <input
                    className="border p-2 rounded w-full"
                    type="number"
                    value={updateProducts?.price ?? product.price}
                    onChange={(e) =>
                      setUpdateProducts({
                        ...updateProducts,
                        price: Number(e.target.value),
                      })
                    }
                  />

                  <label className="text-sm font-semibold">Description</label>
                  <textarea
                    className="border p-2 rounded w-full"
                    rows={4}
                    value={updateProducts?.description ?? product.description}
                    onChange={(e) =>
                      setUpdateProducts({
                        ...updateProducts,
                        description: e.target.value,
                      })
                    }
                  />

                                    <label className="text-sm font-semibold">Price</label>
                  <input
                    className="border p-2 rounded w-full"
                    type="number"
                    value={updateProducts?.stock ?? product.stock}
                    onChange={(e) =>
                      setUpdateProducts({
                        ...updateProducts,
                        stock: Number(e.target.value),
                      })
                    }
                  />

                  {/* <label className="text-sm font-semibold">Category ID</label>
                  <input
                    className="border p-2 rounded w-full"
                    type="number"
                    value={updateProducts?.categoryId ?? product.categoryId}
                    onChange={(e) =>
                      setUpdateProducts({
                        ...updateProducts,
                        categoryId: Number(e.target.value),
                      })
                    }
                  /> */}

                  <button
                    type="submit"
                    className="mt-4 bg-green-600 hover:bg-green-700 text-white p-2 rounded transition"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          
          </article>
        ))}
        </section>

      <div className='mt-8 flex justify-center'>
        <div className='flex items-center gap-2 rounded-full border border-current/15 px-3 py-2'>
          <button aria-label='Previous products' className='p-1 opacity-70 transition hover:opacity-100 disabled:opacity-30' onClick={previousPagination} disabled={offset === 0}><ChevronLeft size={18} /></button>
          <span className='px-3 text-xs font-bold uppercase tracking-wider opacity-60'>Page {Math.floor(offset / 10) + 1}</span>
          <button aria-label='Next products' className='p-1 opacity-70 transition hover:opacity-100' onClick={nextPagination}><ChevronRight size={18} /></button>
        </div>
      </div>
      </div>
    </main>
  )
}

export default AdminProduct
