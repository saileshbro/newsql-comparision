#!/usr/bin/env python3
"""
Task 5: CockroachDB Banking Transactions in Python
Objectives:
- Use NewSQL database with ACID transactions
- Simulate banking operations with concurrent transfers
- Ensure transaction safety with retries

Requirements:
pip install psycopg2-binary

Usage:
python banking_transactions.py
"""

import psycopg2
import psycopg2.extras
import time
import threading
from decimal import Decimal
from typing import Optional, Tuple
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(threadName)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class BankingSystem:
    def __init__(self, connection_string: str):
        """Initialize banking system with CockroachDB connection"""
        self.connection_string = connection_string

    def get_connection(self):
        """Get database connection"""
        return psycopg2.connect(
            self.connection_string,
            cursor_factory=psycopg2.extras.RealDictCursor
        )

    def create_accounts_table(self):
        """Create accounts table if not exists"""
        with self.get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("""
                    CREATE DATABASE IF NOT EXISTS bank;
                """)
                conn.commit()

                cur.execute("USE bank;")

                cur.execute("""
                    CREATE TABLE IF NOT EXISTS accounts (
                        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                        name VARCHAR(100) NOT NULL,
                        balance DECIMAL(15,2) NOT NULL DEFAULT 0.00,
                        created_at TIMESTAMP DEFAULT NOW(),
                        updated_at TIMESTAMP DEFAULT NOW()
                    );
                """)

                cur.execute("""
                    CREATE INDEX IF NOT EXISTS idx_accounts_name ON accounts(name);
                """)

                conn.commit()
                logger.info("Accounts table created successfully")

    def insert_initial_accounts(self):
        """Insert initial account data"""
        accounts = [
            ("Sailesh Karki", Decimal("50000.00")),
            ("Suraj Thapa", Decimal("75000.00")),
            ("Arjun Karki", Decimal("30000.00")),
            ("Laxman Sharma", Decimal("45000.00")),
            ("Prakash Adhikari", Decimal("60000.00"))
        ]

        with self.get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("USE bank;")

                # Clear existing data
                cur.execute("DELETE FROM accounts;")

                # Insert new accounts
                for name, balance in accounts:
                    cur.execute("""
                        INSERT INTO accounts (name, balance)
                        VALUES (%s, %s);
                    """, (name, balance))

                conn.commit()
                logger.info(f"Inserted {len(accounts)} accounts successfully")

    def get_account_balance(self, account_name: str) -> Optional[Decimal]:
        """Get account balance by name"""
        with self.get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("USE bank;")
                cur.execute("""
                    SELECT balance FROM accounts WHERE name = %s;
                """, (account_name,))

                result = cur.fetchone()
                return result['balance'] if result else None

    def transfer_money(self, from_account: str, to_account: str, amount: Decimal, max_retries: int = 3) -> bool:
        """
        Transfer money between accounts with transaction safety and retries
        Returns True if successful, False otherwise
        """
        for attempt in range(max_retries):
            try:
                with self.get_connection() as conn:
                    with conn.cursor() as cur:
                        cur.execute("USE bank;")

                        # Start transaction with serializable isolation
                        cur.execute("BEGIN TRANSACTION ISOLATION LEVEL SERIALIZABLE;")

                        # Check from_account balance
                        cur.execute("""
                            SELECT id, balance FROM accounts WHERE name = %s FOR UPDATE;
                        """, (from_account,))

                        from_result = cur.fetchone()
                        if not from_result:
                            logger.error(f"Account '{from_account}' not found")
                            cur.execute("ROLLBACK;")
                            return False

                        if from_result['balance'] < amount:
                            logger.error(f"Insufficient balance in {from_account}: {from_result['balance']} < {amount}")
                            cur.execute("ROLLBACK;")
                            return False

                        # Check to_account exists
                        cur.execute("""
                            SELECT id FROM accounts WHERE name = %s FOR UPDATE;
                        """, (to_account,))

                        to_result = cur.fetchone()
                        if not to_result:
                            logger.error(f"Account '{to_account}' not found")
                            cur.execute("ROLLBACK;")
                            return False

                        # Perform the transfer
                        cur.execute("""
                            UPDATE accounts
                            SET balance = balance - %s, updated_at = NOW()
                            WHERE name = %s;
                        """, (amount, from_account))

                        cur.execute("""
                            UPDATE accounts
                            SET balance = balance + %s, updated_at = NOW()
                            WHERE name = %s;
                        """, (amount, to_account))

                        # Commit transaction
                        cur.execute("COMMIT;")

                        logger.info(f"Transfer successful: {from_account} -> {to_account}, Amount: Rs. {amount}")
                        return True

            except psycopg2.errors.SerializationFailure as e:
                logger.warning(f"Serialization failure (attempt {attempt + 1}): {e}")
                if attempt == max_retries - 1:
                    logger.error(f"Transfer failed after {max_retries} attempts")
                    return False
                time.sleep(0.1 * (2 ** attempt))  # Exponential backoff

            except Exception as e:
                logger.error(f"Transfer error: {e}")
                return False

        return False

    def display_all_balances(self):
        """Display all account balances"""
        with self.get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("USE bank;")
                cur.execute("""
                    SELECT name, balance, updated_at
                    FROM accounts
                    ORDER BY name;
                """)

                results = cur.fetchall()
                print("\n" + "="*60)
                print(f"{'Account Name':<20} {'Balance':<15} {'Last Updated'}")
                print("="*60)

                for row in results:
                    print(f"{row['name']:<20} Rs. {row['balance']:<12} {row['updated_at']}")
                print("="*60)

    def concurrent_transfer_simulation(self):
        """Simulate concurrent transfers using threading"""
        logger.info("Starting concurrent transfer simulation...")

        # Display initial balances
        print("INITIAL BALANCES:")
        self.display_all_balances()

        # Define concurrent transfers
        transfers = [
            ("Sailesh Karki", "Suraj Thapa", Decimal("5000.00")),
            ("Suraj Thapa", "Arjun Karki", Decimal("15000.00")),
            ("Laxman Sharma", "Prakash Adhikari", Decimal("8000.00")),
            ("Arjun Karki", "Sailesh Karki", Decimal("3000.00")),
            ("Prakash Adhikari", "Laxman Sharma", Decimal("12000.00"))
        ]

        # Create threads for concurrent execution
        threads = []

        def transfer_worker(from_acc, to_acc, amt):
            success = self.transfer_money(from_acc, to_acc, amt)
            if success:
                logger.info(f"✅ Thread completed: {from_acc} -> {to_acc} (Rs. {amt})")
            else:
                logger.error(f"❌ Thread failed: {from_acc} -> {to_acc} (Rs. {amt})")

        # Start all transfers concurrently
        for from_acc, to_acc, amount in transfers:
            thread = threading.Thread(
                target=transfer_worker,
                args=(from_acc, to_acc, amount),
                name=f"Transfer-{from_acc[:5]}-{to_acc[:5]}"
            )
            threads.append(thread)
            thread.start()

        # Wait for all transfers to complete
        for thread in threads:
            thread.join()

        # Display final balances
        print("\nFINAL BALANCES AFTER CONCURRENT TRANSFERS:")
        self.display_all_balances()

    def single_transfer_demo(self):
        """Demonstrate a single transfer operation"""
        logger.info("Demonstrating single transfer...")

        print("BEFORE SINGLE TRANSFER:")
        self.display_all_balances()

        # Perform single transfer
        success = self.transfer_money("Sailesh Karki", "Suraj Thapa", Decimal("10000.00"))

        if success:
            print("\n✅ Single transfer completed successfully!")
        else:
            print("\n❌ Single transfer failed!")

        print("AFTER SINGLE TRANSFER:")
        self.display_all_balances()

