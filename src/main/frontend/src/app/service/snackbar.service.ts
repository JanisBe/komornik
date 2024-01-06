import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) {
  }

  displayMessage(text: string, duration?: number) {
    if (duration === undefined) {
      duration = 3000;
    }
    this._snackBar.open(text, "Zamknij",
      {horizontalPosition: "center", verticalPosition: "top", duration: duration});
  }


  displayError(text: string, duration?: number) {
    if (duration === undefined) {
      duration = 3000;
    }
    this._snackBar.open(text, "Zamknij",
      {horizontalPosition: "center", verticalPosition: "top", duration: duration});
  }
}
