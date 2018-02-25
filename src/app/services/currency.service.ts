import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { Currency } from '../models/currency';

@Injectable()
export class CurrencyService {
  constructor(private http: HttpClient) {}

  getRates(): Observable<Array<Currency>> {
    return this.http.get<any>('https://api.fixer.io/latest?base=USD')
      .map(result => {
        return Object.keys(result.rates)
          .map((key, index) => {
            return {code: key, value: result.rates[key]};
          });
      });
  }
}
