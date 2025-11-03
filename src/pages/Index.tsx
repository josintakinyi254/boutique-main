import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { mockProducts } from "@/lib/mockData";
import categoryDresses from "@/assets/category-dresses.jpg";
import categoryAccessories from "@/assets/category-accessories.jpg";
import categoryShoes from "@/assets/category-shoes.jpg";
import categoryJewelry from "@/assets/category-jewelry.jpg";

const Index = () => {
  const featuredProducts = mockProducts.filter((p) => p.isNew).slice(0, 4);

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />

      {/* Categories Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Shop By Category
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our carefully curated collections
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up">
            <CategoryCard
              title="Dresses"
              image={categoryDresses}
              link="/shop?category=dresses"
              delay={0}
            />
            <CategoryCard
              title="Accessories"
              image={categoryAccessories}
              link="/shop?category=accessories"
              delay={100}
            />
            <CategoryCard
              title="Shoes"
              image={categoryShoes}
              link="/shop?category=shoes"
              delay={200}
            />
            <CategoryCard
              title="Jewelry"
              image={categoryJewelry}
              link="/shop?category=jewelry"
              delay={300}
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              New Arrivals
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the latest additions to our collection
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                category={product.category}
                isNew={product.isNew}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Stay in Style
            </h2>
            <p className="text-muted-foreground mb-8">
              Subscribe to receive updates, exclusive deals, and fashion tips
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
