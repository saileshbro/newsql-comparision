-- Task 5: Concurrent Transfers with Transaction Safety
-- CockroachDB Banking Application

USE bank;

-- Show initial balances
SELECT 'Initial Balances Before Concurrent Transfers' as status;
SELECT
    id,
    name,
    balance
FROM accounts
ORDER BY name;

-- Concurrent Transfer 1: Suraj -> Arjun (Rs. 15,000)
BEGIN;
WITH account_ids AS (
    SELECT
        (SELECT id FROM accounts WHERE name = 'Suraj Thapa') as from_id,
        (SELECT id FROM accounts WHERE name = 'Arjun Karki') as to_id
),
transfer_amount AS (
    SELECT 15000.00 as amount
)
UPDATE accounts
SET
    balance = CASE
        WHEN id = (SELECT from_id FROM account_ids) THEN balance - (SELECT amount FROM transfer_amount)
        WHEN id = (SELECT to_id FROM account_ids) THEN balance + (SELECT amount FROM transfer_amount)
        ELSE balance
    END,
    updated_at = NOW()
WHERE id IN (SELECT from_id FROM account_ids UNION SELECT to_id FROM account_ids);
COMMIT;

-- Concurrent Transfer 2: Pooja -> Narendra (Rs. 20,000)
BEGIN;
WITH account_ids AS (
    SELECT
        (SELECT id FROM accounts WHERE name = 'Pooja Pathak') as from_id,
        (SELECT id FROM accounts WHERE name = 'Narendra Joshi') as to_id
),
transfer_amount AS (
    SELECT 20000.00 as amount
)
UPDATE accounts
SET
    balance = CASE
        WHEN id = (SELECT from_id FROM account_ids) THEN balance - (SELECT amount FROM transfer_amount)
        WHEN id = (SELECT to_id FROM account_ids) THEN balance + (SELECT amount FROM transfer_amount)
        ELSE balance
    END,
    updated_at = NOW()
WHERE id IN (SELECT from_id FROM account_ids UNION SELECT to_id FROM account_ids);
COMMIT;

-- Concurrent Transfer 3: Kiran -> Ujjwal (Rs. 12,000)
BEGIN;
WITH account_ids AS (
    SELECT
        (SELECT id FROM accounts WHERE name = 'Kiran Sapkota') as from_id,
        (SELECT id FROM accounts WHERE name = 'Ujjwal Panta') as to_id
),
transfer_amount AS (
    SELECT 12000.00 as amount
)
UPDATE accounts
SET
    balance = CASE
        WHEN id = (SELECT from_id FROM account_ids) THEN balance - (SELECT amount FROM transfer_amount)
        WHEN id = (SELECT to_id FROM account_ids) THEN balance + (SELECT amount FROM transfer_amount)
        ELSE balance
    END,
    updated_at = NOW()
WHERE id IN (SELECT from_id FROM account_ids UNION SELECT to_id FROM account_ids);
COMMIT;

-- Concurrent Transfer 4: Ashish -> Dipesh (Rs. 18,000)
BEGIN;
WITH account_ids AS (
    SELECT
        (SELECT id FROM accounts WHERE name = 'Ashish Basnyat') as from_id,
        (SELECT id FROM accounts WHERE name = 'Dipesh Tamang') as to_id
),
transfer_amount AS (
    SELECT 18000.00 as amount
)
UPDATE accounts
SET
    balance = CASE
        WHEN id = (SELECT from_id FROM account_ids) THEN balance - (SELECT amount FROM transfer_amount)
        WHEN id = (SELECT to_id FROM account_ids) THEN balance + (SELECT amount FROM transfer_amount)
        ELSE balance
    END,
    updated_at = NOW()
WHERE id IN (SELECT from_id FROM account_ids UNION SELECT to_id FROM account_ids);
COMMIT;

-- Concurrent Transfer 5: Laxman -> Sailesh (Rs. 10,000)
BEGIN;
WITH account_ids AS (
    SELECT
        (SELECT id FROM accounts WHERE name = 'Laxman Shrestha') as from_id,
        (SELECT id FROM accounts WHERE name = 'Sailesh Bhandari') as to_id
),
transfer_amount AS (
    SELECT 10000.00 as amount
)
UPDATE accounts
SET
    balance = CASE
        WHEN id = (SELECT from_id FROM account_ids) THEN balance - (SELECT amount FROM transfer_amount)
        WHEN id = (SELECT to_id FROM account_ids) THEN balance + (SELECT amount FROM transfer_amount)
        ELSE balance
    END,
    updated_at = NOW()
WHERE id IN (SELECT from_id FROM account_ids UNION SELECT to_id FROM account_ids);
COMMIT;

-- Show final balances
SELECT 'Final Balances After Concurrent Transfers' as status;
SELECT
    id,
    name,
    balance
FROM accounts
ORDER BY name;