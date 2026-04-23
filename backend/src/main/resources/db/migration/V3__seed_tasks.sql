-- ── Ежедневное обязательное (всегда присутствует, +0.5 энергии) ─────────────
INSERT INTO tasks (type, event_type, title, icon, energy_reward, target_count, is_active, mandatory) VALUES
('DAILY', 'LOGIN', 'Войти в приложение', '📱', 0.5, 1, TRUE, TRUE);

-- ── Ежедневный пул (каждый день 2 случайных; MERGE + CREATE_ITEM не вместе) ─
INSERT INTO tasks (type, event_type, title, icon, energy_reward, target_count, is_active, mandatory) VALUES
('DAILY', 'CREATE_ITEM', 'Создать предмет на доске',      '✨', 1.0, 1, TRUE, FALSE),
('DAILY', 'MERGE',       'Выполнить слияние предметов',   '🔮', 1.5, 1, TRUE, FALSE),
('DAILY', 'SPEND',       'Оплатить картой МТБанк',        '💳', 1.0, 1, TRUE, FALSE),
('DAILY', 'TRANSFER',    'Перевести деньги через МТБанк', '💸', 1.0, 1, TRUE, FALSE);

-- ── Еженедельные (только реальные банковские действия) ───────────────────────
INSERT INTO tasks (type, event_type, title, icon, energy_reward, target_count, is_active, mandatory) VALUES
('WEEKLY', 'SPEND',    'Совершить 5 покупок по карте за неделю', '💳', 4.0, 5, TRUE, FALSE),
('WEEKLY', 'TRANSFER', 'Выполнить 3 перевода через МТБанк',      '💸', 3.0, 3, TRUE, FALSE);

-- ── Реферальная цепочка (вставляем с конца, чтобы заполнить next_task_id) ───
INSERT INTO tasks (type, event_type, title, icon, energy_reward, target_count, is_active, mandatory, next_task_id) VALUES
('REFERRAL', 'REFERRAL_SIGNUP', 'Пригласи 31 друга', '👑', 30.0, 31, TRUE, FALSE, NULL);
SET @ref5 = LAST_INSERT_ID();

INSERT INTO tasks (type, event_type, title, icon, energy_reward, target_count, is_active, mandatory, next_task_id) VALUES
('REFERRAL', 'REFERRAL_SIGNUP', 'Пригласи 15 друзей', '🎖️', 20.0, 15, TRUE, FALSE, @ref5);
SET @ref4 = LAST_INSERT_ID();

INSERT INTO tasks (type, event_type, title, icon, energy_reward, target_count, is_active, mandatory, next_task_id) VALUES
('REFERRAL', 'REFERRAL_SIGNUP', 'Пригласи 7 друзей', '🥇', 15.0, 7, TRUE, FALSE, @ref4);
SET @ref3 = LAST_INSERT_ID();

INSERT INTO tasks (type, event_type, title, icon, energy_reward, target_count, is_active, mandatory, next_task_id) VALUES
('REFERRAL', 'REFERRAL_SIGNUP', 'Пригласи 3 друзей', '🥈', 10.0, 3, TRUE, FALSE, @ref3);
SET @ref2 = LAST_INSERT_ID();

INSERT INTO tasks (type, event_type, title, icon, energy_reward, target_count, is_active, mandatory, next_task_id) VALUES
('REFERRAL', 'REFERRAL_SIGNUP', 'Пригласи друга в МТБанк', '👥', 5.0, 1, TRUE, FALSE, @ref2);
