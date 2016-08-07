import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

@Injectable()
export class DataPortal {
  public data: any;

  constructor(private http: Http) {
    this.data = null;
  }

  retrieveData() {
    this.http.get('./mocks/test.json')
      .subscribe(data => {
        this.data = data;
      });
  }

  getData() {
    return this.data;
  }
}