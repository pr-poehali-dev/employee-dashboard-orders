import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Stats {
  total: number;
  pending: number;
  processing: number;
  completed: number;
}

interface StatsCardsProps {
  stats: Stats;
}

const StatsCards = ({ stats }: StatsCardsProps) => {
  return (
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
  );
};

export default StatsCards;