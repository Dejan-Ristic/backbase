import {Component, OnDestroy, OnInit} from '@angular/core';
import {TransactionsService} from './providers/transactions.service';
import {Subscription} from 'rxjs';
import {Transaction} from './interfaces/transaction.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {

  public transactionsSubscription: Subscription;
  public transactions: Array<Transaction>;

  constructor(private transactionsService: TransactionsService) {
  }

  ngOnInit() {
    this.transactionsSubscription = this.transactionsService.transactions.subscribe(trans => {
      this.transactions = trans;
    })
  }

  ngOnDestroy() {
    this.transactionsSubscription.unsubscribe();
  }

}
