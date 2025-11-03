// Mock data for admin dashboard and pages

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'client' | 'admin' | 'support' | 'fulfillment';
  status: 'active' | 'suspended' | 'banned';
  joinedDate: string;
  totalOrders: number;
  totalSpent: number;
  credits: number;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  price: number;
  cost: number;
  taxRate: number;
  category: string;
  stock: number;
  lowStockThreshold: number;
  images: string[];
  status: 'published' | 'draft' | 'archived';
  weight: number;
  dimensions: { length: number; width: number; height: number };
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: { name: string; email: string; phone: string };
  items: { productName: string; quantity: number; price: number }[];
  total: number;
  status: 'pending' | 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  shippingAddress: string;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  status: 'pending' | 'succeeded' | 'failed' | 'refunded';
  method: 'card' | 'mpesa' | 'bank_transfer';
  transactionId?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  customerName: string;
  rating: number;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  images?: string[];
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  type: 'percentage' | 'flat';
  value: number;
  code?: string;
  startDate: string;
  endDate: string;
  productIds?: string[];
  categoryIds?: string[];
  minOrder?: number;
  maxUses?: number;
  usedCount: number;
  status: 'active' | 'scheduled' | 'expired';
}

export interface Ticket {
  id: string;
  subject: string;
  customer: { name: string; email: string };
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdAt: string;
  lastReply: string;
  assignedTo?: string;
}

// Mock Analytics Data
export const analyticsData = {
  todaySales: 45000,
  monthlySales: 1250000,
  ordersPending: 23,
  returnsCount: 5,
  conversionRate: 3.2,
  avgOrderValue: 8500,
  dailySales: [
    { date: '2025-01-01', sales: 35000 },
    { date: '2025-01-02', sales: 42000 },
    { date: '2025-01-03', sales: 38000 },
    { date: '2025-01-04', sales: 51000 },
    { date: '2025-01-05', sales: 47000 },
    { date: '2025-01-06', sales: 55000 },
    { date: '2025-01-07', sales: 45000 },
  ],
  topProducts: [
    { name: 'Evening Dress', sales: 45, revenue: 225000 },
    { name: 'Designer Handbag', sales: 32, revenue: 180000 },
    { name: 'Gold Necklace', sales: 28, revenue: 156000 },
    { name: 'Leather Boots', sales: 25, revenue: 142000 },
    { name: 'Silk Scarf', sales: 22, revenue: 98000 },
  ],
  ordersByStatus: [
    { status: 'Pending', count: 23 },
    { status: 'Processing', count: 45 },
    { status: 'Shipped', count: 67 },
    { status: 'Delivered', count: 234 },
  ],
};

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Jane Doe',
    email: 'jane@example.com',
    phone: '+254712345678',
    role: 'client',
    status: 'active',
    joinedDate: '2024-06-15',
    totalOrders: 12,
    totalSpent: 145000,
    credits: 500,
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+254723456789',
    role: 'admin',
    status: 'active',
    joinedDate: '2023-01-10',
    totalOrders: 0,
    totalSpent: 0,
    credits: 0,
  },
  // Add more mock users as needed
];

// Mock Products
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Elegant Evening Dress',
    sku: 'DRESS-001',
    description: 'Beautiful evening dress perfect for special occasions',
    price: 12500,
    cost: 6000,
    taxRate: 16,
    category: 'Dresses',
    stock: 15,
    lowStockThreshold: 5,
    images: ['/placeholder.svg'],
    status: 'published',
    weight: 0.5,
    dimensions: { length: 120, width: 60, height: 5 },
  },
  // Add more mock products as needed
];

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2025-001',
    customer: {
      name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '+254712345678',
    },
    items: [
      { productName: 'Elegant Evening Dress', quantity: 1, price: 12500 },
      { productName: 'Designer Handbag', quantity: 1, price: 8500 },
    ],
    total: 21000,
    status: 'processing',
    paymentStatus: 'paid',
    shippingAddress: '123 Main St, Nairobi, Kenya',
    trackingNumber: 'TRK123456789',
    createdAt: '2025-01-05T10:30:00',
    updatedAt: '2025-01-05T14:20:00',
  },
  // Add more mock orders as needed
];

// Mock Payments
export const mockPayments: Payment[] = [
  {
    id: '1',
    orderId: '1',
    amount: 21000,
    status: 'succeeded',
    method: 'mpesa',
    transactionId: 'MPESA123456',
    createdAt: '2025-01-05T10:35:00',
  },
  // Add more mock payments as needed
];

// Mock Reviews
export const mockReviews: Review[] = [
  {
    id: '1',
    productId: '1',
    productName: 'Elegant Evening Dress',
    customerName: 'Jane Doe',
    rating: 5,
    comment: 'Absolutely beautiful dress! Perfect fit and excellent quality.',
    status: 'approved',
    createdAt: '2025-01-04T16:20:00',
    images: [],
  },
  // Add more mock reviews as needed
];

// Mock Offers
export const mockOffers: Offer[] = [
  {
    id: '1',
    title: 'New Year Sale',
    description: '20% off on all dresses',
    type: 'percentage',
    value: 20,
    code: 'NEWYEAR2025',
    startDate: '2025-01-01T00:00:00',
    endDate: '2025-01-31T23:59:59',
    categoryIds: ['dresses'],
    minOrder: 5000,
    maxUses: 100,
    usedCount: 45,
    status: 'active',
  },
  // Add more mock offers as needed
];

// Mock Tickets
export const mockTickets: Ticket[] = [
  {
    id: '1',
    subject: 'Order not received',
    customer: { name: 'Jane Doe', email: 'jane@example.com' },
    status: 'open',
    priority: 'high',
    createdAt: '2025-01-05T09:15:00',
    lastReply: '2025-01-05T10:30:00',
    assignedTo: 'Support Team',
  },
  // Add more mock tickets as needed
];
