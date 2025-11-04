# 🚀 Backend API - Express.js + TypeScript + Prisma

Backend API yang powerful dan production-ready dibangun dengan Express.js, TypeScript, dan Prisma ORM. Dirancang untuk aplikasi web modern dengan fitur lengkap authentication, validation, logging, dan testing.

## 📋 Daftar Isi

- [✨ Fitur](#-fitur)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Struktur Project](#-struktur-project)
- [🚀 Quick Start](#-quick-start)
- [📦 Dependencies & DevDependencies](#-dependencies--devdependencies)
- [🔧 Konfigurasi Environment](#-konfigurasi-environment)
- [🗄️ Database Setup](#️-database-setup)
- [📡 API Endpoints](#-api-endpoints)
- [🧪 Testing](#-testing)
- [📏 Scripts](#-scripts)
- [🔒 Security Features](#-security-features)
- [📊 Monitoring & Logging](#-monitoring--logging)
- [🤝 Contributing](#-contributing)

## ✨ Fitur

- ✅ **Authentication & Authorization** - JWT-based auth dengan role system
- ✅ **Input Validation** - Zod schema validation untuk semua input
- ✅ **Database ORM** - Prisma dengan MySQL
- ✅ **Error Handling** - Centralized error handling middleware
- ✅ **Rate Limiting** - Protection terhadap brute force attacks
- ✅ **File Upload** - Multer untuk handling file uploads
- ✅ **Logging** - Winston untuk structured logging
- ✅ **Testing** - Jest + Supertest untuk unit & integration tests
- ✅ **Code Quality** - ESLint + Prettier + Husky pre-commit hooks
- ✅ **TypeScript** - Full type safety
- ✅ **CORS** - Cross-origin resource sharing
- ✅ **Environment Config** - Dotenv untuk environment management

## 🛠️ Tech Stack

### **Runtime & Framework**

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework untuk Node.js
- **TypeScript** - Superset JavaScript dengan static typing

### **Database**

- **MySQL** - Relational database
- **Prisma** - Next-generation ORM untuk TypeScript & Node.js

### **Authentication & Security**

- **JWT (JSON Web Tokens)** - Token-based authentication
- **bcrypt** - Password hashing
- **express-rate-limit** - Rate limiting middleware

### **Validation & Error Handling**

- **Zod** - TypeScript-first schema validation
- **express-async-handler** - Async error handling

### **File Handling**

- **multer** - Middleware untuk handling multipart/form-data

### **Logging & Monitoring**

- **Winston** - Versatile logging library
- **Morgan** - HTTP request logger middleware

### **Development Tools**

- **tsx** - TypeScript execution environment for node
- **nodemon** - Auto-restart server saat development
- **Jest** - Testing framework
- **Supertest** - HTTP endpoint testing
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Run linters on staged files

## 📁 Struktur Project

```
backend-api/
├── src/
│   ├── config/           # Database & environment configuration
│   ├── controllers/      # Route controllers (business logic)
│   ├── middlewares/      # Custom middlewares
│   ├── routes/          # API routes
│   ├── services/        # Business logic services
│   ├── types/           # TypeScript type definitions
│   ├── utils/           # Utility functions
│   ├── validations/     # Zod validation schemas
│   ├── app.ts           # Express app setup
│   └── server.ts        # Server entry point
├── tests/               # Test files
│   ├── unit/           # Unit tests
│   └── integration/    # Integration tests
├── prisma/             # Database schema & migrations
├── uploads/            # File upload directory
├── logs/               # Application logs
├── .env.example        # Environment variables template
├── .gitignore         # Git ignore rules
├── eslint.config.js   # ESLint configuration
├── jest.config.js     # Jest configuration
├── package.json       # Dependencies & scripts
├── tsconfig.json      # TypeScript configuration
└── README.md          # Documentation
```

## 🚀 Quick Start

### **1. Clone Repository**

```bash
git clone <repository-url>
cd backend-api
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Setup Environment Variables**

```bash
cp .env.example .env
```

Edit `.env` file dengan konfigurasi database dan JWT secret kamu:

```env
NODE_ENV=development
PORT=5000
DATABASE_URL="mysql://user:password@localhost:3306/dbname"
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
```

### **4. Setup Database**

```bash
# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# (Optional) Open Prisma Studio untuk melihat database
npm run prisma:studio
```

### **5. Start Development Server**

```bash
npm run dev
```

Server akan berjalan di `http://localhost:5000`

### **6. Test API**

```bash
# Register user baru
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## 📦 Dependencies & DevDependencies

### **📚 Production Dependencies**

| Package                 | Version | Purpose                                       |
| ----------------------- | ------- | --------------------------------------------- |
| `@prisma/client`        | ^6.18.0 | Database ORM client untuk query database      |
| `bcrypt`                | ^6.0.0  | Password hashing untuk keamanan               |
| `cors`                  | ^2.8.5  | Cross-Origin Resource Sharing middleware      |
| `dotenv`                | ^17.2.3 | Environment variables management              |
| `express`               | ^5.1.0  | Web framework untuk Node.js                   |
| `express-async-handler` | ^1.2.0  | Async error handling wrapper                  |
| `express-rate-limit`    | ^8.2.1  | Rate limiting untuk API protection            |
| `jsonwebtoken`          | ^9.0.2  | JWT token generation & verification           |
| `morgan`                | ^1.10.1 | HTTP request logger middleware                |
| `multer`                | ^2.0.2  | Multipart/form-data parser untuk file uploads |
| `mysql2`                | ^3.15.3 | MySQL database driver                         |
| `prisma`                | ^6.18.0 | Database toolkit & ORM                        |
| `winston`               | ^3.18.3 | Multi-transport logging library               |
| `zod`                   | ^4.1.12 | TypeScript-first schema validation            |

### **🔧 Development Dependencies**

| Package       | Version | Purpose                           |
| ------------- | ------- | --------------------------------- |
| `@types/*`    | various | TypeScript type definitions       |
| `eslint`      | ^9.39.1 | Code linting tool                 |
| `prettier`    | ^3.6.2  | Code formatter                    |
| `jest`        | ^30.2.0 | Testing framework                 |
| `supertest`   | ^7.1.4  | HTTP endpoint testing             |
| `ts-jest`     | ^29.4.5 | Jest transformer untuk TypeScript |
| `tsx`         | ^4.20.6 | TypeScript execution environment  |
| `nodemon`     | ^3.1.10 | Auto-restart development server   |
| `husky`       | ^9.1.7  | Git hooks manager                 |
| `lint-staged` | ^16.2.6 | Run linters on staged files       |
| `typescript`  | ^5.9.3  | TypeScript compiler               |

## 🔧 Konfigurasi Environment

Copy `.env.example` ke `.env` dan isi dengan nilai yang sesuai:

```env
# Environment
NODE_ENV=development

# Server
PORT=5000

# Database
DATABASE_URL="mysql://user:password@localhost:3306/dbname"

# JWT
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-secure
JWT_EXPIRES_IN=7d

# File Upload
MAX_FILE_SIZE=5242880  # 5MB in bytes
UPLOAD_DIR=uploads

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100  # requests per window
```

## 🗄️ Database Setup

### **1. Install MySQL**

Pastikan MySQL server sudah terinstall dan running.

### **2. Create Database**

```sql
CREATE DATABASE backend_api;
```

### **3. Update .env**

```env
DATABASE_URL="mysql://username:password@localhost:3306/backend_api"
```

### **4. Generate Prisma Client**

```bash
npm run prisma:generate
```

### **5. Run Migrations**

```bash
npm run prisma:migrate
```

### **6. (Optional) Seed Database**

Jika ada seed file, jalankan:

```bash
npx prisma db seed
```

## 📡 API Endpoints

### **Authentication Routes** (`/api/auth`)

| Method | Endpoint    | Description        | Auth Required |
| ------ | ----------- | ------------------ | ------------- |
| POST   | `/register` | Register user baru | ❌            |
| POST   | `/login`    | Login user         | ❌            |

### **Request/Response Examples**

#### **Register User**

```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "USER"
    },
    "token": "jwt-token-here"
  }
}
```

#### **Login User**

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "name": "John Doe",
      "role": "USER"
    },
    "token": "jwt-token-here"
  }
}
```

## 🧪 Testing

### **Run All Tests**

```bash
npm test
```

### **Run Tests in Watch Mode**

```bash
npm run test:watch
```

### **Run Tests with Coverage**

```bash
npm run test:coverage
```

### **Run CI Tests** (untuk CI/CD)

```bash
npm run test:ci
```

### **Test Structure**

```
tests/
├── unit/                 # Unit tests
│   ├── auth.middleware.test.ts
│   └── validation.middleware.test.ts
└── integration/          # Integration tests
    └── auth.test.ts
```

## 📏 Scripts

| Script                    | Command                            | Description                                 |
| ------------------------- | ---------------------------------- | ------------------------------------------- |
| `npm run dev`             | `nodemon --exec tsx src/server.ts` | Start development server dengan auto-reload |
| `npm run build`           | `tsc`                              | Compile TypeScript ke JavaScript            |
| `npm run start`           | `node dist/server.js`              | Start production server                     |
| `npm test`                | `jest`                             | Run semua tests                             |
| `npm run test:watch`      | `jest --watch`                     | Run tests dalam watch mode                  |
| `npm run test:coverage`   | `jest --coverage`                  | Run tests dengan coverage report            |
| `npm run lint`            | `eslint . --ext .ts`               | Lint semua TypeScript files                 |
| `npm run lint:fix`        | `eslint . --ext .ts --fix`         | Lint dan auto-fix issues                    |
| `npm run format`          | `prettier --write "src/**/*.ts"`   | Format code dengan Prettier                 |
| `npm run prisma:generate` | `prisma generate`                  | Generate Prisma client                      |
| `npm run prisma:migrate`  | `prisma migrate dev`               | Run database migrations                     |
| `npm run prisma:studio`   | `prisma studio`                    | Open Prisma Studio GUI                      |

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - bcrypt untuk password security
- **Rate Limiting** - Protection terhadap brute force attacks
- **Input Validation** - Zod schemas untuk semua input validation
- **CORS** - Configured cross-origin policies
- **Helmet** - Security headers (bisa ditambahkan)
- **SQL Injection Protection** - Prisma ORM built-in protection

## 📊 Monitoring & Logging

### **Winston Logger**

- **File Logging** - Logs disimpan ke `logs/` directory
- **Console Logging** - Development mode logging
- **Log Levels** - error, warn, info, debug
- **Structured Logs** - JSON format untuk easy parsing

### **Morgan HTTP Logger**

- **Request Logging** - Semua HTTP requests dicatat
- **Response Time** - Track API response times
- **Status Codes** - Monitor error rates

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### **Pre-commit Hooks**

Project menggunakan Husky untuk menjalankan:

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Tests** - Unit tests

Hooks akan otomatis berjalan saat commit.

## 📄 License

This project is licensed under the ISC License.

---

**Happy Coding! 🚀**

Jika ada pertanyaan atau butuh bantuan, silakan buat issue di repository ini.
