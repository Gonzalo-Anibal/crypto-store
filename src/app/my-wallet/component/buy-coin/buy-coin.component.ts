import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CoinTransactionModel } from '../../models/CoinTransaction.model';

@Component({
  selector: 'app-buy-coin',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './buy-coin.component.html',
  styleUrl: './buy-coin.component.scss'
})
export class BuyCoinComponent {
  @Input() coin!:CoinTransactionModel;
}
