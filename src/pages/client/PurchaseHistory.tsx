import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, Download, RotateCcw, Star } from "lucide-react";

const PurchaseHistory = () => {
  const purchases = [
    {
      id: "ORD-2025-001",
      date: "2025-01-05",
      items: [
        { name: "Elegant Evening Dress", quantity: 1, price: 12500, image: "/placeholder.svg" },
        { name: "Designer Handbag", quantity: 1, price: 8500, image: "/placeholder.svg" },
      ],
      total: 21000,
      status: "delivered",
      deliveredDate: "2025-01-10",
    },
    {
      id: "ORD-2024-245",
      date: "2024-12-20",
      items: [
        { name: "Gold Necklace", quantity: 1, price: 15000, image: "/placeholder.svg" },
      ],
      total: 15000,
      status: "delivered",
      deliveredDate: "2024-12-25",
    },
  ];

  const getStatusBadge = (status: string) => {
    const config = {
      delivered: { variant: "default" as const, label: "Delivered" },
      processing: { variant: "secondary" as const, label: "Processing" },
      cancelled: { variant: "destructive" as const, label: "Cancelled" },
    };
    const statusConfig = config[status as keyof typeof config] || config.processing;
    return <Badge variant={statusConfig.variant}>{statusConfig.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold mb-2">Purchase History</h1>
        <p className="text-muted-foreground">View your past orders and download invoices</p>
      </div>

      {/* Summary Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Spent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSH 145,000</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Order Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KSH 12,083</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Member Since
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Jun 2024</div>
          </CardContent>
        </Card>
      </div>

      {/* Order History */}
      <div className="space-y-4">
        {purchases.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    Order {order.id}
                    {getStatusBadge(order.status)}
                  </CardTitle>
                  <CardDescription>
                    Ordered on {new Date(order.date).toLocaleDateString()}
                    {order.deliveredDate && ` • Delivered on ${new Date(order.deliveredDate).toLocaleDateString()}`}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold">KSH {order.total.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">{order.items.length} items</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Order Items */}
              <div className="space-y-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 py-3 border-b last:border-0">
                    <div className="h-16 w-16 rounded bg-muted flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">KSH {item.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 pt-4 border-t">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Download Invoice
                </Button>
                <Button variant="outline" size="sm">
                  <Package className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                <Button variant="outline" size="sm">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reorder
                </Button>
                {order.status === "delivered" && (
                  <Button variant="outline" size="sm">
                    <Star className="h-4 w-4 mr-2" />
                    Leave Review
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State for New Users */}
      {purchases.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No Orders Yet</h3>
            <p className="text-muted-foreground mb-6">
              Start shopping to see your order history here
            </p>
            <Button>Browse Products</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PurchaseHistory;
