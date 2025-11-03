import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Bell, Package, Tag, MessageSquare, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  type: "order" | "offer" | "system" | "admin";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  icon: any;
}

const Messages = () => {
  // TODO: Fetch messages from backend with real-time updates
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "order",
      title: "Order Shipped",
      message: "Your order #ORD-2025-001 has been shipped and is on the way!",
      timestamp: "2 hours ago",
      read: false,
      icon: Package,
    },
    {
      id: "2",
      type: "offer",
      title: "New Year Sale - 20% Off!",
      message: "Don't miss our New Year sale! Get 20% off on all dresses. Use code NEWYEAR2025",
      timestamp: "1 day ago",
      read: false,
      icon: Tag,
    },
    {
      id: "3",
      type: "admin",
      title: "Welcome to Elegante!",
      message: "Thank you for joining Elegante. Enjoy exclusive deals and offers!",
      timestamp: "2 days ago",
      read: true,
      icon: MessageSquare,
    },
    {
      id: "4",
      type: "order",
      title: "Order Delivered",
      message: "Your order #ORD-2025-002 has been successfully delivered. Thank you for shopping with us!",
      timestamp: "3 days ago",
      read: true,
      icon: CheckCircle,
    },
  ]);

  const unreadCount = messages.filter(m => !m.read).length;

  const markAsRead = (id: string) => {
    // TODO: API call to mark message as read
    setMessages(messages.map(m => m.id === id ? { ...m, read: true } : m));
  };

  const markAllAsRead = () => {
    // TODO: API call to mark all messages as read
    setMessages(messages.map(m => ({ ...m, read: true })));
  };

  const filterMessages = (type?: string) => {
    if (!type) return messages;
    return messages.filter(m => m.type === type);
  };

  const MessageCard = ({ message }: { message: Message }) => {
    const Icon = message.icon;
    
    return (
      <Card
        className={`cursor-pointer transition-all hover:shadow-md ${
          !message.read ? "border-primary/50 bg-primary/5" : ""
        }`}
        onClick={() => markAsRead(message.id)}
      >
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className={`flex-shrink-0 ${!message.read ? "text-primary" : "text-muted-foreground"}`}>
              <Icon className="h-6 w-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-sm line-clamp-1">{message.title}</h3>
                {!message.read && <Badge variant="default" className="shrink-0">New</Badge>}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                {message.message}
              </p>
              <p className="text-xs text-muted-foreground">{message.timestamp}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-heading font-bold animate-fade-in">Messages</h1>
              {unreadCount > 0 && (
                <p className="text-muted-foreground mt-2">
                  You have {unreadCount} unread message{unreadCount !== 1 ? "s" : ""}
                </p>
              )}
            </div>
            {unreadCount > 0 && (
              <Button variant="outline" onClick={markAllAsRead}>
                Mark All as Read
              </Button>
            )}
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="all" className="gap-2">
                <Bell className="h-4 w-4" />
                All
              </TabsTrigger>
              <TabsTrigger value="order" className="gap-2">
                <Package className="h-4 w-4" />
                Orders
              </TabsTrigger>
              <TabsTrigger value="offer" className="gap-2">
                <Tag className="h-4 w-4" />
                Offers
              </TabsTrigger>
              <TabsTrigger value="admin" className="gap-2">
                <MessageSquare className="h-4 w-4" />
                Admin
              </TabsTrigger>
              <TabsTrigger value="system" className="gap-2">
                <Bell className="h-4 w-4" />
                System
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {messages.map(message => (
                <MessageCard key={message.id} message={message} />
              ))}
            </TabsContent>

            <TabsContent value="order" className="space-y-4">
              {filterMessages("order").map(message => (
                <MessageCard key={message.id} message={message} />
              ))}
            </TabsContent>

            <TabsContent value="offer" className="space-y-4">
              {filterMessages("offer").map(message => (
                <MessageCard key={message.id} message={message} />
              ))}
            </TabsContent>

            <TabsContent value="admin" className="space-y-4">
              {filterMessages("admin").map(message => (
                <MessageCard key={message.id} message={message} />
              ))}
            </TabsContent>

            <TabsContent value="system" className="space-y-4">
              {filterMessages("system").map(message => (
                <MessageCard key={message.id} message={message} />
              ))}
            </TabsContent>
          </Tabs>

          {messages.length === 0 && (
            <div className="text-center py-16">
              <Bell className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No messages yet</h3>
              <p className="text-muted-foreground">
                You'll receive notifications about your orders and special offers here
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Messages;
