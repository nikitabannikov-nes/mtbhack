-- =============================================
-- FOOD (slug='food')
-- =============================================
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'DEFAULT', 'NONE', 0, 'NONE', 1, 'Базовый предмет еды', NULL, '/icons/bonus/food-default-1.svg', 'Бургер' FROM categories WHERE slug='food';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'COMMON', 'FREE_DELIVERY', 0, 'NONE', 7, 'Бесплатная доставка ×3 в Яндекс Еде', 'Яндекс Еда', '/icons/bonus/food-common-1.svg', 'Доставка' FROM categories WHERE slug='food';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'COMMON', 'CASHBACK_BOOST', 3, 'PERCENT', 30, 'Кешбэк 3% на все рестораны', NULL, '/icons/bonus/food-common-2.svg', 'Кешбэк Еда' FROM categories WHERE slug='food';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'COMMON', 'DISCOUNT', 10, 'PERCENT', 14, 'Скидка 10% в Papa John''s', 'Papa John''s', '/icons/bonus/food-common-3.svg', 'Скидка Пицца' FROM categories WHERE slug='food';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'RARE', 'CASHBACK_BOOST', 5, 'PERCENT', 30, 'Кешбэк 5% в ресторанах', NULL, '/icons/bonus/food-rare-1.svg', 'Кешбэк 5%' FROM categories WHERE slug='food';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'RARE', 'PROMO_CODE', 10, 'BYN', 14, 'Промокод 10 BYN в Burger King', 'Burger King', '/icons/bonus/food-rare-2.svg', 'Промокод BK' FROM categories WHERE slug='food';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'RARE', 'DISCOUNT', 15, 'PERCENT', 7, 'Скидка 15% в Dodo Pizza', 'Dodo Pizza', '/icons/bonus/food-rare-3.svg', 'Скидка Dodo' FROM categories WHERE slug='food';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'EPIC', 'CASHBACK_BOOST', 8, 'PERCENT', 30, 'Кешбэк 8% на все рестораны', NULL, '/icons/bonus/food-epic-1.svg', 'Кешбэк Премиум' FROM categories WHERE slug='food';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'EPIC', 'PROMO_CODE', 25, 'BYN', 14, 'Промокод 25 BYN в Яндекс Еде', 'Яндекс Еда', '/icons/bonus/food-epic-2.svg', 'Супер Доставка' FROM categories WHERE slug='food';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'LEGENDARY', 'CERTIFICATE', 50, 'BYN', 30, 'Сертификат 50 BYN в ресторанах-партнёрах МТБанка', NULL, '/icons/bonus/food-legendary-1.svg', 'Золотой Гурман' FROM categories WHERE slug='food';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'LEGENDARY', 'CASHBACK_BOOST', 15, 'PERCENT', 60, 'Кешбэк 15% на все рестораны 60 дней', NULL, '/icons/bonus/food-legendary-2.svg', 'Мастер Гурман' FROM categories WHERE slug='food';

