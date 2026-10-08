class BankAccount {
  constructor () {
    this.balance = 0;
    this.transactions = [];
  };

  deposit(amount) {
    if (Number(amount) > 0) {
      this.balance += Number(amount);
      const transaction = {
        type: "deposit",
        amount: amount
      };
      this.transactions.push(transaction);
      return `Successfully deposited $${amount}. New balance: $${this.balance}`;
    } else {
      return "Deposit amount must be greater than zero.";
    }
  };

  withdraw(amount) {
    if (Number(amount) > 0 && Number(amount) <= this.balance) {
      this.balance -= Number(amount);
      const transaction = {
        type: "withdraw",
        amount: amount
      };
      this.transactions.push(transaction);
      return `Successfully withdrew $${amount}. New balance: $${this.balance}`;
    } else {
      return "Insufficient balance or invalid amount.";
    }
  };

  checkBalance() {
    return `Current balance: $${this.balance}`;
  }

  listAllDeposits() {
    const depositAmounts = [];

    this.transactions.forEach(item => {
      if (item.type === "deposit") {
        depositAmounts.push(item.amount);
      }
    });

    return `Deposits: ${depositAmounts.join(',')}`;
  };

  listAllWithdrawals() {
    const withdrawAmounts = [];

    this.transactions.forEach(item => {
      if (item.type === "withdraw") {
        withdrawAmounts.push(item.amount);
      }
    });

    return `Withdrawals: ${withdrawAmounts.join(',')}`;
  };
}

const myAccount = new BankAccount;

myAccount.deposit(150);
myAccount.deposit(100);
myAccount.withdraw(50);
myAccount.withdraw(70);
myAccount.withdraw(29);
console.log(myAccount.checkBalance());
