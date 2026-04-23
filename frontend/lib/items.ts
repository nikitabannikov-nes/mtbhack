import type { Rarity, CategoryId, RewardType } from '@/types'

export interface ItemTemplate {
  iconPath: string
  name: string
  bonusType: RewardType
  description: string
  bonusValue: number
  bonusUnit: 'PERCENT' | 'BYN' | 'NONE'
  partnerName: string
  timerDays: number
}

type Catalog = Record<CategoryId, Record<Rarity, ItemTemplate>>

export const ITEM_CATALOG: Catalog = {
  coffee: {
    DEFAULT:   { iconPath: '/icons/bonus/coffee-default-1.svg',   name: 'Кофе',           bonusType: 'NONE',           description: '',                                 bonusValue: 0,   bonusUnit: 'NONE',    partnerName: '',        timerDays: 0 },
    COMMON:    { iconPath: '/icons/bonus/coffee-common-1.svg',    name: 'Кофе+',          bonusType: 'CASHBACK_BOOST', description: '+0.1% кешбэк в кофейнях',          bonusValue: 0.1, bonusUnit: 'PERCENT', partnerName: 'Партнёры МТБ',   timerDays: 2 },
    RARE:      { iconPath: '/icons/bonus/coffee-rare-1.svg',      name: 'Кофе Скидка',    bonusType: 'PROMO_CODE',     description: '−3% промокод в кофейне',           bonusValue: 3,   bonusUnit: 'PERCENT', partnerName: 'Mak.by',  timerDays: 3 },
    EPIC:      { iconPath: '/icons/bonus/coffee-epic-1.svg',      name: 'Кофе Бонус',     bonusType: 'DISCOUNT',       description: '−10% на один напиток',             bonusValue: 10,  bonusUnit: 'PERCENT', partnerName: 'Papa John\'s', timerDays: 5 },
    LEGENDARY: { iconPath: '/icons/bonus/coffee-legendary-1.svg', name: 'Кофе Легенда',   bonusType: 'CERTIFICATE',    description: '1 бесплатный визит',               bonusValue: 1,   bonusUnit: 'NONE',    partnerName: 'KFC',     timerDays: 7 },
  },
  food: {
    DEFAULT:   { iconPath: '/icons/bonus/food-default-1.svg',   name: 'Еда',            bonusType: 'NONE',           description: '',                                 bonusValue: 0,   bonusUnit: 'NONE',    partnerName: '',        timerDays: 0 },
    COMMON:    { iconPath: '/icons/bonus/food-common-1.svg',    name: 'Еда+',           bonusType: 'CASHBACK_BOOST', description: '+0.1% кешбэк в ресторанах',        bonusValue: 0.1, bonusUnit: 'PERCENT', partnerName: 'Партнёры МТБ',   timerDays: 2 },
    RARE:      { iconPath: '/icons/bonus/food-rare-1.svg',      name: 'Ресторан Скидка',bonusType: 'PROMO_CODE',     description: '−2% на заказ в ресторане',         bonusValue: 2,   bonusUnit: 'PERCENT', partnerName: 'Burger King', timerDays: 3 },
    EPIC:      { iconPath: '/icons/bonus/food-epic-1.svg',      name: 'Ресторан Бонус', bonusType: 'DISCOUNT',       description: '−5% от 30 BYN',                   bonusValue: 5,   bonusUnit: 'PERCENT', partnerName: 'Domino\'s', timerDays: 5 },
    LEGENDARY: { iconPath: '/icons/bonus/food-legendary-1.svg', name: 'Еда Легенда',   bonusType: 'CERTIFICATE',    description: 'Обед на одного ~20 BYN',           bonusValue: 20,  bonusUnit: 'BYN',     partnerName: 'Sbarro',  timerDays: 7 },
  },
  transport: {
    DEFAULT:   { iconPath: '/icons/bonus/transport-default-1.svg',   name: 'Транспорт',      bonusType: 'NONE',           description: '',                                 bonusValue: 0,   bonusUnit: 'NONE',    partnerName: '',        timerDays: 0 },
    COMMON:    { iconPath: '/icons/bonus/transport-common-1.svg',    name: 'Транспорт+',     bonusType: 'CASHBACK_BOOST', description: '+0.1% кешбэк на транспорт',        bonusValue: 0.1, bonusUnit: 'PERCENT', partnerName: 'Партнёры МТБ', timerDays: 2 },
    RARE:      { iconPath: '/icons/bonus/transport-rare-1.svg',      name: 'Такси Скидка',   bonusType: 'PROMO_CODE',     description: '−4% такси, 1 поездка',            bonusValue: 4,   bonusUnit: 'PERCENT', partnerName: 'HELLO', timerDays: 3 },
    EPIC:      { iconPath: '/icons/bonus/transport-epic-1.svg',      name: 'Такси Бонус',    bonusType: 'DISCOUNT',       description: '−6% такси, 1 день',               bonusValue: 6,   bonusUnit: 'PERCENT', partnerName: 'HELLO', timerDays: 5 },
    LEGENDARY: { iconPath: '/icons/bonus/transport-legendary-1.svg', name: 'Транспорт Легенда', bonusType: 'SUBSCRIPTION', description: 'Льготный проезд 1 неделя',      bonusValue: 7,   bonusUnit: 'NONE',    partnerName: 'HELLO', timerDays: 7 },
  },
  shopping: {
    DEFAULT:   { iconPath: '/icons/bonus/shopping-default-1.svg',   name: 'Маркет',        bonusType: 'NONE',           description: '',                                 bonusValue: 0,   bonusUnit: 'NONE',    partnerName: '',        timerDays: 0 },
    COMMON:    { iconPath: '/icons/bonus/shopping-common-1.svg',    name: 'Маркет+',       bonusType: 'CASHBACK_BOOST', description: '+0.1% кешбэк',                    bonusValue: 0.1, bonusUnit: 'PERCENT', partnerName: '21vek.by', timerDays: 2 },
    RARE:      { iconPath: '/icons/bonus/shopping-rare-1.svg',      name: 'Маркет Скидка', bonusType: 'PROMO_CODE',     description: '−2% (лимит 1 BYN)',               bonusValue: 2,   bonusUnit: 'PERCENT', partnerName: '21vek.by', timerDays: 3 },
    EPIC:      { iconPath: '/icons/bonus/shopping-epic-1.svg',      name: 'Маркет Бонус',  bonusType: 'DISCOUNT',       description: '−10 BYN от заказа 200 BYN',       bonusValue: 10,  bonusUnit: 'BYN',     partnerName: '21vek.by', timerDays: 5 },
    LEGENDARY: { iconPath: '/icons/bonus/shopping-legendary-1.svg', name: 'Маркет Легенда',bonusType: 'CERTIFICATE',    description: 'Сертификат 20 BYN',               bonusValue: 20,  bonusUnit: 'BYN',     partnerName: '21vek.by', timerDays: 7 },
  },
  gaming: {
    DEFAULT:   { iconPath: '/icons/bonus/gaming-default-1.svg',   name: 'Игры',           bonusType: 'NONE',           description: '',                                 bonusValue: 0,   bonusUnit: 'NONE',    partnerName: '',        timerDays: 0 },
    COMMON:    { iconPath: '/icons/bonus/gaming-common-1.svg',    name: 'Игры+',          bonusType: 'PROMO_CODE',     description: 'Промокод на игровой контент',      bonusValue: 0,   bonusUnit: 'NONE',    partnerName: 'Hero Park', timerDays: 2 },
    RARE:      { iconPath: '/icons/bonus/gaming-rare-1.svg',      name: 'Игры Скидка',    bonusType: 'DISCOUNT',       description: '−4% у партнёра',                  bonusValue: 4,   bonusUnit: 'PERCENT', partnerName: 'Hero Park', timerDays: 3 },
    EPIC:      { iconPath: '/icons/bonus/gaming-epic-1.svg',      name: 'Игры Бонус',     bonusType: 'SUBSCRIPTION',   description: '6 дней подписки',                 bonusValue: 6,   bonusUnit: 'NONE',    partnerName: 'Яндекс Плюс', timerDays: 5 },
    LEGENDARY: { iconPath: '/icons/bonus/gaming-legendary-1.svg', name: 'Игры Легенда',   bonusType: 'SUBSCRIPTION',   description: '1 неделя премиума',               bonusValue: 7,   bonusUnit: 'NONE',    partnerName: 'Яндекс Плюс', timerDays: 7 },
  },
  travel: {
    DEFAULT:   { iconPath: '/icons/bonus/travel-default-1.svg',   name: 'Путешествия',    bonusType: 'NONE',           description: '',                                 bonusValue: 0,   bonusUnit: 'NONE',    partnerName: '',        timerDays: 0 },
    COMMON:    { iconPath: '/icons/bonus/travel-common-1.svg',    name: 'Путешествия+',   bonusType: 'CASHBACK_BOOST', description: '+0.2% кешбэк на авиа/ж/д',        bonusValue: 0.2, bonusUnit: 'PERCENT', partnerName: 'tickets.by', timerDays: 2 },
    RARE:      { iconPath: '/icons/bonus/travel-rare-1.svg',      name: 'Билет Скидка',   bonusType: 'DISCOUNT',       description: '−2% на ж/д билеты',               bonusValue: 2,   bonusUnit: 'PERCENT', partnerName: 'tickets.by', timerDays: 3 },
    EPIC:      { iconPath: '/icons/bonus/travel-epic-1.svg',      name: 'Отель Бонус',    bonusType: 'DISCOUNT',       description: '−4% на отель',                   bonusValue: 4,   bonusUnit: 'PERCENT', partnerName: 'iOL Hotels', timerDays: 5 },
    LEGENDARY: { iconPath: '/icons/bonus/travel-legendary-1.svg', name: 'Тревел Легенда', bonusType: 'CERTIFICATE',    description: 'Скидка 20 BYN на бронирование',   bonusValue: 20,  bonusUnit: 'BYN',     partnerName: 'TravelHub', timerDays: 7 },
  },
  fitness: {
    DEFAULT:   { iconPath: '/icons/bonus/fitness-default-1.svg',   name: 'Фитнес',         bonusType: 'NONE',           description: '',                                 bonusValue: 0,   bonusUnit: 'NONE',    partnerName: '',          timerDays: 0 },
    COMMON:    { iconPath: '/icons/bonus/fitness-common-1.svg',    name: 'Фитнес+',        bonusType: 'DISCOUNT',       description: '−10% в спортзале',                bonusValue: 10,  bonusUnit: 'PERCENT', partnerName: 'FitnessBY', timerDays: 2 },
    RARE:      { iconPath: '/icons/bonus/fitness-rare-1.svg',      name: 'Спорттовары',    bonusType: 'PROMO_CODE',     description: 'Промокод 5 BYN на спорттовары',   bonusValue: 5,   bonusUnit: 'BYN',     partnerName: 'Sport-Master', timerDays: 3 },
    EPIC:      { iconPath: '/icons/bonus/fitness-epic-1.svg',      name: 'Кэшбэк Фитнес', bonusType: 'CASHBACK_BOOST', description: '+3% на спортивные покупки',       bonusValue: 3,   bonusUnit: 'PERCENT', partnerName: 'МТБанк',    timerDays: 5 },
    LEGENDARY: { iconPath: '/icons/bonus/fitness-legendary-1.svg', name: 'Золотой Фитнес', bonusType: 'SUBSCRIPTION',   description: 'Абонемент на месяц',              bonusValue: 30,  bonusUnit: 'NONE',    partnerName: 'FitnessBY', timerDays: 7 },
  },
  education: {
    DEFAULT:   { iconPath: '/icons/bonus/education-default-1.svg',   name: 'Обучение',       bonusType: 'NONE',           description: '',                                 bonusValue: 0,   bonusUnit: 'NONE',    partnerName: '',        timerDays: 0 },
    COMMON:    { iconPath: '/icons/bonus/education-common-1.svg',    name: 'Обучение+',      bonusType: 'SUBSCRIPTION',   description: '1 пробное занятие',               bonusValue: 1,   bonusUnit: 'NONE',    partnerName: 'Skillbox', timerDays: 2 },
    RARE:      { iconPath: '/icons/bonus/education-rare-1.svg',      name: 'Курс Скидка',    bonusType: 'DISCOUNT',       description: '−4% на курс',                    bonusValue: 4,   bonusUnit: 'PERCENT', partnerName: 'Skillbox', timerDays: 3 },
    EPIC:      { iconPath: '/icons/bonus/education-epic-1.svg',      name: 'Курс Бонус',     bonusType: 'SUBSCRIPTION',   description: '1 неделя обучения бесплатно',     bonusValue: 7,   bonusUnit: 'NONE',    partnerName: 'Skillbox', timerDays: 5 },
    LEGENDARY: { iconPath: '/icons/bonus/education-legendary-1.svg', name: 'Обучение Легенда',bonusType: 'SUBSCRIPTION',  description: '1 модуль курса бесплатно',        bonusValue: 1,   bonusUnit: 'NONE',    partnerName: 'Skillbox', timerDays: 7 },
  },
  streaming: {
    DEFAULT:   { iconPath: '/icons/bonus/streaming-default-1.svg',   name: 'Стриминг',         bonusType: 'NONE',           description: '',                                 bonusValue: 0,   bonusUnit: 'NONE',    partnerName: '',             timerDays: 0 },
    COMMON:    { iconPath: '/icons/bonus/streaming-common-1.svg',    name: 'Стриминг+',        bonusType: 'DISCOUNT',       description: '−20% на подписку',                bonusValue: 20,  bonusUnit: 'PERCENT', partnerName: 'Яндекс Плюс', timerDays: 2 },
    RARE:      { iconPath: '/icons/bonus/streaming-rare-1.svg',      name: 'Музыка Бонус',     bonusType: 'PROMO_CODE',     description: 'Промокод 5 BYN на подписку',      bonusValue: 5,   bonusUnit: 'BYN',     partnerName: 'Яндекс Плюс', timerDays: 3 },
    EPIC:      { iconPath: '/icons/bonus/streaming-epic-1.svg',      name: 'Кэшбэк Стриминг', bonusType: 'CASHBACK_BOOST', description: '+5% на стриминг-сервисы',         bonusValue: 5,   bonusUnit: 'PERCENT', partnerName: 'МТБанк',       timerDays: 5 },
    LEGENDARY: { iconPath: '/icons/bonus/streaming-legendary-1.svg', name: 'Золотой Стриминг', bonusType: 'SUBSCRIPTION',   description: 'Подписка на 3 месяца',            bonusValue: 90,  bonusUnit: 'NONE',    partnerName: 'Яндекс Плюс', timerDays: 7 },
  },
  tech: {
    DEFAULT:   { iconPath: '/icons/bonus/tech-default-1.svg',   name: 'Техника',        bonusType: 'NONE',           description: '',                                 bonusValue: 0,   bonusUnit: 'NONE',    partnerName: '',        timerDays: 0 },
    COMMON:    { iconPath: '/icons/bonus/tech-common-1.svg',    name: 'Техника+',       bonusType: 'CASHBACK_BOOST', description: '+0.2% кешбэк на электронику',     bonusValue: 0.2, bonusUnit: 'PERCENT', partnerName: 'DNS', timerDays: 2 },
    RARE:      { iconPath: '/icons/bonus/tech-rare-1.svg',      name: 'Техника Скидка', bonusType: 'SUBSCRIPTION',   description: 'Гарантия +1 мес.',               bonusValue: 1,   bonusUnit: 'NONE',    partnerName: 'DNS', timerDays: 3 },
    EPIC:      { iconPath: '/icons/bonus/tech-epic-1.svg',      name: 'Техника Бонус',  bonusType: 'DISCOUNT',       description: '−2% на технику',                 bonusValue: 2,   bonusUnit: 'PERCENT', partnerName: 'DNS', timerDays: 5 },
    LEGENDARY: { iconPath: '/icons/bonus/tech-legendary-1.svg', name: 'Техника Легенда',bonusType: 'CERTIFICATE',    description: 'Сертификат 20 BYN',              bonusValue: 20,  bonusUnit: 'BYN',     partnerName: 'DNS', timerDays: 7 },
  },
}
