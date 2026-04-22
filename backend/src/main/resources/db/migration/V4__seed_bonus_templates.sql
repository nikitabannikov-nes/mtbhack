-- =============================================
-- FOOD category (id=1)
-- =============================================
-- DEFAULT: no real bonus, just a placeholder item
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'DEFAULT', 'NONE', 0, 0, 'NONE', 1, 1, 'Базовый предмет еды', NULL, '🍔', 'Бургер' FROM categories WHERE slug='food';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'COMMON', 'FREE_DELIVERY', 0, 0, 'NONE', 1, 2, 'Бесплатная доставка в Яндекс Еде', 'Яндекс Еда', '🛵', 'Доставка' FROM categories WHERE slug='food';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'RARE', 'DISCOUNT', 10, 15, 'PERCENT', 1, 3, 'Скидка {value}% в Papa John''s', 'Papa John''s', '🍕', 'Пицца' FROM categories WHERE slug='food';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'EPIC', 'PROMO_CODE', 5, 10, 'BYN', 3, 5, 'Промокод на {value} BYN в Burger King', 'Burger King', '👑', 'Вупер' FROM categories WHERE slug='food';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'LEGENDARY', 'CERTIFICATE', 20, 30, 'BYN', 5, 7, 'Сертификат {value} BYN в Domino''s', 'Domino''s', '🏆', 'Золотая Пицца' FROM categories WHERE slug='food';

-- =============================================
-- COFFEE category (id=2)
-- =============================================
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'DEFAULT', 'NONE', 0, 0, 'NONE', 1, 1, 'Базовый предмет кофе', NULL, '☕', 'Американо' FROM categories WHERE slug='coffee';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'COMMON', 'DISCOUNT', 10, 10, 'PERCENT', 1, 2, 'Скидка 10% на кофе в Mak.by', 'Mak.by', '☕', 'Кофе со скидкой' FROM categories WHERE slug='coffee';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'RARE', 'FREE_DELIVERY', 0, 0, 'NONE', 1, 3, 'Бесплатный кофе при заказе от 10 BYN', 'Mak.by', '🎁', 'Бесплатный Кофе' FROM categories WHERE slug='coffee';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'EPIC', 'CASHBACK_BOOST', 3, 5, 'PERCENT', 3, 5, 'Кэшбэк {value}% на все покупки кофе', 'МТБанк', '💰', 'Кэшбэк Кофе' FROM categories WHERE slug='coffee';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'LEGENDARY', 'SUBSCRIPTION', 0, 0, 'NONE', 5, 7, 'Подписка на кофе-клуб на месяц', 'Mak.by', '🏆', 'Кофе-Клуб' FROM categories WHERE slug='coffee';

-- =============================================
-- TRANSPORT category (id=3)
-- =============================================
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'DEFAULT', 'NONE', 0, 0, 'NONE', 1, 1, 'Базовый предмет транспорта', NULL, '🚗', 'Авто' FROM categories WHERE slug='transport';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'COMMON', 'DISCOUNT', 5, 10, 'PERCENT', 1, 2, 'Скидка {value}% в HELLO каршеринг', 'HELLO', '🚙', 'Каршеринг' FROM categories WHERE slug='transport';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'RARE', 'PROMO_CODE', 3, 5, 'BYN', 1, 3, 'Промокод {value} BYN на заправку А-100', 'А-100', '⛽', 'Заправка' FROM categories WHERE slug='transport';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'EPIC', 'CASHBACK_BOOST', 3, 5, 'PERCENT', 3, 5, 'Кэшбэк {value}% на заправки', 'А-100', '💎', 'Премиум Заправка' FROM categories WHERE slug='transport';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'LEGENDARY', 'CERTIFICATE', 20, 30, 'BYN', 5, 7, 'Сертификат {value} BYN на каршеринг HELLO', 'HELLO', '🏆', 'Золотой Каршеринг' FROM categories WHERE slug='transport';

