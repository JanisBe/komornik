import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) {
  }

  displayMessage(text: string, duration?: number) {
    let config: MatSnackBarConfig = {horizontalPosition: "center", verticalPosition: "top"};
    if (!!duration) {
      config = {...config, duration: duration};
    }
    this._snackBar.open(text, "Zamknij", config);
  }


  displayError(text: string, duration?: number) {
    let config: MatSnackBarConfig = {horizontalPosition: "center", verticalPosition: "top"};
    if (!!duration) {
      config = {...config, duration: duration};
    }
    this._snackBar.open(text, "Zamknij", config);
  }
}
