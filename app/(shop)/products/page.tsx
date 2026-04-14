import Link from 'next/link'
import Image from 'next/image'
import { getCategories } from '@/lib/data-service'

export const dynamic = 'force-dynamic'

const getCategoryImageUrl = (categoryName: string, categorySlug: string) => {
  const text = (categoryName + ' ' + categorySlug).toLowerCase()
  if (text.includes('saw') || text.includes('wood')) return '/images/category/circular-saw.png'
  if (text.includes('drill')) return '/images/category/Hand-Drill-Tool.png'
  if (text.includes('hammer')) return '/images/category/hammer-tool.png'
  if (text.includes('wrench')) return '/images/category/wrench-tools.png'
  if (text.includes('cut')) return '/images/category/cutting-tools.png'
  if (text.includes('grind') || text.includes('power')) return '/images/category/grinder-tools.png'
  if (text.includes('blade')) return '/images/category/blades-sets.png'
  if (text.includes('safe') || text.includes('land')) return '/images/category/safety-equipment.png'
  if (text.includes('air')) return '/images/category/air-toolset.png'
  if (text.includes('abrasive') || text.includes('sand') || text.includes('garden')) return '/images/category/Abrasive-tools.png'
  return '/images/category/power-tools.png'
}

export default async function ProductsPage() {
  const categories: any[] = await getCategories()

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-4xl font-bold text-secondary mb-3 tracking-tight">Shop by Category</h1>
        <p className="text-gray-500 text-base">Explore our premium selection of power tools and equipment directly from our catalog.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {categories.map((category) => {
          const imageUrl = category.image || getCategoryImageUrl(category.name, category.slug)

          return (
            <Link
              key={category.slug}
              href={`/products/${category.slug}`}
              className="block group min-h-[160px]"
            >
              <div className="bg-white ring-1 ring-gray-200 rounded-2xl overflow-hidden shadow-sm md:hover:shadow-xl md:hover:shadow-gray-200/50 transition-all duration-300 md:hover:-translate-y-1 relative flex flex-col justify-center h-full p-5 text-center items-center">

                {/* Low Opacity Background Image with Filter */}
                <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
                  <Image
                    src={imageUrl}
                    alt={category.name}
                    fill
                    className="object-contain p-6 opacity-80 mix-blend-multiply transition-transform duration-700 md:group-hover:scale-110 z-0"
                  />
                  {/* Filter Overlay to make texts highly visible */}
                  <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] transition-opacity duration-500 md:group-hover:bg-black/20 z-10"></div>
                </div>

                {/* Decorative hover blobs */}
                <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-primary/20 rounded-full opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 blur-2xl z-0 pointer-events-none"></div>

                {/* Floating Text Overlay */}
                <div className="relative z-20 flex flex-col h-full justify-center w-full">
                  <h2 className="text-xl font-black text-secondary md:group-hover:text-primary transition-colors drop-shadow-sm mb-4 bg-white/30 backdrop-blur-sm px-2 py-1 inline-block rounded-lg mx-auto w-fit">
                    {category.name}
                  </h2>

                  <div className="mt-auto mx-auto flex items-center text-secondary font-bold text-[11px] uppercase tracking-wide md:group-hover:text-primary transition-colors bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-full ring-1 ring-gray-900/10 shadow-sm border border-white">
                    Shop Now
                    <svg className="w-3 h-3 ml-1 transform md:group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
