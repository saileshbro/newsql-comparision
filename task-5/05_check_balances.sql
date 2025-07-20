-- Task 5: Check Account Balances and Transaction Results
-- CockroachDB Banking Application

USE bank;

-- Show current account balances
SELECT 'Current Account Balances' as status;
SELECT
    id,
    name,
    balance,
    created_at,
    updated_at
FROM accounts
ORDER BY name;

-- Show account statistics
SELECT 'Account Statistics' as status;
SELECT
    COUNT(*) as total_accounts,
    SUM(balance) as total_balance,
    AVG(balance) as average_balance,
    MIN(balance) as minimum_balance,
    MAX(balance) as maximum_balance
FROM accounts;

-- Show accounts with highest balances
SELECT 'Top 3 Accounts by Balance' as status;
SELECT
    name,
    balance
FROM accounts
ORDER BY balance DESC
LIMIT 3;

-- Show accounts with lowest balances
SELECT 'Bottom 3 Accounts by Balance' as status;
SELECT
    name,
    balance
FROM accounts
ORDER BY balance ASC
LIMIT 3;

-- Show accounts updated recently
SELECT 'Recently Updated Accounts' as status;
SELECT
    name,
    balance,
    updated_at
FROM accounts
ORDER BY updated_at DESC
LIMIT 5;

-- Show balance distribution
SELECT 'Balance Distribution' as status;
SELECT
    CASE
        WHEN balance < 80000 THEN 'Low (< Rs. 80,000)'
        WHEN balance < 120000 THEN 'Medium (Rs. 80,000 - 120,000)'
        ELSE 'High (> Rs. 120,000)'
    END as balance_category,
    COUNT(*) as account_count,
    AVG(balance) as average_balance
FROM accounts
GROUP BY balance_category
ORDER BY average_balance;