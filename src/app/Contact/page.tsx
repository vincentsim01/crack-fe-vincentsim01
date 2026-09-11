"use client";
import React from 'react'
import BannerContact from '../component/banner/bannerContact'
import { useTheme } from '../context/themeContext'
import { API_BASE_URL } from '@/lib/config'

const Contact = () => {
  const { theme } = useTheme();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.text();
        console.error('Contact API error:', res.status, body);
        alert('Failed to send message. Please try again later.');
        return;
      }

      alert('Your message has been sent!');
      form.reset();
    } catch (err) {
      console.error('Error submitting contact form:', err);
      alert('Network error. Please try again later.');
    }
  };
  return (
    <>
    <BannerContact></BannerContact>
<div className="mx-auto my-10 grid w-full max-w-5xl overflow-hidden rounded-2xl shadow-2xl md:grid-cols-[0.85fr_1.15fr]"
  style={{
    background: "var(--foreground)",
    color: theme === 'light' ? '#ffffff' : 'var(--background)',
  }}
>
  <section className={`flex flex-col justify-between gap-8 p-8 text-white md:p-10 shadow-2xl ${
    theme === 'light' ? 'bg-black' : 'bg-white'
  }`}>
    <div className={theme === 'light' ? 'text-white' : 'text-black'}>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-red-400">Contact</p>
      <h2 className="text-3xl font-bold leading-tight">Let&apos;s start a conversation.</h2>
      <p className={`mt-4 text-sm leading-6 ${theme === 'light' ? 'text-white' : 'text-black'}`}>
        Have a question about our collection or services? Send us a message and our team will get back to you.
      </p>
    </div>

    <div className={`space-y-5 text-sm ${theme === 'light' ? 'text-white' : 'text-black'}`}>
      <p className="flex flex-col gap-1">
        <span className={`text-xs font-semibold uppercase tracking-wider ${theme === 'light' ? 'text-white/50' : 'text-black/50'}`}>Call us</span>
          <a
            href="tel:+6281211112222"
            className="font-medium  transition-colors hover:text-red-300"
          >
            +62 812 1111 2222
          </a>
      </p>
      <p className="flex flex-col gap-1">
        <span className={`text-xs font-semibold uppercase tracking-wider ${theme === 'light' ? 'text-white/50' : 'text-black/50'}`}>Visit us</span>
        <span className="font-medium">Unik Street, 292</span>
      </p>
      <p className="flex flex-col gap-1">
        <span className={`text-xs font-semibold uppercase tracking-wider ${theme === 'light' ? 'text-white/50' : 'text-black/50'}`}>Email us</span>
          <a
            href="mailto:contact@unikloh.com"
            className="font-medium  transition-colors hover:text-red-300"
          >
            contact@unikloh.com
          </a>
      </p>
    </div>
  </section>

  <section
    className=" p-8 md:p-10"
    style={{
      background: theme === 'dark' ? '#991b1b' : '#ffffff',
      color: theme === 'dark' ? '#ffffff' : '#000000',
    }}
  >
    <div className="mb-7">
      <h2 className="text-2xl font-bold">Send us a message</h2>
      <p className="mt-2 text-sm opacity-70">We usually respond within one business day.</p>
    </div>

  <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
    <div className="flex flex-col">
      <label htmlFor="name" className="mb-2 text-sm font-semibold">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Arthur"
        required
        className="rounded-lg border border-black/20 bg-white px-4 py-3 text-black placeholder:text-black/40 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 dark:border-white/20 dark:bg-black dark:text-white dark:placeholder:text-white/40"
      />
    </div>

    <div className="flex flex-col">
      <label htmlFor="email" className="mb-2 text-sm font-semibold">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="arthur@gmail.com"
        required
        className="rounded-lg border border-black/20 bg-white px-4 py-3 text-black placeholder:text-black/40 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 dark:border-white/20 dark:bg-black dark:text-white dark:placeholder:text-white/40"
      />
    </div>

    <div className="flex flex-col">
      <label htmlFor="mobile" className="mb-2 text-sm font-semibold">Mobile</label>
      <input
        type="tel"
        id="mobile"
        name="mobile"
        placeholder="11112222"
        required
        className="rounded-lg border border-black/20 bg-white px-4 py-3 text-black placeholder:text-black/40 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 dark:border-white/20 dark:bg-black dark:text-white dark:placeholder:text-white/40"
      />
    </div>

    <div className="flex flex-col">
      <label htmlFor="message" className="mb-2 text-sm font-semibold">Message</label>
      <textarea
        id="message"
        name="message"
        placeholder="Hey, I want to send an enquiry"
        required
        className="h-32 resize-none rounded-lg border border-black/20 bg-white px-4 py-3 text-black placeholder:text-black/40 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 dark:border-white/20 dark:bg-black dark:text-white dark:placeholder:text-white/40"
      />
    </div>

    <button
      type="submit"
      className="mt-2 rounded-lg bg-white py-3 font-semibold text-black shadow-sm transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-white/60"
      style={{
        background: "#ffffff",
        color: "#000000",
      }}
    >
      Send Message
    </button>
  </form>
  </section>
</div>
</>
  )
}

export default Contact
