BEGIN;

SELECT 'Before Transfer' as status;
SELECT
    id,
    name,
    balance
FROM accounts
WHERE name IN ('Laxman Shrestha', 'Sailesh Bhandari')
ORDER BY name;

WITH account_ids AS (
    SELECT
        (SELECT id FROM accounts WHERE name = 'Laxman Shrestha') as from_id,
        (SELECT id FROM accounts WHERE name = 'Sailesh Bhandari') as to_id
),
transfer_amount AS (
    SELECT 25000.00 as amount
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

SELECT 'After Transfer' as status;
SELECT
    id,
    name,
    balance
FROM accounts
WHERE name IN ('Laxman Shrestha', 'Sailesh Bhandari')
ORDER BY name;

COMMIT;