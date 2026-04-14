import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import AddToCartButton from '@/components/product/AddToCartButton'
import { getProductByCategoryAndSlug } from '@/lib/data-service'

export const dynamic = 'force-dynamic'

interface ProductPageProps {
    params: Promise<{ category: string, slug: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { category, slug } = await params
    const product: any = await getProductByCategoryAndSlug(category, slug)

    if (!product) {
        notFound()
    }

    return (
        <div className="bg-white min-h-screen">
            {/* Mobile Header / Breadcrumbs */}
            <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between text-sm shadow-sm md:hidden sticky top-0 z-40 relative">
                <Link href={`/products/${category}`} className="flex items-center text-gray-600 font-semibold active:text-primary transition-colors">
                    <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                    {product.category.name}
                </Link>
                <div className="flex items-center gap-4 text-secondary">
                    <svg className="w-5 h-5 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                </div>
            </div>

            <div className="max-w-7xl mx-auto md:px-6 lg:px-8 md:py-8 lg:py-12">
                {/* Desktop Breadcrumbs */}
                <div className="hidden md:flex items-center text-sm text-gray-500 mb-6">
                    <Link href="/products" className="hover:text-primary transition-colors">Shop</Link>
                    <span className="mx-2">›</span>
                    <Link href={`/products/${category}`} className="hover:text-primary transition-colors">{product.category.name}</Link>
                    <span className="mx-2">›</span>
                    <span className="text-secondary font-medium truncate max-w-xs">{product.name}</span>
                </div>

                <div className="flex flex-col md:flex-row gap-0 md:gap-12 items-start">

                    {/* Left: Image Container (Full width on mobile like Amazon) */}
                    <div className="w-full md:w-1/2 lg:w-3/5 bg-white relative border-b border-gray-100 md:border-none md:rounded-2xl sticky top-24">
                        <div className="aspect-square relative flex items-center justify-center p-8 bg-[#f8f9fa] md:rounded-2xl">
                            {/* Decorative badge */}
                            {/* <div className="absolute top-4 right-4 bg-primary text-secondary text-xs font-bold px-2 py-1 rounded shadow-sm z-10 flex items-center gap-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                Best Seller
                            </div> */}

                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-contain p-4 md:p-8 hover:scale-105 transition-transform duration-500 max-h-[500px]"
                                sizes="(max-width: 768px) 100vw, 50vw"
                                priority
                            />
                        </div>
                    </div>

                    {/* Right: Product Info Container */}
                    <div className="w-full md:w-1/2 lg:w-2/5 px-4 pt-4 pb-8 md:px-0 flex flex-col space-y-4">

                        {/* Title and Reviews Block */}
                        <div className="space-y-1 pb-4 border-b border-gray-200">
                            {/* <span className="text-[13px] font-semibold text-secondary hover:text-primary transition-colors cursor-pointer uppercase tracking-wider block mb-1">
                                Visit the {product.category.name} Store
                            </span> */}
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-900 leading-snug tracking-tight mb-2">
                                {product.name}
                            </h1>
                            {/* Mock Reviews List */}
                            {/* <div className="flex items-center gap-1 mt-2">
                                <div className="flex text-primary">
                                    {[...Array(4)].map((_, i) => (
                                        <svg key={i} className="w-4 h-4 md:w-5 md:h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                    ))}
                                    <svg className="w-4 h-4 md:w-5 md:h-5 text-gray-200 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                </div>
                                <span className="text-secondary hover:text-primary cursor-pointer text-sm font-medium ml-2 transition-colors">87 ratings</span>
                            </div> */}
                        </div>

                        {/* Price Block */}
                        <div className="flex flex-col pt-1 pb-3">
                            <div className="flex items-start gap-2 mb-1">
                                <span className="text-secondary text-2xl md:text-3xl font-black">-15%</span>
                                <span className="text-3xl md:text-4xl font-black text-gray-900 flex items-start">
                                    <span className="text-sm md:text-base font-medium align-text-top mr-0.5 mt-1">₹</span>
                                    {Math.floor(product.price)}
                                    <span className="text-sm md:text-base font-bold align-text-top ml-0.5 mt-1">{(product.price % 1).toFixed(2).substring(2)}</span>
                                </span>
                            </div>
                            <span className="text-sm text-gray-500">
                                M.R.P.: <span className="line-through">₹{(product.price * 1.15).toFixed(2)}</span>
                            </span>
                            <span className="text-[13px] font-medium text-gray-900 mt-2">
                                Inclusive of all taxes
                            </span>
                        </div>

                        {/* Amazon Style Action Box (Buy box) */}
                        <div className="bg-white md:border md:border-gray-200 md:rounded-xl md:p-5 flex flex-col gap-3">
                            {/* Stock status */}
                            <h3 className="text-primary font-bold text-lg">In stock</h3>

                            {/* <div className="flex gap-4 text-xs font-medium mt-1">
                                <div className="flex flex-col text-gray-500 gap-1.5">
                                    <span>Ships from</span>
                                    <span>Sold by</span>
                                </div>
                                <div className="flex flex-col text-secondary gap-1.5 font-bold">
                                    <span>Mechanical City</span>
                                    <span>Mechanical City</span>
                                </div>
                            </div> */}

                            {/* Buttons */}
                            <div className="space-y-3 mt-4">
                                <AddToCartButton product={product} size="large" />

                                <button className="w-full py-4 md:py-3.5 px-6 rounded-full font-bold text-base transition-all bg-secondary text-white hover:bg-black active:scale-[0.98] flex items-center justify-center gap-2 shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-secondary">
                                    <svg className="w-5 h-5 mb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    Buy Now
                                </button>
                            </div>

                            <div className="flex items-center gap-2 font-medium text-sm mt-3 pt-4 justify-center text-center">
                                <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                                <span className="text-secondary hover:text-primary hover:underline cursor-pointer transition-colors">Secure transaction</span>
                            </div>
                        </div>

                        {/* About This Item list */}
                        <div className="pt-6 border-t border-gray-200">
                            <h2 className="text-base font-bold text-gray-900 mb-3">About this item</h2>
                            <ul className="list-disc pl-5 space-y-2 text-gray-900 text-sm leading-relaxed">
                                <li>{product.description}</li>
                                <li><strong>Professional Grade Performance:</strong> Engineered for maximum durability in extreme industrial site conditions.</li>
                                <li><strong>Ergonomic Design:</strong> Reduces user fatigue during extended operational periods.</li>
                                <li><strong>Certified Safe:</strong> Meets and exceeds international safety standards for industrial tooling.</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
