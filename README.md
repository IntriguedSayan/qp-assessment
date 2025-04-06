## Setup Instructions

### Local Development Setup

1. Clone the repository:
```bash
git clone https://github.com/IntriguedSayan/qp-assessment.git

```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables from .env.example file:
Create a `.env` file in the root directory with the following variables:
```
DATABASE_URL="DATABASE_URL=POSTGRES_CONNECTION_STRING"

PORT=PORTNUMBER_WHERE_APPLICATION_WILL_BE_RUNNING

JWT_SECRET="FOR_TOKEN_CREATION_AFTER_LOGIN"
```

4. Run database migrations:
```bash
npx prisma migrate dev
```

5. Start the development server:
```bash
npm run dev
```

### Docker Setup

1. Build and run the container:
```bash
docker-compose up --build
```

## API Endpoints

### Authentication

#### Register User
- **POST** `api/auth/register-user`
- Request Body:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Register Admin
- **POST** `api/auth/register-admin`
- Request Body:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```


#### Login
- **POST** `api/auth/login`
- Request Body:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Grocery Items (Admin Only)

#### Create Grocery Item
- **POST** `api/admin/groceries`
- Headers: `Authorization: Bearer <token>`
- Request Body:
```json
{
  "name": "Apple",
  "price": 1.99,
  "stock": 100
}
```

#### Get All Grocery Items
- **GET** `api/admin/groceries`
- Headers: `Authorization: Bearer <token>`

#### Update Grocery Item
- **PUT** `api/admin/groceries/:id`
- Headers: `Authorization: Bearer <token>`
- Request Body:
```json
{
  "name": "Updated Apple",
  "price": 2.99,
  "stock": 150
}
```

#### Delete Grocery Item
- **DELETE** `api/admin/groceries/:id`
- Headers: `Authorization: Bearer <token>`

#### Get All Grocery Items(Users)
- **GET** `api/user/groceries`
- Headers: `Authorization: Bearer <token>`


### Orders (User)

#### Create Order
- **POST** `api/user/orders`
- Headers: `Authorization: Bearer <token>`
- Request Body:
```json
{
  "items": [
    {
      "grocceryId": "item-id-1",
      "quantity": 2
    },
    {
      "grocceryId": "item-id-2",
      "quantity": 1
    }
  ]
}
```