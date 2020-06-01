import {Injectable} from '@angular/core';
import transactionsJson from '../../assets/transactions.json';
import {Transaction} from '../interfaces/transaction.interface';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private allTransactions: Array<Transaction> = transactionsJson.data;
  public transactions = of(this.allTransactions);

  public addTransaction(newTran: Transaction) {
    this.allTransactions.push(newTran);
    this.transactions = of(this.allTransactions);
  }

}
