INSERT INTO tasks (type, event_type, title, icon, energy_reward, target_count, is_active) VALUES
-- Daily tasks
('DAILY', 'LOGIN',       'Войти в приложение',              '📱', 0.5, 1,  TRUE),
('DAILY', 'CREATE_ITEM', 'Создать 1 предмет',               '✨', 1.0, 1,  TRUE),
('DAILY', 'CREATE_ITEM', 'Создать 3 предмета за день',      '🎯', 2.0, 3,  TRUE),
('DAILY', 'MERGE',       'Выполнить 1 слияние',             '🔮', 1.5, 1,  TRUE),
('DAILY', 'SPEND',       'Оплатить картой МТБанк',          '💳', 1.0, 1,  TRUE),

-- Weekly tasks
('WEEKLY', 'MERGE',       'Выполнить 5 слияний за неделю',   '⚡', 3.0, 5,  TRUE),
('WEEKLY', 'CREATE_ITEM', 'Создать 10 предметов за неделю',  '🌟', 4.0, 10, TRUE),
('WEEKLY', 'SPEND',       'Совершить 3 покупки за неделю',   '🛒', 3.0, 3,  TRUE),
('WEEKLY', 'TRANSFER',    'Сделать 2 перевода за неделю',    '💸', 2.0, 2,  TRUE),

-- Referral tasks
('REFERRAL', 'REFERRAL_SIGNUP', 'Пригласить 1 друга',        '👥', 5.0, 1,  TRUE),
('REFERRAL', 'REFERRAL_SIGNUP', 'Пригласить 3 друзей',       '🎉', 10.0, 3, TRUE);
