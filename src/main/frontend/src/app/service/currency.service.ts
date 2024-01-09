import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

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
    return this.http.get(`${environment.API_URL}/group/getDefaultCurrencyForGroup/${groupId}`, {responseType: "text"});
  }
}
