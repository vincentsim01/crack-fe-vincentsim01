import React from 'react'
import Link from 'next/link'

const footerLinkClass = 'block text-sm opacity-75 transition-all duration-200 hover:translate-x-1 hover:opacity-100 hover:underline'
const headingClass = 'text-sm font-bold uppercase tracking-widest'

const Footer = () => {
  return (
    <footer className="border-t border-white/30" style={{ background: "var(--foreground)", color: "var(--background)" }}>
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <section>
          <h2 className={headingClass}>About Us</h2>
          <nav className="mt-5 space-y-3" aria-label="About Unik Loh">
            <Link href="/Blog" className={footerLinkClass}>Our Story</Link>
            <Link href="/CSR" className={footerLinkClass}>CSR</Link>
            <Link href="/BusinessOpportunities" className={footerLinkClass}>Business Opportunities</Link>
          </nav>
        </section>

        <section>
          <h2 className={headingClass}>Need Help?</h2>
          <nav className="mt-5 space-y-3" aria-label="Customer support">
            <Link href="/FAQ" className={footerLinkClass}>FAQ</Link>
            <Link href="/Contact" className={footerLinkClass}>Contact Us</Link>
            <Link href="/Privacy" className={footerLinkClass}>Privacy Policy</Link>
          </nav>
        </section>

        <section>
          <h2 className={headingClass}>Account</h2>
          <nav className="mt-5 space-y-3" aria-label="Account links">
            <Link href="/Login" className={footerLinkClass}>Login</Link>
            <Link href="/user" className={footerLinkClass}>My Account</Link>
          </nav>
        </section>

        <section>
          <h2 className={headingClass}>Newsletter</h2>
          <p className="mt-5 text-sm leading-6 opacity-75">Get updates on new arrivals and events.</p>
          <form className="mt-4 flex gap-2">
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input id="newsletter-email" type="email" placeholder="Email address" className="min-w-0 flex-1 border border-white/40 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-current placeholder:opacity-60 focus:border-white" />
            <button type="submit" className="bg-[var(--background)] px-4 py-2 text-sm font-bold text-[var(--foreground)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">Join</button>
          </form>
          <img src="/payment option.png" alt="Accepted payment methods" className="mt-8 h-auto w-48 max-w-full" />
        </section>
      </div>
      <div className="border-t border-white/20 px-6 py-4 text-center text-xs opacity-65">Copyright {new Date().getFullYear()} Unik Loh. All rights reserved.</div>
    </footer>
  )
}

export default Footer
