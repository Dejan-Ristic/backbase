import {Injectable} from '@angular/core';
import transactionsJson from '../../assets/transactions.json';
import {Transaction} from '../interfaces/transaction.interface';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private allTransactions: Array<Transaction> = transactionsJson.data;
  public transactions = new BehaviorSubject(this.allTransactions);

  public addTransaction(newTran: Transaction) {
    this.allTransactions.unshift(newTran);
    this.transactions.next(this.allTransactions);
  }

}
