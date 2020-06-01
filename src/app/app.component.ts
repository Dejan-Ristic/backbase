import {Component, OnDestroy, OnInit} from '@angular/core';
import {TransactionsService} from './providers/transactions.service';
import {Subscription} from 'rxjs';
import {Transaction} from './interfaces/transaction.interface';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {

  public transactionsSubscription: Subscription;
  public transactions: Array<Transaction>;
  public transactionsToShow: Array<Transaction>;
  public showPopover = false;
  public transactionForm: FormGroup;
  public currentBalance = 67.56;
  public toAccountError: string;
  public amountError: string;
  public newTransaction: Transaction;
  private searchExpression: string;

  constructor(private transactionsService: TransactionsService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.transactionForm = this.formBuilder.group({
      toAccount: ['', [Validators.required, Validators.maxLength(30),
        Validators.pattern('^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$')]],
      amount: ['', [Validators.required, Validators.max(500),
        Validators.pattern('[0-9]+(\\.[0-9][0-9]?)?')]]
    });
    this.transactionsSubscription = this.transactionsService.transactions.subscribe(trans => {
      this.transactions = trans;
      this.modifyList();
    })
  }

  ngOnDestroy() {
    this.transactionsSubscription.unsubscribe();
  }

  public validateForm() {
    if (!this.transactionForm.get('toAccount').valid) {
      this.toAccountError = 'Required, max 30 chars long';
    }
    if (!this.transactionForm.get('amount').valid) {
      this.amountError = 'Max 500, 2 decimals';
    }
    if (this.currentBalance - this.transactionForm.get('amount').value < 0) {
      this.transactionForm.controls['amount'].setErrors({invalid: true});
      this.amountError = 'Not enough money';
    }
    if (this.transactionForm.valid) this.showPopover = true;
  }

  public completeTransaction() {
    let transferAmount = parseFloat(this.transactionForm.get("amount").value);
    this.newTransaction = {
      amount: transferAmount.toFixed(2),
      categoryCode: '#AEFF00',
      merchant: this.transactionForm.get("toAccount").value,
      merchantLogo: 'data:image/png;base64,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',
      transactionDate: Date.now(),
      transactionType: 'Payment'
    }
    this.currentBalance = parseFloat((this.currentBalance - transferAmount).toFixed(2));
    this.transactionsService.addTransaction(this.newTransaction);
    this.transactionForm.reset();
    this.amountError = '';
    this.toAccountError = '';
    this.showPopover = false;
  }

  private modifyList() {
    // if
  }

  public checkList(event) {
    this.searchExpression = event.target.value;
    let list = this.transactions.filter(transaction =>
      transaction.merchant.toLowerCase().indexOf(this.searchExpression.toLowerCase()) >= 0 ||
      transaction.transactionType.toLowerCase().indexOf(this.searchExpression.toLowerCase()) >= 0
    )
    console.log(list);
  }

}
