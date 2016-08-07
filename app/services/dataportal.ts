import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import 'rxjs/Rx';
import {API_URL, RESOURCE_URL, EMU_SPECIMENS_SUB_DEPARTMENT_REPTILES_AMPHIBIANS} from "../constants";

@Injectable()
export class DataPortal {
  public data: any;

  constructor(private http: Http) {
    this.data = null;
  }

  search(catalogNumber: string) {
    var queryString = JSON.stringify({
      catalogNumber: catalogNumber,
      subDepartment: EMU_SPECIMENS_SUB_DEPARTMENT_REPTILES_AMPHIBIANS
    });
    var query = RESOURCE_URL + '&filters=' + encodeURIComponent(queryString);
    this.http.get(query)
      .subscribe((data) => {
        this.data = data;
      });
  }

  getData() {
    return this.data;
  }
}
