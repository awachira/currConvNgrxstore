import {
  Component,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AmountChangeAction } from './actions/amount';
import { CurrenciesUpdateAction } from './actions/currency';
import * as fromRoot from './reducers';
import { Currency } from './models/currency';

@Component({
  selector: 'app-root',
  template: `
    <input [ngModel]='amount$ | async' (ngModelChange)="onAmountChange($event)">
    <p *ngFor="let currency of (currencyRates$ | async)">
      {{currency.code + ' ' + currency.value * (amount$ | async)}}
    </p>
    `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public amount$: Observable<number>;
  public currencyRates$: Observable<Array<Currency>>;

  constructor(public store: Store<fromRoot.State>) {
    this.amount$ = store.select(fromRoot.getAmountState);
    this.currencyRates$ = store.select(fromRoot.getCurrencyRates);
  }

  // Dispatch the action
  ngOnInit() {
    this.store.dispatch(new CurrenciesUpdateAction());
  }

  onAmountChange(amount: string): void {
    const number = parseFloat(amount);
    if (!isNaN(number)) {
      this.store.dispatch(new AmountChangeAction(number));
    }
  }
}