-- =============================================
-- SHOPPING category (id=4)
-- =============================================
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'DEFAULT', 'NONE', 0, 0, 'NONE', 1, 1, 'Базовый предмет шоппинга', NULL, '🛍️', 'Покупка' FROM categories WHERE slug='shopping';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'COMMON', 'DISCOUNT', 5, 10, 'PERCENT', 1, 2, 'Скидка {value}% на 21vek.by', '21vek.by', '🎁', 'Скидка 21vek' FROM categories WHERE slug='shopping';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'RARE', 'CASHBACK_BOOST', 3, 5, 'PERCENT', 1, 3, 'Кэшбэк {value}% в интернет-магазинах', 'МТБанк', '💳', 'Кэшбэк Шоппинг' FROM categories WHERE slug='shopping';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'EPIC', 'PROMO_CODE', 10, 20, 'BYN', 3, 5, 'Промокод {value} BYN на 21vek.by', '21vek.by', '💎', 'VIP Покупка' FROM categories WHERE slug='shopping';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'LEGENDARY', 'CERTIFICATE', 30, 50, 'BYN', 5, 7, 'Сертификат {value} BYN на 21vek.by', '21vek.by', '🏆', 'Золотой Шоппинг' FROM categories WHERE slug='shopping';

-- =============================================
-- GAMING category (id=5)
-- =============================================
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'DEFAULT', 'NONE', 0, 0, 'NONE', 1, 1, 'Базовый предмет развлечений', NULL, '🎮', 'Игра' FROM categories WHERE slug='gaming';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'COMMON', 'DISCOUNT', 10, 15, 'PERCENT', 1, 2, 'Скидка {value}% в Hero Park', 'Hero Park', '🎯', 'Развлечение' FROM categories WHERE slug='gaming';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'RARE', 'PROMO_CODE', 5, 10, 'BYN', 1, 3, 'Промокод {value} BYN в Hero Park', 'Hero Park', '🎲', 'VR-Развлечение' FROM categories WHERE slug='gaming';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'EPIC', 'CERTIFICATE', 15, 25, 'BYN', 3, 5, 'Сертификат {value} BYN на билеты tickets.by', 'tickets.by', '🎭', 'Билет на мероприятие' FROM categories WHERE slug='gaming';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'LEGENDARY', 'CERTIFICATE', 30, 50, 'BYN', 5, 7, 'Сертификат {value} BYN на концерт', 'tickets.by', '🏆', 'Золотой Билет' FROM categories WHERE slug='gaming';

-- =============================================
-- TRAVEL category (id=6)
-- =============================================
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'DEFAULT', 'NONE', 0, 0, 'NONE', 1, 1, 'Базовый предмет путешествий', NULL, '✈️', 'Рейс' FROM categories WHERE slug='travel';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'COMMON', 'DISCOUNT', 5, 10, 'PERCENT', 1, 2, 'Скидка {value}% на отели iOL Hotels', 'iOL Hotels', '🏨', 'Отель' FROM categories WHERE slug='travel';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'RARE', 'CASHBACK_BOOST', 3, 5, 'PERCENT', 1, 3, 'Кэшбэк {value}% на бронирование', 'iOL Hotels', '🌴', 'Кэшбэк Отель' FROM categories WHERE slug='travel';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'EPIC', 'PROMO_CODE', 20, 40, 'BYN', 3, 5, 'Промокод {value} BYN в TravelHub', 'TravelHub', '💎', 'Тур' FROM categories WHERE slug='travel';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'LEGENDARY', 'CERTIFICATE', 50, 100, 'BYN', 5, 7, 'Сертификат {value} BYN на путешествие', 'TravelHub', '🏆', 'Золотой Тур' FROM categories WHERE slug='travel';

-- =============================================
-- FITNESS category (id=7)
-- =============================================
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'DEFAULT', 'NONE', 0, 0, 'NONE', 1, 1, 'Базовый предмет фитнеса', NULL, '💪', 'Тренировка' FROM categories WHERE slug='fitness';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'COMMON', 'DISCOUNT', 10, 15, 'PERCENT', 1, 2, 'Скидка {value}% в спортзале', 'FitnessBY', '🏋️', 'Скидка Фитнес' FROM categories WHERE slug='fitness';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'RARE', 'PROMO_CODE', 5, 10, 'BYN', 1, 3, 'Промокод {value} BYN на спорттовары', 'Sport-Master', '🎽', 'Спорттовары' FROM categories WHERE slug='fitness';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'EPIC', 'CASHBACK_BOOST', 3, 5, 'PERCENT', 3, 5, 'Кэшбэк {value}% на спортивные покупки', 'МТБанк', '💎', 'Кэшбэк Спорт' FROM categories WHERE slug='fitness';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'LEGENDARY', 'SUBSCRIPTION', 0, 0, 'NONE', 5, 7, 'Месячный абонемент в фитнес-клуб', 'FitnessBY', '🏆', 'Золотой Абонемент' FROM categories WHERE slug='fitness';