def main():
    """Main function to run banking transaction demo"""
    # CockroachDB connection string
    # Adjust this based on your CockroachDB setup
    connection_string = "postgresql://root@localhost:26257/defaultdb?sslmode=disable"

    try:
        # Initialize banking system
        bank = BankingSystem(connection_string)

        # Setup database and initial data
        logger.info("Setting up database and accounts...")
        bank.create_accounts_table()
        bank.insert_initial_accounts()

        # Demo 1: Single transfer
        print("\n" + "="*80)
        print("DEMO 1: SINGLE TRANSFER")
        print("="*80)
        bank.single_transfer_demo()

        # Reset data for concurrent demo
        bank.insert_initial_accounts()

        # Demo 2: Concurrent transfers
        print("\n" + "="*80)
        print("DEMO 2: CONCURRENT TRANSFERS WITH TRANSACTION SAFETY")
        print("="*80)
        bank.concurrent_transfer_simulation()

        logger.info("Banking transaction demo completed successfully!")

    except psycopg2.OperationalError as e:
        logger.error(f"Database connection error: {e}")
        print("\nPlease ensure CockroachDB is running on localhost:26257")
        print("Start CockroachDB with: cockroach start-single-node --insecure")

    except Exception as e:
        logger.error(f"Unexpected error: {e}")

if __name__ == "__main__":
    print("="*80)
    print("CockroachDB Banking Transaction System")
    print("Task 5: Distributed SQL with ACID Transactions")
    print("="*80)
    main()
