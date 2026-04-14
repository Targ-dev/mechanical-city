'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuthStore } from '@/store/auth.store'
import { FormEvent, Suspense, useEffect, useState } from 'react'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect')
  const login = useAuthStore((state) => state.login)
  const user = useAuthStore((state) => state.user)
  const isAuthLoading = useAuthStore((state) => state.isLoading)
  const authError = useAuthStore((state) => state.error)
  const [showPassword, setShowPassword] = useState(false)

  // Redirect if already logged in
  useEffect(() => {
    if (!isAuthLoading && user) {
      const target = redirect || '/'
      console.log('User already logged in, redirecting to:', target)
      router.replace(target)
    }
  }, [user, isAuthLoading, redirect, router])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const success = await login(email, password)
    if (success) {
      // Re-fetch user from store to get the role (login sets it)
      const currentUser = useAuthStore.getState().user
      if (currentUser?.role === 'admin' && !redirect) {
        router.push('/admin')
      } else {
        router.push(redirect || '/')
      }
    }
  }

  return (
    <div className="w-full">
      <form className="space-y-3" onSubmit={handleSubmit}>
        {authError && (
          <div className="rounded-xl bg-red-50 p-4 border border-red-100 mb-4">
            <h3 className="text-sm font-medium text-red-800">Login failed</h3>
            <p className="mt-1 text-sm text-red-700">{authError}</p>
          </div>
        )}

        {/* Email Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Email"
            required
            className="block w-full rounded-[14px] border-0 py-3 pl-11 pr-4 text-gray-900 bg-gray-50/80 shadow-sm ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6 font-medium transition-colors"
          />
        </div>

        {/* Password Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Password"
            required
            className="block w-full rounded-[14px] border-0 py-3 pl-11 pr-12 text-gray-900 bg-gray-50/80 shadow-sm ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6 font-medium transition-colors"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none transition-colors"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.83 5.006c5.029 0 8.01 4.398 9.07 6.071a1.984 1.984 0 010 2.046c-.506.822-1.636 2.417-3.14 3.737l-1.332-1.332c1.233-1.077 2.158-2.395 2.502-2.973a.485.485 0 000-.501c-1.025-1.615-3.6-5.548-7.1-5.548-1.018 0-1.956.326-2.825.86l-1.127-1.128A8.618 8.618 0 0111.83 5.006zM8.332 8.332A4.5 4.5 0 0115.82 15.82L8.332 8.332zM3.447 3.447L2.46 4.434l3.197 3.197c-1.503 1.259-2.585 2.766-3.076 3.565a1.985 1.985 0 000 2.045c1.06 1.673 4.04 6.072 9.07 6.072 1.579 0 3.067-.549 4.321-1.408l2.678 2.678.987-.987L3.447 3.447zM6.924 8.78L8.608 10.463A3 3 0 0013.688 15.544l1.642 1.641A5.3 5.3 0 0111.65 17.81c-3.5 0-6.075-3.932-7.1-5.547a.485.485 0 010-.501c.361-.58 1.34-1.958 2.374-2.981z" />
              </svg>
            )}
          </button>
        </div>

        {/* <div className="flex justify-end pt-1">
          <Link href="/forgot-password" className="text-xs font-semibold text-gray-800 hover:text-black transition-colors">
            Forgot password?
          </Link>
        </div> */}

        <div className="pt-2">
          <button
            type="submit"
            disabled={isAuthLoading}
            className={`w-full rounded-2xl bg-[#1e2029] py-3.5 px-4 text-sm font-semibold text-white shadow hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition-all ${isAuthLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isAuthLoading ? 'Signing in...' : 'Get Started'}
          </button>
        </div>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t-[1.5px] border-gray-100 border-dotted" style={{ borderSpacing: '8px' }}></div>
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white/95 backdrop-blur-xl px-4 text-[11px] font-medium text-gray-500 uppercase tracking-widest">New to our store?</span>
          </div>
        </div>

        <div className="mt-5">
          <Link href="/register" className="flex w-full items-center justify-center rounded-2xl bg-white px-3 py-3 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-100 hover:bg-gray-50 transition-colors">
            Create new account
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="relative min-h-[calc(100vh-100px)] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden z-0">

      {/* Dynamic Sky Background Effects */}
      <div className="absolute inset-0 z-[-1]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#bfe4f9] to-[#ffffff]"></div>

        {/* Abstract concentric rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-white/50 opacity-60 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full border border-white/40 opacity-40 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1600px] h-[1600px] rounded-full border border-white/30 opacity-30 pointer-events-none"></div>

        {/* Soft cloud-like blobs to simulate the sky */}
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-white rounded-full mix-blend-overlay filter blur-[100px] opacity-90 pointer-events-none"></div>
        <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-white rounded-full mix-blend-overlay filter blur-[100px] opacity-80 pointer-events-none"></div>
        <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-sky-200 rounded-full mix-blend-multiply filter blur-[80px] opacity-30 pointer-events-none"></div>
      </div>

      <div className="relative z-10 w-full max-w-[360px]">

        {/* Main Card */}
        <div className="bg-white/95 backdrop-blur-3xl pt-8 pb-8 px-6 sm:px-8 shadow-2xl ring-1 ring-gray-900/5 sm:rounded-[2rem] rounded-[1.5rem] relative overflow-hidden border border-white/60">

          {/* Subtle top gradient inside card */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-sky-50 to-transparent pointer-events-none" />

          <div className="relative">
            {/* Login Icon on top */}
            <div className="mx-auto flex h-[48px] w-[48px] items-center justify-center rounded-[14px] bg-white shadow-sm ring-1 ring-gray-100 mb-4 drop-shadow-sm">
              <svg className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            </div>

            <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 mb-1.5">
              Sign in with email
            </h2>
            <p className="text-center text-[13px] leading-relaxed text-gray-500 mb-6 max-w-[280px] mx-auto">
              Make a new account to bring your shopping, orders, and wishlist together. For free
            </p>

            <Suspense fallback={<div className="text-center p-4">Loading form...</div>}>
              <LoginForm />
            </Suspense>
          </div>
        </div>

        {/* The sign up link is missing in the image, but I can add it below the card discretely */}
      </div>
    </div>
  )
}

