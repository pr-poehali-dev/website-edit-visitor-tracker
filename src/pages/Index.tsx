import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [balance, setBalance] = useState(5000.00);
  const [showMenu, setShowMenu] = useState(false);
  const [gameChoice, setGameChoice] = useState<string | null>(null);
  const [gameResult, setGameResult] = useState<string>('');
  const [wordGuess, setWordGuess] = useState('');
  
  const playRPS = (choice: string) => {
    const options = ['Камень', 'Ножницы', 'Бумага'];
    const computerChoice = options[Math.floor(Math.random() * 3)];
    setGameChoice(computerChoice);
    
    if (choice === computerChoice) setGameResult('Ничья!');
    else if (
      (choice === 'Камень' && computerChoice === 'Ножницы') ||
      (choice === 'Ножницы' && computerChoice === 'Бумага') ||
      (choice === 'Бумага' && computerChoice === 'Камень')
    ) setGameResult('Вы выиграли! 🎉');
    else setGameResult('Вы проиграли 😢');
  };
  
  return (
    <div className="min-h-screen bg-background">
      <header className="glass-card border-b border-primary/20 p-4 sticky top-0 z-50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sheet open={showMenu} onOpenChange={setShowMenu}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover-lift">
                  <Icon name="Menu" size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="glass-card border-primary/20">
                <div className="flex flex-col gap-4 mt-8">
                  <Button variant="ghost" className="justify-start text-lg hover-lift" onClick={() => setShowMenu(false)}>
                    <Icon name="Home" className="mr-3" size={20} />
                    Главная
                  </Button>
                  <Button variant="ghost" className="justify-start text-lg hover-lift">
                    <Icon name="CreditCard" className="mr-3" size={20} />
                    Мои карты
                  </Button>
                  <Button variant="ghost" className="justify-start text-lg hover-lift">
                    <Icon name="Users" className="mr-3" size={20} />
                    Рефералы
                  </Button>
                  <Button variant="ghost" className="justify-start text-lg hover-lift">
                    <Icon name="History" className="mr-3" size={20} />
                    История операций
                  </Button>
                  <Button variant="ghost" className="justify-start text-lg hover-lift">
                    <Icon name="Gamepad2" className="mr-3" size={20} />
                    Игры
                  </Button>
                  <Button variant="ghost" className="justify-start text-lg hover-lift">
                    <Icon name="Heart" className="mr-3" size={20} />
                    Знакомства
                  </Button>
                  <Button variant="ghost" className="justify-start text-lg hover-lift">
                    <Icon name="MessageCircle" className="mr-3" size={20} />
                    Техподдержка
                  </Button>
                  <Button variant="ghost" className="justify-start text-lg hover-lift">
                    <Icon name="Info" className="mr-3" size={20} />
                    О нас
                  </Button>
                  <Button variant="ghost" className="justify-start text-lg hover-lift">
                    <Icon name="Settings" className="mr-3" size={20} />
                    Панель управления
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            <h1 className="text-2xl font-bold gradient-text">Финансовый Сервис</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
              <p className="text-sm text-muted-foreground">Баланс</p>
              <p className="text-xl font-bold gradient-text">{balance.toFixed(2)} ₽</p>
            </div>
            <Avatar className="border-2 border-primary">
              <AvatarFallback className="bg-primary/20 text-primary font-bold">ИП</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
        <Card className="glass-card border-primary/20 animate-fade-in">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold gradient-text mb-2">Ваш баланс</h2>
                <p className="text-5xl font-bold text-foreground">{balance.toFixed(2)} ₽</p>
              </div>
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center animate-pulse-glow">
                <Icon name="Wallet" size={40} className="text-white" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full h-14 text-lg bg-gradient-to-r from-primary to-secondary hover-lift">
                    <Icon name="Plus" className="mr-2" size={24} />
                    Пополнить
                  </Button>
                </DialogTrigger>
                <DialogContent className="glass-card border-primary/20">
                  <DialogHeader>
                    <DialogTitle className="text-2xl gradient-text">Пополнение баланса</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div className="glass-card p-4 rounded-xl">
                      <p className="text-sm text-muted-foreground mb-2">Реквизиты для перевода:</p>
                      <p className="text-xl font-bold mb-1">89069892267</p>
                      <p className="text-lg text-primary">Озон Банк</p>
                    </div>
                    <div>
                      <Label>Сумма пополнения</Label>
                      <Input type="number" placeholder="Введите сумму" className="glass-card mt-2" />
                    </div>
                    <div>
                      <Label>Загрузите чек об оплате</Label>
                      <Input type="file" accept="image/*" className="glass-card mt-2" />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-primary to-secondary hover-lift">
                      Отправить на проверку
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full h-14 text-lg bg-gradient-to-r from-accent to-purple-500 hover-lift">
                    <Icon name="ArrowDownToLine" className="mr-2" size={24} />
                    Вывести
                  </Button>
                </DialogTrigger>
                <DialogContent className="glass-card border-accent/20">
                  <DialogHeader>
                    <DialogTitle className="text-2xl gradient-text">Вывод средств</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div className="glass-card p-4 rounded-xl">
                      <p className="text-sm text-muted-foreground mb-2">Доступно для вывода:</p>
                      <p className="text-3xl font-bold gradient-text">{balance.toFixed(2)} ₽</p>
                    </div>
                    <div>
                      <Label>Сумма вывода</Label>
                      <Input type="number" placeholder="Введите сумму" className="glass-card mt-2" />
                    </div>
                    <div>
                      <Label>Номер карты</Label>
                      <Input placeholder="0000 0000 0000 0000" className="glass-card mt-2" />
                    </div>
                    <div>
                      <Label>Банк</Label>
                      <Input placeholder="Название банка" defaultValue="Озон Банк" className="glass-card mt-2" />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-accent to-purple-500 hover-lift">
                      Создать заявку на вывод
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Card className="glass-card border-secondary/20 hover-lift cursor-pointer animate-slide-up">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/20 flex items-center justify-center">
                    <Icon name="CreditCard" size={32} className="text-secondary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Оформить карту</h3>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="glass-card border-secondary/20">
              <DialogHeader>
                <DialogTitle className="text-2xl gradient-text">Оформление карты</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="glass-card p-6 rounded-xl text-center">
                  <Icon name="CreditCard" size={64} className="mx-auto mb-4 text-secondary" />
                  <p className="text-lg mb-4">Виртуальная карта</p>
                  <Badge className="text-lg px-4 py-2 bg-secondary/20 text-secondary">500 ₽</Badge>
                </div>
                <div>
                  <Label>ФИО держателя карты</Label>
                  <Input placeholder="Иванов Иван Иванович" className="glass-card mt-2" />
                </div>
                <Button className="w-full bg-gradient-to-r from-secondary to-primary hover-lift">
                  Оформить за 500 ₽
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Card className="glass-card border-primary/20 hover-lift cursor-pointer animate-slide-up">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <Icon name="Users" size={32} className="text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Рефералы</h3>
                  <Badge className="bg-green-500/20 text-green-400">+200₽</Badge>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="glass-card border-primary/20">
              <DialogHeader>
                <DialogTitle className="text-2xl gradient-text">Реферальная программа</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="glass-card p-6 rounded-xl text-center">
                  <h3 className="text-xl font-bold mb-2">Приглашай друзей!</h3>
                  <p className="text-muted-foreground mb-4">200₽ за каждого друга</p>
                  <div className="glass-card p-4 rounded-lg mb-4">
                    <p className="text-sm text-muted-foreground mb-1">Ваша реферальная ссылка</p>
                    <p className="text-lg font-mono font-bold text-primary">REF001</p>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary hover-lift">
                    <Icon name="Share2" className="mr-2" />
                    Поделиться
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Card className="glass-card border-accent/20 hover-lift cursor-pointer animate-slide-up">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                    <Icon name="Heart" size={32} className="text-accent" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Донат</h3>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="glass-card border-accent/20">
              <DialogHeader>
                <DialogTitle className="text-2xl gradient-text">Поддержать проект</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="glass-card p-4 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-2">Реквизиты:</p>
                  <p className="text-xl font-bold mb-1">89069892267</p>
                  <p className="text-lg text-accent">Озон Банк</p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[100, 500, 1000].map((amount) => (
                    <Button key={amount} variant="outline" className="glass-card">
                      {amount} ₽
                    </Button>
                  ))}
                </div>
                <Button className="w-full bg-gradient-to-r from-accent to-purple-500 hover-lift">
                  <Icon name="Heart" className="mr-2" />
                  Донат
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Card className="glass-card border-purple-500/20 hover-lift cursor-pointer animate-slide-up">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Icon name="Gamepad2" size={32} className="text-purple-400" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Игры</h3>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent className="glass-card border-purple-500/20 max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl gradient-text">Игры</DialogTitle>
              </DialogHeader>
              <Tabs defaultValue="rps" className="mt-4">
                <TabsList className="grid w-full grid-cols-2 glass-card">
                  <TabsTrigger value="rps">Камень-ножницы-бумага</TabsTrigger>
                  <TabsTrigger value="word">Угадай слово</TabsTrigger>
                </TabsList>
                
                <TabsContent value="rps" className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {['Камень', 'Ножницы', 'Бумага'].map((choice) => (
                      <Button
                        key={choice}
                        onClick={() => playRPS(choice)}
                        className="h-24 glass-card hover-lift"
                        variant="outline"
                      >
                        {choice === 'Камень' && '✊'}
                        {choice === 'Ножницы' && '✌️'}
                        {choice === 'Бумага' && '✋'}
                        <br />
                        {choice}
                      </Button>
                    ))}
                  </div>
                  {gameResult && (
                    <div className="glass-card p-6 rounded-xl text-center">
                      <p className="text-lg mb-2">Компьютер выбрал: {gameChoice}</p>
                      <p className="text-2xl font-bold gradient-text">{gameResult}</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="word" className="space-y-4">
                  <div className="glass-card p-6 rounded-xl text-center mt-4">
                    <p className="text-xl font-bold mb-4">Загаданное слово: КОСМОС</p>
                    <Input
                      placeholder="Введите ваш вариант"
                      value={wordGuess}
                      onChange={(e) => setWordGuess(e.target.value)}
                      className="glass-card mb-4"
                    />
                    <Button
                      onClick={() => {
                        if (wordGuess.toLowerCase() === 'космос') {
                          alert('Правильно! 🎉');
                        } else {
                          alert('Неправильно, попробуйте еще раз');
                        }
                      }}
                      className="w-full bg-gradient-to-r from-purple-500 to-primary hover-lift"
                    >
                      Проверить
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Card className="glass-card border-pink-500/20 hover-lift cursor-pointer animate-fade-in">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold gradient-text mb-2">Знакомства и Чат</h3>
                    <p className="text-muted-foreground">Первый месяц бесплатно, далее 2000₽/мес</p>
                  </div>
                  <Icon name="Heart" size={48} className="text-pink-500" />
                </div>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="glass-card border-pink-500/20 max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl gradient-text">Знакомства</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="glass-card p-6 rounded-xl bg-gradient-to-r from-pink-500/10 to-purple-500/10">
                <Badge className="mb-3 bg-green-500/20 text-green-400">Пробный период активен</Badge>
                <p className="text-lg font-bold mb-2">Первый месяц бесплатно!</p>
                <p className="text-muted-foreground">После — 2000₽ в месяц</p>
              </div>

              <div className="glass-card p-4 rounded-xl">
                <h4 className="font-bold mb-3 flex items-center gap-2">
                  <Icon name="MessageCircle" size={20} className="text-primary" />
                  Чат знакомств
                </h4>
                <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                  {[
                    { user: 'Анна', message: 'Привет! Как дела?', time: '14:30' },
                    { user: 'Вы', message: 'Отлично! А у тебя?', time: '14:32', isOwn: true },
                    { user: 'Анна', message: 'Тоже хорошо 😊', time: '14:33' },
                  ].map((msg, i) => (
                    <div
                      key={i}
                      className={`glass-card p-3 rounded-lg ${msg.isOwn ? 'ml-auto bg-primary/10 max-w-[80%]' : 'mr-auto bg-secondary/10 max-w-[80%]'}`}
                    >
                      <p className="font-semibold text-sm mb-1">{msg.user}</p>
                      <p className="text-sm">{msg.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{msg.time}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Напишите сообщение..." className="glass-card" />
                  <Button className="bg-primary hover-lift">
                    <Icon name="Send" size={18} />
                  </Button>
                </div>
              </div>

              <div className="glass-card p-6 rounded-xl">
                <h4 className="font-bold mb-3">Оформить подписку</h4>
                <div className="glass-card p-4 rounded-lg mb-4">
                  <p className="text-sm text-muted-foreground mb-2">Реквизиты для оплаты:</p>
                  <p className="text-xl font-bold mb-1">89069892267</p>
                  <p className="text-lg text-primary">Озон Банк</p>
                  <Badge className="mt-2 bg-primary/20 text-primary">2000 ₽ / месяц</Badge>
                </div>
                <div>
                  <Label>Загрузите чек об оплате</Label>
                  <Input type="file" accept="image/*" className="glass-card mt-2" />
                </div>
                <Button className="w-full mt-4 bg-gradient-to-r from-pink-500 to-purple-500 hover-lift">
                  Отправить чек на проверку
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Tabs defaultValue="history" className="animate-fade-in">
          <TabsList className="grid w-full grid-cols-3 glass-card">
            <TabsTrigger value="history">
              <Icon name="History" className="mr-2" size={18} />
              История
            </TabsTrigger>
            <TabsTrigger value="referrals">
              <Icon name="Users" className="mr-2" size={18} />
              Рефералы
            </TabsTrigger>
            <TabsTrigger value="cards">
              <Icon name="CreditCard" className="mr-2" size={18} />
              Карты
            </TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="mt-6">
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <CardTitle>История операций</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { type: 'deposit', amount: 1000, date: '29.10.2025 14:30', status: 'success' },
                    { type: 'withdraw', amount: 500, date: '28.10.2025 09:15', status: 'pending' },
                    { type: 'referral', amount: 200, date: '27.10.2025 18:45', status: 'success' },
                  ].map((tx, i) => (
                    <div key={i} className="glass-card p-4 rounded-xl hover-lift flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          tx.type === 'deposit' ? 'bg-green-500/20' :
                          tx.type === 'withdraw' ? 'bg-red-500/20' : 'bg-blue-500/20'
                        }`}>
                          <Icon 
                            name={tx.type === 'deposit' ? 'ArrowDownToLine' : tx.type === 'withdraw' ? 'ArrowUpFromLine' : 'Users'} 
                            className={tx.type === 'deposit' ? 'text-green-400' : tx.type === 'withdraw' ? 'text-red-400' : 'text-blue-400'}
                          />
                        </div>
                        <div>
                          <p className="font-semibold">
                            {tx.type === 'deposit' ? 'Пополнение' : tx.type === 'withdraw' ? 'Вывод' : 'Реферал'}
                          </p>
                          <p className="text-sm text-muted-foreground">{tx.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${tx.type === 'withdraw' ? 'text-red-400' : 'text-green-400'}`}>
                          {tx.type === 'withdraw' ? '-' : '+'}{tx.amount} ₽
                        </p>
                        <Badge variant={tx.status === 'success' ? 'default' : 'secondary'}>
                          {tx.status === 'success' ? 'Готово' : 'Ожидает'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="referrals" className="mt-6">
            <Card className="glass-card border-secondary/20">
              <CardHeader>
                <CardTitle>Мои рефералы</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'Алексей И.', earned: 200, completed: true },
                    { name: 'Мария П.', earned: 200, completed: true },
                    { name: 'Дмитрий С.', earned: 0, completed: false },
                  ].map((ref, i) => (
                    <div key={i} className="glass-card p-4 rounded-xl hover-lift flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="border-2 border-secondary">
                          <AvatarFallback className="bg-secondary/20 text-secondary">
                            {ref.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{ref.name}</p>
                          <Badge variant={ref.completed ? 'default' : 'secondary'}>
                            {ref.completed ? 'Выполнено' : 'В процессе'}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-lg font-bold text-green-400">
                        {ref.completed ? `+${ref.earned}₽` : '0₽'}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cards" className="mt-6">
            <Card className="glass-card border-accent/20">
              <CardHeader>
                <CardTitle>Мои карты</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="glass-card p-6 rounded-xl bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 border-primary/30 mb-4">
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <p className="text-sm text-muted-foreground">Виртуальная карта</p>
                      <p className="text-lg font-bold mt-1">Озон Банк</p>
                    </div>
                    <Icon name="CreditCard" size={32} className="text-primary" />
                  </div>
                  <p className="text-2xl font-mono font-bold mb-4 tracking-wider">
                    •••• •••• •••• 4562
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">Держатель</p>
                      <p className="font-semibold">IVAN PETROV</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Срок</p>
                      <p className="font-semibold">12/27</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
