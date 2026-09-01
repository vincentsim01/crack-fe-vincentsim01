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
    <div style={{ padding: "20px", textAlign: "center" }}>
       <h1>Sign Up</h1>

 
      <form onSubmit={handleSubmit} 
      style={{ maxWidth: "300px", margin: "0 auto" }}
      >
      <div  style={{ marginBottom: "10px" }}>
        <label htmlFor='name'>Username</label>
        <input type='text' id='name' name='name' value={formData.name} onChange={handleChange} placeholder='name' required className='border border-black rounded-md text-center' style={{ width: "100%", padding: "5px", background: "var(--foreground)",color: "var(--background)", }}/>
      </div>


      <div  style={{ marginBottom: "10px" }}>
        <br></br>
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' name='email' value={formData.email} onChange={handleChange} placeholder='email' required className='border border-black rounded-md text-center' style={{ width: "100%", padding: "5px", background: "var(--foreground)",color: "var(--background)", }}/>
      </div>

        <br></br>
        <div  style={{ marginBottom: "10px" }}>
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' name='password' value={formData.password} onChange={handleChange} placeholder='password' required className='border border-black rounded-md text-center' style={{ width: "100%", padding: "5px", background: "var(--foreground)",color: "var(--background)", }}/>
        </div>
        <br></br>
        <div  style={{ marginBottom: "10px" }}>
        <label htmlFor='role'>Role</label>
        <input type='text' id='role' name='role' value={formData.role} onChange={handleChange} placeholder='role' required className='border border-black rounded-md text-center' style={{ width: "100%", padding: "5px", background: "var(--foreground)",color: "var(--background)", }}/>
        </div>      
        <br></br>
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
         style={{
            padding: "10px 20px",
            backgroundColor: isLoading ? "var(--background)" : "var(--foreground)",
            color: isLoading ? "var(--foreground)" : "var(--background)",
            border: "none",
            borderRadius: "4px",
            cursor: isLoading ? "not-allowed" : "pointer"
          }}
        
        >Submit</button>
      </form>
    </div>
  
    )
}


export default Page
