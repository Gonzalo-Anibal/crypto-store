import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

import { User } from '../model/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User | null>(null);
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient, 
    private router: Router,
    private firestore: AngularFirestore
  ) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAawCheYnU05pxHB_lPI4b2yrn6YDUla70',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
          this.assignInitialBalance(resData.localId);
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAawCheYnU05pxHB_lPI4b2yrn6YDUla70',
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
          this.getWalletBalance(resData.localId);
        })
      );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData')?? '{}');
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private assignInitialBalance(userId: string) {
    // Guardar la billetera del usuario en Firestore con 1.000 USD
    this.firestore.collection('wallets').doc(userId).set({
      balance: 1000,  // Asignar saldo inicial
      currency: 'USD'
    })
    .then(() => {
      console.log('Wallet creada con éxito');
    })
    .catch(error => {
      console.error('Error al crear la wallet:', error);
    });
  }

  private getWalletBalance(userId: string) {
    this.firestore
      .collection('wallets')
      .doc(userId)
      .get()
      .subscribe({
        next: (docSnapshot:any) => {
          if (docSnapshot.exists) {
            const walletData = docSnapshot.data();
            const balance = walletData ? walletData['balance'] : 0;
            console.log(`Saldo del usuario: ${balance} USD`);
            // Aquí podrías guardar el saldo en algún lugar si lo necesitas
          } else {
            console.log('No se encontró la billetera del usuario.');
          }
        }, 
        error: (err) => {
          console.error('Error al obtener la billetera:', err);
        },
        complete: () => {
          console.log('done');
        },
      });
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}
