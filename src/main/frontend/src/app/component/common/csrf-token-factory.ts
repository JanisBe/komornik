import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, of} from "rxjs";

export function requestCsrfToken(httpClient: HttpClient) {
  return () => httpClient.get(`${environment.API_URL}/isHttpsEnabled`).pipe(
    catchError(() => of(null))
  );
}