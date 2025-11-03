import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { mockProducts } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Truck, Shield, RefreshCcw } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";
import { trackRecentlyViewed } from "@/components/RecentlyViewed";
import ProductReview from "@/components/ProductReview";

const ProductDetail = () => {
  const { id } = useParams();
  const product = mockProducts.find((p) => p.id === id);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  // Track this product as recently viewed
  if (product) {
    trackRecentlyViewed(product);
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold mb-4">
            Product Not Found
          </h1>
          <Link to="/shop">
            <Button>Back to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedProducts = mockProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!product) return;
    
    if (product.sizes && !selectedSize) {
      toast.error("Please select a size");
      return;
    }
    if (product.colors && !selectedColor) {
      toast.error("Please select a color");
      return;
    }
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize || undefined,
      color: selectedColor || undefined,
    }, quantity);
  };

  const handleToggleWishlist = () => {
    if (!product) return;
    toggleWishlist(product.id);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8 animate-fade-in">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link to="/shop" className="hover:text-primary transition-colors">
              Shop
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Image */}
            <div className="animate-fade-in">
              <div className="aspect-[3/4] rounded-lg overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover-scale"
                />
              </div>
            </div>

            {/* Info */}
            <div className="animate-slide-up space-y-6">
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
                  {product.category}
                </p>
                <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                  {product.name}
                </h1>
                <p className="text-2xl font-semibold text-primary">
                  ${product.price.toFixed(2)}
                </p>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              {/* Size Selection */}
              {product.sizes && (
                <div>
                  <Label className="text-base font-medium mb-3 block">
                    Select Size
                  </Label>
                  <RadioGroup value={selectedSize} onValueChange={setSelectedSize}>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <div key={size}>
                          <RadioGroupItem
                            value={size}
                            id={`size-${size}`}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={`size-${size}`}
                            className="flex items-center justify-center px-4 py-2 border-2 border-border rounded-md cursor-pointer transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground hover:border-primary/50"
                          >
                            {size}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              )}

              {/* Color Selection */}
              {product.colors && (
                <div>
                  <Label className="text-base font-medium mb-3 block">
                    Select Color
                  </Label>
                  <RadioGroup
                    value={selectedColor}
                    onValueChange={setSelectedColor}
                  >
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <div key={color}>
                          <RadioGroupItem
                            value={color}
                            id={`color-${color}`}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={`color-${color}`}
                            className="flex items-center justify-center px-4 py-2 border-2 border-border rounded-md cursor-pointer transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground hover:border-primary/50"
                          >
                            {color}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              )}

              {/* Quantity */}
              <div>
                <Label className="text-base font-medium mb-3 block">
                  Quantity
                </Label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="text-lg font-medium w-12 text-center">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button 
                  size="lg" 
                  variant={isInWishlist(product?.id || "") ? "default" : "outline"}
                  onClick={handleToggleWishlist}
                >
                  <Heart className={`h-5 w-5 ${isInWishlist(product?.id || "") ? "fill-current" : ""}`} />
                </Button>
              </div>

              {/* Features */}
              <div className="border-t border-border pt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Truck className="h-5 w-5 text-primary" />
                  <span>Free shipping on orders over $200</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <RefreshCcw className="h-5 w-5 text-primary" />
                  <span>Free returns within 30 days</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>Secure payment processing</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Reviews Section - TODO: Backend integration */}
          <div className="animate-fade-in mb-20">
            <h2 className="text-3xl font-heading font-bold mb-8">Customer Reviews</h2>
            <div className="space-y-4">
              <ProductReview
                customerName="Sarah Johnson"
                rating={5}
                comment="Absolutely love this product! The quality is exceptional and it fits perfectly. Will definitely order again."
                date="2 days ago"
                avatar=""
              />
              <ProductReview
                customerName="Emma Davis"
                rating={4}
                comment="Great purchase! The delivery was fast and the product matches the description. Highly recommend."
                date="1 week ago"
                avatar=""
              />
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-heading font-bold mb-8 text-center">
                You May Also Like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.id}
                    id={relatedProduct.id}
                    name={relatedProduct.name}
                    price={relatedProduct.price}
                    image={relatedProduct.image}
                    category={relatedProduct.category}
                    isNew={relatedProduct.isNew}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
