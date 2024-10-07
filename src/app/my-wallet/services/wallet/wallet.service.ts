import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor(
    private firestore: AngularFireModule
  ) { }
}