-- =============================================
-- COFFEE (slug='coffee')
-- =============================================
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'DEFAULT', 'NONE', 0, 'NONE', 1, 'Базовый предмет кофе', NULL, '/icons/bonus/coffee-default-1.svg', 'Американо' FROM categories WHERE slug='coffee';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'COMMON', 'DISCOUNT', 10, 'PERCENT', 14, 'Скидка 10% на кофе в Mak.by', 'Mak.by', '/icons/bonus/coffee-common-1.svg', 'Скидка Кофе' FROM categories WHERE slug='coffee';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'COMMON', 'FREE_DELIVERY', 0, 'NONE', 7, 'Бесплатный напиток при заказе от 10 BYN', 'Coffee Inn', '/icons/bonus/coffee-common-2.svg', 'Напиток в подарок' FROM categories WHERE slug='coffee';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'COMMON', 'CASHBACK_BOOST', 5, 'PERCENT', 30, 'Кешбэк 5% в кофейнях', NULL, '/icons/bonus/coffee-common-3.svg', 'Кешбэк Кофе' FROM categories WHERE slug='coffee';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'RARE', 'DISCOUNT', 20, 'PERCENT', 14, 'Скидка 20% в Coffee Like', 'Coffee Like', '/icons/bonus/coffee-rare-1.svg', 'Скидка Coffee Like' FROM categories WHERE slug='coffee';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'RARE', 'PROMO_CODE', 5, 'BYN', 7, 'Промокод 5 BYN на кофе в Mak.by', 'Mak.by', '/icons/bonus/coffee-rare-2.svg', 'Промокод Кофе' FROM categories WHERE slug='coffee';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'RARE', 'CASHBACK_BOOST', 8, 'PERCENT', 30, 'Кешбэк 8% в кофейнях', NULL, '/icons/bonus/coffee-rare-3.svg', 'Кешбэк 8%' FROM categories WHERE slug='coffee';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'EPIC', 'SUBSCRIPTION', 0, 'NONE', 30, 'Кофе-абонемент на месяц в Coffee Inn', 'Coffee Inn', '/icons/bonus/coffee-epic-1.svg', 'Кофе-Клуб' FROM categories WHERE slug='coffee';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'EPIC', 'PROMO_CODE', 15, 'BYN', 14, 'Промокод 15 BYN в любой кофейне-партнёре', NULL, '/icons/bonus/coffee-epic-2.svg', 'Кофе Премиум' FROM categories WHERE slug='coffee';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'LEGENDARY', 'SUBSCRIPTION', 0, 'NONE', 90, 'Подписка на кофе 3 месяца в Mak.by', 'Mak.by', '/icons/bonus/coffee-legendary-1.svg', 'Кофейный Мастер' FROM categories WHERE slug='coffee';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'LEGENDARY', 'CERTIFICATE', 30, 'BYN', 30, 'Сертификат 30 BYN в кофейнях-партнёрах', NULL, '/icons/bonus/coffee-legendary-2.svg', 'Золотая Чашка' FROM categories WHERE slug='coffee';

-- =============================================
-- TRANSPORT (slug='transport')
-- =============================================
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'DEFAULT', 'NONE', 0, 'NONE', 1, 'Базовый предмет транспорта', NULL, '/icons/bonus/transport-default-1.svg', 'Авто' FROM categories WHERE slug='transport';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'COMMON', 'DISCOUNT', 10, 'PERCENT', 14, 'Скидка 10% в каршеринге HELLO', 'HELLO', '/icons/bonus/transport-common-1.svg', 'Каршеринг HELLO' FROM categories WHERE slug='transport';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'COMMON', 'CASHBACK_BOOST', 3, 'PERCENT', 30, 'Кешбэк 3% на заправках', NULL, '/icons/bonus/transport-common-2.svg', 'Кешбэк Заправка' FROM categories WHERE slug='transport';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'COMMON', 'PROMO_CODE', 3, 'BYN', 7, 'Промокод 3 BYN на заправке А-100', 'А-100', '/icons/bonus/transport-common-3.svg', 'Промокод А-100' FROM categories WHERE slug='transport';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'RARE', 'PROMO_CODE', 8, 'BYN', 14, 'Промокод 8 BYN на заправке А-100', 'А-100', '/icons/bonus/transport-rare-1.svg', 'Топливо' FROM categories WHERE slug='transport';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'RARE', 'CASHBACK_BOOST', 5, 'PERCENT', 30, 'Кешбэк 5% на транспорт', NULL, '/icons/bonus/transport-rare-2.svg', 'Кешбэк 5%' FROM categories WHERE slug='transport';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'RARE', 'DISCOUNT', 20, 'PERCENT', 14, 'Скидка 20% в каршеринге Anytime', 'Anytime', '/icons/bonus/transport-rare-3.svg', 'Anytime' FROM categories WHERE slug='transport';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'EPIC', 'CASHBACK_BOOST', 8, 'PERCENT', 30, 'Кешбэк 8% на заправки', NULL, '/icons/bonus/transport-epic-1.svg', 'Кешбэк Топливо' FROM categories WHERE slug='transport';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'EPIC', 'PROMO_CODE', 20, 'BYN', 14, 'Промокод 20 BYN на каршеринг HELLO', 'HELLO', '/icons/bonus/transport-epic-2.svg', 'HELLO Премиум' FROM categories WHERE slug='transport';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'LEGENDARY', 'CERTIFICATE', 50, 'BYN', 30, 'Сертификат 50 BYN на каршеринг HELLO', 'HELLO', '/icons/bonus/transport-legendary-1.svg', 'Золотой Руль' FROM categories WHERE slug='transport';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'LEGENDARY', 'CASHBACK_BOOST', 12, 'PERCENT', 60, 'Кешбэк 12% на транспорт 60 дней', NULL, '/icons/bonus/transport-legendary-2.svg', 'Транспортный Мастер' FROM categories WHERE slug='transport';

