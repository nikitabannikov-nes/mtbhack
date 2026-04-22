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
    { id: 'f1', category: 'food', name: 'Кешбэк 5%\nв ресторанах',   icon: '🍕', mtballs: 50,   rarity: 'common',    desc: 'Кешбэк 5% на все покупки в ресторанах и кафе 30 дней' },
    { id: 'f2', category: 'food', name: 'Скидка 15%\nв кафе',         icon: '☕', mtballs: 200,  rarity: 'rare',      desc: 'Промокод на скидку 15% в партнёрских кафе' },
    { id: 'f3', category: 'food', name: 'Доставка\nбесплатно ×5',     icon: '🚚', mtballs: 600,  rarity: 'epic',      desc: 'Бесплатная доставка еды на 5 заказов' },
    { id: 'f4', category: 'food', name: 'VIP-ужин\nна двоих',         icon: '🍾', mtballs: 1800, rarity: 'legendary', desc: 'Торжественный ужин на двоих в ресторане-партнёре' },
  ],
  travel: [
    { id: 't1', category: 'travel', name: '100\nавиамиль',            icon: '✈️', mtballs: 100,  rarity: 'common',    desc: 'Авиамили программы Белавиа Лидер' },
    { id: 't2', category: 'travel', name: 'Скидка 10%\nна ж/д',       icon: '🚂', mtballs: 300,  rarity: 'rare',      desc: 'Скидка на покупку железнодорожных билетов' },
    { id: 't3', category: 'travel', name: 'Ночь\nв отеле 4★',         icon: '🏨', mtballs: 900,  rarity: 'epic',      desc: 'Бесплатный ночлег в отеле-партнёре 4 звезды' },
    { id: 't4', category: 'travel', name: 'Тур\nна выходные',         icon: '🌴', mtballs: 2500, rarity: 'legendary', desc: 'Двухдневный тур на двоих от партнёра МТБанка' },
  ],
  entertainment: [
    { id: 'e1', category: 'entertainment', name: 'Скидка 5%\nв кино', icon: '🎟️', mtballs: 50,   rarity: 'common',    desc: 'Скидка 5% на билеты в кинотеатры-партнёры' },
    { id: 'e2', category: 'entertainment', name: '2 билета\nв кино',  icon: '🎬', mtballs: 250,  rarity: 'rare',      desc: 'Два билета на любой сеанс в кинотеатрах-партнёрах' },
    { id: 'e3', category: 'entertainment', name: 'Подписка\n1 месяц', icon: '🎵', mtballs: 700,  rarity: 'epic',      desc: 'Месяц бесплатного стриминга в Яндекс Музыке' },
    { id: 'e4', category: 'entertainment', name: 'Билет\nна концерт', icon: '🎤', mtballs: 2000, rarity: 'legendary', desc: 'Билет на концерт в Минск-Арене от партнёра' },
  ],
  shopping: [
    { id: 's1', category: 'shopping', name: 'Кешбэк 3%\nв магазинах', icon: '🛍️', mtballs: 50,   rarity: 'common',    desc: 'Кешбэк 3% на покупки в Wildberries и Ozon' },
    { id: 's2', category: 'shopping', name: 'Скидка 10%\nв магазине', icon: '🏷️', mtballs: 200,  rarity: 'rare',      desc: 'Промокод на скидку 10% в магазине-партнёре' },
    { id: 's3', category: 'shopping', name: 'Промокод\n−500 BYN',     icon: '💳', mtballs: 700,  rarity: 'epic',      desc: 'Скидка 500 рублей на следующую покупку от 2000 BYN' },
    { id: 's4', category: 'shopping', name: 'Шопинг-\nсертификат',   icon: '👑', mtballs: 2000, rarity: 'legendary', desc: 'Сертификат на 200 BYN в любом магазине-партнёре' },
  ],
  health: [
    { id: 'h1', category: 'health', name: 'Скидка 10%\nв аптеках',  icon: '💊', mtballs: 80,   rarity: 'common',    desc: 'Скидка 10% на лекарства в аптеках Доктор Сэм' },
    { id: 'h2', category: 'health', name: 'Визит\nк врачу',          icon: '🏥', mtballs: 300,  rarity: 'rare',      desc: 'Бесплатная консультация терапевта в клинике-партнёре' },
    { id: 'h3', category: 'health', name: 'Диагностика\nорганизма',  icon: '🔬', mtballs: 800,  rarity: 'epic',      desc: 'Комплексная диагностика в медицинском центре' },
    { id: 'h4', category: 'health', name: 'Годовой\nмедабонемент',   icon: '⚕️', mtballs: 2200, rarity: 'legendary', desc: 'Год бесплатных посещений клиники-партнёра' },
  ],
  sport: [
    { id: 'sp1', category: 'sport', name: 'Скидка 10%\nна экипировку', icon: '⚽', mtballs: 100,  rarity: 'common',    desc: 'Скидка 10% в магазинах Intersport' },
    { id: 'sp2', category: 'sport', name: 'Посещение\nфитнеса',        icon: '💪', mtballs: 280,  rarity: 'rare',      desc: 'Разовое посещение фитнес-клуба World Class' },
    { id: 'sp3', category: 'sport', name: 'Месяц\nв фитнесе',          icon: '🏋️', mtballs: 800,  rarity: 'epic',      desc: 'Месяц безлимитного посещения фитнес-клуба' },
    { id: 'sp4', category: 'sport', name: 'Персональный\nтренер',      icon: '🏆', mtballs: 2500, rarity: 'legendary', desc: '5 занятий с персональным тренером в фитнес-клубе' },
  ],
  default: [
    { id: 'd1', category: 'default', name: '50\nМТБаллов',   icon: '🪙', mtballs: 50,   rarity: 'common',    desc: 'Монета МТБаллов' },
    { id: 'd2', category: 'default', name: '200\nМТБаллов',  icon: '💰', mtballs: 200,  rarity: 'rare',      desc: 'Золотая монета МТБаллов' },
    { id: 'd3', category: 'default', name: '700\nМТБаллов',  icon: '💎', mtballs: 700,  rarity: 'epic',      desc: 'Кристалл МТБаллов' },
    { id: 'd4', category: 'default', name: '2000\nМТБаллов', icon: '🌟', mtballs: 2000, rarity: 'legendary', desc: 'Звезда МТБаллов — джекпот!' },
  ],
}

export const TASKS = [
  { id: 'w1', type: 'weekly',   icon: '💳', energy: 3, name: 'Сделай 3 покупки по карте',          progress: 2, total: 3 },
  { id: 'w2', type: 'weekly',   icon: '🏠', energy: 2, name: 'Оплати услугу ЖКХ',                  progress: 0, total: 1 },
  { id: 'w3', type: 'weekly',   icon: '📤', energy: 2, name: 'Переведи другу через МТБ',            progress: 1, total: 1 },
  { id: 'w4', type: 'weekly',   icon: '📱', energy: 2, name: 'Пополни мобильный через приложение',  progress: 0, total: 1 },
  { id: 'r1', type: 'referral', icon: '👥', energy: 5, name: 'Пригласи друга в МТБанк',             progress: 0, total: 1 },
  { id: 'r2', type: 'referral', icon: '🏦', energy: 4, name: 'Открой вклад',                        progress: 0, total: 1 },
]
