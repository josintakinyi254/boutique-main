import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { mockProducts } from "@/lib/mockData";

const Wishlist = () => {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  
  // Get full product details for wishlist items
  const wishlistItems = mockProducts.filter(product => wishlist.includes(product.id));

  const handleRemove = (id: string) => {
    toggleWishlist(id);
  };

  const handleAddToCart = (item: typeof wishlistItems[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-4xl font-heading font-bold">My Wishlist</h1>
            <p className="text-muted-foreground">
              {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
            </p>
          </div>

          {wishlistItems.length === 0 ? (
            <div className="text-center py-16 animate-fade-in">
              <Heart className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
              <h2 className="text-2xl font-heading font-semibold mb-4">
                Your wishlist is empty
              </h2>
              <p className="text-muted-foreground mb-8">
                Save your favorite items for later
              </p>
              <Link to="/shop">
                <Button size="lg">Browse Products</Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-6">
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-card border rounded-lg p-6 flex flex-col md:flex-row gap-6 animate-fade-in"
                >
                  <Link to={`/product/${item.id}`} className="w-full md:w-48 h-48 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <Link to={`/product/${item.id}`}>
                        <h3 className="text-xl font-heading font-bold mb-2 hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-2xl font-semibold text-primary mb-4">
                        KSH {item.price.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground mb-4">
                        {item.category}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button
                        onClick={() => handleAddToCart(item)}
                        className="flex-1 md:flex-initial"
                      >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleRemove(item.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Wishlist;
