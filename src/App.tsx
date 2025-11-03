import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import Addresses from "./pages/Addresses";
import Settings from "./pages/Settings";
import Wishlist from "./pages/Wishlist";
import Messages from "./pages/Messages";
import Support from "./pages/Support";

// Admin pages
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import UsersManagement from "./pages/admin/UsersManagement";
import ProductsManagement from "./pages/admin/ProductsManagement";
import ProductEdit from "./pages/admin/ProductEdit";
import OrdersManagement from "./pages/admin/OrdersManagement";
import OrderDetail from "./pages/admin/OrderDetail";
import PaymentsTracking from "./pages/admin/PaymentsTracking";
import OffersManagement from "./pages/admin/OffersManagement";
import FeedbackManagement from "./pages/admin/FeedbackManagement";
import SupportTickets from "./pages/admin/SupportTickets";

// Client pages
import OrderTracking from "./pages/client/OrderTracking";
import ClientOffers from "./pages/client/ClientOffers";
import PurchaseHistory from "./pages/client/PurchaseHistory";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/profile/addresses" element={<Addresses />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/support" element={<Support />} />
              
              {/* Client Routes */}
              <Route path="/orders" element={<OrderTracking />} />
              <Route path="/offers" element={<ClientOffers />} />
              <Route path="/history" element={<PurchaseHistory />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="users" element={<UsersManagement />} />
                <Route path="products" element={<ProductsManagement />} />
                <Route path="products/:id/edit" element={<ProductEdit />} />
                <Route path="orders" element={<OrdersManagement />} />
                <Route path="orders/:id" element={<OrderDetail />} />
                <Route path="payments" element={<PaymentsTracking />} />
                <Route path="offers" element={<OffersManagement />} />
                <Route path="feedback" element={<FeedbackManagement />} />
                <Route path="support" element={<SupportTickets />} />
              </Route>
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
