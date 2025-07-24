import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';

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

interface Tariff {
  name: string;
  price: number;
}

interface OrderFormProps {
  editingOrder: Order | null;
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  onCancel: () => void;
  onSubmit: (order: Order) => void;
  tariffs: Tariff[];
}

const OrderForm = ({ editingOrder, selectedDate, onDateSelect, onCancel, onSubmit, tariffs }: OrderFormProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const selectedTariff = tariffs.find(t => t.name === formData.get('tariff'));
    const newOrder: Order = {
      id: editingOrder?.id || Date.now().toString(),
      channel: formData.get('channel') as string,
      adText: formData.get('adText') as string,
      tariff: formData.get('tariff') as string,
      price: selectedTariff?.price || 0,
      status: editingOrder?.status || 'payment_pending',
      publishDate: selectedDate?.toISOString().split('T')[0] || new Date().toISOString().split('T')[0],
      createdBy: editingOrder?.createdBy || '@current_user',
      screenshot: editingOrder?.screenshot
    };
    
    onSubmit(newOrder);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 py-2">
      <div className="space-y-1">
        <Label htmlFor="channel" className="text-xs">Название канала</Label>
        <Input 
          id="channel" 
          name="channel"
          placeholder="Введите название канала" 
          defaultValue={editingOrder?.channel}
          className="h-8 text-sm"
          required
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="adText" className="text-xs">Текст рекламы</Label>
        <Textarea 
          id="adText" 
          name="adText"
          placeholder="Введите текст рекламного объявления" 
          rows={2}
          defaultValue={editingOrder?.adText}
          className="text-sm resize-none"
          required
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="tariff" className="text-xs">Тариф</Label>
        <Select name="tariff" defaultValue={editingOrder?.tariff} required>
          <SelectTrigger className="h-8 text-sm">
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

      <div className="space-y-1">
        <Label className="text-xs">Дата публикации</Label>
        <Calendar
          mode="single"
          selected={selectedDate || (editingOrder ? new Date(editingOrder.publishDate) : undefined)}
          onSelect={onDateSelect}
          className="rounded-md border border-slate-200 mx-auto text-sm scale-90"
          disabled={(date) => date < new Date()}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="screenshot" className="text-xs">Скриншот квитанции</Label>
        <Input id="screenshot" type="file" accept="image/*" className="h-8 text-sm" />
        {editingOrder?.screenshot && (
          <p className="text-xs text-slate-500">Текущий файл загружен</p>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-2 pt-2">
        <Button 
          variant="outline" 
          className="flex-1 h-8 text-sm"
          onClick={onCancel}
        >
          Отмена
        </Button>
        <Button type="submit" className="flex-1 h-8 text-sm bg-indigo-600 hover:bg-indigo-700">
          {editingOrder ? 'Сохранить изменения' : 'Создать заказ'}
        </Button>
      </div>
    </form>
  );
};

export default OrderForm;