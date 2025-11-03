import { useEffect } from "react";
import { useNavigate, Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, Users, Package, ShoppingCart, CreditCard,
  MessageSquare, Tag, Headphones, Settings, LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAdmin, logout } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    } else if (!isAdmin) {
      navigate("/profile");
    }
  }, [user, isAdmin, navigate]);

  if (!user || !isAdmin) return null;

  const adminNav = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Products", path: "/admin/products", icon: Package },
    { name: "Orders", path: "/admin/orders", icon: ShoppingCart },
    { name: "Payments", path: "/admin/payments", icon: CreditCard },
    { name: "Offers", path: "/admin/offers", icon: Tag },
    { name: "Feedback", path: "/admin/feedback", icon: MessageSquare },
    { name: "Support", path: "/admin/support", icon: Headphones },
  ];

  const isActivePath = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Navbar />

      <div className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-[240px_1fr] gap-8">
            {/* Sidebar */}
            <aside className="space-y-2">
              <div className="bg-card rounded-lg border p-4">
                <h2 className="font-heading font-bold mb-4">Admin Panel</h2>
                <nav className="space-y-1">
                  {adminNav.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                        isActivePath(item.path)
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </Link>
                  ))}
                  
                  <div className="pt-4 mt-4 border-t space-y-1">
                    <Link
                      to="/settings"
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                    <Button
                      variant="ghost"
                      className="w-full justify-start px-3 py-2 h-auto font-medium text-sm"
                      onClick={() => {
                        logout();
                        navigate("/auth");
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Logout
                    </Button>
                  </div>
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <main className="min-h-[600px]">
              <Outlet />
            </main>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminLayout;
