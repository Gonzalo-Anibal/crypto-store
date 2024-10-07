import { Component, OnInit } from '@angular/core';
import { CoinQuoteDTO } from '../../models/CoinQuote.dto';
import { NasdaqApiService } from '../../services/nasdaq-api/nasdaq-api.service';
import { NgIf } from '@angular/common';
import { MockApiService } from '../../services/mock-api/mock-api.service';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-crypto-currency',
  standalone: true,
  imports: [MatCardModule, MatExpansionModule],
  templateUrl: './crypto-currency.component.html',
  styleUrl: './crypto-currency.component.scss'
})
export class CryptoCurrencyComponent implements OnInit {
  stockData!:CoinQuoteDTO;
  typeCoins = ['bitcoin', 'cardano', 'ethereum', 'ripple'];
  // mockData: any;  // Aquí se almacenarán los datos


  constructor(
    private nasdaqApi: NasdaqApiService,
    private mockApi: MockApiService,  
  ) {}

  ngOnInit(): void {
    this.getMockData();
    // this.getTest();
    // this.getDate();
    // this.getData();
    // this.getCryptoData1();
    // this.getCryptoData2("ETH");
  }

  getMockData() {
    this.mockApi.getMockData('ethereum').subscribe({
      next: (data: CoinQuoteDTO) => {
        this.stockData = data;  // Asignar los datos a la variable
        console.log('Datos recibidos:', this.stockData);
      },
      error: (err) => {
        console.error('Error al obtener los datos: ', err);
      },
      complete: () => {
        console.log('done');
      },
    });
  }

  getTest() {
    this.nasdaqApi.getTest();
  }

  getDate() {
    console.log('getDate INTENTO ');
    this.nasdaqApi.getDate().subscribe({
      next(x) {
        console.log('got value ' + x);
      },
      error(err) {
        console.error('something wrong occurred: ' + err);
      },
      complete() {
        console.log('done');
      },
    });
  }

  getData() {
    console.log('getData INTENTO ');
    this.nasdaqApi.getData().subscribe({
      next(x) {
        console.log('got value ' + x);
      },
      error(err) {
        console.error('something wrong occurred: ' + err);
      },
      complete() {
        console.log('done');
      },
    });
  }

  getCryptoData1() {
    console.log('getCryptoData1 INTENTO ');
    this.nasdaqApi.getCryptoData1("ETH").subscribe((data: CoinQuoteDTO) => {
      this.stockData = data;
    });
  }

  getCryptoData2(symbol: string) {
    this.nasdaqApi.getCryptoData2(symbol)
      .then(data => {
        this.stockData = data;
        console.log(this.stockData);
      })
      .catch(error => {
        console.error('Error:', error);
      })
      .finally (() => {
        console.log('getCryptoData2 INTENTO ');
      });
  }
}
