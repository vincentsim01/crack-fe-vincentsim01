"use client";

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import {Product, ProductFormData, updateProduct} from '@/types/product';
import { api } from '@/lib/api/api';
import { API_BASE_URL } from '@/lib/config';


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
    // fetch(`https://revoubackend6-production.up.railway.app/products`, {
    //   method: "GET",
    //   headers: {}})
    //   .then(response => response.json())
    //   .then(data => setProducts(data));
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
    <div className='mt-5'>
      <h1 className='text-4xl text-center font-bold'>PRODUCT ADMIN</h1>
      <br></br>
      <div className='flex justify-center items-center'>
        <button className='border p-2 rounded bg-blue-500 text-white z-50' onClick={openAddProductModal} style={{background:"var(--foreground)", color:"var(--background)"}}>Add New Product</button>
      </div>
      <br></br><br></br>
      <div className='flex justify-center items-center'>
        <button className='border p-2 rounded bg-green-500 text-white m-2' onClick={previousPagination} style={{background:"var(--foreground)", color:"var(--background)"}}>Previous Page</button>
        <button className='border p-2 rounded bg-green-500 text-white' onClick={nextPagination} style={{background:"var(--foreground)", color:"var(--background)"}}>Next Page</button>
      </div>


          {loading && <div className='text-center py-8 text-lg'>Loading products...</div>}




<div
  id="addProductModal"
  className="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center transition-all duration-300"
  style={{background:"var(--foreground)", color:"var(--background)"}}
>
  <div className="bg-white w-[400px] rounded-xl p-6 shadow-xl relative animate-fadeIn">

    {/* Title */}
    <h2 className="text-xl font-semibold mb-4">Add New Product</h2>

    {/* Close Button */}
    <button
      onClick={() => openAddProductModal()}
      className="absolute top-3 right-3 text-red-500 font-bold text-lg hover:text-red-700 transition"
    >
      ✕
    </button>

    {/* FORM */}
    <form onSubmit={handleAddProduct} className="flex flex-col gap-3">

      <div>
        <label className="text-sm font-medium">Title:</label>
        <input
          className="border rounded p-2 w-full"
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      <div>
        <label className="text-sm font-medium">Price:</label>
        <input
          className="border rounded p-2 w-full"
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
        />
      </div>

      <div>
        <label className="text-sm font-medium">Description:</label>
        <textarea
          className="border rounded p-2 w-full"
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        ></textarea>
      </div>

      <div>
        <label className="text-sm font-medium">Image:</label>
        <input
          className="border rounded p-2 w-full"
          type="text"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        />
      </div>

      <div>
        <label className="text-sm font-medium">Stock:</label>
        <input
          className="border rounded p-2 w-full"
          type="text"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
        />
      </div>

      <button
        type="submit"
        className="mt-2 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        Submit
      </button>

    </form>
  </div>
</div>




        {products.map(product => (
          <div key={product.id} className='border rounded-lg p-5 m-4 shadow-sm hover:shadow-md transition-shadow' style={{background:"var(--background)", color:"var(--foreground)"}}>
            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
            <img className='w-20 h-20 object-cover rounded mb-3' src={product.image} alt={product.title} />
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <br></br>
            <button className='border p-2 rounded' style={{background:"var(--foreground)", color:"var(--background)"}} onClick={() => openUpdateProductModal()}>Edit</button>
            <button className='border p-2 rounded' style={{background:"var(--foreground)", color:"var(--background)"}} onClick={() => handleDeleteProduct(product.id)}>Delete</button>
          
          <div
              id="updateProductModal"
              className="hidden fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
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
          
          </div>
        ))}

      
      <div className='flex justify-center items-center'>
        <button className='border p-2 rounded bg-green-500 text-white m-2' onClick={previousPagination} style={{background:"var(--foreground)", color:"var(--background)"}}>Previous Page</button>
        <button className='border p-2 rounded bg-green-500 text-white' onClick={nextPagination} style={{background:"var(--foreground)", color:"var(--background)"}}>Next Page</button>
      </div>
    </div>
  )
}

export default AdminProduct
