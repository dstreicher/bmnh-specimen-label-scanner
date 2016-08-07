import {Component} from '@angular/core';
import {AlertController} from 'ionic-angular';
import {BarcodeScanner} from 'ionic-native';
import {HistoryPage} from '../history/history';
import {OptionsPage} from '../options/options';
import {DataPortal} from '../../services/dataportal';
import {HistoryItem, DataStore} from '../../services/datastore';
import {UUID_URL} from '../../constants';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;

  constructor(private alertCtrl: AlertController, private dataPortal: DataPortal, private dataStore: DataStore) {
    this.tab1Root = HistoryPage;
    this.tab2Root = OptionsPage;
  }

  presentAlert(barcodeData: any) {
    if (barcodeData.cancelled !== 1) {
      this.dataPortal.search(barcodeData.text).subscribe((item: HistoryItem) => {
        if (item) {
          this.dataStore.saveHistory(item);
        }
        else {
          let alert = this.alertCtrl.create({
            title: 'Scan Error',
            subTitle: 'No data portal uuid found for specimen catalog number ' + barcodeData.text + '.',
            buttons: ['Dismiss']
          });
          alert.present();
        }
      })
    }
  }

  scanCode() {
    BarcodeScanner.scan().then((barcodeData) => {
      this.presentAlert(barcodeData);
    }, (err) => {

    });
  }
}
