import { Component } from '@angular/core';
import { CryptoPriceComponent } from '../crypto-price/crypto-price.component';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-banner-cryptos',
  standalone: true,
  imports: [CryptoPriceComponent, NgForOf],
  templateUrl: './banner-cryptos.component.html',
  styleUrl: './banner-cryptos.component.scss'
})
export class BannerCryptosComponent {

  typeCoins = ['bitcoin', 'cardano', 'ethereum', 'ripple'];

}
