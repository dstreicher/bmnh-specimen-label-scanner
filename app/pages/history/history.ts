import {Component} from '@angular/core';
import {Events} from 'ionic-angular';
import {InAppBrowser} from 'ionic-native';
import {HistoryItem, DataStore} from '../../services/datastore';
import {UUID_URL} from '../../constants';

@Component({
  templateUrl: 'build/pages/history/history.html'
})
export class HistoryPage {
  selectedItem: any;
  items: HistoryItem[];

  constructor(private events: Events, private dataStore: DataStore) {
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
    InAppBrowser.open(UUID_URL + item.occurrenceID, "_system");
  }

  private onPageDidEnter() {
    this.loadHistory();
  }
}
