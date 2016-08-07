import {Component} from '@angular/core';
import {BarcodeScanner} from 'ionic-native';
import {HistoryPage} from '../history/history';
import {OptionsPage} from '../options/options';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;

  constructor() {
    this.tab1Root = HistoryPage;
    this.tab2Root = OptionsPage;
  }

  scanCode() {
    BarcodeScanner.scan().then((barcodeData) => {

    }, (err) => {

    });
  }
}
