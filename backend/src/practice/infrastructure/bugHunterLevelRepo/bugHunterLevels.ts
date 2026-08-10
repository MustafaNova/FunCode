import { BugHunterLevel } from '../../domain/value-objects/bugHunterLevel';

const userAuthenticationTests = `
const storedUser: User = {
    email: 'test@example.com',
    password: 'secret123',
};

const validCredentials: LoginCredentials = {
    email: 'test@example.com',
    password: 'secret123',
};

const wrongPasswordCredentials: LoginCredentials = {
    email: 'test@example.com',
    password: 'wrong-password',
};

const wrongEmailCredentials: LoginCredentials = {
    email: 'other@example.com',
    password: 'secret123',
};

const differentCaseEmailCredentials: LoginCredentials = {
    email: 'TEST@EXAMPLE.COM',
    password: 'secret123',
};

if (authenticateUser(storedUser, validCredentials) !== true) {
    throw new Error('Valid credentials should authenticate successfully.');
}

if (authenticateUser(storedUser, wrongPasswordCredentials) !== false) {
    throw new Error('Wrong password should not authenticate.');
}

if (authenticateUser(storedUser, wrongEmailCredentials) !== false) {
    throw new Error('Wrong email should not authenticate.');
}

if (authenticateUser(storedUser, differentCaseEmailCredentials) !== true) {
    throw new Error('Email comparison should be case-insensitive.');
}
`.trim();
const shoppingCartTests = `
# Exactly 100 euros -> 10% discount must apply
result = calculate_cart_total([
    {
        "name": "Keyboard",
        "price": 100,
        "quantity": 1,
    }
])

assert result["subtotal"] == 100
assert result["discount"] == 10
assert result["shipping"] == 0
assert result["vat"] == 17.1
assert result["total"] == 107.1


# Below 100 euros -> no discount
result = calculate_cart_total([
    {
        "name": "Mouse",
        "price": 40,
        "quantity": 2,
    }
])

assert result["subtotal"] == 80
assert result["discount"] == 0


# Above 100 euros -> discount applies
result = calculate_cart_total([
    {
        "name": "Monitor",
        "price": 60,
        "quantity": 2,
    }
])

assert result["subtotal"] == 120
assert result["discount"] == 12


# Multiple items totaling exactly 100 euros
result = calculate_cart_total([
    {
        "name": "Mouse",
        "price": 25,
        "quantity": 2,
    },
    {
        "name": "Keyboard",
        "price": 50,
        "quantity": 1,
    }
])

assert result["subtotal"] == 100
assert result["discount"] == 10


# Empty cart
result = calculate_cart_total([])

assert result == {
    "subtotal": 0,
    "discount": 0,
    "shipping": 0,
    "vat": 0,
    "total": 0,
}
`.trim();
const bankAccountTests = `
# Exact balance for amount, but not enough for fee -> must fail
account = BankAccount("Alice", 100)

result = process_withdrawal(account, 100)

assert result["success"] is False
assert result["balance"] == 100


# Enough balance for amount + fee -> must succeed
account = BankAccount("Bob", 102)

result = process_withdrawal(account, 100)

assert result["success"] is True
assert result["balance"] == 0


# Minimum fee of 1 euro must also be covered
account = BankAccount("Charlie", 50)

result = process_withdrawal(account, 50)

assert result["success"] is False
assert result["balance"] == 50


# Normal successful withdrawal
account = BankAccount("David", 200)

result = process_withdrawal(account, 100)

assert result["success"] is True
assert result["balance"] == 98


# Withdrawal amount greater than balance -> fail
account = BankAccount("Eve", 80)

result = process_withdrawal(account, 100)

assert result["success"] is False
assert result["balance"] == 80


# Failed withdrawal must not create a transaction
account = BankAccount("Frank", 100)

process_withdrawal(account, 100)

assert len(account.get_transaction_history()) == 0
`.trim();

const userAuthenticationLevel: BugHunterLevel = {
    levelNumber: 1,
    description:
        'The login function should grant access only when the entered email and password match the stored user credentials. However, users can currently log in with an incorrect password. Find and fix the hidden bug without changing the function signature',
    initialCode: `
type User = {
    email: string;
    password: string;
};

type LoginCredentials = {
    email: string;
    password: string;
};

function authenticateUser(
    user: User,
    credentials: LoginCredentials,
): boolean {
    const emailMatches =
        user.email.toLowerCase() === credentials.email.toLowerCase();

    const passwordMatches =
        user.password = credentials.password;

    if (!emailMatches) {
        return false;
    }

    if (!passwordMatches) {
        return false;
    }

    return true;
}
`.trim(),
    language: 'typescript',
    tests: userAuthenticationTests
};