-- =============================================
-- SHOPPING (slug='shopping')
-- =============================================
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'DEFAULT', 'NONE', 0, 'NONE', 1, 'Базовый предмет шоппинга', NULL, '/icons/bonus/shopping-default-1.svg', 'Покупка' FROM categories WHERE slug='shopping';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'COMMON', 'DISCOUNT', 5, 'PERCENT', 14, 'Скидка 5% на 21vek.by', '21vek.by', '/icons/bonus/shopping-common-1.svg', 'Скидка 21vek' FROM categories WHERE slug='shopping';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'COMMON', 'CASHBACK_BOOST', 3, 'PERCENT', 30, 'Кешбэк 3% в интернет-магазинах', NULL, '/icons/bonus/shopping-common-2.svg', 'Кешбэк Шоппинг' FROM categories WHERE slug='shopping';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'COMMON', 'PROMO_CODE', 5, 'BYN', 14, 'Промокод 5 BYN на Wildberries', 'Wildberries', '/icons/bonus/shopping-common-3.svg', 'Промокод WB' FROM categories WHERE slug='shopping';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'RARE', 'CASHBACK_BOOST', 5, 'PERCENT', 30, 'Кешбэк 5% в интернет-магазинах', NULL, '/icons/bonus/shopping-rare-1.svg', 'Кешбэк 5%' FROM categories WHERE slug='shopping';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'RARE', 'PROMO_CODE', 15, 'BYN', 14, 'Промокод 15 BYN на 21vek.by', '21vek.by', '/icons/bonus/shopping-rare-2.svg', 'Промокод 21vek' FROM categories WHERE slug='shopping';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'RARE', 'DISCOUNT', 10, 'PERCENT', 14, 'Скидка 10% на Lamoda', 'Lamoda', '/icons/bonus/shopping-rare-3.svg', 'Скидка Lamoda' FROM categories WHERE slug='shopping';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'EPIC', 'PROMO_CODE', 30, 'BYN', 14, 'Промокод 30 BYN на 21vek.by', '21vek.by', '/icons/bonus/shopping-epic-1.svg', 'Большой Промокод' FROM categories WHERE slug='shopping';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'EPIC', 'CASHBACK_BOOST', 8, 'PERCENT', 30, 'Кешбэк 8% в интернет-магазинах', NULL, '/icons/bonus/shopping-epic-2.svg', 'Кешбэк Премиум' FROM categories WHERE slug='shopping';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'LEGENDARY', 'CERTIFICATE', 75, 'BYN', 30, 'Сертификат 75 BYN на 21vek.by', '21vek.by', '/icons/bonus/shopping-legendary-1.svg', 'Золотой Шоппинг' FROM categories WHERE slug='shopping';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'LEGENDARY', 'CASHBACK_BOOST', 12, 'PERCENT', 60, 'Кешбэк 12% во всех магазинах 60 дней', NULL, '/icons/bonus/shopping-legendary-2.svg', 'Шопинг Мастер' FROM categories WHERE slug='shopping';

