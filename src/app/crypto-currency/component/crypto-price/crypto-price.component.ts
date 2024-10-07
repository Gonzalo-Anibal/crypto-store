import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CoinQuoteDTO } from '../../models/CoinQuote.dto';
import { MockApiService } from '../../services/mock-api/mock-api.service';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crypto-price',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './crypto-price.component.html',
  styleUrl: './crypto-price.component.scss'
})
export class CryptoPriceComponent implements OnInit {

  @Input() coin!: string;
  stockData!:CoinQuoteDTO;


  constructor(
    private mockApi: MockApiService,  
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMockData(this.coin);
  }

  getMockData(coin: string) {
    this.mockApi.getMockData(coin).subscribe({
      next: (data: CoinQuoteDTO) => {
        this.stockData = data; 
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

  onCardClick() {
    this.router.navigate(['/wallet'], { state: { data: this.stockData } });
  }
}
