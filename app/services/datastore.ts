import {Injectable} from "@angular/core";
import {Storage, SqlStorage} from 'ionic-angular';
import {API_URL, RESOURCE_URL, EMU_SPECIMENS_SUB_DEPARTMENT_REPTILES_AMPHIBIANS} from "../constants";

export class HistoryItem {
  catalogNumber: string;
  occurrenceID: string;
  id: number;
  constructor(catalogNumber: string, occurrenceID: string, id?: number) {
    this.catalogNumber = catalogNumber;
    this.occurrenceID = occurrenceID;
    this.id = id;
  }
}

@Injectable()
export class DataStore {
  public storage: Storage = null;

  constructor() {
    this.storage = new Storage(SqlStorage);
    this.storage.query('CREATE TABLE IF NOT EXISTS history (id INTEGER PRIMARY KEY AUTOINCREMENT, catalogNumber TEXT, occurrenceID TEXT)');
  }

  public getHistory() {
    return this.storage.query('SELECT * FROM history');
  }
 
  public saveHistory(item: HistoryItem) {
    let sql = 'INSERT INTO history (catalogNumber, occurrenceID) VALUES (?,?)';
    return this.storage.query(sql, [item.catalogNumber, item.occurrenceID]);
  }
 
  public updateHistory(item: HistoryItem) {
    let sql = 'UPDATE history SET title = \"' + item.catalogNumber + '\", text = \"' + item.occurrenceID + '\" WHERE id = \"' + item.id + '\"';
    this.storage.query(sql);
  }
 
  // Remoe a not with a given ID
  public removeHistory(item: HistoryItem) {
    let sql = 'DELETE FROM history WHERE id = \"' + item.id + '\"';
    this.storage.query(sql);
  }
}