const shoppingCartLevel: BugHunterLevel = {
    levelNumber: 2,
    description:
        'An online shop calculates the subtotal, applies a 10% discount when the subtotal is at least 100 euros, adds shipping costs, and calculates VAT. Customers with an order subtotal of exactly 100 euros currently receive the wrong final price. Find and fix the hidden bug without changing any function names or parameters.',
    initialCode: `
def validate_item(item):
    required_fields = ["name", "price", "quantity"]

    for field in required_fields:
        if field not in item:
            raise ValueError(f"Missing field: {field}")

    if item["price"] < 0:
        raise ValueError("Price cannot be negative")

    if item["quantity"] <= 0:
        raise ValueError("Quantity must be greater than zero")


def calculate_subtotal(items):
    subtotal = 0

    for item in items:
        validate_item(item)

        item_total = item["price"] * item["quantity"]
        subtotal += item_total

    return subtotal


def calculate_discount(subtotal):
    discount_rate = 0.10

    if subtotal > 100:
        return subtotal * discount_rate

    return 0


def calculate_shipping(subtotal):
    free_shipping_threshold = 50
    standard_shipping_cost = 4.99

    if subtotal >= free_shipping_threshold:
        return 0

    return standard_shipping_cost


def calculate_vat(amount):
    vat_rate = 0.19
    return amount * vat_rate


def calculate_cart_total(items):
    if not items:
        return {
            "subtotal": 0,
            "discount": 0,
            "shipping": 0,
            "vat": 0,
            "total": 0,
        }

    subtotal = calculate_subtotal(items)
    discount = calculate_discount(subtotal)

    discounted_subtotal = subtotal - discount
    shipping = calculate_shipping(discounted_subtotal)

    taxable_amount = discounted_subtotal + shipping
    vat = calculate_vat(taxable_amount)

    total = taxable_amount + vat

    return {
        "subtotal": round(subtotal, 2),
        "discount": round(discount, 2),
        "shipping": round(shipping, 2),
        "vat": round(vat, 2),
        "total": round(total, 2),
    }
`.trim(),
    language: 'python',
    tests: shoppingCartTests
};

const bankAccountLevel: BugHunterLevel = {
    levelNumber: 3,
    description:
        'A banking system manages deposits, withdrawals, transfer fees, and account history. Withdrawals must only be allowed when the account has enough money to cover both the requested amount and the transaction fee. However, one edge case currently allows the balance to become negative. Find and fix the hidden bug without changing any function names or parameters.',
    initialCode: `
class BankAccount:
    def __init__(self, owner, initial_balance=0):
        if initial_balance < 0:
            raise ValueError("Initial balance cannot be negative")

        self.owner = owner
        self.balance = initial_balance
        self.transactions = []


    def record_transaction(self, transaction_type, amount, fee=0):
        self.transactions.append({
            "type": transaction_type,
            "amount": round(amount, 2),
            "fee": round(fee, 2),
            "balance_after": round(self.balance, 2),
        })


    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("Deposit amount must be greater than zero")

        self.balance += amount
        self.record_transaction("deposit", amount)

        return self.balance


    def calculate_withdrawal_fee(self, amount):
        fee_rate = 0.02
        minimum_fee = 1.00

        calculated_fee = amount * fee_rate

        if calculated_fee < minimum_fee:
            return minimum_fee

        return calculated_fee


    def withdraw(self, amount):
        if amount <= 0:
            raise ValueError("Withdrawal amount must be greater than zero")

        fee = self.calculate_withdrawal_fee(amount)

        if amount > self.balance:
            raise ValueError("Insufficient funds")

        self.balance -= amount + fee
        self.record_transaction("withdrawal", amount, fee)

        return self.balance


    def get_balance(self):
        return round(self.balance, 2)


    def get_transaction_history(self):
        return self.transactions.copy()


def process_withdrawal(account, amount):
    try:
        remaining_balance = account.withdraw(amount)

        return {
            "success": True,
            "message": "Withdrawal completed",
            "balance": remaining_balance,
        }

    except ValueError as error:
        return {
            "success": False,
            "message": str(error),
            "balance": account.get_balance(),
        }
`.trim(),
    language: 'python',
    tests: bankAccountTests
};

export const BUG_HUNTER_LEVELS: Record<string, BugHunterLevel> = {
    'user-authentication': userAuthenticationLevel,
    'shopping-cart': shoppingCartLevel,
    'bank-account': bankAccountLevel
}