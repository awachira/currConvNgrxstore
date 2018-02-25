import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';

import { CurrencyService } from '../services/currency.service';

import * as currency from '../actions/currency';

@Injectable()
export class CurrencyEffects {
  @Effect()
  update$: Observable<Action> = this.actions$
    .ofType(currency.CURRENCIESUPDATE)
    .switchMap(() =>
      this.currencySrvc
        .getRates()
        .map(data => new currency.CurrenciesUpdatedAction(data))
    );

  constructor(
    private currencySrvc: CurrencyService,
    private actions$: Actions
  ) {}
}
