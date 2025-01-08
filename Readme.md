# Database Setup: pwebdasar

This guide outlines the steps to create a database and a table within it for managing a to-do list.

## Step 1: Create the Database

To create the `pwebdasar` database, execute the following SQL command:

```sql
CREATE DATABASE pwebdasar;
```

## Step 2: Create the Table

Once the database is created, proceed to create a table named `todolist`. This table will contain two columns: `id` (primary key) and `list` (the content of the to-do item).

```sql
CREATE TABLE todolist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    list VARCHAR(255) NOT NULL
);
```

## Summary

- **Database Name:** `pwebdasar`
- **Table Name:** `todolist`
- **Columns:**
  - `id`: Auto-incremented integer, primary key.
  - `list`: A text field to store the to-do list item, with a maximum length of 255 characters.

This version uses structured headings, clear instructions, and concise language to improve professionalism.
