# Library Management System
This is a simple library management system as a solution to a technical test.

## Installation
1. Clone the repository
2. Run `docker-compose up -d` to start the application
3. Run `docker-compose exec app /bin/sh -c "npx prisma migrate dev"` to migrate the database

## Usage
Head to `http://localhost:3000/api` to access the API documentation

## Database Schema

```
+-----------------+            +-------------------+           +-------------------+
|     Book        |            |     Borrower      |           |    Transaction    |
+-----------------+            +-------------------+           +-------------------+
| id (PK)         |<----+       | id (PK)           |           | id (PK)           |
| title           |     |       | name              |           | borrowDate        |
| author          |     |       | email (Unique)    |           | dueDate           |
| isbn (Unique)   |     +-------| registeredAt      |           | returned          |
| availableQty    |             |                   |           | returnDate (nullable)|
| shelfLocation   |             |                   |           | borrowerId (FK)   |
+-----------------+             +-------------------+           | bookId (FK)       |
    ^                                                           +-------------------+
    |                                                             |
    +-------------------------------------------------------------+
                      One-to-Many (Transaction)
```

