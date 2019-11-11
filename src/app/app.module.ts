import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { IonicStorageModule } from '@ionic/storage';
import { LoginPage } from './login/login.page';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

export const firebaseConfig = {
  apiKey: "AIzaSyDuMJX0CW9cuLK_MbzAPVz0ViCB-qmdkSY",
  authDomain: "hemodosis-sam.firebaseapp.com",
  databaseURL: "https://hemodosis-sam.firebaseio.com",
  projectId: "hemodosis-sam",
  storageBucket: "",
  messagingSenderId: "832387172904",
  appId: "1:832387172904:web:1f08c322c1d5e7a837431d"
};


@NgModule({
  declarations: [AppComponent, LoginPage ],
  entryComponents: [LoginPage],
  imports: [BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    EmailComposer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
