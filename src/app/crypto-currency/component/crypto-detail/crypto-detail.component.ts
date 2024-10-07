import { Component, Input } from '@angular/core';
import { CoinQuoteDTO } from '../../models/CoinQuote.dto';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-crypto-detail',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './crypto-detail.component.html',
  styleUrl: './crypto-detail.component.scss'
})
export class CryptoDetailComponent {
  @Input() coin!: CoinQuoteDTO;

}
