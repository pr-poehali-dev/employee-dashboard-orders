import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

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
  const [isPayoutOpen, setIsPayoutOpen] = useState(false);

  const tariffs = [
    { name: '3 Day @here', price: 150 },
    { name: '3 Day @everyone', price: 220 },
    { name: '7d @everyone with Ping On Join', price: 300 },
    { name: '7d @everyone with Join DM', price: 350 },
    { name: '7d @everyone with Ping On Join & Join DM', price: 400 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'payment_pending': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'publication_pending': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'processing': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-gray-100 text-gray-600 border-gray-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'payment_pending': return 'Ожидание подтверждения оплаты';
      case 'publication_pending': return 'Ожидание публикации';
      case 'processing': return 'Выполняется';
      case 'completed': return 'Завершено';
      default: return status;
    }
  };

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return order.status === 'payment_pending' || order.status === 'publication_pending';
    return order.status === activeTab;
  });

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'payment_pending' || o.status === 'publication_pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    completed: orders.filter(o => o.status === 'completed').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Icon name="User" className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-900">Личный кабинет сотрудника</h1>
              <p className="text-sm text-slate-500">Управление заказами рекламы</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <p className="text-sm text-slate-500">Баланс</p>
              <p className="text-lg font-semibold text-slate-900">${balance.toFixed(2)}</p>
            </div>
            <Popover open={isPayoutOpen} onOpenChange={setIsPayoutOpen}>
              <PopoverTrigger asChild>
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                  <Icon name="CreditCard" size={16} className="mr-2" />
                  Выплата
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <div className="space-y-4">
                  <div className="text-center border-b pb-3">
                    <h3 className="font-semibold text-slate-900">Выплата средств</h3>
                    <p className="text-sm text-slate-500 mt-1">Доступно к выплате: <span className="font-medium">${balance.toFixed(2)}</span></p>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <Icon name="Info" size={16} className="text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">График выплат</span>
                    </div>
                    <p className="text-sm text-blue-700 mt-1">Выплаты производятся каждую пятницу автоматически</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">Реквизиты карты</Label>
                      <Input 
                        value={paymentDetails.cardNumber}
                        onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                        placeholder="0000 0000 0000 0000"
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label className="text-sm font-medium">Номер телефона для СБП</Label>
                      <Input 
                        value={paymentDetails.phoneNumber}
                        onChange={(e) => setPaymentDetails({...paymentDetails, phoneNumber: e.target.value})}
                        placeholder="+7 (900) 123-45-67"
                        className="mt-1"
                      />
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => setIsPayoutOpen(false)}
                      >
                        Отмена
                      </Button>
                      <Button 
                        size="sm" 
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700"
                        onClick={() => setIsPayoutOpen(false)}
                      >
                        Сохранить
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white shadow-sm border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Всего заказов</p>
                  <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
                </div>
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Icon name="Package" size={24} className="text-slate-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Ожидание</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Icon name="Clock" size={24} className="text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Выполняется</p>
                  <p className="text-2xl font-bold text-green-600">{stats.processing}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Icon name="Play" size={24} className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-slate-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Завершено</p>
                  <p className="text-2xl font-bold text-slate-600">{stats.completed}</p>
                </div>
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Icon name="CheckCircle" size={24} className="text-slate-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Section */}
        <Card className="bg-white shadow-sm border-slate-200">
          <CardHeader className="border-b border-slate-100">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-slate-900">Лента заказов</CardTitle>
              
              <Dialog open={isNewOrderOpen || !!editingOrder} onOpenChange={(open) => {
                if (!open) {
                  setIsNewOrderOpen(false);
                  setEditingOrder(null);
                }
              }}>
                <DialogTrigger asChild>
                  <Button 
                    className="bg-indigo-600 hover:bg-indigo-700"
                    onClick={() => setIsNewOrderOpen(true)}
                  >
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить заказ
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{editingOrder ? 'Редактирование заказа' : 'Создание нового заказа'}</DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-6 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="channel">Название канала</Label>
                      <Input 
                        id="channel" 
                        placeholder="Введите название канала" 
                        defaultValue={editingOrder?.channel}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="adText">Текст рекламы</Label>
                      <Textarea 
                        id="adText" 
                        placeholder="Введите текст рекламного объявления" 
                        rows={4}
                        defaultValue={editingOrder?.adText}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tariff">Тариф</Label>
                      <Select defaultValue={editingOrder?.tariff}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите тариф" />
                        </SelectTrigger>
                        <SelectContent>
                          {tariffs.map((tariff) => (
                            <SelectItem key={tariff.name} value={tariff.name}>
                              {tariff.name} - ${tariff.price}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Дата публикации</Label>
                      <Calendar
                        mode="single"
                        selected={selectedDate || (editingOrder ? new Date(editingOrder.publishDate) : undefined)}
                        onSelect={setSelectedDate}
                        className="rounded-md border border-slate-200"
                        disabled={(date) => date < new Date()}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="screenshot">Скриншот квитанции</Label>
                      <Input id="screenshot" type="file" accept="image/*" />
                      {editingOrder?.screenshot && (
                        <p className="text-sm text-slate-500">Текущий файл загружен</p>
                      )}
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <Button variant="outline" onClick={() => {
                        setIsNewOrderOpen(false);
                        setEditingOrder(null);
                      }}>
                        Отмена
                      </Button>
                      <Button className="bg-indigo-600 hover:bg-indigo-700">
                        {editingOrder ? 'Сохранить изменения' : 'Создать заказ'}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="all">Все ({stats.total})</TabsTrigger>
                <TabsTrigger value="pending">Ожидание ({stats.pending})</TabsTrigger>
                <TabsTrigger value="processing">Выполняется ({stats.processing})</TabsTrigger>
                <TabsTrigger value="completed">Завершено ({stats.completed})</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab}>
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <Card key={order.id} className={`border transition-all hover:shadow-md ${
                      order.status === 'completed' ? 'bg-gray-50 opacity-75' : 'bg-white'
                    }`}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold text-slate-900">{order.channel}</h3>
                              <Badge className={`${getStatusColor(order.status)} border`}>
                                {getStatusText(order.status)}
                              </Badge>
                              {(order.status === 'payment_pending' || order.status === 'publication_pending') && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="h-7 px-2 text-xs"
                                  onClick={() => {
                                    setEditingOrder(order);
                                    setSelectedDate(new Date(order.publishDate));
                                  }}
                                >
                                  <Icon name="Edit" size={12} className="mr-1" />
                                  Редактировать
                                </Button>
                              )}
                            </div>
                            
                            <p className="text-slate-600 mb-3 line-clamp-2">{order.adText}</p>
                            
                            <div className="flex items-center space-x-6 text-sm text-slate-500">
                              <div className="flex items-center space-x-1">
                                <Icon name="Tag" size={14} />
                                <span>{order.tariff}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Icon name="Calendar" size={14} />
                                <span>{new Date(order.publishDate).toLocaleDateString('ru-RU')}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Icon name="User" size={14} />
                                <span>{order.createdBy}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-lg font-semibold text-slate-900">${order.price}</p>
                            {order.status === 'completed' && (
                              <p className="text-sm text-green-600 mt-1">
                                +${(order.price * 0.1).toFixed(2)} к балансу
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {filteredOrders.length === 0 && (
                    <div className="text-center py-12">
                      <Icon name="Package" size={48} className="text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500">Заказов не найдено</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;