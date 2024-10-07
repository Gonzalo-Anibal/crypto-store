import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAawCheYnU05pxHB_lPI4b2yrn6YDUla70",
  authDomain: "crypto-stores.firebaseapp.com",
  projectId: "crypto-stores",
  storageBucket: "crypto-stores.appspot.com",
  messagingSenderId: "741562239371",
  appId: "1:741562239371:web:1994597747bac33885478e"
};

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

// const app = initializeApp(firebaseConfig);