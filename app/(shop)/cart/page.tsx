'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/store/cart.store'

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal } = useCartStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="py-20 flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#232F3E]"></div>
      </div>
    )
  }

  const subtotal = getSubtotal()
  const shipping = 15.00
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div className="mx-auto py-12 px-4 min-h-[60vh] flex items-center justify-center">
        <div className="w-full max-w-4xl bg-white sm:rounded-2xl sm:shadow-sm sm:border sm:border-gray-100 p-8 sm:p-16 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-50 rounded-full flex items-center justify-center mb-6 sm:mb-8 border-4 sm:border-8 border-white shadow-sm">
            <svg className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">Cart is empty.</h1>
          <p className="text-gray-500 mb-8 max-w-sm text-base sm:text-lg font-medium">Your Shopping Cart lives to serve. Give it purpose — fill it with products.</p>
          <Link
            href="/products"
            className="w-full sm:w-auto bg-[#FFD814] text-gray-900 px-8 py-3.5 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-[#F7CA00] transition-colors shadow-sm text-center"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#EAEDED] sm:bg-gray-50/50 pb-20 sm:py-10">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

        {/* DESKTOP HEADER */}
        <div className="hidden lg:flex items-end justify-between mb-8 pb-4 border-b border-gray-200 px-4 sm:px-0 pt-4">
          <h1 className="text-3xl font-extrabold text-[#232F3E] tracking-tight">Shopping Cart</h1>
          <p className="text-lg text-gray-600 font-bold bg-white px-4 py-1.5 rounded-full border border-gray-200">
            {items.length} {items.length === 1 ? 'Item' : 'Items'}
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8 lg:items-start">

          {/* MOBILE FAST CHECKOUT SUMMARY (Shown only on small screens) */}
          <div className="lg:hidden bg-white px-4 py-5 mb-3 border-b border-gray-200 shadow-sm">
            <div className="text-lg mb-3">
              <span className="text-[#0F1111] text-[19px]">Subtotal</span>
              <span className="font-bold text-[#0F1111] text-[19px] ml-1">₹{subtotal.toFixed(2)}</span>
            </div>
            <Link
              href="/checkout"
              className="w-full flex justify-center items-center bg-[#FFD814] px-4 py-3.5 rounded-full font-bold text-[#0F1111] shadow-[0_1px_2px_rgba(0,0,0,0.2)] hover:bg-[#F7CA00] active:bg-[#F0B800] transition-colors"
            >
              Proceed to Buy ({items.length} items)
            </Link>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-2 sm:gap-5">
            {/* MOBILE ONLY TITLE */}
            <div className="lg:hidden px-4 pt-3 pb-2 bg-white border-b border-gray-200 shadow-sm">
              <h1 className="text-2xl font-bold text-[#0F1111]">Cart</h1>
            </div>

            {items.map((item) => (
              <div key={item.id} className="bg-white p-4 sm:p-6 sm:rounded-2xl shadow-sm border-b sm:border border-gray-200 sm:border-gray-200 flex flex-col sm:flex-row gap-4 sm:gap-6 group">

                <div className="flex gap-4">
                  {/* Image */}
                  <div className="w-24 h-24 sm:w-40 sm:h-40 flex-shrink-0 overflow-hidden sm:rounded-xl relative bg-white mix-blend-multiply">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain object-center p-1 sm:p-3 sm:group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </div>

                  {/* Mobile Details Text (Next to image) */}
                  <div className="flex flex-col flex-1 sm:hidden">
                    <h3 className="text-[15px] font-medium leading-tight text-[#0F1111] line-clamp-2 mb-1 cursor-pointer">
                      <Link href={`/products/${item.category.slug}/${item.slug}`}>
                        {item.name}
                      </Link>
                    </h3>
                    <p className="text-[19px] font-bold text-[#0F1111] mt-1">₹{(item.price * item.quantity).toFixed(2)}</p>
                    <p className="text-[12px] text-[#007600] font-medium mt-1">In stock</p>
                    <p className="text-[12px] text-gray-500 mt-0.5">Eligible for FREE Shipping</p>
                  </div>
                </div>

                {/* Desktop Details Text / Mobile Action Bar */}
                <div className="flex flex-1 flex-col justify-between">
                  <div className="hidden sm:block">
                    <div className="flex justify-between items-start text-base text-[#0F1111] mb-1 gap-4">
                      <h3 className="text-[18px] font-medium leading-snug hover:text-[#C7511F] hover:underline transition-colors line-clamp-2">
                        <Link href={`/products/${item.category.slug}/${item.slug}`}>
                          {item.name}
                        </Link>
                      </h3>
                      <p className="text-[20px] font-bold text-[#0F1111] whitespace-nowrap">₹{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                    <p className="text-[14px] text-[#007600] mt-1">In stock</p>
                    <p className="text-[13px] text-gray-500 mt-0.5">Eligible for FREE Shipping</p>
                  </div>

                  {/* Actions (Quantity + Delete) */}
                  <div className="flex items-center gap-3 sm:gap-4 mt-2 sm:mt-6 sm:pt-4">
                    <div className="flex items-center bg-[#F0F2F2] border border-[#D5D9D9] hover:bg-[#E3E6E6] rounded-lg h-8 sm:h-10 shadow-[0_1px_2px_rgba(15,17,17,0.15)] transition-colors overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="w-8 sm:w-10 h-full flex items-center justify-center text-[#0F1111] font-medium text-lg active:bg-[#D5D9D9] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="w-10 sm:w-12 h-full flex items-center justify-center text-[#0F1111] font-bold bg-white text-sm border-x border-[#D5D9D9]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 sm:w-10 h-full flex items-center justify-center text-[#0F1111] font-medium text-lg active:bg-[#D5D9D9] transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <div className="h-5 w-[1px] bg-[#D5D9D9]"></div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="text-[14px] text-[#007185] hover:text-[#C7511F] hover:underline transition-colors pl-1"
                    >
                      Delete
                    </button>

                    <div className="h-5 w-[1px] bg-[#D5D9D9] hidden sm:block"></div>

                    <button
                      type="button"
                      className="text-[14px] text-[#007185] hover:text-[#C7511F] hover:underline transition-colors pl-1 hidden sm:block"
                    >
                      Save for later
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* DESKTOP FULL ORDER SUMMARY (Hidden on mobile) */}
          <div className="hidden lg:block lg:col-span-4 lg:sticky lg:top-24">
            <div className="bg-white rounded-lg border border-[#D5D9D9] p-6 shadow-sm">
              <h2 className="text-[18px] font-medium text-[#0F1111] mb-4">Order Summary</h2>

              <dl className="space-y-2 text-[14px] text-[#0F1111]">
                <div className="flex justify-between items-center">
                  <dt>Items ({items.length}):</dt>
                  <dd>₹{subtotal.toFixed(2)}</dd>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-[#D5D9D9]">
                  <dt>Shipping & handling:</dt>
                  <dd>₹{shipping.toFixed(2)}</dd>
                </div>
                <div className="flex justify-between items-center py-2">
                  <dt className="text-[18px] font-bold text-[#B12704]">Order Total:</dt>
                  <dd className="text-[18px] font-bold text-[#B12704]">₹{total.toFixed(2)}</dd>
                </div>
              </dl>

              <div className="mt-4">
                <Link
                  href="/checkout"
                  className="w-full flex items-center justify-center rounded-full bg-[#FFD814] px-4 py-2 text-[13px] font-medium text-[#0F1111] shadow-[0_1px_2px_rgba(0,0,0,0.1)] hover:bg-[#F7CA00] active:bg-[#F0B800] border border-[#FCD200]"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY BOTTOM CHECKOUT */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-40">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-[#0F1111] text-[15px]">Subtotal w/ Shipping</span>
          <span className="font-bold text-[#b12704] text-[19px]">₹{total.toFixed(2)}</span>
        </div>
        <Link
          href="/checkout"
          className="w-full flex justify-center items-center bg-[#FFD814] px-4 py-3.5 rounded-full font-bold text-[#0F1111] shadow-[0_1px_2px_rgba(0,0,0,0.2)] hover:bg-[#F7CA00] active:bg-[#F0B800] transition-colors"
        >
          Proceed to Checkout ({items.length} items)
        </Link>
      </div>
    </div>
  )
}