-- =============================================
-- GAMING (slug='gaming')
-- =============================================
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'DEFAULT', 'NONE', 0, 'NONE', 1, 'Базовый предмет развлечений', NULL, '/icons/bonus/gaming-default-1.svg', 'Игра' FROM categories WHERE slug='gaming';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'COMMON', 'DISCOUNT', 10, 'PERCENT', 14, 'Скидка 10% в Hero Park', 'Hero Park', '/icons/bonus/gaming-common-1.svg', 'Hero Park' FROM categories WHERE slug='gaming';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'COMMON', 'CASHBACK_BOOST', 3, 'PERCENT', 30, 'Кешбэк 3% на развлечения', NULL, '/icons/bonus/gaming-common-2.svg', 'Кешбэк Досуг' FROM categories WHERE slug='gaming';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'COMMON', 'DISCOUNT', 15, 'PERCENT', 14, 'Скидка 15% в VR Arena', 'VR Arena', '/icons/bonus/gaming-common-3.svg', 'VR Arena' FROM categories WHERE slug='gaming';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'RARE', 'PROMO_CODE', 10, 'BYN', 14, 'Промокод 10 BYN в Hero Park', 'Hero Park', '/icons/bonus/gaming-rare-1.svg', 'Промокод Hero' FROM categories WHERE slug='gaming';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'RARE', 'CERTIFICATE', 15, 'BYN', 14, 'Сертификат 15 BYN на tickets.by', 'tickets.by', '/icons/bonus/gaming-rare-2.svg', 'Билет tickets.by' FROM categories WHERE slug='gaming';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'RARE', 'CASHBACK_BOOST', 5, 'PERCENT', 30, 'Кешбэк 5% на развлечения', NULL, '/icons/bonus/gaming-rare-3.svg', 'Кешбэк 5%' FROM categories WHERE slug='gaming';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'EPIC', 'CERTIFICATE', 30, 'BYN', 14, 'Сертификат 30 BYN на tickets.by', 'tickets.by', '/icons/bonus/gaming-epic-1.svg', 'Концерт' FROM categories WHERE slug='gaming';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'EPIC', 'CASHBACK_BOOST', 8, 'PERCENT', 30, 'Кешбэк 8% на развлечения', NULL, '/icons/bonus/gaming-epic-2.svg', 'Кешбэк Досуг' FROM categories WHERE slug='gaming';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'LEGENDARY', 'CERTIFICATE', 60, 'BYN', 30, 'Сертификат 60 BYN на концерт в tickets.by', 'tickets.by', '/icons/bonus/gaming-legendary-1.svg', 'Золотой Билет' FROM categories WHERE slug='gaming';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'LEGENDARY', 'CASHBACK_BOOST', 15, 'PERCENT', 60, 'Кешбэк 15% на развлечения 60 дней', NULL, '/icons/bonus/gaming-legendary-2.svg', 'Мастер Досуга' FROM categories WHERE slug='gaming';

-- =============================================
-- TRAVEL (slug='travel')
-- =============================================
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'DEFAULT', 'NONE', 0, 'NONE', 1, 'Базовый предмет путешествий', NULL, '/icons/bonus/travel-default-1.svg', 'Рейс' FROM categories WHERE slug='travel';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'COMMON', 'DISCOUNT', 5, 'PERCENT', 14, 'Скидка 5% на отели iOL Hotels', 'iOL Hotels', '/icons/bonus/travel-common-1.svg', 'Скидка Отель' FROM categories WHERE slug='travel';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'COMMON', 'CASHBACK_BOOST', 3, 'PERCENT', 30, 'Кешбэк 3% на путешествия', NULL, '/icons/bonus/travel-common-2.svg', 'Кешбэк Трэвел' FROM categories WHERE slug='travel';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'COMMON', 'DISCOUNT', 10, 'PERCENT', 14, 'Скидка 10% на авиабилеты Belavia', 'Belavia', '/icons/bonus/travel-common-3.svg', 'Скидка Belavia' FROM categories WHERE slug='travel';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'RARE', 'CASHBACK_BOOST', 5, 'PERCENT', 30, 'Кешбэк 5% на бронирование отелей', NULL, '/icons/bonus/travel-rare-1.svg', 'Кешбэк 5%' FROM categories WHERE slug='travel';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'RARE', 'PROMO_CODE', 20, 'BYN', 14, 'Промокод 20 BYN в TravelHub', 'TravelHub', '/icons/bonus/travel-rare-2.svg', 'Промокод Тур' FROM categories WHERE slug='travel';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'RARE', 'DISCOUNT', 15, 'PERCENT', 14, 'Скидка 15% на iOL Hotels', 'iOL Hotels', '/icons/bonus/travel-rare-3.svg', 'Отель Плюс' FROM categories WHERE slug='travel';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'EPIC', 'PROMO_CODE', 50, 'BYN', 14, 'Промокод 50 BYN в TravelHub', 'TravelHub', '/icons/bonus/travel-epic-1.svg', 'Большой Тур' FROM categories WHERE slug='travel';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'EPIC', 'CASHBACK_BOOST', 8, 'PERCENT', 30, 'Кешбэк 8% на путешествия', NULL, '/icons/bonus/travel-epic-2.svg', 'Кешбэк Путешествие' FROM categories WHERE slug='travel';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'LEGENDARY', 'CERTIFICATE', 100, 'BYN', 30, 'Сертификат 100 BYN на путешествие от TravelHub', 'TravelHub', '/icons/bonus/travel-legendary-1.svg', 'Золотой Тур' FROM categories WHERE slug='travel';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'LEGENDARY', 'CASHBACK_BOOST', 15, 'PERCENT', 60, 'Кешбэк 15% на все путешествия 60 дней', NULL, '/icons/bonus/travel-legendary-2.svg', 'Мастер Путешествий' FROM categories WHERE slug='travel';

