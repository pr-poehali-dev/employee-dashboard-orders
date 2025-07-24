import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
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
  status: 'pending' | 'processing' | 'completed';
  publishDate: string;
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
      publishDate: '2025-07-28'
    },
    {
      id: '2', 
      channel: '/guilds ->',
      adText: 'a database for guilds...',
      tariff: '7d @everyone with Ping On Join',
      price: 300,
      status: 'pending',
      publishDate: '2025-07-30'
    },
    {
      id: '3',
      channel: '/dating #1 - Adult Server SFW',
      adText: 'If you\'re looking to sell Chatbots or advertise towards more adult geared content dm @06wat',
      tariff: '3 Day @everyone',
      price: 220,
      status: 'completed',
      publishDate: '2025-07-25'
    }
  ]);

  const [activeTab, setActiveTab] = useState('all');
  const [balance] = useState(145.50);
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();

  const tariffs = [
    { name: '3 Day @here', price: 150 },
    { name: '3 Day @everyone', price: 220 },
    { name: '7d @everyone with Ping On Join', price: 300 },
    { name: '7d @everyone with Join DM', price: 350 },
    { name: '7d @everyone with Ping On Join & Join DM', price: 400 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'processing': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-gray-100 text-gray-600 border-gray-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Ожидание';
      case 'processing': return 'Выполняется';
      case 'completed': return 'Завершено';
      default: return status;
    }
  };

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    return order.status === activeTab;
  });

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
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
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <Icon name="CreditCard" size={16} className="mr-2" />
              Выплата
            </Button>
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
              
              <Dialog open={isNewOrderOpen} onOpenChange={setIsNewOrderOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-indigo-600 hover:bg-indigo-700">
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить заказ
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Создание нового заказа</DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-6 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="channel">Название канала</Label>
                      <Input id="channel" placeholder="Введите название канала" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="adText">Текст рекламы</Label>
                      <Textarea id="adText" placeholder="Введите текст рекламного объявления" rows={3} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tariff">Тариф</Label>
                      <Select>
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
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border border-slate-200"
                        disabled={(date) => date < new Date()}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="screenshot">Скриншот квитанции</Label>
                      <Input id="screenshot" type="file" accept="image/*" />
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <Button variant="outline" onClick={() => setIsNewOrderOpen(false)}>
                        Отмена
                      </Button>
                      <Button className="bg-indigo-600 hover:bg-indigo-700">
                        Создать заказ
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
                                <Icon name="DollarSign" size={14} />
                                <span>${order.price}</span>
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