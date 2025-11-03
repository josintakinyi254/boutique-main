import { Link } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
  isNew?: boolean;
}

const ProductCard = ({
  id,
  name,
  price,
  image,
  category,
  isNew = false,
}: ProductCardProps) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  return (
    <div className="group relative animate-fade-in hover-lift">
      <Link to={`/product/${id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted mb-4">
          {isNew && (
            <span className="absolute top-3 left-3 z-10 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
              New
            </span>
          )}
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="icon"
              variant="secondary"
              className="h-9 w-9 rounded-full shadow-lg"
              onClick={(e) => {
                e.preventDefault();
                toggleWishlist(id);
              }}
            >
              <Heart
                className={cn(
                  "h-4 w-4",
                  isInWishlist(id) && "fill-primary text-primary"
                )}
              />
            </Button>
          </div>

          {/* Quick Add to Cart */}
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <Button
              className="w-full bg-background/95 backdrop-blur-sm text-foreground hover:bg-primary hover:text-primary-foreground"
              onClick={(e) => {
                e.preventDefault();
                addToCart({ id, name, price, image });
              }}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </Link>

      <div className="space-y-2">
        {category && (
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            {category}
          </p>
        )}
        <Link to={`/product/${id}`}>
          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {name}
          </h3>
        </Link>
        <p className="text-primary font-semibold">${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
