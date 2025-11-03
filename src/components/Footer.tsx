import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-secondary/30 border-t border-border mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-heading font-bold">ÉLÉGANTE</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Curating timeless elegance and sophisticated fashion for the
              modern woman.
            </p>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Shop</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/shop?category=dresses"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Dresses
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=accessories"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Accessories
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=shoes"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Shoes
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=jewelry"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Jewelry
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?filter=new"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Customer Care</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link
                  to="/size-guide"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Size Guide
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Stay Updated</h4>
            <p className="text-muted-foreground text-sm mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="flex-1"
              />
              <Button className="bg-primary hover:bg-primary/90">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ÉLÉGANTE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
