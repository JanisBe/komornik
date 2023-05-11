import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) {
  }

  getAllCurrencies(): string[] {
    return ['PLN', 'EUR', 'CZK', 'USD'];
  }

  getDefaultCurrencyForGroup(groupId: number) {
    return this.http.get("http://localhost:8080/group/getDefaultCurrencyForGroup/" + groupId, {responseType: "text"});
  }
}
