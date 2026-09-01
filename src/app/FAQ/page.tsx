import React from 'react'

import { faqs } from "./data/faq";
import Banner2 from '@/app/component/banner/banner2'

export const metadata = {
  title: "FAQ",
  description: "Frequently asked questions",
};

export const revalidate = 0; 

const Page = () => {
  return (
    <>
      <Banner2></Banner2>
 <main className="max-w-3xl mx-auto py-12">

      <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>

      <div className="space-y-6">
        {faqs.map((item, index) => (
          <div
            key={index}
            className="border border-current/20 p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold"     style={{
      background: "var(--background)",
      color: "var(--foreground)",
    }}>{item.question}</h2>
            <p className="text-gray-700 mt-1"     style={{
      background: "var(--background)",
      color: "var(--foreground)",
    }}>{item.answer}</p>
          </div>
        ))}
      </div>
    </main>
    </>
  )
}

export default Page
