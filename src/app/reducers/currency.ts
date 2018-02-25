import { Currency } from '../models/currency';
import * as currency from '../actions/currency';

export const reducer =
  (state = new Array<Currency>(),
      action: currency.CurrenciesUpdatedAction): Array<Currency> => {
    switch (action.type) {
      case currency.CURRENCIESUPDATED:
        return action.payload;
      default:
        return state;
    }
};