-- =============================================
-- FITNESS (slug='fitness')
-- =============================================
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'DEFAULT', 'NONE', 0, 'NONE', 1, 'Базовый предмет фитнеса', NULL, '/icons/bonus/fitness-default-1.svg', 'Тренировка' FROM categories WHERE slug='fitness';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'COMMON', 'DISCOUNT', 10, 'PERCENT', 14, 'Скидка 10% в World Gym', 'World Gym', '/icons/bonus/fitness-common-1.svg', 'Скидка Зал' FROM categories WHERE slug='fitness';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'COMMON', 'CASHBACK_BOOST', 3, 'PERCENT', 30, 'Кешбэк 3% на спорт', NULL, '/icons/bonus/fitness-common-2.svg', 'Кешбэк Спорт' FROM categories WHERE slug='fitness';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'COMMON', 'PROMO_CODE', 5, 'BYN', 14, 'Промокод 5 BYN в Sport-Master', 'Sport-Master', '/icons/bonus/fitness-common-3.svg', 'Промокод Sport-M' FROM categories WHERE slug='fitness';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'RARE', 'CASHBACK_BOOST', 5, 'PERCENT', 30, 'Кешбэк 5% на спорттовары', NULL, '/icons/bonus/fitness-rare-1.svg', 'Кешбэк 5%' FROM categories WHERE slug='fitness';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'RARE', 'PROMO_CODE', 15, 'BYN', 14, 'Промокод 15 BYN в Sport-Master', 'Sport-Master', '/icons/bonus/fitness-rare-2.svg', 'Экипировка' FROM categories WHERE slug='fitness';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'RARE', 'DISCOUNT', 20, 'PERCENT', 14, 'Скидка 20% на разовое посещение World Gym', 'World Gym', '/icons/bonus/fitness-rare-3.svg', 'Визит World Gym' FROM categories WHERE slug='fitness';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'EPIC', 'SUBSCRIPTION', 0, 'NONE', 30, 'Месячный абонемент в FitnessBY', 'FitnessBY', '/icons/bonus/fitness-epic-1.svg', 'Абонемент Месяц' FROM categories WHERE slug='fitness';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'EPIC', 'CASHBACK_BOOST', 8, 'PERCENT', 30, 'Кешбэк 8% на спорт', NULL, '/icons/bonus/fitness-epic-2.svg', 'Кешбэк Атлет' FROM categories WHERE slug='fitness';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'LEGENDARY', 'SUBSCRIPTION', 0, 'NONE', 90, 'Квартальный абонемент в World Gym', 'World Gym', '/icons/bonus/fitness-legendary-1.svg', 'Золотой Атлет' FROM categories WHERE slug='fitness';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'LEGENDARY', 'CASHBACK_BOOST', 15, 'PERCENT', 60, 'Кешбэк 15% на спорт 60 дней', NULL, '/icons/bonus/fitness-legendary-2.svg', 'Мастер Спорта' FROM categories WHERE slug='fitness';

