import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, of, tap} from "rxjs";

export function requestCsrfToken(httpClient: HttpClient) {
  return () => httpClient.get(`${environment.API_URL}/csrf`).pipe(
    tap(() => console.log('CSRF token fetched')),
    catchError(() => of(null))
  );
}