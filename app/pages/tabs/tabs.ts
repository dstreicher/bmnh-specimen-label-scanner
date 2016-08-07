import {Component} from '@angular/core';
import {AlertController} from 'ionic-angular';
import {BarcodeScanner, InAppBrowser} from 'ionic-native';
import {HistoryPage} from '../history/history';
import {OptionsPage} from '../options/options';
import {DataPortal} from '../../services/dataportal';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;

  constructor(private alertCtrl: AlertController, dataPortal: DataPortal) {
    this.tab1Root = HistoryPage;
    this.tab2Root = OptionsPage;
  }

  presentAlert(barcodeData: any) {
    if (barcodeData.cancelled !== 1) {
      // let alert = this.alertCtrl.create({
      //   title: 'Scan Result',
      //   subTitle: barcodeData.text,
      //   buttons: ['Dismiss']
      // });
      // alert.present();
     InAppBrowser.open("http://data.nhm.ac.uk/dataset/collection-specimens/resource/05ff2255-c38a-40c9-b657-4ccb55ab2feb/record/982", "_system");
    }
  }

  scanCode() {
    BarcodeScanner.scan().then((barcodeData) => {
      this.presentAlert(barcodeData);
    }, (err) => {

    });
  }
}