-- =============================================
-- EDUCATION (slug='education')
-- =============================================
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'DEFAULT', 'NONE', 0, 'NONE', 1, 'Базовый предмет образования', NULL, '/icons/bonus/education-default-1.svg', 'Книга' FROM categories WHERE slug='education';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'COMMON', 'DISCOUNT', 10, 'PERCENT', 14, 'Скидка 10% на курсы Skillbox', 'Skillbox', '/icons/bonus/education-common-1.svg', 'Скидка Skillbox' FROM categories WHERE slug='education';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'COMMON', 'CASHBACK_BOOST', 3, 'PERCENT', 30, 'Кешбэк 3% на образовательные платформы', NULL, '/icons/bonus/education-common-2.svg', 'Кешбэк Знания' FROM categories WHERE slug='education';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'COMMON', 'DISCOUNT', 15, 'PERCENT', 14, 'Скидка 15% на курсы Ешко', 'Ешко', '/icons/bonus/education-common-3.svg', 'Скидка Ешко' FROM categories WHERE slug='education';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'RARE', 'PROMO_CODE', 15, 'BYN', 14, 'Промокод 15 BYN на Skillbox', 'Skillbox', '/icons/bonus/education-rare-1.svg', 'Курс Skillbox' FROM categories WHERE slug='education';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'RARE', 'CASHBACK_BOOST', 5, 'PERCENT', 30, 'Кешбэк 5% на обучение', NULL, '/icons/bonus/education-rare-2.svg', 'Кешбэк 5%' FROM categories WHERE slug='education';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'RARE', 'DISCOUNT', 20, 'PERCENT', 14, 'Скидка 20% на Ешко', 'Ешко', '/icons/bonus/education-rare-3.svg', 'Профессия' FROM categories WHERE slug='education';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'EPIC', 'SUBSCRIPTION', 0, 'NONE', 30, 'Месяц обучения на Skillbox бесплатно', 'Skillbox', '/icons/bonus/education-epic-1.svg', 'Курс Бесплатно' FROM categories WHERE slug='education';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'EPIC', 'CASHBACK_BOOST', 8, 'PERCENT', 30, 'Кешбэк 8% на образование', NULL, '/icons/bonus/education-epic-2.svg', 'Кешбэк Учёба' FROM categories WHERE slug='education';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'LEGENDARY', 'SUBSCRIPTION', 0, 'NONE', 90, '3 месяца обучения на Skillbox бесплатно', 'Skillbox', '/icons/bonus/education-legendary-1.svg', 'Золотой Диплом' FROM categories WHERE slug='education';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'LEGENDARY', 'CASHBACK_BOOST', 15, 'PERCENT', 60, 'Кешбэк 15% на образование 60 дней', NULL, '/icons/bonus/education-legendary-2.svg', 'Мастер Знаний' FROM categories WHERE slug='education';

-- =============================================
-- STREAMING (slug='streaming')
-- =============================================
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'DEFAULT', 'NONE', 0, 'NONE', 1, 'Базовый предмет стриминга', NULL, '/icons/bonus/streaming-default-1.svg', 'Видео' FROM categories WHERE slug='streaming';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'COMMON', 'DISCOUNT', 20, 'PERCENT', 14, 'Скидка 20% на Яндекс Плюс', 'Яндекс Плюс', '/icons/bonus/streaming-common-1.svg', 'Яндекс Плюс' FROM categories WHERE slug='streaming';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'COMMON', 'CASHBACK_BOOST', 3, 'PERCENT', 30, 'Кешбэк 3% на подписки', NULL, '/icons/bonus/streaming-common-2.svg', 'Кешбэк Стриминг' FROM categories WHERE slug='streaming';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'COMMON', 'DISCOUNT', 15, 'PERCENT', 14, 'Скидка 15% на ivi', 'ivi', '/icons/bonus/streaming-common-3.svg', 'Скидка ivi' FROM categories WHERE slug='streaming';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'RARE', 'PROMO_CODE', 5, 'BYN', 14, 'Промокод 5 BYN на Яндекс Плюс', 'Яндекс Плюс', '/icons/bonus/streaming-rare-1.svg', 'Промокод ЯП' FROM categories WHERE slug='streaming';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'RARE', 'CASHBACK_BOOST', 5, 'PERCENT', 30, 'Кешбэк 5% на подписки', NULL, '/icons/bonus/streaming-rare-2.svg', 'Кешбэк 5%' FROM categories WHERE slug='streaming';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'RARE', 'DISCOUNT', 25, 'PERCENT', 14, 'Скидка 25% на PREMIER', 'PREMIER', '/icons/bonus/streaming-rare-3.svg', 'PREMIER' FROM categories WHERE slug='streaming';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'EPIC', 'SUBSCRIPTION', 0, 'NONE', 30, 'Яндекс Плюс на месяц бесплатно', 'Яндекс Плюс', '/icons/bonus/streaming-epic-1.svg', 'Подписка Месяц' FROM categories WHERE slug='streaming';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'EPIC', 'CASHBACK_BOOST', 8, 'PERCENT', 30, 'Кешбэк 8% на медиаподписки', NULL, '/icons/bonus/streaming-epic-2.svg', 'Кешбэк Медиа' FROM categories WHERE slug='streaming';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'LEGENDARY', 'SUBSCRIPTION', 0, 'NONE', 90, 'Яндекс Плюс на 3 месяца бесплатно', 'Яндекс Плюс', '/icons/bonus/streaming-legendary-1.svg', 'Золотая Подписка' FROM categories WHERE slug='streaming';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'LEGENDARY', 'CASHBACK_BOOST', 15, 'PERCENT', 60, 'Кешбэк 15% на подписки 60 дней', NULL, '/icons/bonus/streaming-legendary-2.svg', 'Медиа Мастер' FROM categories WHERE slug='streaming';

