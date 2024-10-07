import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { CoinQuoteDTO } from '../../models/CoinQuote.dto';

import * as bitcoinData from './../mocks/bitcoin.mock.json'
import * as cardanoData from './../mocks/cardano.mock.json'
import * as ethereumData from './../mocks/ethereum.mock.json'
import * as rippleData from './../mocks/ripple.mock.json'


@Injectable({
  providedIn: 'root'
})
export class MockApiService {

  data: any;

  constructor(private http:HttpClient) { }

  getMockData(typeCoin: string): Observable<CoinQuoteDTO> {
    switch (typeCoin) {
      case 'bitcoin':
        this.data= bitcoinData;
        break;
      case 'cardano':
          this.data= cardanoData;
          break;
      case 'ethereum':
        this.data= ethereumData;
        break;
      case 'ripple':
        this.data= rippleData;
        break;
    }

    return of(this.data.data).pipe(
      map(response => {
        const coinQuote: CoinQuoteDTO = {
          symbol: this.data.data.symbol,
          companyName: this.data.data.companyName,
          lastSalePrice: this.data.data.primaryData.lastSalePrice,
          netChange: this.data.data.primaryData.netChange,
          percentageChange: this.data.data.primaryData.percentageChange,
          deltaIndicator: this.data.data.primaryData.deltaIndicator,
          lastTradeTimestamp: this.data.data.primaryData.lastTradeTimestamp
        };
        return coinQuote;
      })
    );
  }
}
