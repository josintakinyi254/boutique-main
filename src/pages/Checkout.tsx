import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/CartContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Truck, CreditCard, Tag } from "lucide-react";
import { toast } from "sonner";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const [deliveryOption, setDeliveryOption] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [voucherCode, setVoucherCode] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("default");

  // TODO: Fetch user's saved addresses from backend
  const savedAddresses = [
    { id: "default", label: "Home", address: "123 Main St, Nairobi, Kenya" },
    { id: "work", label: "Work", address: "456 Business Ave, Nairobi, Kenya" },
  ];

  const deliveryFees = {
    standard: 200, // KSH
    express: 500, // KSH
  };

  const deliveryFee = deliveryFees[deliveryOption as keyof typeof deliveryFees];
  const total = cartTotal + deliveryFee;

  const handlePlaceOrder = () => {
    // TODO: API call to create order with selected options
    // TODO: Integrate payment gateway (M-PESA, Card, etc.)
    // TODO: On success, redirect to order confirmation page
    
    toast.success("Order placed successfully!");
    clearCart();
    navigate("/orders");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-heading font-bold mb-4">Your cart is empty</h1>
            <Button onClick={() => navigate("/shop")}>Continue Shopping</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-heading font-bold mb-8 text-center animate-fade-in">
            Checkout
          </h1>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Delivery Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress}>
                    {savedAddresses.map((addr) => (
                      <div key={addr.id} className="flex items-start space-x-3 mb-4">
                        <RadioGroupItem value={addr.id} id={addr.id} />
                        <Label htmlFor={addr.id} className="cursor-pointer flex-1">
                          <div className="font-medium">{addr.label}</div>
                          <div className="text-sm text-muted-foreground">{addr.address}</div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  <Button variant="outline" size="sm" className="mt-4" onClick={() => navigate("/profile/addresses")}>
                    Add New Address
                  </Button>
                </CardContent>
              </Card>

              {/* Delivery Options */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    Delivery Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={deliveryOption} onValueChange={setDeliveryOption}>
                    <div className="flex items-center justify-between p-4 border rounded-lg mb-3">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard" className="cursor-pointer">
                          <div className="font-medium">Standard Delivery</div>
                          <div className="text-sm text-muted-foreground">3-5 business days</div>
                        </Label>
                      </div>
                      <span className="font-medium">KSH {deliveryFees.standard}</span>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="express" id="express" />
                        <Label htmlFor="express" className="cursor-pointer">
                          <div className="font-medium">Express Delivery</div>
                          <div className="text-sm text-muted-foreground">1-2 business days</div>
                        </Label>
                      </div>
                      <span className="font-medium">KSH {deliveryFees.express}</span>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-3 mb-3 p-4 border rounded-lg">
                      <RadioGroupItem value="mpesa" id="mpesa" />
                      <Label htmlFor="mpesa" className="cursor-pointer flex-1">
                        <div className="font-medium">M-PESA</div>
                        <div className="text-sm text-muted-foreground">Pay via mobile money</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 mb-3 p-4 border rounded-lg">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="cursor-pointer flex-1">
                        <div className="font-medium">Credit/Debit Card</div>
                        <div className="text-sm text-muted-foreground">Visa, Mastercard</div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg">
                      <RadioGroupItem value="bank" id="bank" />
                      <Label htmlFor="bank" className="cursor-pointer flex-1">
                        <div className="font-medium">Bank Transfer</div>
                        <div className="text-sm text-muted-foreground">Direct bank payment</div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Voucher Code */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="h-5 w-5" />
                    Apply Voucher
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter voucher code"
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value)}
                    />
                    <Button variant="outline">Apply</Button>
                  </div>
                  {/* TODO: Display applied voucher discount */}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Cart Items */}
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1">
                          <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                          <p className="text-sm font-medium">KSH {(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Price Breakdown */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>KSH {cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>KSH {deliveryFee.toFixed(2)}</span>
                    </div>
                    {/* TODO: Show voucher discount if applied */}
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>KSH {total.toFixed(2)}</span>
                  </div>

                  <Button size="lg" className="w-full" onClick={handlePlaceOrder}>
                    Place Order
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    By placing your order, you agree to our terms and conditions
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
