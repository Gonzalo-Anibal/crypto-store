import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CoinTransactionModel } from '../../models/CoinTransaction.model';

@Component({
  selector: 'app-history-wallet',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './history-wallet.component.html',
  styleUrl: './history-wallet.component.scss'
})
export class HistoryWalletComponent {
  @Input() coin!:CoinTransactionModel;

}
