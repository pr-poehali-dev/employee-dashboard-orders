import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface PaymentDetails {
  cardNumber: string;
  phoneNumber: string;
}

interface HeaderProps {
  balance: number;
  paymentDetails: PaymentDetails;
  setPaymentDetails: (details: PaymentDetails) => void;
}

const Header = ({ balance, paymentDetails, setPaymentDetails }: HeaderProps) => {
  const [isPayoutOpen, setIsPayoutOpen] = useState(false);

  return (
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
              
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700" onClick={() => setIsPayoutOpen(true)}>
                <Icon name="CreditCard" size={14} className="mr-1" />
                Выплата
              </Button>
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
  );
};

export default Header;