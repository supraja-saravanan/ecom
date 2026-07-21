# PostgreSQL Database

This folder contains the PostgreSQL schema and sample data for the E-Commerce application.

## Files

- schema.sql
- seed.sql

## Create Database

```sql
CREATE DATABASE ecommerce_db;
```

Connect to the database.

Run

```bash
psql -U postgres -d ecommerce_db -f schema.sql
```

Then

```bash
psql -U postgres -d ecommerce_db -f seed.sql
```

Tables

- users
- categories
- products
- orders
- order_items