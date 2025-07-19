-- Task 5: Insert Sample Accounts
-- CockroachDB Banking Application

USE bank;

-- Insert sample accounts with realistic balances
INSERT INTO accounts (name, balance) VALUES
    ('Laxman Shrestha', 150000.00),
    ('Sailesh Bhandari', 75000.00),
    ('Suraj Thapa', 120000.00),
    ('Arjun Karki', 95000.00),
    ('Pooja Pathak', 180000.00),
    ('Narendra Joshi', 65000.00),
    ('Kiran Sapkota', 110000.00),
    ('Ujjwal Panta', 85000.00),
    ('Ashish Basnyat', 140000.00),
    ('Dipesh Tamang', 70000.00)
ON CONFLICT DO NOTHING;

-- Display all inserted accounts
SELECT
    id,
    name,
    balance,
    created_at,
    updated_at
FROM accounts
ORDER BY name;

-- Show account statistics
SELECT
    COUNT(*) as total_accounts,
    SUM(balance) as total_balance,
    AVG(balance) as average_balance,
    MIN(balance) as minimum_balance,
    MAX(balance) as maximum_balance
FROM accounts;