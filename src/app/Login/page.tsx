
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { API_BASE_URL } from '@/lib/config';

export default function LoginPage() {
  const [email, setEmail] = useState("john@gmail.com");
  const [password, setPassword] = useState("john");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

  const getUserRole = (email: string): 'ADMIN' | 'USER' => {
    return email === 'john@gmail.com' ? 'ADMIN' : 'USER';
  };

  useEffect(() => {
    const token = getCookie('auth-token');
    const savedEmail = getCookie('email');
    if (token && savedEmail) {
      const userRole = getUserRole(savedEmail);
      const redirect = userRole === "ADMIN" ? "/admin" : "/user";
      console.log('Already logged in, redirecting to:', redirect);
      router.push(redirect);
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      console.log('🔑 Attempting login...');
      
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          // expiresInMins: 30,
        }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      console.log('✅ Login API successful');

      // Decode the access token to get user ID
      let userId = null;
      try {
        const decoded: any = jwtDecode(data.access_token);
        userId = decoded.sub || decoded.id || decoded.userId;
        console.log('📋 User ID from token:', userId);
      } catch (decodeError) {
        console.error('Failed to decode token:', decodeError);
      }

      // Set cookies
      setCookie('auth-token', data.access_token, 30);
      setCookie('refresh-token', data.refresh_token, 30);
      setCookie('email', email, 30);
      setCookie('user-role', getUserRole(email), 30);
      if (userId) setCookie('user-id', userId.toString(), 30);

      console.log(getCookie('auth-token'));


      const userResponse = await fetch(`${API_BASE_URL}/user/id/${userId || 'me'}/`, {
        headers: {
          'Authorization': `Bearer ${getCookie('auth-token')}`,
        },
      });

      console.log("userResponse content is "+userResponse.status);
      console.log("acccess token content is "+data.access_token);

      if (userResponse.ok) {
        const userData = await userResponse.json();
        setCookie('user-data', JSON.stringify(userData), 30);
        console.log('✅ User data cached');
      }

      const userRole = getUserRole(email);
      const redirect = userRole === "ADMIN" ? "/admin" : "/user";
      console.log('the value of redirect is '+redirect)
      setTimeout(() => {console.log('🚀 Redirecting to:', redirect)},300)

      
      // Wait a bit to ensure cookies are written
      await new Promise(resolve => setTimeout(resolve, 800));
      console.log('redirect'+redirect);
      router.push(redirect);

    } catch (error) {
      console.error('❌ Login failed:', error);
      setError("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen px-4 py-12 sm:px-6">
      <section className="mx-auto w-full max-w-md border border-current/20 bg-[var(--background)] p-6 shadow-lg sm:p-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="mt-2 text-sm opacity-70">Log in to continue.</p>
        </header>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full border border-current/30 bg-transparent px-3 py-2.5 outline-none transition-colors placeholder:opacity-50 focus:border-current"
            required
          />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-semibold">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full border border-current/30 bg-transparent px-3 py-2.5 outline-none transition-colors placeholder:opacity-50 focus:border-current"
            required
          />
          </div>

          {error && <p role="alert" className="border border-red-600 px-3 py-2 text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[var(--foreground)] px-4 py-3 font-semibold text-[var(--background)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            {isLoading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <aside className="mt-8 border-t border-current/20 pt-5 text-center text-xs opacity-70">
          <p className="font-semibold">Test credentials</p>
          <p className="mt-2">Email: <code>john@gmail.com</code></p>
          <p>Password: <code>john</code></p>
          <p className="mt-3">This account has administrator access.</p>
        </aside>
      </section>
    </main>
  );
}