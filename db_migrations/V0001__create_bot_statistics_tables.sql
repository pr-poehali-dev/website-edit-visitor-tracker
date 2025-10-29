-- Создаем таблицу пользователей бота
CREATE TABLE IF NOT EXISTS bot_users (
    id SERIAL PRIMARY KEY,
    telegram_id BIGINT UNIQUE NOT NULL,
    username VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    visit_count INTEGER DEFAULT 0
);

-- Создаем таблицу посещений
CREATE TABLE IF NOT EXISTS bot_visits (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES bot_users(id),
    action VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создаем индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_bot_users_telegram_id ON bot_users(telegram_id);
CREATE INDEX IF NOT EXISTS idx_bot_users_last_seen ON bot_users(last_seen DESC);
CREATE INDEX IF NOT EXISTS idx_bot_visits_user_id ON bot_visits(user_id);
CREATE INDEX IF NOT EXISTS idx_bot_visits_created_at ON bot_visits(created_at DESC);

-- Вставляем тестовые данные
INSERT INTO bot_users (telegram_id, username, first_name, last_name, last_seen, is_active, visit_count) VALUES
(123456789, 'alexivanov', 'Алексей', 'Иванов', NOW() - INTERVAL '2 minutes', true, 24),
(234567890, 'mariapetrova', 'Мария', 'Петрова', NOW() - INTERVAL '5 minutes', true, 18),
(345678901, 'dmitrysid', 'Дмитрий', 'Сидоров', NOW() - INTERVAL '12 minutes', false, 42),
(456789012, 'annasmith', 'Анна', 'Смирнова', NOW() - INTERVAL '18 minutes', false, 31),
(567890123, 'pavelkozlov', 'Павел', 'Козлов', NOW() - INTERVAL '25 minutes', false, 15)
ON CONFLICT (telegram_id) DO NOTHING;

-- Вставляем тестовые посещения
INSERT INTO bot_visits (user_id, action, ip_address, created_at)
SELECT 
    u.id, 
    CASE (random() * 3)::int 
        WHEN 0 THEN 'Открыл бота'
        WHEN 1 THEN 'Просмотрел каталог'
        WHEN 2 THEN 'Отправил сообщение'
        ELSE 'Добавил в избранное'
    END,
    '192.168.1.' || (1 + (random() * 254)::int),
    NOW() - (INTERVAL '1 minute' * (random() * 30)::int)
FROM bot_users u, generate_series(1, 5);