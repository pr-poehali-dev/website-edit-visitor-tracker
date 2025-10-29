import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const mockVisits = [
  { id: 1, user: 'Алексей Иванов', avatar: '', time: '2 мин назад', action: 'Открыл бота', ip: '192.168.1.1' },
  { id: 2, user: 'Мария Петрова', avatar: '', time: '5 мин назад', action: 'Просмотрел каталог', ip: '192.168.1.2' },
  { id: 3, user: 'Дмитрий Сидоров', avatar: '', time: '12 мин назад', action: 'Отправил сообщение', ip: '192.168.1.3' },
  { id: 4, user: 'Анна Смирнова', avatar: '', time: '18 мин назад', action: 'Открыл бота', ip: '192.168.1.4' },
  { id: 5, user: 'Павел Козлов', avatar: '', time: '25 мин назад', action: 'Добавил в избранное', ip: '192.168.1.5' },
];

const mockUsers = [
  { id: 1, name: 'Алексей Иванов', username: '@alexivanov', visits: 24, lastSeen: '2 мин назад', active: true },
  { id: 2, name: 'Мария Петрова', username: '@mariapetrova', visits: 18, lastSeen: '5 мин назад', active: true },
  { id: 3, name: 'Дмитрий Сидоров', username: '@dmitrysid', visits: 42, lastSeen: '12 мин назад', active: false },
  { id: 4, name: 'Анна Смирнова', username: '@annasmith', visits: 31, lastSeen: '18 мин назад', active: false },
  { id: 5, name: 'Павел Козлов', username: '@pavelkozlov', visits: 15, lastSeen: '25 мин назад', active: false },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoResponseEnabled, setAutoResponseEnabled] = useState(false);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-2">Панель управления</h1>
            <p className="text-muted-foreground text-lg">Управляйте своим ботом в реальном времени</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-4 py-2 text-sm animate-pulse-glow">
              <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
              Онлайн
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="glass-card hover-lift border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Всего посещений</p>
                  <p className="text-3xl font-bold gradient-text">2,847</p>
                  <p className="text-xs text-green-400 mt-1">↑ +12.5% за неделю</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Icon name="Users" className="text-primary" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift border-secondary/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Активных сейчас</p>
                  <p className="text-3xl font-bold gradient-text">127</p>
                  <p className="text-xs text-green-400 mt-1">↑ +8.2% за час</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                  <Icon name="Activity" className="text-secondary" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift border-accent/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Новых за сутки</p>
                  <p className="text-3xl font-bold gradient-text">84</p>
                  <p className="text-xs text-green-400 mt-1">↑ +24.1% за день</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Icon name="UserPlus" className="text-accent" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift border-purple-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Ср. время в боте</p>
                  <p className="text-3xl font-bold gradient-text">4:32</p>
                  <p className="text-xs text-green-400 mt-1">↑ +5.7% за неделю</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Icon name="Clock" className="text-purple-400" size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="history" className="w-full">
          <TabsList className="grid w-full grid-cols-4 glass-card p-1 h-auto">
            <TabsTrigger value="history" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary py-3">
              <Icon name="History" size={18} className="mr-2" />
              История
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary py-3">
              <Icon name="Users" size={18} className="mr-2" />
              Пользователи
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-accent/20 data-[state=active]:text-accent py-3">
              <Icon name="BarChart3" size={18} className="mr-2" />
              Аналитика
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400 py-3">
              <Icon name="Settings" size={18} className="mr-2" />
              Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="mt-6 animate-slide-up">
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Icon name="History" className="text-primary" size={28} />
                    История посещений
                  </CardTitle>
                  <Input
                    placeholder="Поиск по истории..."
                    className="max-w-xs glass-card"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockVisits.map((visit, index) => (
                    <div
                      key={visit.id}
                      className="glass-card p-4 rounded-xl hover-lift border-primary/10"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-12 h-12 border-2 border-primary/30">
                            <AvatarImage src={visit.avatar} />
                            <AvatarFallback className="bg-primary/20 text-primary font-bold">
                              {visit.user.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-foreground">{visit.user}</p>
                            <p className="text-sm text-muted-foreground">{visit.action}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="mb-2 border-primary/30">
                            {visit.time}
                          </Badge>
                          <p className="text-xs text-muted-foreground">{visit.ip}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="mt-6 animate-slide-up">
            <Card className="glass-card border-secondary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Icon name="Users" className="text-secondary" size={28} />
                  Список пользователей
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockUsers.map((user, index) => (
                    <div
                      key={user.id}
                      className="glass-card p-4 rounded-xl hover-lift border-secondary/10"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <Avatar className="w-14 h-14 border-2 border-secondary/30">
                              <AvatarFallback className="bg-secondary/20 text-secondary font-bold text-lg">
                                {user.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            {user.active && (
                              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse"></span>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground text-lg">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.username}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="mb-2 bg-secondary/20 text-secondary border-secondary/30">
                            {user.visits} посещений
                          </Badge>
                          <p className="text-xs text-muted-foreground">{user.lastSeen}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="mt-6 animate-slide-up">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-card border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Icon name="TrendingUp" className="text-accent" size={24} />
                    График посещений
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-end justify-between gap-2">
                    {[65, 80, 70, 90, 85, 95, 88].map((height, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div
                          className="w-full bg-gradient-to-t from-accent to-primary rounded-t-lg hover-lift transition-all cursor-pointer"
                          style={{ height: `${height}%`, animationDelay: `${i * 0.1}s` }}
                        ></div>
                        <span className="text-xs text-muted-foreground">
                          {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-purple-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Icon name="PieChart" className="text-purple-400" size={24} />
                    Топ действий
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { action: 'Открыл бота', percentage: 45, color: 'bg-primary' },
                      { action: 'Просмотрел каталог', percentage: 30, color: 'bg-secondary' },
                      { action: 'Отправил сообщение', percentage: 15, color: 'bg-accent' },
                      { action: 'Добавил в избранное', percentage: 10, color: 'bg-purple-500' },
                    ].map((item, i) => (
                      <div key={i} className="animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-foreground">{item.action}</span>
                          <span className="text-sm font-bold text-muted-foreground">{item.percentage}%</span>
                        </div>
                        <div className="h-3 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="mt-6 animate-slide-up">
            <Card className="glass-card border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Icon name="Settings" className="text-purple-400" size={28} />
                  Настройки бота
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="glass-card p-6 rounded-xl border-primary/10">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Label htmlFor="notifications" className="text-lg font-semibold">
                        Уведомления
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Получать уведомления о новых посетителях
                      </p>
                    </div>
                    <Switch
                      id="notifications"
                      checked={notificationsEnabled}
                      onCheckedChange={setNotificationsEnabled}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>
                </div>

                <div className="glass-card p-6 rounded-xl border-secondary/10">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Label htmlFor="auto-response" className="text-lg font-semibold">
                        Автоответчик
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Автоматические ответы на частые вопросы
                      </p>
                    </div>
                    <Switch
                      id="auto-response"
                      checked={autoResponseEnabled}
                      onCheckedChange={setAutoResponseEnabled}
                      className="data-[state=checked]:bg-secondary"
                    />
                  </div>
                </div>

                <div className="glass-card p-6 rounded-xl border-accent/10">
                  <Label className="text-lg font-semibold mb-3 block">Приветственное сообщение</Label>
                  <Input
                    placeholder="Введите текст приветствия..."
                    defaultValue="Привет! Добро пожаловать в наш бот 👋"
                    className="glass-card mb-4"
                  />
                  <Button className="w-full bg-gradient-to-r from-primary via-secondary to-accent hover-lift border-0">
                    <Icon name="Save" size={18} className="mr-2" />
                    Сохранить изменения
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
