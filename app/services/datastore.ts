import {Injectable} from "@angular/core";
import {Storage, SqlStorage} from 'ionic-angular';
import {API_URL, RESOURCE_URL, EMU_SPECIMENS_SUB_DEPARTMENT_REPTILES_AMPHIBIANS} from "../constants";

export class HistoryItem {
  catalogNumber: string;
  specimenName: string;
  occurrenceID: string;
  id: number;
  constructor(catalogNumber: string, specimenName: string, occurrenceID: string, id?: number) {
    this.catalogNumber = catalogNumber;
    this.specimenName = specimenName;
    this.occurrenceID = occurrenceID;
    this.id = id;
  }
}

@Injectable()
export class DataStore {
  public storage: Storage = null;

  constructor() {
    this.storage = new Storage(SqlStorage);
    this.storage.query('CREATE TABLE IF NOT EXISTS history (id INTEGER PRIMARY KEY AUTOINCREMENT, catalogNumber TEXT, specimenName TEXT, occurrenceID TEXT)');
  }

  public getHistory() {
    return this.storage.query('SELECT * FROM history');
  }

  public saveHistory(item: HistoryItem) {
    let sql = 'INSERT INTO history (catalogNumber, specimenName, occurrenceID) VALUES (?,?,?)';
    return this.storage.query(sql, [item.catalogNumber, item.specimenName, item.occurrenceID]);
  }

  public updateHistory(item: HistoryItem) {
    let sql = 'UPDATE history SET catalogNumber = \"' +
      item.catalogNumber + '\", specimenName = \"' +
      item.specimenName + '\", occurrenceID = \"' +
      item.occurrenceID + '\" WHERE id = \"' + item.id + '\"';
    return this.storage.query(sql);
  }

  public removeHistory(item: HistoryItem) {
    let sql = 'DELETE FROM history WHERE id = \"' + item.id + '\"';
    return this.storage.query(sql);
  }

  public removeAll() {
    let sql = 'DELETE FROM history';
    return this.storage.query(sql);
  }
}