-- =============================================
-- EDUCATION category (id=8)
-- =============================================
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'DEFAULT', 'NONE', 0, 0, 'NONE', 1, 1, 'Базовый предмет образования', NULL, '📚', 'Книга' FROM categories WHERE slug='education';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'COMMON', 'DISCOUNT', 10, 15, 'PERCENT', 1, 2, 'Скидка {value}% на курсы Skillbox', 'Skillbox', '🎓', 'Скидка Курс' FROM categories WHERE slug='education';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'RARE', 'PROMO_CODE', 10, 20, 'BYN', 1, 3, 'Промокод {value} BYN на Skillbox', 'Skillbox', '📖', 'Курс' FROM categories WHERE slug='education';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'EPIC', 'CASHBACK_BOOST', 5, 8, 'PERCENT', 3, 5, 'Кэшбэк {value}% на образовательные платформы', 'Skillbox', '💎', 'Кэшбэк Образование' FROM categories WHERE slug='education';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'LEGENDARY', 'SUBSCRIPTION', 0, 0, 'NONE', 5, 7, 'Месяц обучения на Skillbox бесплатно', 'Skillbox', '🏆', 'Золотой Курс' FROM categories WHERE slug='education';

-- =============================================
-- STREAMING category (id=9)
-- =============================================
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'DEFAULT', 'NONE', 0, 0, 'NONE', 1, 1, 'Базовый предмет стриминга', NULL, '🎬', 'Видео' FROM categories WHERE slug='streaming';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'COMMON', 'DISCOUNT', 20, 20, 'PERCENT', 1, 2, 'Скидка 20% на Яндекс Плюс', 'Яндекс Плюс', '🎵', 'Подписка Лайт' FROM categories WHERE slug='streaming';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'RARE', 'PROMO_CODE', 3, 5, 'BYN', 1, 3, 'Промокод {value} BYN на Яндекс Плюс', 'Яндекс Плюс', '🎶', 'Музыка' FROM categories WHERE slug='streaming';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'EPIC', 'CASHBACK_BOOST', 5, 8, 'PERCENT', 3, 5, 'Кэшбэк {value}% на подписки', 'МТБанк', '💎', 'Кэшбэк Стриминг' FROM categories WHERE slug='streaming';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'LEGENDARY', 'SUBSCRIPTION', 0, 0, 'NONE', 5, 7, 'Яндекс Плюс на 3 месяца бесплатно', 'Яндекс Плюс', '🏆', 'Золотая Подписка' FROM categories WHERE slug='streaming';

-- =============================================
-- TECH category (id=10)
-- =============================================
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'DEFAULT', 'NONE', 0, 0, 'NONE', 1, 1, 'Базовый предмет техники', NULL, '💻', 'Гаджет' FROM categories WHERE slug='tech';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'COMMON', 'DISCOUNT', 5, 10, 'PERCENT', 1, 2, 'Скидка {value}% в DNS', 'DNS', '📱', 'Скидка Техника' FROM categories WHERE slug='tech';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'RARE', 'CASHBACK_BOOST', 3, 5, 'PERCENT', 1, 3, 'Кэшбэк {value}% на технику в DNS', 'DNS', '🖥️', 'Кэшбэк Техника' FROM categories WHERE slug='tech';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'EPIC', 'PROMO_CODE', 20, 40, 'BYN', 3, 5, 'Промокод {value} BYN в DNS', 'DNS', '💎', 'VIP Техника' FROM categories WHERE slug='tech';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value_min, value_max, unit, timer_min_days, timer_max_days, description_template, partner_name, icon, item_name)
SELECT id, 'LEGENDARY', 'CERTIFICATE', 50, 100, 'BYN', 5, 7, 'Сертификат {value} BYN в DNS', 'DNS', '🏆', 'Золотая Техника' FROM categories WHERE slug='tech';
