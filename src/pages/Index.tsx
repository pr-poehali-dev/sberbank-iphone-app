import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const handleBiometricAuth = async () => {
    // Симуляция биометрической аутентификации
    setTimeout(() => {
      setIsAuthenticated(true);
    }, 1500);
  };

  if (!isAuthenticated) {
    return <LoginScreen onAuth={handleBiometricAuth} />;
  }

  return (
    <div className="min-h-screen bg-sberbank-lightGray">
      {/* Статус бар */}
      <div className="bg-white px-4 py-2 flex justify-between items-center text-sm font-medium">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <Icon name="Signal" size={16} />
          <Icon name="Wifi" size={16} />
          <Icon name="Battery" size={16} />
        </div>
      </div>

      {/* Заголовок */}
      <div className="bg-white px-4 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Сбербанк</h1>
            <p className="text-sm text-sberbank-gray">Добро пожаловать, Александр</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Icon name="Bell" size={20} />
            </Button>
            <Button variant="ghost" size="icon">
              <Icon name="MessageCircle" size={20} />
            </Button>
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <div className="px-4 py-6 space-y-6">
        {/* Баланс карты */}
        <Card className="bg-gradient-to-r from-sberbank-green to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm opacity-90">Основная карта</p>
                <p className="text-lg font-medium">•••• 4521</p>
              </div>
              <Icon name="CreditCard" size={24} className="opacity-90" />
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold">245 670 ₽</p>
              <p className="text-sm opacity-90">Доступно к снятию</p>
            </div>
          </CardContent>
        </Card>

        {/* Быстрые действия */}
        <div className="grid grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              className="h-20 flex-col gap-2 bg-white hover:bg-gray-50"
            >
              <Icon name={action.icon as any} size={24} className="text-sberbank-green" />
              <span className="text-xs font-medium">{action.label}</span>
            </Button>
          ))}
        </div>

        {/* Последние операции */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Последние операции</h2>
            <Button variant="ghost" size="sm">
              Все
            </Button>
          </div>
          
          <div className="space-y-3">
            {transactions.map((transaction, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        <Icon 
                          name={transaction.icon as any} 
                          size={20} 
                          className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'} 
                        />
                      </div>
                      <div>
                        <p className="font-medium">{transaction.title}</p>
                        <p className="text-sm text-sberbank-gray">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-gray-900'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}{transaction.amount} ₽
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Нижняя навигация */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          {navigationItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className={`flex-col gap-1 h-16 ${
                activeTab === item.id ? 'text-sberbank-green' : 'text-sberbank-gray'
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon name={item.icon as any} size={20} />
              <span className="text-xs">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

function LoginScreen({ onAuth }: { onAuth: () => void }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = () => {
    setIsLoading(true);
    onAuth();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-8">
        {/* Логотип */}
        <div className="text-center">
          <div className="w-20 h-20 bg-sberbank-green rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Icon name="Building2" size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Сбербанк</h1>
          <p className="text-sberbank-gray">Войдите в приложение</p>
        </div>

        {/* Аутентификация */}
        <div className="space-y-6">
          <Button
            onClick={handleAuth}
            disabled={isLoading}
            className="w-full h-14 bg-sberbank-green hover:bg-green-600 text-white font-medium rounded-xl"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Проверка...</span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Icon name="Fingerprint" size={24} />
                <span>Face ID / Touch ID</span>
              </div>
            )}
          </Button>

          <div className="text-center">
            <Button variant="ghost" className="text-sberbank-green">
              Войти по коду
            </Button>
          </div>
        </div>

        {/* Безопасность */}
        <div className="text-center text-xs text-sberbank-gray space-y-2">
          <p>Ваши данные защищены</p>
          <div className="flex items-center justify-center gap-2">
            <Icon name="Shield" size={16} className="text-sberbank-green" />
            <span>256-битное шифрование</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const quickActions = [
  { icon: 'ArrowUpRight', label: 'Перевод' },
  { icon: 'CreditCard', label: 'Платежи' },
  { icon: 'QrCode', label: 'QR-код' },
  { icon: 'Phone', label: 'Мобильный' }
];

const transactions = [
  {
    title: 'Пятёрочка',
    date: 'Сегодня, 14:32',
    amount: '1 245',
    type: 'expense',
    icon: 'ShoppingCart',
    status: 'Выполнено'
  },
  {
    title: 'Зарплата',
    date: '1 октября',
    amount: '95 000',
    type: 'income',
    icon: 'TrendingUp',
    status: 'Поступление'
  },
  {
    title: 'Кофе',
    date: 'Вчера, 09:15',
    amount: '350',
    type: 'expense',
    icon: 'Coffee',
    status: 'Выполнено'
  }
];

const navigationItems = [
  { id: 'home', icon: 'Home', label: 'Главная' },
  { id: 'cards', icon: 'CreditCard', label: 'Карты' },
  { id: 'transfers', icon: 'ArrowUpRight', label: 'Переводы' },
  { id: 'payments', icon: 'Receipt', label: 'Платежи' },
  { id: 'history', icon: 'History', label: 'История' },
  { id: 'deposits', icon: 'PiggyBank', label: 'Депозиты' },
  { id: 'credits', icon: 'Banknote', label: 'Кредиты' },
  { id: 'profile', icon: 'User', label: 'Профиль' }
];