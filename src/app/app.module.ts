import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {TransactionComponent} from './components/transaction/transaction.component';
import {TransactionsService} from './providers/transactions.service';
import { PopoverComponent } from './components/popover/popover.component';

@NgModule({
  declarations: [
    AppComponent,
    TransactionComponent,
    PopoverComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [TransactionsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
