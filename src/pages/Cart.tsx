import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Separator } from "@/components/ui/separator";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const isCartEmpty = cart.length === 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-heading font-bold mb-8 text-center animate-fade-in">
            Shopping Cart
          </h1>

          {isCartEmpty ? (
            <div className="text-center py-16 animate-fade-in">
              <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
              <h2 className="text-2xl font-heading font-semibold mb-4">
                Your cart is empty
              </h2>
              <p className="text-muted-foreground mb-8">
                Discover our beautiful collection and find something you love
              </p>
              <Link to="/shop">
                <Button size="lg">Start Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto animate-fade-in">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-heading font-semibold">
                  Cart Items ({cart.length})
                </h2>
                <Button variant="ghost" onClick={clearCart} size="sm">
                  Clear Cart
                </Button>
              </div>

              <div className="space-y-4 mb-8">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-card p-4 rounded-lg border">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <Link to={`/product/${item.id}`}>
                        <h3 className="font-medium hover:text-primary">{item.name}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">
                        ${item.price.toFixed(2)}
                      </p>
                      {item.size && (
                        <p className="text-xs text-muted-foreground">Size: {item.size}</p>
                      )}
                      {item.color && (
                        <p className="text-xs text-muted-foreground">Color: {item.color}</p>
                      )}
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="font-bold text-primary">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-8" />

              {/* Cart Summary */}
              <div className="bg-muted/30 p-6 rounded-lg">
                <h3 className="text-xl font-heading font-semibold mb-4">Order Summary</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
                <Button size="lg" className="w-full" asChild>
                  <Link to="/checkout">Proceed to Checkout</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
