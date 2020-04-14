import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    function reducer(accumulator: number, currentValue: Transaction): number {
      return accumulator + currentValue.value;
    }

    const incomeTransactions = this.transactions.filter(
      transaction => transaction.type === 'income',
    );
    const incomeTotal = incomeTransactions.reduce(reducer, 0);

    const outcomeTransactions = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );
    const outcomeTotal = outcomeTransactions.reduce(reducer, 0);

    const balance: Balance = {
      income: incomeTotal,
      outcome: outcomeTotal,
      total: incomeTotal - outcomeTotal,
    };

    return balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
