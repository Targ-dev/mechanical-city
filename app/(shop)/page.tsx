import Hero from '@/components/ui/Hero'
import ProductList from '@/components/product/ProductList'
import { products } from '@/lib/data'

export default function ShopHome() {
  return (
    <>
      <Hero
        title="Premium Mechanical Keyboards"
        subtitle="Built for performance and durability"
      />

      <section className="pb-8">
        <ProductList products={products} />
      </section>
    </>
  )
}
