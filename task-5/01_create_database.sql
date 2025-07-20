-- Task 5: Create Database and Table Structure
-- CockroachDB Banking Application

-- Create the bank database
CREATE DATABASE IF NOT EXISTS bank;

-- Use the bank database
USE bank;

-- Create accounts table with ACID compliance
CREATE TABLE IF NOT EXISTS accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    balance DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index on name for faster lookups
CREATE INDEX IF NOT EXISTS idx_accounts_name ON accounts(name);

-- Create index on balance for range queries
CREATE INDEX IF NOT EXISTS idx_accounts_balance ON accounts(balance);

-- Display table structure
SELECT
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns
WHERE table_name = 'accounts'
ORDER BY ordinal_position;

-- Show created tables
SHOW TABLES;