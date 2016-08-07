import {Component} from '@angular/core';
import {ionicBootstrap, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {DataPortal} from './services/dataportal';


@Component({
  templateUrl: 'build/app.html'
})
class BMNHLabelScannerApp {
  private rootPage: any;

  constructor(public platform: Platform) {
    this.initializeApp();
  }

  initializeApp() {
    this.rootPage = TabsPage;
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(BMNHLabelScannerApp, [DataPortal]);
