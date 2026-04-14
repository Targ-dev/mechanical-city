import Hero from '@/components/ui/Hero'
import TrendingProducts from '@/components/home/TrendingProducts'
import Benefits from '@/components/home/Benefits'
import PromoBanners from '@/components/home/PromoBanners'
import CategoriesGrid from '@/components/home/CategoriesGrid'
import BoschBanner from '@/components/home/BoschBanner'
import PopularBrands from '@/components/home/PopularBrands'

import connectDB from '@/lib/db'
import SiteConfig from '@/models/SiteConfig'

export default async function ShopHome() {
  let config = null;
  try {
      await connectDB()
      config = await SiteConfig.findOne()
  } catch (error) {
      console.error('Failed to load hero config', error)
  }

  const heroBanner = config?.banners?.[0] || {
      titleHtml: 'Premium Power Tools',
      subtitle: 'Built for performance and durability',
      imageUrl: '/images/UI/banner.jpg'
  };

  return (
    <>
      <Hero
        title={heroBanner.titleHtml.replace(/<[^>]*>?/gm, '')} // Strip HTML if Hero expects plain string
        subtitle={heroBanner.subtitle}
        backgroundImage={heroBanner.imageUrl || '/images/UI/banner.jpg'}
      />

      <Benefits />

      <TrendingProducts />

      <PromoBanners />

      <CategoriesGrid />

      <BoschBanner />

      <PopularBrands />


    </>
  )
}
