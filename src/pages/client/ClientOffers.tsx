import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tag, Clock, Copy, CheckCircle, Gift, Percent } from "lucide-react";
import { toast } from "sonner";

const ClientOffers = () => {
  const offers = [
    {
      id: "1",
      title: "New Year Mega Sale",
      description: "Get 20% off on all dresses. Limited time offer!",
      type: "percentage",
      value: 20,
      code: "NEWYEAR2025",
      endDate: "2025-01-31T23:59:59",
      minOrder: 5000,
      image: "/placeholder.svg",
      category: "Dresses",
    },
    {
      id: "2",
      title: "First Order Bonus",
      description: "Save KSH 1000 on your first purchase",
      type: "flat",
      value: 1000,
      code: "FIRST1000",
      endDate: "2025-12-31T23:59:59",
      minOrder: 5000,
      image: "/placeholder.svg",
      category: "All Products",
    },
    {
      id: "3",
      title: "Free Shipping Weekend",
      description: "Free delivery on all orders this weekend",
      type: "shipping",
      value: 0,
      code: "FREESHIP",
      endDate: "2025-01-12T23:59:59",
      minOrder: 0,
      image: "/placeholder.svg",
      category: "All Products",
    },
  ];

  const CountdownTimer = ({ endDate }: { endDate: string }) => {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
      const calculateTimeLeft = () => {
        const end = new Date(endDate).getTime();
        const now = new Date().getTime();
        const diff = end - now;

        if (diff <= 0) {
          setTimeLeft("Expired");
          return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      };

      calculateTimeLeft();
      const interval = setInterval(calculateTimeLeft, 60000);
      return () => clearInterval(interval);
    }, [endDate]);

    return (
      <div className="flex items-center gap-2 text-sm font-medium text-primary">
        <Clock className="h-4 w-4" />
        Ends in: {timeLeft}
      </div>
    );
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Coupon code copied!", {
      description: "Paste it at checkout to apply the discount"
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold mb-2">Special Offers</h1>
        <p className="text-muted-foreground">
          Exclusive deals and promotions just for you
        </p>
      </div>

      {/* Featured Offer Banner */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center">
                <Gift className="h-12 w-12 text-primary" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-heading font-bold mb-2">
                Limited Time Offer!
              </h2>
              <p className="text-muted-foreground mb-4">
                Get up to 20% off on selected items. Don't miss out on these amazing deals!
              </p>
              <CountdownTimer endDate={offers[0].endDate} />
            </div>
            <Button size="lg">Shop Now</Button>
          </div>
        </CardContent>
      </Card>

      {/* Offers Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <Card key={offer.id} className="hover-lift overflow-hidden">
            <div className="aspect-video bg-muted relative">
              <div className="absolute top-4 right-4">
                <Badge className="bg-primary text-primary-foreground">
                  {offer.type === "percentage" && (
                    <>
                      <Percent className="h-3 w-3 mr-1" />
                      {offer.value}% OFF
                    </>
                  )}
                  {offer.type === "flat" && (
                    <>
                      <Tag className="h-3 w-3 mr-1" />
                      KSH {offer.value} OFF
                    </>
                  )}
                  {offer.type === "shipping" && "FREE SHIPPING"}
                </Badge>
              </div>
            </div>
            <CardHeader>
              <CardTitle>{offer.title}</CardTitle>
              <CardDescription>{offer.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-medium">{offer.category}</span>
                </div>
                {offer.minOrder > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Min. Order:</span>
                    <span className="font-medium">KSH {offer.minOrder.toLocaleString()}</span>
                  </div>
                )}
                <div className="pt-2">
                  <CountdownTimer endDate={offer.endDate} />
                </div>
              </div>

              <div className="bg-muted p-3 rounded-lg flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Coupon Code</p>
                  <code className="text-lg font-bold">{offer.code}</code>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyCode(offer.code)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>

              <Button className="w-full">
                <Tag className="h-4 w-4 mr-2" />
                Apply Offer
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Personal Rewards */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5" />
            Your Rewards
          </CardTitle>
          <CardDescription>Earned rewards and loyalty bonuses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-6 bg-muted rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">500</div>
              <p className="text-sm text-muted-foreground">Loyalty Points</p>
              <p className="text-xs text-muted-foreground mt-1">= KSH 50 discount</p>
            </div>
            <div className="text-center p-6 bg-muted rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">3</div>
              <p className="text-sm text-muted-foreground">Active Coupons</p>
              <Button variant="link" size="sm" className="mt-1">View All</Button>
            </div>
            <div className="text-center p-6 bg-muted rounded-lg">
              <div className="text-3xl font-bold text-primary mb-2">12</div>
              <p className="text-sm text-muted-foreground">Completed Orders</p>
              <p className="text-xs text-muted-foreground mt-1">2 more for VIP status</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientOffers;
