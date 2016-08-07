import {Component} from '@angular/core';
import {AlertController, NavController, Events, Storage, LocalStorage} from 'ionic-angular';
import {BarcodeScanner} from 'ionic-native';
import {HistoryPage} from '../history/history';
import {OptionsPage} from '../options/options';
import {DataPortal} from '../../services/dataportal';
import {HistoryItem, DataStore} from '../../services/datastore';
import {OPTIONS_KEY_NAME} from '../../constants';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  public local: Storage;
  private tab1Root: any;
  private tab2Root: any;

  constructor(private alerts: AlertController, private events: Events, private dataPortal: DataPortal, private dataStore: DataStore) {
    this.local = new Storage(LocalStorage);
    this.tab1Root = HistoryPage;
    this.tab2Root = OptionsPage;
  }

  fetchItem(barcodeData: any) {
    this.dataPortal.search(barcodeData.text).subscribe((item: HistoryItem) => {
      if (item) {
        this.dataStore.saveHistory(item).then(() => {
          this.events.publish('loadHistory');
        });
      }
      else {
        let alert = this.alerts.create({
          title: 'Scan Error',
          subTitle: 'No data portal uuid found for specimen catalog number ' + barcodeData.text + '.',
          buttons: ['Dismiss']
        });
        alert.present();
      }
    });
  }

  scanCode() {
    BarcodeScanner.scan().then((barcodeData) => {
      if (barcodeData.cancelled !== 1) {
        this.dataStore.checkHistory(barcodeData.text).then((data) => {
          var isDuplicate = (data.res.rows.length > 0);
          this.local.get(OPTIONS_KEY_NAME).then((res) => {
            let options = JSON.parse(res) || {};
            if (options.ignoreDuplicateScans && isDuplicate) {
              let alert = this.alerts.create({
                title: 'Duplicate Entry',
                subTitle: 'This scan has been ignored.',
                buttons: ['Dismiss']
              });
              alert.present();
            }
            else {
              this.fetchItem(barcodeData);
            }
          });
        });
      }
    }, (err) => {
      let alert = this.alerts.create({
        title: 'Scan Error',
        subTitle: err,
        buttons: ['Dismiss']
      });
      alert.present();
    });
  }
}
