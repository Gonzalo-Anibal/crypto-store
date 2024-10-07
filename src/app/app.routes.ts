import { Routes } from '@angular/router';
import { AuthComponent } from './auth/component/auth.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { CryptoCurrencyComponent } from './crypto-currency/component/crypto-currency/crypto-currency.component';
import { CryptoPriceComponent } from './crypto-currency/component/crypto-price/crypto-price.component';
import { BannerCryptosComponent } from './crypto-currency/component/banner-cryptos/banner-cryptos.component';
import { WalletComponent } from './my-wallet/component/wallet/wallet.component';

export const routes: Routes = [
    { path: '', redirectTo: '/cryptocurrency', pathMatch: 'full' },
    { path: 'banner', component: BannerCryptosComponent, canActivate: [AuthGuard] },
    { path: 'crypto-price', component: CryptoPriceComponent, canActivate: [AuthGuard] },
    { path: 'cryptocurrency', component: CryptoCurrencyComponent, canActivate: [AuthGuard] },
    { path: 'wallet', component: WalletComponent, canActivate: [AuthGuard] },

    { path: 'auth', component: AuthComponent },
];
