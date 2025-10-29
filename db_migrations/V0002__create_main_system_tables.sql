-- Таблица пользователей системы
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    telegram_id BIGINT UNIQUE,
    username VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    balance DECIMAL(10, 2) DEFAULT 0.00,
    referral_code VARCHAR(50) UNIQUE,
    referred_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица карт пользователей
CREATE TABLE IF NOT EXISTS user_cards (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    card_number VARCHAR(19) NOT NULL,
    card_holder VARCHAR(255) NOT NULL,
    bank_name VARCHAR(255) DEFAULT 'Озон Банк',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица транзакций (пополнения, выводы, рефералы)
CREATE TABLE IF NOT EXISTS transactions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    type VARCHAR(50) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    description TEXT,
    card_info VARCHAR(255),
    check_image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    processed_at TIMESTAMP
);

-- Таблица рефералов
CREATE TABLE IF NOT EXISTS referrals (
    id SERIAL PRIMARY KEY,
    referrer_id INTEGER REFERENCES users(id),
    referred_id INTEGER REFERENCES users(id),
    reward_amount DECIMAL(10, 2) DEFAULT 200.00,
    reward_paid BOOLEAN DEFAULT false,
    conditions_met BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    paid_at TIMESTAMP
);

-- Таблица подписок на знакомства
CREATE TABLE IF NOT EXISTS dating_subscriptions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP,
    is_active BOOLEAN DEFAULT true,
    is_trial BOOLEAN DEFAULT true,
    amount_paid DECIMAL(10, 2) DEFAULT 0.00,
    check_image_url TEXT
);

-- Таблица чата знакомств
CREATE TABLE IF NOT EXISTS dating_messages (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES users(id),
    receiver_id INTEGER REFERENCES users(id),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица результатов игр
CREATE TABLE IF NOT EXISTS game_results (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    game_type VARCHAR(50) NOT NULL,
    result VARCHAR(50) NOT NULL,
    score INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Индексы для быстрого поиска
CREATE INDEX IF NOT EXISTS idx_users_telegram_id ON users(telegram_id);
CREATE INDEX IF NOT EXISTS idx_users_referral_code ON users(referral_code);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_referrals_referrer ON referrals(referrer_id);
CREATE INDEX IF NOT EXISTS idx_dating_subs_user ON dating_subscriptions(user_id);

-- Тестовые данные
INSERT INTO users (telegram_id, username, first_name, balance, referral_code) VALUES
(111111111, 'test_user1', 'Иван', 5000.00, 'REF001'),
(222222222, 'test_user2', 'Мария', 3200.00, 'REF002'),
(333333333, 'test_user3', 'Петр', 1500.00, 'REF003')
ON CONFLICT (telegram_id) DO NOTHING;