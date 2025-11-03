import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Package, Users, ShoppingCart, TrendingUp, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    } else if (!isAdmin) {
      navigate("/profile");
    }
  }, [user, isAdmin, navigate]);

  if (!user || !isAdmin) return null;

  const stats = [
    { label: "Total Products", value: "156", icon: Package, change: "+12%" },
    { label: "Total Users", value: "1,234", icon: Users, change: "+8%" },
    { label: "Orders Today", value: "42", icon: ShoppingCart, change: "+23%" },
    { label: "Revenue", value: "$12,456", icon: TrendingUp, change: "+15%" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="mb-8 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-heading font-bold mb-2">Admin Dashboard</h1>
                <p className="text-muted-foreground">Manage your store and monitor performance</p>
              </div>
              <Badge variant="secondary" className="text-sm">Admin</Badge>
            </div>
          </div>

          <Alert className="mb-6 bg-amber-50 border-amber-200 dark:bg-amber-950/50 dark:border-amber-900">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800 dark:text-amber-200">
              This is a demo dashboard. Connect a real backend for full functionality.
            </AlertDescription>
          </Alert>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="animate-fade-in">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                    {stat.change} from last month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Management Tabs */}
          <Card className="animate-fade-in">
            <Tabs defaultValue="products" className="w-full">
              <CardHeader>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="products">Products</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="users">Users</TabsTrigger>
                </TabsList>
              </CardHeader>

              <CardContent>
                <TabsContent value="products" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <CardTitle>Product Management</CardTitle>
                  </div>
                  <CardDescription>
                    Manage your product catalog, inventory, and pricing
                  </CardDescription>
                  <div className="text-center py-12 text-muted-foreground">
                    <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>Product management coming soon...</p>
                  </div>
                </TabsContent>

                <TabsContent value="orders" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <CardTitle>Order Management</CardTitle>
                  </div>
                  <CardDescription>
                    View and manage customer orders and fulfillment
                  </CardDescription>
                  <div className="text-center py-12 text-muted-foreground">
                    <ShoppingCart className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>Order management coming soon...</p>
                  </div>
                </TabsContent>

                <TabsContent value="users" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <CardTitle>User Management</CardTitle>
                  </div>
                  <CardDescription>
                    Manage customer accounts and permissions
                  </CardDescription>
                  <div className="text-center py-12 text-muted-foreground">
                    <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>User management coming soon...</p>
                  </div>
                </TabsContent>
              </CardContent>
            </Tabs>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
