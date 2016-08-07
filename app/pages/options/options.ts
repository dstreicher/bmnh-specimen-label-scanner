import {Component} from '@angular/core';
import {HistoryItem, DataStore} from '../../services/datastore';
import {AlertController, Storage, LocalStorage} from 'ionic-angular';
import {OPTIONS_KEY_NAME} from '../../constants';

@Component({
  templateUrl: 'build/pages/options/options.html'
})
export class OptionsPage {
  public local: Storage;
  public options: any;
  public isSaving: boolean;

  constructor(private alerts: AlertController, private dataStore: DataStore) {
    this.local = new Storage(LocalStorage);
    this.options = {};
    this.isSaving = false;
    this.local.get(OPTIONS_KEY_NAME).then((res) => {
      this.options = JSON.parse(res) || {};
    });
  }

  updateOption() {
    this.isSaving = true;
    this.local.set(OPTIONS_KEY_NAME, JSON.stringify(this.options)).then(() => {
      this.isSaving = false;
    });
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
