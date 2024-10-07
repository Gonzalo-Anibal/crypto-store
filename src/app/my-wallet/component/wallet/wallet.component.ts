import { Component, OnInit } from '@angular/core';
import { CoinQuoteDTO } from '../../../crypto-currency/models/CoinQuote.dto';
import { MatCardModule } from '@angular/material/card';
import { BuyCoinComponent } from "../buy-coin/buy-coin.component";
import { SellCoinComponent } from "../sell-coin/sell-coin.component";
import { HistoryWalletComponent } from '../history-wallet/history-wallet.component';
import { CoinTransactionModel } from '../../models/CoinTransaction.model';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [MatCardModule, HistoryWalletComponent, BuyCoinComponent, SellCoinComponent],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.scss'
})
export class WalletComponent implements OnInit {
  coin!: CoinQuoteDTO;
  buys!: CoinTransactionModel;
  sells!: CoinTransactionModel;

  ngOnInit(): void {
    this.coin = history.state.data;
    console.log('Datos recibidos:', this.coin);
  }
}
