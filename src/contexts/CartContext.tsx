import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
}

interface CartContextType {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("elegante_cart");
    const storedWishlist = localStorage.getItem("elegante_wishlist");
    
    if (storedCart) setCart(JSON.parse(storedCart));
    if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
  }, []);

  useEffect(() => {
    localStorage.setItem("elegante_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("elegante_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (item: Omit<CartItem, "quantity">, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.size === item.size && i.color === item.color);
      
      if (existing) {
        toast.success("Updated cart quantity");
        return prev.map((i) =>
          i.id === item.id && i.size === item.size && i.color === item.color
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      
      toast.success("Added to cart");
      return [...prev, { ...item, quantity }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    toast.success("Removed from cart");
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    toast.success("Cart cleared");
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        toast.success("Removed from wishlist");
        return prev.filter((id) => id !== productId);
      }
      toast.success("Added to wishlist");
      return [...prev, productId];
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
