# МТБ Игра

Merge-игра с банковскими бонусами МТБанка. MVP.

## Стек

| Слой | Технологии |
|------|-----------|
| Frontend | Next.js 14, TypeScript, Tailwind CSS, Zustand, React Query |
| Backend | Java 21, Spring Boot 3, Spring Security (JWT), JPA/Hibernate, Flyway |
| БД | MySQL 8 |
| Инфра | Docker Compose |

## Быстрый старт

### Требования
- Docker + Docker Compose
- Node.js 20+ (для локальной разработки фронтенда)
- Java 21 + Maven (для локальной разработки бэкенда)

### Docker (рекомендуется)

```bash
cp .env.example .env
docker-compose up --build
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- Swagger UI: http://localhost:8080/swagger-ui.html

### Локальная разработка

**Frontend:**
```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

**Backend:**
```bash
cd backend
cp .env.example .env
# Запустить MySQL (или использовать docker-compose только для БД)
docker-compose up mysql -d
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

## Структура проекта

```
hack_mtb/
├── frontend/          # Next.js 14 App Router
│   ├── app/
│   │   ├── (auth)/    # login, register
│   │   └── (app)/     # game, tasks, categories, profile
│   ├── components/
│   ├── lib/           # api.ts, constants.ts
│   ├── store/         # Zustand stores
│   └── types/
├── backend/           # Spring Boot 3
│   └── src/main/java/com/mtb/game/
│       ├── controller/
│       ├── service/
│       ├── repository/
│       ├── domain/
│       ├── dto/
│       └── config/
├── docker-compose.yml
└── README.md
```

## Переменные окружения

| Переменная | Описание | По умолчанию |
|-----------|----------|-------------|
| `JWT_SECRET` | Секрет для подписи JWT | changeme |
| `DB_HOST` | Хост MySQL | localhost |
| `DB_NAME` | Имя БД | mtb_game |
| `DB_USER` | Пользователь БД | mtb |
| `DB_PASSWORD` | Пароль БД | mtb |
| `NEXT_PUBLIC_API_URL` | URL бэкенда | http://localhost:8080 |
