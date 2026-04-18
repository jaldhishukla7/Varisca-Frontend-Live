import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import type { Product } from '@/lib/data';
import { TrendingCollectionCard } from '@/components/home/TrendingCollectionCard';
import { Button } from '@/components/ui/button';

function pickTshirts(products: Product[]): Product[] {
  const isTshirt = (p: Product) => /tshirt|t-?shirt|tee/i.test((p.subcategory || '').trim());
  const men = products.filter(
    (p) => (p.category || '').toLowerCase() === 'men' && isTshirt(p),
  );
  if (men.length >= 4) return men.slice(0, 4);
  const anyTs = products.filter((p) => isTshirt(p));
  const seen = new Set(men.map((p) => p.id));
  const merged = [...men, ...anyTs.filter((p) => !seen.has(p.id))];
  return merged.slice(0, 4);
}

function pickKurtis(products: Product[]): Product[] {
  return products
    .filter(
      (p) =>
        (p.category || '').toLowerCase() === 'women' &&
        (p.subcategory || '').toLowerCase() === 'kurti',
    )
    .slice(0, 4);
}

export const TrendingProducts = () => {
  const { data: products, isLoading } = useProducts();

  const { tshirts, kurtis } = useMemo(() => {
    const list = products ?? [];
    return { tshirts: pickTshirts(list), kurtis: pickKurtis(list) };
  }, [products]);

  if (isLoading) {
    return <div className="py-24 text-center">Loading Trending Products...</div>;
  }

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col items-center text-center md:flex-row md:items-end md:justify-between md:text-left"
        >
          <div className="mb-6 md:mb-0">
            <h2 className="section-title mb-2">Trending Now</h2>
            <p className="text-lg text-muted-foreground">Most loved pieces this week</p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/shop" className="gap-2">
              View All
              <ArrowRight size={16} />
            </Link>
          </Button>
        </motion.div>

        <div className="space-y-14">
          <div>
            <h3 className="mb-6 text-center text-base font-semibold tracking-tight md:text-lg">
              T-Shirts
            </h3>
            {tshirts.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground">No t-shirt listings yet.</p>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6">
                {tshirts.map((product) => (
                  <TrendingCollectionCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="mb-6 text-center text-base font-semibold tracking-tight md:text-lg">
              Kurtis
            </h3>
            {kurtis.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground">No kurti listings yet.</p>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4 lg:gap-6">
                {kurtis.map((product) => (
                  <TrendingCollectionCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
