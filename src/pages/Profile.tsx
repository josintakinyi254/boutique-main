import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User, ShoppingBag, Heart, LogOut, Settings, Package, Tag, CreditCard, MapPin, Bell, MessageSquare } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cart, wishlist, cartTotal } = useCart();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl font-heading font-bold mb-2">My Profile</h1>
            <p className="text-muted-foreground">Manage your account and view your orders</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Profile Info */}
            <Card className="md:col-span-2 animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{user.name}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Account Type</p>
                  <p className="font-medium capitalize">{user.role}</p>
                </div>
                <Separator />
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" className="flex-1">
                    <Settings className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                  <Button variant="outline" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="space-y-4">
              <Card className="animate-fade-in">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Quick Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Link to="/orders" className="block">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Package className="h-4 w-4 mr-2" />
                      Track Orders
                    </Button>
                  </Link>
                  <Link to="/wishlist" className="block">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Heart className="h-4 w-4 mr-2" />
                      Wishlist
                    </Button>
                  </Link>
                  <Link to="/profile/addresses" className="block">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <MapPin className="h-4 w-4 mr-2" />
                      Addresses
                    </Button>
                  </Link>
                  <Link to="/messages" className="block">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Bell className="h-4 w-4 mr-2" />
                      Messages
                    </Button>
                  </Link>
                  <Link to="/settings" className="block">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                  </Link>
                  <Link to="/support" className="block">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Support
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card className="md:col-span-3 animate-fade-in">
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>Your recent purchases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <ShoppingBag className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No orders yet</p>
                  <Link to="/shop">
                    <Button className="mt-4">Start Shopping</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