-- =============================================
-- TECH (slug='tech')
-- =============================================
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'DEFAULT', 'NONE', 0, 'NONE', 1, 'Базовый предмет техники', NULL, '/icons/bonus/tech-default-1.svg', 'Гаджет' FROM categories WHERE slug='tech';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'COMMON', 'DISCOUNT', 5, 'PERCENT', 14, 'Скидка 5% в DNS', 'DNS', '/icons/bonus/tech-common-1.svg', 'Скидка DNS' FROM categories WHERE slug='tech';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'COMMON', 'CASHBACK_BOOST', 3, 'PERCENT', 30, 'Кешбэк 3% на технику', NULL, '/icons/bonus/tech-common-2.svg', 'Кешбэк Техника' FROM categories WHERE slug='tech';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'COMMON', 'DISCOUNT', 10, 'PERCENT', 14, 'Скидка 10% на ek.by', 'ek.by', '/icons/bonus/tech-common-3.svg', 'Скидка ek.by' FROM categories WHERE slug='tech';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'RARE', 'CASHBACK_BOOST', 5, 'PERCENT', 30, 'Кешбэк 5% на электронику', NULL, '/icons/bonus/tech-rare-1.svg', 'Кешбэк 5%' FROM categories WHERE slug='tech';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'RARE', 'PROMO_CODE', 20, 'BYN', 14, 'Промокод 20 BYN в DNS', 'DNS', '/icons/bonus/tech-rare-2.svg', 'Промокод DNS' FROM categories WHERE slug='tech';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'RARE', 'DISCOUNT', 15, 'PERCENT', 14, 'Скидка 15% на ek.by', 'ek.by', '/icons/bonus/tech-rare-3.svg', 'Электроника' FROM categories WHERE slug='tech';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'EPIC', 'PROMO_CODE', 40, 'BYN', 14, 'Промокод 40 BYN в DNS', 'DNS', '/icons/bonus/tech-epic-1.svg', 'Большой Промокод' FROM categories WHERE slug='tech';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'EPIC', 'CASHBACK_BOOST', 8, 'PERCENT', 30, 'Кешбэк 8% на технику', NULL, '/icons/bonus/tech-epic-2.svg', 'Кешбэк Гаджеты' FROM categories WHERE slug='tech';

INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'LEGENDARY', 'CERTIFICATE', 100, 'BYN', 30, 'Сертификат 100 BYN в DNS', 'DNS', '/icons/bonus/tech-legendary-1.svg', 'Золотой Гаджет' FROM categories WHERE slug='tech';
INSERT INTO bonus_templates (category_id, rarity, bonus_type, value, unit, timer_days, description, partner_name, icon_path, item_name)
SELECT id, 'LEGENDARY', 'CASHBACK_BOOST', 15, 'PERCENT', 60, 'Кешбэк 15% на электронику 60 дней', NULL, '/icons/bonus/tech-legendary-2.svg', 'Мастер Техники' FROM categories WHERE slug='tech';
