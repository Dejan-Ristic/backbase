import {Component, Input, OnInit} from '@angular/core';
import {Transaction} from '../../interfaces/transaction.interface';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.sass']
})
export class TransactionComponent implements OnInit {

  @Input() transData: Transaction;
  public date: string;

  ngOnInit() {
    let timeObj = new Date(this.transData.transactionDate);
    let month = timeObj.toLocaleString('default', { month: 'short' });
    this.date = `${month}. ${timeObj.getDate()}`
  }

}
