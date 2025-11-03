import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X, Search, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import SearchDialog from "./SearchDialog";

// TODO: Backend - Track wishlist items in database
const getWishlistCount = () => {
  const wishlist = JSON.parse(localStorage.getItem("elegante_wishlist") || "[]");
  return wishlist.length;
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const [wishlistCount, setWishlistCount] = useState(getWishlistCount());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const updateWishlistCount = () => {
      setWishlistCount(getWishlistCount());
    };
    
    window.addEventListener("storage", updateWishlistCount);
    const interval = setInterval(updateWishlistCount, 500);
    
    return () => {
      window.removeEventListener("storage", updateWishlistCount);
      clearInterval(interval);
    };
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "New Arrivals", path: "/shop?filter=new" },
    { name: "Collections", path: "/shop?filter=collections" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-heading font-bold tracking-tight text-foreground hover:text-primary transition-colors"
          >
            ÉLÉGANTE
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors relative group",
                  isActivePath(link.path)
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                )}
              >
                {link.name}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full",
                    isActivePath(link.path) && "w-full"
                  )}
                />
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hidden md:flex"
              onClick={() => setSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
            <Link to="/wishlist">
              <Button variant="ghost" size="icon" className="hidden md:flex relative">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link to={user ? (isAdmin ? "/admin" : "/profile") : "/auth"}>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-6 pb-6 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "text-base font-medium transition-colors py-2",
                    isActivePath(link.path)
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex gap-4 pt-4 border-t border-border">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => {
                    setSearchOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Search className="h-5 w-5" />
                </Button>
                <Link to="/wishlist">
                  <Button variant="ghost" size="icon" className="relative">
                    <Heart className="h-5 w-5" />
                    {wishlistCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {wishlistCount}
                      </span>
                    )}
                  </Button>
                </Link>
                <Link to={user ? (isAdmin ? "/admin" : "/profile") : "/auth"}>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </nav>
  );
};

export default Navbar;
