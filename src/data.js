export const CATEGORIES = [
  { id: 'food',          name: 'Еда',           icon: '🍕', color: '#E53935', desc: 'Рестораны и кафе' },
  { id: 'travel',        name: 'Путешествия',   icon: '✈️', color: '#00897B', desc: 'Билеты и отели' },
  { id: 'entertainment', name: 'Развлечения',   icon: '🎬', color: '#8E24AA', desc: 'Кино и концерты' },
  { id: 'shopping',      name: 'Покупки',       icon: '🛍️', color: '#F4511E', desc: 'Маркетплейсы' },
  { id: 'health',        name: 'Здоровье',      icon: '💊', color: '#D81B60', desc: 'Аптеки и клиники' },
  { id: 'sport',         name: 'Спорт',         icon: '⚽', color: '#43A047', desc: 'Фитнес и экипировка' },
]

export const CATEGORIES_MAP = Object.fromEntries(CATEGORIES.map(c => [c.id, c]))

export const ITEMS_BY_CATEGORY = {
  food: [
    { id: 'f1', name: 'Кешбэк 5%\nв ресторанах',   icon: '🍕', mtballs: 50,  rarity: 'common',    desc: 'На все покупки в ресторанах и кафе в течение 30 дней' },
    { id: 'f2', name: 'Скидка 15%\nв кафе',         icon: '☕', mtballs: 150, rarity: 'rare',      desc: 'Промокод на скидку 15% в партнёрских кафе' },
    { id: 'f3', name: 'Бесплатная\nдоставка ×5',    icon: '🚚', mtballs: 200, rarity: 'epic',      desc: 'Бесплатная доставка еды на 5 заказов в Delivery Club' },
  ],
  travel: [
    { id: 't1', name: '100 авиамиль',               icon: '✈️', mtballs: 100, rarity: 'common',    desc: 'Авиамили программы Белавиа Лидер' },
    { id: 't2', name: 'Скидка 10%\nна ж/д билет',  icon: '🚂', mtballs: 120, rarity: 'rare',      desc: 'Скидка на покупку железнодорожных билетов' },
    { id: 't3', name: 'Ночь в отеле\nбесплатно',   icon: '🏨', mtballs: 500, rarity: 'legendary', desc: 'Один бесплатный ночлег в отеле-партнёре 4★' },
  ],
  entertainment: [
    { id: 'e1', name: '2 билета\nв кино',           icon: '🎬', mtballs: 200, rarity: 'rare',      desc: 'Два билета на любой сеанс в кинотеатрах-партнёрах' },
    { id: 'e2', name: 'Подписка\nна 1 месяц',       icon: '🎵', mtballs: 300, rarity: 'epic',      desc: 'Месяц бесплатного стриминга в Яндекс Музыке' },
    { id: 'e3', name: 'Билет\nна концерт',          icon: '🎤', mtballs: 400, rarity: 'legendary', desc: 'Один билет на концерт партнёра в Минск-Арене' },
  ],
  shopping: [
    { id: 's1', name: 'Кешбэк 3%\nв маркетплейсах', icon: '🛍️', mtballs: 50,  rarity: 'common',    desc: 'Кешбэк 3% на покупки в Wildberries и Ozon' },
    { id: 's2', name: 'Промокод\n−500 BYN',          icon: '🏷️', mtballs: 500, rarity: 'epic',      desc: 'Скидка 500 рублей на следующую покупку от 2000 BYN' },
  ],
  health: [
    { id: 'h1', name: 'Скидка 10%\nв аптеках',     icon: '💊', mtballs: 80,  rarity: 'common',    desc: 'Скидка 10% на лекарства в аптеках Доктор Сэм' },
    { id: 'h2', name: 'Визит\nк терапевту',         icon: '🏥', mtballs: 400, rarity: 'epic',      desc: 'Бесплатная консультация терапевта в клинике-партнёре' },
  ],
  sport: [
    { id: 'sp1', name: 'Посещение\nфитнеса',        icon: '💪', mtballs: 150, rarity: 'rare',      desc: 'Разовое посещение фитнес-клуба World Class' },
    { id: 'sp2', name: 'Скидка 10%\nна экипировку', icon: '⚽', mtballs: 100, rarity: 'common',    desc: 'Скидка 10% в магазинах Intersport' },
  ],
  default: [
    { id: 'd1', name: '50\nМТБаллов',  icon: '🪙', mtballs: 50,  rarity: 'common', desc: 'Стандартная монета МТБаллов' },
    { id: 'd2', name: '100\nМТБаллов', icon: '💰', mtballs: 100, rarity: 'rare',   desc: 'Золотая монета МТБаллов' },
    { id: 'd3', name: '500\nМТБаллов', icon: '💎', mtballs: 500, rarity: 'epic',   desc: 'Кристалл МТБаллов — редкая удача!' },
  ],
}

export const TASKS = [
  { id: 'w1', type: 'weekly',   icon: '💳', energy: 3, name: 'Сделай 3 покупки по карте',       progress: 2, total: 3 },
  { id: 'w2', type: 'weekly',   icon: '🏠', energy: 2, name: 'Оплати услугу ЖКХ',               progress: 0, total: 1 },
  { id: 'w3', type: 'weekly',   icon: '📤', energy: 2, name: 'Переведи другу через МТБ',         progress: 1, total: 1 },
  { id: 'w4', type: 'weekly',   icon: '📱', energy: 2, name: 'Пополни мобильный через приложение', progress: 0, total: 1 },
  { id: 'r1', type: 'referral', icon: '👥', energy: 5, name: 'Пригласи друга в МТБанк',          progress: 0, total: 1 },
  { id: 'r2', type: 'referral', icon: '🏦', energy: 4, name: 'Открой вклад',                     progress: 0, total: 1 },
]
