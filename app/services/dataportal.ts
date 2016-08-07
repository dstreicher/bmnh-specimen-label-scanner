import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import 'rxjs/Rx';
import {HistoryItem} from './datastore';
import {API_URL, RESOURCE_URL, EMU_SPECIMENS_SUB_DEPARTMENT_REPTILES_AMPHIBIANS} from "../constants";

@Injectable()
export class DataPortal {

  constructor(private http: Http) {}

  search(catalogNumber: string) {
    var queryString = JSON.stringify({
      catalogNumber: catalogNumber,
      subDepartment: EMU_SPECIMENS_SUB_DEPARTMENT_REPTILES_AMPHIBIANS
    });
    var query = RESOURCE_URL + '&filters=' + encodeURIComponent(queryString);
    return this.http.get(query)
    .map((res) => {
      var item = null;
      var result = res.json().result;
      if (result.total >= 1) {
        item = new HistoryItem(catalogNumber, result.records[0].genus + ' ' + result.records[0].specificEpithet, result.records[0].occurrenceID);
      }
      return item;
    });
  }
}
