import { useState } from 'react';
import Header from '@/components/Header';
import StatsCards from '@/components/StatsCards';
import OrdersList from '@/components/OrdersList';

interface Order {
  id: string;
  channel: string;
  adText: string;
  tariff: string;
  price: number;
  status: 'payment_pending' | 'publication_pending' | 'processing' | 'completed';
  publishDate: string;
  createdBy: string;
  screenshot?: string;
}

const Index = () => {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      channel: '/like sponsors',
      adText: 'affordable prices for high quality interactive joins starting from $10...',
      tariff: '3 Day @here',
      price: 150,
      status: 'processing',
      publishDate: '2025-07-28',
      createdBy: '@alex_promo'
    },
    {
      id: '2', 
      channel: '/guilds ->',
      adText: 'a database for guilds...',
      tariff: '7d @everyone with Ping On Join',
      price: 300,
      status: 'payment_pending',
      publishDate: '2025-07-30',
      createdBy: '@mike_ads'
    },
    {
      id: '3',
      channel: '/dating #1 - Adult Server SFW',
      adText: 'If you\'re looking to sell Chatbots or advertise towards more adult geared content dm @06wat',
      tariff: '3 Day @everyone',
      price: 220,
      status: 'completed',
      publishDate: '2025-07-25',
      createdBy: '@john_market'
    },
    {
      id: '4',
      channel: '/crypto trading',
      adText: 'Best crypto signals and trading tips for beginners and pros',
      tariff: '7d @everyone with Join DM',
      price: 350,
      status: 'publication_pending',
      publishDate: '2025-07-29',
      createdBy: '@crypto_king'
    }
  ]);

  const [activeTab, setActiveTab] = useState('all');
  const [balance] = useState(145.50);
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [paymentDetails, setPaymentDetails] = useState({ 
    cardNumber: '4532 **** **** 1234',
    phoneNumber: '+7 (900) 123-45-67'
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const tariffs = [
    { name: '3 Day @here', price: 150 },
    { name: '3 Day @everyone', price: 220 },
    { name: '7d @everyone with Ping On Join', price: 300 },
    { name: '7d @everyone with Join DM', price: 350 },
    { name: '7d @everyone with Ping On Join & Join DM', price: 400 }
  ];

  const updateOrder = (updatedOrder: Order) => {
    setOrders(orders.map(order => 
      order.id === updatedOrder.id ? updatedOrder : order
    ));
    setEditingOrder(null);
  };

  const deleteOrder = (orderId: string) => {
    setOrders(orders.filter(order => order.id !== orderId));
  };

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'payment_pending' || o.status === 'publication_pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    completed: orders.filter(o => o.status === 'completed').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header 
        balance={balance}
        paymentDetails={paymentDetails}
        setPaymentDetails={setPaymentDetails}
      />

      <div className="max-w-7xl mx-auto p-3 sm:p-6">
        <StatsCards stats={stats} />
        
        <OrdersList
          orders={orders}
          stats={stats}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isNewOrderOpen={isNewOrderOpen}
          setIsNewOrderOpen={setIsNewOrderOpen}
          editingOrder={editingOrder}
          setEditingOrder={setEditingOrder}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          tariffs={tariffs}
          isMobile={isMobile}
          updateOrder={updateOrder}
          deleteOrder={deleteOrder}
        />
      </div>
    </div>
  );
};

export default Index;