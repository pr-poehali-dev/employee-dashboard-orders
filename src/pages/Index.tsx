import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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
      case 'payment_pending': return isMobile ? 'Подтверждение оплаты' : 'Ожидание подтверждения оплаты';
      case 'publication_pending': return isMobile ? 'Ожидание публикации' : 'Ожидание публикации';
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
      <header className="bg-white border-b border-slate-200 px-3 sm:px-6 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto">
          {/* Mobile Layout */}
          <div className="sm:hidden">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Icon name="User" className="text-white" size={16} />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-slate-900">Личный кабинет</h1>
                  <p className="text-xs text-slate-500">Управление заказами</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <p className="text-xs text-slate-500">Баланс</p>
                  <p className="text-sm font-semibold text-slate-900">${balance.toFixed(2)}</p>
                </div>
                <Popover open={isPayoutOpen} onOpenChange={setIsPayoutOpen}>
                  <PopoverTrigger asChild>
                    <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                      <Icon name="CreditCard" size={14} className="mr-1" />
                      Выплата
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-72" align="end">
                    <div className="space-y-3">
                      <div className="text-center border-b pb-2">
                        <h3 className="font-semibold text-slate-900">Выплата средств</h3>
                        <p className="text-sm text-slate-500">Доступно: ${balance.toFixed(2)}</p>
                      </div>
                      
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
                        <div className="flex items-center space-x-2">
                          <Icon name="Info" size={14} className="text-blue-600" />
                          <span className="text-xs font-medium text-blue-800">График выплат</span>
                        </div>
                        <p className="text-xs text-blue-700 mt-1">Выплаты каждую пятницу автоматически</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div>
                          <Label className="text-xs font-medium">Реквизиты карты</Label>
                          <Input 
                            value={paymentDetails.cardNumber}
                            onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                            placeholder="0000 0000 0000 0000"
                            className="text-sm h-8"
                          />
                        </div>
                        
                        <div>
                          <Label className="text-xs font-medium">Номер телефона для СБП</Label>
                          <Input 
                            value={paymentDetails.phoneNumber}
                            onChange={(e) => setPaymentDetails({...paymentDetails, phoneNumber: e.target.value})}
                            placeholder="+7 (900) 123-45-67"
                            className="text-sm h-8"
                          />
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 h-8 text-xs"
                            onClick={() => setIsPayoutOpen(false)}
                          >
                            Отмена
                          </Button>
                          <Button 
                            size="sm" 
                            className="flex-1 h-8 text-xs bg-indigo-600 hover:bg-indigo-700"
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
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:flex items-center justify-between">
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
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-3 sm:p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <Card className="bg-white shadow-sm border-slate-200">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-slate-500 mb-1">Всего</p>
                  <p className="text-xl sm:text-2xl font-bold text-slate-900">{stats.total}</p>
                </div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Icon name="Package" size={16} className="sm:hidden text-slate-600" />
                  <Icon name="Package" size={24} className="hidden sm:block text-slate-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-slate-200">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-slate-500 mb-1">Ожидание</p>
                  <p className="text-xl sm:text-2xl font-bold text-orange-600">{stats.pending}</p>
                </div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Icon name="Clock" size={16} className="sm:hidden text-orange-600" />
                  <Icon name="Clock" size={24} className="hidden sm:block text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-slate-200">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-slate-500 mb-1">Активно</p>
                  <p className="text-xl sm:text-2xl font-bold text-green-600">{stats.processing}</p>
                </div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Icon name="Play" size={16} className="sm:hidden text-green-600" />
                  <Icon name="Play" size={24} className="hidden sm:block text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm border-slate-200">
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-slate-500 mb-1">Готово</p>
                  <p className="text-xl sm:text-2xl font-bold text-slate-600">{stats.completed}</p>
                </div>
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Icon name="CheckCircle" size={16} className="sm:hidden text-slate-600" />
                  <Icon name="CheckCircle" size={24} className="hidden sm:block text-slate-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Section */}
        <Card className="bg-white shadow-sm border-slate-200">
          <CardHeader className="border-b border-slate-100 p-3 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <CardTitle className="text-lg sm:text-xl font-semibold text-slate-900">Лента заказов</CardTitle>
              
              {/* Mobile Drawer */}
              <div className="sm:hidden w-full">
                <Drawer open={isNewOrderOpen || !!editingOrder} onOpenChange={(open) => {
                  if (!open) {
                    setIsNewOrderOpen(false);
                    setEditingOrder(null);
                  }
                }}>
                  <DrawerTrigger asChild>
                    <Button 
                      className="w-full bg-indigo-600 hover:bg-indigo-700"
                      onClick={() => setIsNewOrderOpen(true)}
                    >
                      <Icon name="Plus" size={16} className="mr-2" />
                      Добавить заказ
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>{editingOrder ? 'Редактирование заказа' : 'Создание нового заказа'}</DrawerTitle>
                    </DrawerHeader>
                    <div className="px-4 pb-4">
                      <div className="space-y-4 py-4">
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
                            rows={3}
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
                            className="rounded-md border border-slate-200 mx-auto"
                            disabled={(date) => date < new Date()}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="screenshot">Скриншот квитанции</Label>
                          <Input id="screenshot" type="file" accept="image/*" />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 pt-4">
                          <Button 
                            variant="outline" 
                            className="flex-1"
                            onClick={() => {
                              setIsNewOrderOpen(false);
                              setEditingOrder(null);
                            }}
                          >
                            Отмена
                          </Button>
                          <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                            {editingOrder ? 'Сохранить изменения' : 'Создать заказ'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </DrawerContent>
                </Drawer>
              </div>

              {/* Desktop Dialog */}
              <div className="hidden sm:block">
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
            </div>
          </CardHeader>
          
          <CardContent className="p-3 sm:p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4 sm:mb-6 w-full sm:w-auto">
                <TabsTrigger value="all" className="text-xs sm:text-sm">Все ({stats.total})</TabsTrigger>
                <TabsTrigger value="pending" className="text-xs sm:text-sm">Ожидание ({stats.pending})</TabsTrigger>
                <TabsTrigger value="processing" className="text-xs sm:text-sm hidden sm:inline-flex">Активно ({stats.processing})</TabsTrigger>
                <TabsTrigger value="completed" className="text-xs sm:text-sm">Готово ({stats.completed})</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab}>
                <div className="space-y-3 sm:space-y-4">
                  {filteredOrders.map((order) => (
                    <Card key={order.id} className={`border transition-all hover:shadow-md ${
                      order.status === 'completed' ? 'bg-gray-50 opacity-75' : 'bg-white'
                    }`}>
                      <CardContent className="p-3 sm:p-6">
                        <div className="space-y-3">
                          {/* Header */}
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                <h3 className="font-semibold text-slate-900 truncate text-sm sm:text-base">{order.channel}</h3>
                                <Badge className={`${getStatusColor(order.status)} border text-xs w-fit`}>
                                  {getStatusText(order.status)}
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="text-right ml-2">
                              <p className="text-lg sm:text-xl font-semibold text-slate-900">${order.price}</p>
                              {order.status === 'completed' && (
                                <p className="text-xs sm:text-sm text-green-600">
                                  +${(order.price * 0.1).toFixed(2)}
                                </p>
                              )}
                            </div>
                          </div>
                          
                          {/* Content */}
                          <p className="text-slate-600 text-sm sm:text-base line-clamp-2">{order.adText}</p>
                          
                          {/* Footer */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center flex-wrap gap-3 sm:gap-6 text-xs sm:text-sm text-slate-500">
                              <div className="flex items-center space-x-1">
                                <Icon name="Tag" size={12} className="sm:hidden" />
                                <Icon name="Tag" size={14} className="hidden sm:block" />
                                <span className="truncate max-w-[120px] sm:max-w-none">{order.tariff}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Icon name="Calendar" size={12} className="sm:hidden" />
                                <Icon name="Calendar" size={14} className="hidden sm:block" />
                                <span>{new Date(order.publishDate).toLocaleDateString('ru-RU')}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Icon name="User" size={12} className="sm:hidden" />
                                <Icon name="User" size={14} className="hidden sm:block" />
                                <span>{order.createdBy}</span>
                              </div>
                            </div>
                            
                            {(order.status === 'payment_pending' || order.status === 'publication_pending') && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="h-7 px-2 text-xs self-start sm:self-auto"
                                onClick={() => {
                                  setEditingOrder(order);
                                  setSelectedDate(new Date(order.publishDate));
                                }}
                              >
                                <Icon name="Edit" size={12} className="mr-1" />
                                Изменить
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {filteredOrders.length === 0 && (
                    <div className="text-center py-8 sm:py-12">
                      <Icon name="Package" size={32} className="sm:hidden text-slate-300 mx-auto mb-2" />
                      <Icon name="Package" size={48} className="hidden sm:block text-slate-300 mx-auto mb-4" />
                      <p className="text-sm sm:text-base text-slate-500">Заказов не найдено</p>
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