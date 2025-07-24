import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import OrderForm from './OrderForm';

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

interface Stats {
  total: number;
  pending: number;
  processing: number;
  completed: number;
}

interface Tariff {
  name: string;
  price: number;
}

interface OrdersListProps {
  orders: Order[];
  stats: Stats;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isNewOrderOpen: boolean;
  setIsNewOrderOpen: (open: boolean) => void;
  editingOrder: Order | null;
  setEditingOrder: (order: Order | null) => void;
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
  tariffs: Tariff[];
  isMobile: boolean;
}

const OrdersList = ({
  orders,
  stats,
  activeTab,
  setActiveTab,
  isNewOrderOpen,
  setIsNewOrderOpen,
  editingOrder,
  setEditingOrder,
  selectedDate,
  setSelectedDate,
  tariffs,
  isMobile
}: OrdersListProps) => {
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

  const handleCancel = () => {
    setIsNewOrderOpen(false);
    setEditingOrder(null);
  };

  return (
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
                  <OrderForm
                    editingOrder={editingOrder}
                    selectedDate={selectedDate}
                    onDateSelect={setSelectedDate}
                    onCancel={handleCancel}
                    tariffs={tariffs}
                  />
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
                <OrderForm
                  editingOrder={editingOrder}
                  selectedDate={selectedDate}
                  onDateSelect={setSelectedDate}
                  onCancel={handleCancel}
                  tariffs={tariffs}
                />
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
  );
};

export default OrdersList;