![image](https://github.com/crash2410/ai_chat/assets/52864626/ecb56f4a-5e5f-49ab-854f-185a173d7a41)

# Сервис Genius AI

## Описание проекта

Genius - это платформа для взаимодействия с искусственным интеллектом, созданная с использованием Next.js 13, React, TypeScript, Tailwind и Prisma для работы с базой данных.

### Лендинг и Аутентификация

На главной странице предоставляется возможность пользователям войти в систему и зарегистрироваться.

### Взаимодействие с ИИ
![image](https://github.com/crash2410/ai_chat/assets/52864626/56dcd5ab-4504-45b5-b666-428ddb73657a)

Сервис предоставляет 5 различных разделов для взаимодействия с искусственным интеллектом:

1. **Conversation** - Получение информации по общим вопросам (Open AI).
2. **Music Generator** - Генерация мелодий (Replicate AI). Запросы делаются на английском языке.
3. **Image Generator** - Генерация изображений (Open AI). Запросы делаются на английском языке.
4. **Video Generator** - Генерация коротких видео (Replicate AI). Запросы делаются на английском языке.
5. **Code Generator** - Получение информации о разработке программного обеспечения (Open AI).

### Бесплатный период

Реализован бесплатный период, в рамках которого пользователи могут выполнить 6 бесплатных запросов.

## Инструкции по установке

### Предварительные требования

- Node.js версии 18.x.x

### Клонирование репозитория

```bash
git clone https://github.com/crash2410/ai_chat.git
```
### Установка зависимостей

```bash
npm i
```

### Настройка файла .env

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

OPENAI_API_KEY=
REPLICATE_API_TOKEN=

DATABASE_URL=

STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=

NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Настройка Prisma

Добавьте базу данных MySQL (я использовал PlanetScale)

```bash
npx prisma db push
```

### Запуск приложения

```bash
npm run dev
```