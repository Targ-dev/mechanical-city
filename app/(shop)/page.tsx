import Hero from '@/components/ui/Hero'
import TrendingProducts from '@/components/home/TrendingProducts'
import Benefits from '@/components/home/Benefits'
import PromoBanners from '@/components/home/PromoBanners'
import CategoriesGrid from '@/components/home/CategoriesGrid'
import BoschBanner from '@/components/home/BoschBanner'
import PopularBrands from '@/components/home/PopularBrands'

export default async function ShopHome() {
  return (
    <>
      <Hero
        title="Premium Power Tools"
        subtitle="Built for performance and durability"
        backgroundImage="/images/UI/banner.jpg"
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
