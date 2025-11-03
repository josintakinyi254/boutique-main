import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { mockProducts } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = categoryFilter
    ? mockProducts.filter(
        (p) => p.category.toLowerCase() === categoryFilter.toLowerCase()
      )
    : mockProducts;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-12 text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              {categoryFilter
                ? `${categoryFilter.charAt(0).toUpperCase()}${categoryFilter.slice(1)}`
                : "All Products"}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our curated collection of luxury fashion pieces
            </p>
          </div>

          {/* Filters & Sort */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={!categoryFilter ? "default" : "outline"}
                onClick={() => (window.location.href = "/shop")}
              >
                All
              </Button>
              <Button
                variant={categoryFilter === "dresses" ? "default" : "outline"}
                onClick={() => (window.location.href = "/shop?category=dresses")}
              >
                Dresses
              </Button>
              <Button
                variant={
                  categoryFilter === "accessories" ? "default" : "outline"
                }
                onClick={() =>
                  (window.location.href = "/shop?category=accessories")
                }
              >
                Accessories
              </Button>
              <Button
                variant={categoryFilter === "shoes" ? "default" : "outline"}
                onClick={() => (window.location.href = "/shop?category=shoes")}
              >
                Shoes
              </Button>
              <Button
                variant={categoryFilter === "jewelry" ? "default" : "outline"}
                onClick={() => (window.location.href = "/shop?category=jewelry")}
              >
                Jewelry
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name: A to Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {sortedProducts.map((product) => (
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

          {sortedProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
