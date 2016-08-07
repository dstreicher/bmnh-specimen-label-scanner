import {Component} from '@angular/core';
import {HistoryItem, DataStore} from '../../services/datastore';
import {AlertController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/options/options.html'
})
export class OptionsPage {
  public options: any;

  constructor(private alerts: AlertController, private dataStore: DataStore) {
    this.options = {};
  }

  exportHistory() {

  }

  clearHistory() {
    this.dataStore.removeAll().then(() => {
      let alert = this.alerts.create({
        subTitle: 'History has been cleared.',
        buttons: ['Dismiss']
      });
      alert.present();
    });
  }
}
