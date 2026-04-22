import type { Rarity, CategoryId, RewardType } from '@/types'

export interface ItemTemplate {
  icon: string
  name: string
  bonusType: RewardType
  bonusDescription: string
  bonusValue: number
  bonusUnit: 'PERCENT' | 'BYN' | 'NONE'
  partnerName: string
  timerMinDays: number
  timerMaxDays: number
}

type Catalog = Record<CategoryId, Record<Rarity, ItemTemplate>>

export const ITEM_CATALOG: Catalog = {
  coffee: {
    DEFAULT:   { icon: '☕', name: 'Кофе',           bonusType: 'NONE',           bonusDescription: '',                                 bonusValue: 0,   bonusUnit: 'NONE',    partnerName: '',        timerMinDays: 0, timerMaxDays: 0 },
    COMMON:    { icon: '🫖', name: 'Кофе+',          bonusType: 'CASHBACK_BOOST', bonusDescription: '+0.1% кешбэк в кофейнях',          bonusValue: 0.1, bonusUnit: 'PERCENT', partnerName: 'Партнёры МТБ',   timerMinDays: 1, timerMaxDays: 2 },
    RARE:      { icon: '🧋', name: 'Кофе Скидка',    bonusType: 'PROMO_CODE',     bonusDescription: '−3% промокод в кофейне',           bonusValue: 3,   bonusUnit: 'PERCENT', partnerName: 'Mak.by',  timerMinDays: 1, timerMaxDays: 3 },
    EPIC:      { icon: '🫶', name: 'Кофе Бонус',     bonusType: 'DISCOUNT',       bonusDescription: '−10% на один напиток',             bonusValue: 10,  bonusUnit: 'PERCENT', partnerName: 'Papa John\'s', timerMinDays: 3, timerMaxDays: 5 },
    LEGENDARY: { icon: '👑', name: 'Кофе Легенда',   bonusType: 'CERTIFICATE',    bonusDescription: '1 бесплатный визит',               bonusValue: 1,   bonusUnit: 'NONE',    partnerName: 'KFC',     timerMinDays: 5, timerMaxDays: 7 },
  },
  food: {
    DEFAULT:   { icon: '🍕', name: 'Еда',            bonusType: 'NONE',           bonusDescription: '',                                 bonusValue: 0,   bonusUnit: 'NONE',    partnerName: '',        timerMinDays: 0, timerMaxDays: 0 },
    COMMON:    { icon: '🥗', name: 'Еда+',           bonusType: 'CASHBACK_BOOST', bonusDescription: '+0.1% кешбэк в ресторанах',        bonusValue: 0.1, bonusUnit: 'PERCENT', partnerName: 'Партнёры МТБ',   timerMinDays: 1, timerMaxDays: 2 },
    RARE:      { icon: '🍔', name: 'Ресторан Скидка',bonusType: 'PROMO_CODE',     bonusDescription: '−2% на заказ в ресторане',         bonusValue: 2,   bonusUnit: 'PERCENT', partnerName: 'Burger King', timerMinDays: 1, timerMaxDays: 3 },
    EPIC:      { icon: '🍝', name: 'Ресторан Бонус', bonusType: 'DISCOUNT',       bonusDescription: '−5% от 30 BYN',                   bonusValue: 5,   bonusUnit: 'PERCENT', partnerName: 'Domino\'s', timerMinDays: 3, timerMaxDays: 5 },
    LEGENDARY: { icon: '🍽️', name: 'Еда Легенда',   bonusType: 'CERTIFICATE',    bonusDescription: 'Обед на одного ~20 BYN',           bonusValue: 20,  bonusUnit: 'BYN',     partnerName: 'Sbarro',  timerMinDays: 5, timerMaxDays: 7 },
  },
  delivery: {
    DEFAULT:   { icon: '📦', name: 'Доставка',       bonusType: 'NONE',           bonusDescription: '',                                 bonusValue: 0,   bonusUnit: 'NONE',    partnerName: '',        timerMinDays: 0, timerMaxDays: 0 },
    COMMON:    { icon: '🚚', name: 'Доставка+',      bonusType: 'DISCOUNT',       bonusDescription: '−0.1 BYN на доставку',             bonusValue: 0.1, bonusUnit: 'BYN',     partnerName: 'Яндекс Еда', timerMinDays: 1, timerMaxDays: 2 },
    RARE:      { icon: '⚡', name: 'Экспресс',       bonusType: 'FREE_DELIVERY',  bonusDescription: 'Бесплатная доставка ×1',           bonusValue: 1,   bonusUnit: 'NONE',    partnerName: 'Яндекс Еда', timerMinDays: 1, timerMaxDays: 3 },
    EPIC:      { icon: '🛵', name: 'Доставка Бонус', bonusType: 'FREE_DELIVERY',  bonusDescription: 'Бесплатная доставка ×1 на 2 дня',  bonusValue: 2,   bonusUnit: 'NONE',    partnerName: 'Яндекс Еда', timerMinDays: 3, timerMaxDays: 5 },
    LEGENDARY: { icon: '🚀', name: 'Доставка Легенда', bonusType: 'SUBSCRIPTION', bonusDescription: 'Бесплатная доставка 1 неделя',    bonusValue: 7,   bonusUnit: 'NONE',    partnerName: 'Яндекс Еда', timerMinDays: 5, timerMaxDays: 7 },
  },
  transport: {
    DEFAULT:   { icon: '🚕', name: 'Транспорт',      bonusType: 'NONE',           bonusDescription: '',                                 bonusValue: 0,   bonusUnit: 'NONE',    partnerName: '',        timerMinDays: 0, timerMaxDays: 0 },
    COMMON:    { icon: '🚗', name: 'Транспорт+',     bonusType: 'CASHBACK_BOOST', bonusDescription: '+0.1% кешбэк на транспорт',        bonusValue: 0.1, bonusUnit: 'PERCENT', partnerName: 'Партнёры МТБ', timerMinDays: 1, timerMaxDays: 2 },
    RARE:      { icon: '🛺', name: 'Такси Скидка',   bonusType: 'PROMO_CODE',     bonusDescription: '−4% такси, 1 поездка',            bonusValue: 4,   bonusUnit: 'PERCENT', partnerName: 'HELLO', timerMinDays: 1, timerMaxDays: 3 },
    EPIC:      { icon: '🚙', name: 'Такси Бонус',    bonusType: 'DISCOUNT',       bonusDescription: '−6% такси, 1 день',               bonusValue: 6,   bonusUnit: 'PERCENT', partnerName: 'HELLO', timerMinDays: 3, timerMaxDays: 5 },
    LEGENDARY: { icon: '🏎️', name: 'Транспорт Легенда', bonusType: 'SUBSCRIPTION', bonusDescription: 'Льготный проезд 1 неделя',      bonusValue: 7,   bonusUnit: 'NONE',    partnerName: 'HELLO', timerMinDays: 5, timerMaxDays: 7 },
  },
  subscriptions: {
    DEFAULT:   { icon: '🎵', name: 'Подписки',       bonusType: 'NONE',           bonusDescription: '',                                 bonusValue: 0,   bonusUnit: 'NONE',    partnerName: '',        timerMinDays: 0, timerMaxDays: 0 },
    COMMON:    { icon: '🎧', name: 'Подписки+',      bonusType: 'SUBSCRIPTION',   bonusDescription: 'Пробный период 1 день',            bonusValue: 1,   bonusUnit: 'NONE',    partnerName: 'Яндекс Плюс', timerMinDays: 1, timerMaxDays: 2 },
    RARE:      { icon: '📻', name: 'Подписка Скидка',bonusType: 'PROMO_CODE',     bonusDescription: '−6% на подписку',                 bonusValue: 6,   bonusUnit: 'PERCENT', partnerName: 'Яндекс Плюс', timerMinDays: 1, timerMaxDays: 3 },
    EPIC:      { icon: '🎬', name: 'Подписка Бонус', bonusType: 'SUBSCRIPTION',   bonusDescription: '1 неделя подписки бесплатно',     bonusValue: 7,   bonusUnit: 'NONE',    partnerName: 'Яндекс Плюс', timerMinDays: 3, timerMaxDays: 5 },
    LEGENDARY: { icon: '🌟', name: 'Подписка Легенда', bonusType: 'SUBSCRIPTION', bonusDescription: '2 недели подписки бесплатно',     bonusValue: 14,  bonusUnit: 'NONE',    partnerName: 'Яндекс Плюс', timerMinDays: 5, timerMaxDays: 7 },
  },
  marketplace: {
    DEFAULT:   { icon: '🛍️', name: 'Маркет',        bonusType: 'NONE',           bonusDescription: '',                                 bonusValue: 0,   bonusUnit: 'NONE',    partnerName: '',        timerMinDays: 0, timerMaxDays: 0 },
    COMMON:    { icon: '🏷️', name: 'Маркет+',       bonusType: 'CASHBACK_BOOST', bonusDescription: '+0.1% кешбэк',                    bonusValue: 0.1, bonusUnit: 'PERCENT', partnerName: '21vek.by', timerMinDays: 1, timerMaxDays: 2 },
    RARE:      { icon: '💳', name: 'Маркет Скидка',  bonusType: 'PROMO_CODE',     bonusDescription: '−2% (лимит 1 BYN)',               bonusValue: 2,   bonusUnit: 'PERCENT', partnerName: '21vek.by', timerMinDays: 1, timerMaxDays: 3 },
    EPIC:      { icon: '🎁', name: 'Маркет Бонус',   bonusType: 'DISCOUNT',       bonusDescription: '−10 BYN от заказа 200 BYN',       bonusValue: 10,  bonusUnit: 'BYN',     partnerName: '21vek.by', timerMinDays: 3, timerMaxDays: 5 },
    LEGENDARY: { icon: '💎', name: 'Маркет Легенда', bonusType: 'CERTIFICATE',    bonusDescription: 'Сертификат 20 BYN',               bonusValue: 20,  bonusUnit: 'BYN',     partnerName: '21vek.by', timerMinDays: 5, timerMaxDays: 7 },
  },
  games: {
    DEFAULT:   { icon: '🎮', name: 'Игры',           bonusType: 'NONE',           bonusDescription: '',                                 bonusValue: 0,   bonusUnit: 'NONE',    partnerName: '',        timerMinDays: 0, timerMaxDays: 0 },
    COMMON:    { icon: '🕹️', name: 'Игры+',         bonusType: 'PROMO_CODE',     bonusDescription: 'Промокод на игровой контент',      bonusValue: 0,   bonusUnit: 'NONE',    partnerName: 'Hero Park', timerMinDays: 1, timerMaxDays: 2 },
    RARE:      { icon: '🎯', name: 'Игры Скидка',    bonusType: 'DISCOUNT',       bonusDescription: '−4% у партнёра',                  bonusValue: 4,   bonusUnit: 'PERCENT', partnerName: 'Hero Park', timerMinDays: 1, timerMaxDays: 3 },
    EPIC:      { icon: '🏅', name: 'Игры Бонус',     bonusType: 'SUBSCRIPTION',   bonusDescription: '6 дней подписки',                 bonusValue: 6,   bonusUnit: 'NONE',    partnerName: 'Яндекс Плюс', timerMinDays: 3, timerMaxDays: 5 },
    LEGENDARY: { icon: '🏆', name: 'Игры Легенда',   bonusType: 'SUBSCRIPTION',   bonusDescription: '1 неделя премиума',               bonusValue: 7,   bonusUnit: 'NONE',    partnerName: 'Яндекс Плюс', timerMinDays: 5, timerMaxDays: 7 },
  },
  travel: {
    DEFAULT:   { icon: '✈️', name: 'Путешествия',    bonusType: 'NONE',           bonusDescription: '',                                 bonusValue: 0,   bonusUnit: 'NONE',    partnerName: '',        timerMinDays: 0, timerMaxDays: 0 },
    COMMON:    { icon: '🚂', name: 'Путешествия+',   bonusType: 'CASHBACK_BOOST', bonusDescription: '+0.2% кешбэк на авиа/ж/д',        bonusValue: 0.2, bonusUnit: 'PERCENT', partnerName: 'tickets.by', timerMinDays: 1, timerMaxDays: 2 },
    RARE:      { icon: '🎫', name: 'Билет Скидка',   bonusType: 'DISCOUNT',       bonusDescription: '−2% на ж/д билеты',               bonusValue: 2,   bonusUnit: 'PERCENT', partnerName: 'tickets.by', timerMinDays: 1, timerMaxDays: 3 },
    EPIC:      { icon: '🏨', name: 'Отель Бонус',    bonusType: 'DISCOUNT',       bonusDescription: '−4% на отель',                   bonusValue: 4,   bonusUnit: 'PERCENT', partnerName: 'iOL Hotels', timerMinDays: 3, timerMaxDays: 5 },
    LEGENDARY: { icon: '🌴', name: 'Тревел Легенда', bonusType: 'CERTIFICATE',    bonusDescription: 'Скидка 20 BYN на бронирование',   bonusValue: 20,  bonusUnit: 'BYN',     partnerName: 'TravelHub', timerMinDays: 5, timerMaxDays: 7 },
  },
  education: {
    DEFAULT:   { icon: '📚', name: 'Обучение',       bonusType: 'NONE',           bonusDescription: '',                                 bonusValue: 0,   bonusUnit: 'NONE',    partnerName: '',        timerMinDays: 0, timerMaxDays: 0 },
    COMMON:    { icon: '📖', name: 'Обучение+',      bonusType: 'SUBSCRIPTION',   bonusDescription: '1 пробное занятие',               bonusValue: 1,   bonusUnit: 'NONE',    partnerName: 'Skillbox', timerMinDays: 1, timerMaxDays: 2 },
    RARE:      { icon: '🎓', name: 'Курс Скидка',    bonusType: 'DISCOUNT',       bonusDescription: '−4% на курс',                    bonusValue: 4,   bonusUnit: 'PERCENT', partnerName: 'Skillbox', timerMinDays: 1, timerMaxDays: 3 },
    EPIC:      { icon: '🧑‍💻', name: 'Курс Бонус',  bonusType: 'SUBSCRIPTION',   bonusDescription: '1 неделя обучения бесплатно',     bonusValue: 7,   bonusUnit: 'NONE',    partnerName: 'Skillbox', timerMinDays: 3, timerMaxDays: 5 },
    LEGENDARY: { icon: '🌟', name: 'Обучение Легенда', bonusType: 'SUBSCRIPTION', bonusDescription: '1 модуль курса бесплатно',        bonusValue: 1,   bonusUnit: 'NONE',    partnerName: 'Skillbox', timerMinDays: 5, timerMaxDays: 7 },
  },
  tech: {
    DEFAULT:   { icon: '💻', name: 'Техника',        bonusType: 'NONE',           bonusDescription: '',                                 bonusValue: 0,   bonusUnit: 'NONE',    partnerName: '',        timerMinDays: 0, timerMaxDays: 0 },
    COMMON:    { icon: '⌚', name: 'Техника+',       bonusType: 'CASHBACK_BOOST', bonusDescription: '+0.2% кешбэк на электронику',     bonusValue: 0.2, bonusUnit: 'PERCENT', partnerName: 'DNS', timerMinDays: 1, timerMaxDays: 2 },
    RARE:      { icon: '🖥️', name: 'Техника Скидка',bonusType: 'SUBSCRIPTION',   bonusDescription: 'Гарантия +1 мес.',               bonusValue: 1,   bonusUnit: 'NONE',    partnerName: 'DNS', timerMinDays: 1, timerMaxDays: 3 },
    EPIC:      { icon: '📱', name: 'Техника Бонус',  bonusType: 'DISCOUNT',       bonusDescription: '−2% на технику',                 bonusValue: 2,   bonusUnit: 'PERCENT', partnerName: 'DNS', timerMinDays: 3, timerMaxDays: 5 },
    LEGENDARY: { icon: '🔮', name: 'Техника Легенда',bonusType: 'CERTIFICATE',    bonusDescription: 'Сертификат 20 BYN',              bonusValue: 20,  bonusUnit: 'BYN',     partnerName: 'DNS', timerMinDays: 5, timerMaxDays: 7 },
  },
}
