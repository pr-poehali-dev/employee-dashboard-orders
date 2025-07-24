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
  tariffs: Tariff[];
}

const OrderForm = ({ editingOrder, selectedDate, onDateSelect, onCancel, tariffs }: OrderFormProps) => {
  return (
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
          onSelect={onDateSelect}
          className="rounded-md border border-slate-200 mx-auto"
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

      <div className="flex flex-col sm:flex-row gap-2 pt-4">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={onCancel}
        >
          Отмена
        </Button>
        <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700">
          {editingOrder ? 'Сохранить изменения' : 'Создать заказ'}
        </Button>
      </div>
    </div>
  );
};

export default OrderForm;