import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { CoinQuoteDTO } from '../../models/CoinQuote.dto';


@Injectable({
  providedIn: 'root'
})
export class NasdaqApiService {

  // private apiUrl = 'https://api.nasdaq.com/api';

  private apiUrl = '/api/quote';  // Utilizando el proxy

  

  constructor(private http:HttpClient) { }

  getDate() {
    const options = {
      headers: new HttpHeaders().set('Access-Control-Allow-Origin:', '*')
    };
    // const page = this.http.get(`https://api.nasdaq.com/api/quote/ETH/info?assetclass=crypto`, options);
    // console.log("response : ", page);
    // console.log('just before subscribe');
    return this.http.get<any>(`https://api.nasdaq.com/api/quote/ETH/info?assetclass=crypto`, options);
  }

  getData() {
    const httpHeaders : HttpHeaders = new HttpHeaders({
      // 'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*', // Solo funcionará si el servidor lo soporta
      // 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      // 'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return this.http.get(`https://api.nasdaq.com/api/quote/ETH/info?assetclass=crypto`, { headers: httpHeaders });
  }

  getCryptoData1(symbol: string): Observable<CoinQuoteDTO> {
    return this.http.get<CoinQuoteDTO>(`${this.apiUrl}/${symbol}/info?assetclass=crypto`);
  }

  getTest() {
    console.log('Tesssst');
    const options = {
      headers: new HttpHeaders().set('Access-Control-Allow-Origin:', '*')
    };
    this.http.get<any>(`https://api.nasdaq.com/api/quote/ETH/info?assetclass=crypto`, options)
    .pipe(
      map(response => {
        console.log('Datos recibidos:', response); // Muestra los resultados en la consola
        return response;  // Retornamos la respuesta si se quiere usar en otro lugar
      }),
      catchError(error => {
        console.error('Error al obtener los datos:', error);
        throw error;
      })
    );
  }

  // getQuote(symbol: string): Observable<CoinQuoteDTO> {
  //   // return this.http.get<any>(`/nasdaq/quote/${symbol}/info?assetclass=crypto`).pipe(
  //   return this.http.get<any>('/nasdaq/quote/ETH/info?assetclass=crypto').pipe(
  //       map((response) => {
  //       const data = response.data;
  //       return {
  //         symbol: data.symbol,
  //         companyName: data.companyName,
  //         lastSalePrice: data.primaryData.lastSalePrice,
  //         netChange: data.primaryData.netChange,
  //         percentageChange: data.primaryData.percentageChange,
  //         deltaIndicator: data.primaryData.deltaIndicator,
  //         lastTradeTimestamp: data.primaryData.lastTradeTimestamp,
  //       } as CoinQuoteDTO;
  //     })
  //   );
  // }

  getCryptoData2(symbol: string): Promise<CoinQuoteDTO> {
    return fetch(`https://api.nasdaq.com/api/quote/${symbol}/info?assetclass=crypto`, {
      mode: 'no-cors'
    })
    .then(response => response.json()) // Parsear la respuesta a JSON
    .then(response => {
      console.log("response : ", response);
      const data = response.data;
      // Mapear los datos a tu DTO
      const coinQuote: CoinQuoteDTO = {
          symbol: data.symbol,
          companyName: data.companyName,
          lastSalePrice: data.primaryData.lastSalePrice,
          netChange: data.primaryData.netChange,
          percentageChange: data.primaryData.percentageChange,
          deltaIndicator: data.primaryData.deltaIndicator,
          lastTradeTimestamp: data.primaryData.lastTradeTimestamp,
      };
      return coinQuote;
      // let coinQuoteaux : CoinQuoteDTO;
      // return coinQuoteaux;
    })
    .catch(error => {
      console.error('Error al obtener datos:', error);
      throw error;
    });
  }
}
