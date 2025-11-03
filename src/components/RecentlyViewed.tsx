import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

const RecentlyViewed = () => {
  const [recentProducts, setRecentProducts] = useState<Product[]>([]);

  useEffect(() => {
    // TODO: Fetch from localStorage or backend
    const stored = localStorage.getItem("elegante_recently_viewed");
    if (stored) {
      setRecentProducts(JSON.parse(stored));
    }
  }, []);

  if (recentProducts.length === 0) return null;

  return (
    <div className="mt-16">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="h-5 w-5" />
        <h2 className="text-2xl font-heading font-bold">Recently Viewed</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {recentProducts.slice(0, 5).map((product) => (
          <Link key={product.id} to={`/product/${product.id}`}>
            <Card className="group cursor-pointer hover:shadow-lg transition-all">
              <CardContent className="p-0">
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-sm line-clamp-2 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm font-bold text-primary">
                    KSH {product.price.toLocaleString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed;

// Helper function to track viewed products (call from ProductDetail page)
export const trackRecentlyViewed = (product: Product) => {
  const stored = localStorage.getItem("elegante_recently_viewed");
  let recent: Product[] = stored ? JSON.parse(stored) : [];
  
  // Remove if already exists
  recent = recent.filter(p => p.id !== product.id);
  
  // Add to beginning
  recent.unshift(product);
  
  // Keep only last 10
  recent = recent.slice(0, 10);
  
  localStorage.setItem("elegante_recently_viewed", JSON.stringify(recent));
};

