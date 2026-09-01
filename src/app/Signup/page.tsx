"use client"
import React,{useState,useEffect} from 'react';
import {useRouter} from 'next/navigation';


const Page = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const setCookie = (name: string, value: string, minutes: number = 30) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + (minutes * 60 * 1000));
    document.cookie = `${name}=${value}; path=/; expires=${expires.toUTCString()}`;
    console.log(`🍪 Cookie set: ${name}`);
  };

  const getCookie = (name: string): string | null => {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith(`${name}=`))
      ?.split('=')[1] || null;
  };

  console.log('test')


    const initialValue = {
        name: 'Arthur',
        email: 'arthur@gmail.com',
        password: 'arthur123',
        role:'USER',
        // birthday:'1 March 1970'
    }
    const [formData, setFormData] = useState(initialValue);

    function handleChange(e:React.ChangeEvent<HTMLInputElement>){
        const {name, value} = e.target;
        setFormData({...formData, [name]:value});
    }

    async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        setIsLoading(true);

            try {
      console.log('🔑 Attempting signup...');
      
      const response = await fetch('https://revoubackend6-production.up.railway.app/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          // expiresInMins: 30,
        }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      console.log('✅ Sign up API successful');


   

      // Get user profile




    } catch (error) {
      console.error('❌ Signup failed:', error);
      setError("Signup failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
        console.log("Form submitted");

        router.push('/Login');
    }
  return (
    <main className="min-h-screen px-4 py-12 sm:px-6">
      <section className="mx-auto w-full max-w-md border border-current/20 bg-[var(--background)] p-6 shadow-lg sm:p-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="mt-2 text-sm opacity-70">Sign up to get started.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-semibold">Username</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your username" required className="w-full border border-current/30 bg-transparent px-3 py-2.5 outline-none transition-colors placeholder:opacity-50 focus:border-current" />
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required className="w-full border border-current/30 bg-transparent px-3 py-2.5 outline-none transition-colors placeholder:opacity-50 focus:border-current" />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-semibold">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Create a password" required className="w-full border border-current/30 bg-transparent px-3 py-2.5 outline-none transition-colors placeholder:opacity-50 focus:border-current" />
          </div>

          <div>
            <label htmlFor="role" className="mb-2 block text-sm font-semibold">Role</label>
            <input type="text" id="role" name="role" value={formData.role} onChange={handleChange} placeholder="USER" required className="w-full border border-current/30 bg-transparent px-3 py-2.5 outline-none transition-colors placeholder:opacity-50 focus:border-current" />
          </div>
          {error && <p role="alert" className="border border-red-600 px-3 py-2 text-sm text-red-600">{error}</p>}
        {/* <div  style={{ marginBottom: "10px" }}>
        <label htmlFor='gender'>Gender</label>
        <input type='text' id='gender' name='gender' value={formData.gender} onChange={handleChange} placeholder='gender' required className='border border-black rounded-md text-center' style={{ width: "100%", padding: "5px", background: "var(--foreground)",color: "var(--background)", }}/>
        </div>      
        <br></br>
        <div  style={{ marginBottom: "10px" }}>
        <label htmlFor='birthday'>Birthday</label>
        <input type='text' id='birthday' name='birthday' value={formData.birthday} onChange={handleChange} placeholder='birthday' required className='border border-black rounded-md text-center' style={{ width: "100%", padding: "5px", background: "var(--foreground)",color: "var(--background)", }}/>
        </div>
        <br></br> */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[var(--foreground)] px-4 py-3 font-semibold text-[var(--background)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
        >
          {isLoading ? "Creating account..." : "Create account"}
        </button>
      </form>
      </section>
    </main>
  
    )
}


export default Page
