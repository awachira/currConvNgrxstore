import { ActionReducer, Action } from '@ngrx/store';

import * as amount from '../actions/amount';

export const reducer =
 (state: number = 1,
    action: amount.AmountChangeAction): number => {
  switch (action.type) {
    case amount.AMOUNTCHANGE:
      return action.payload;
    default:
      return state;
  }
};
