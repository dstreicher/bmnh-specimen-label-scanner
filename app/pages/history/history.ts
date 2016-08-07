import {Component} from '@angular/core';
import {Events, Storage, LocalStorage} from 'ionic-angular';
import {InAppBrowser} from 'ionic-native';
import {HistoryItem, DataStore} from '../../services/datastore';
import {UUID_URL, OPTIONS_KEY_NAME, INAPPBROWSER_OPTIONS} from '../../constants';

@Component({
  templateUrl: 'build/pages/history/history.html'
})
export class HistoryPage {
  public selectedItem: any;
  public local: Storage;
  public items: HistoryItem[];

  constructor(private events: Events, private dataStore: DataStore) {
    this.local = new Storage(LocalStorage);
    this.events.subscribe('loadHistory', () => {
      this.loadHistory();
    });
  }

  private loadHistory() {
    this.items = [];
    this.dataStore.getHistory().then((data) => {
      if (data.res.rows.length > 0) {
        for (var i = 0; i < data.res.rows.length; i++) {
          let item = data.res.rows.item(i);
          this.items.push(new HistoryItem(item.catalogNumber, item.specimenName, item.occurrenceID, item.id));
        }
      }
    });
  }

  itemTapped(event, item: HistoryItem) {
    this.local.get(OPTIONS_KEY_NAME).then((res) => {
      let options = JSON.parse(res) || {};
      if (options.useInAppBrowser) {
        InAppBrowser.open(UUID_URL + item.occurrenceID, "_blank", INAPPBROWSER_OPTIONS);
      }
      else {
        InAppBrowser.open(UUID_URL + item.occurrenceID, "_system");
      }
    });
  }

  private onPageDidEnter() {
    this.loadHistory();
  }
}
