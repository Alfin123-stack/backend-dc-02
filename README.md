# 🧠 Backend Quiz API

Backend Quiz API adalah REST API berbasis **Node.js + Express** yang digunakan untuk:

* Generate quiz dari tutorial
* Menyimpan & mengambil progress quiz user
* Cache quiz per user / level
* Menyimpan riwayat (history) quiz

API ini sudah terintegrasi dengan **Swagger / OpenAPI 3.0**.

---

## 🌐 Base URL

```
https://backend-dc-02.vercel.app/api
```

---

## 📦 Tech Stack

* Node.js
* Express.js
* In-memory cache (NodeCache)
* Joi Validator
* Swagger (OpenAPI 3.0)

---

## 📘 API Documentation (Swagger)

Jika Swagger UI diaktifkan:

```
GET /api/docs
```

---

## 🧩 Quiz API

### Generate Quiz

**POST** `/quiz/generate`

Generate quiz dari tutorial.

**Request Body**

```json
{
  "tutorialId": 1
}
```

**Response**

```json
{
  "success": true,
  "quiz": [
    {
      "question": "Apa itu React?",
      "type": "multiple_choice",
      "options": ["Library", "Framework"],
      "correctAnswers": ["Library"]
    }
  ]
}
```

---

## 📚 Tutorial API

### Get Tutorial Heading

**GET** `/tutorial/heading`

**Query Params**

| Name       | Type   | Required |
| ---------- | ------ | -------- |
| tutorialId | number | ✅        |

**Response**

```json
{
  "success": true,
  "heading": "React Basics"
}
```

---

## 📊 Quiz Progress API

### Save Progress

**POST** `/quiz/progress`

**Request Body**

```json
{
  "tutorialId": 1,
  "userId": "user_123",
  "level": 1,
  "progress": {
    "current": 3,
    "score": 20,
    "finished": false
  }
}
```

**Response**

```json
{
  "success": true,
  "message": "Progress saved"
}
```

---

### Get Progress

**GET** `/quiz/progress`

**Query Params**

| Name       | Type   | Required |
| ---------- | ------ | -------- |
| tutorialId | number | ✅        |
| userId     | string | ✅        |
| level      | number | ✅        |

**Response**

```json
{
  "success": true,
  "progress": {
    "current": 3,
    "score": 20,
    "finished": false
  }
}
```

---

## 🗂️ Quiz Cache API

### Save Quiz Cache

**POST** `/quiz/cache`

**Request Body**

```json
{
  "tutorialId": 1,
  "userId": "user_123",
  "level": 1,
  "quiz": [
    {
      "question": "Apa itu JS?",
      "type": "multiple_choice",
      "options": ["Bahasa", "Framework"],
      "correctAnswers": ["Bahasa"]
    }
  ]
}
```

---

### Get Quiz Cache

**GET** `/quiz/cache`

**Query Params**

| Name       | Type   | Required |
| ---------- | ------ | -------- |
| tutorialId | number | ✅        |
| userId     | string | ✅        |
| level      | number | ✅        |

---

### Clear Quiz Cache / Progress

**DELETE** `/quiz/clear`

**Query Params**

| Name       | Type    | Required | Default |
| ---------- | ------- | -------- | ------- |
| tutorialId | number  | ✅        | -       |
| userId     | string  | ✅        | -       |
| level      | number  | ✅        | -       |
| cache      | boolean | ❌        | true    |
| progress   | boolean | ❌        | true    |

---

## 🕘 Quiz History API

### Get History

**GET** `/quiz/history`

**Response**

```json
{
  "success": true,
  "history": []
}
```

---

### Save History

**POST** `/quiz/history`

**Request Body**

```json
{
  "tutorialId": 1,
  "score": 80,
  "level": 1
}
```

---

### Clear History

**DELETE** `/quiz/history/clear`

---

## 🐞 Debug API (Development Only)

### Inspect Cache

**GET** `/debug/cache`

Menampilkan seluruh isi cache (HANYA UNTUK DEBUG).

---

## ⚠️ Error Format

```json
{
  "success": false,
  "message": "tutorialId, userId, dan level wajib"
}
```

---

## 🚀 Local Development

```bash
npm install
npm run dev
```

---

## 🧩 Notes

* Cache bersifat **in-memory** (akan hilang saat server restart)
* Semua request divalidasi menggunakan **Joi**
* Struktur key cache:

  * Quiz: `quiz:{userId}:{tutorialId}:{level}`
  * Progress: `progress:{userId}:{tutorialId}:{level}`

---

## 📄 License

MIT License
