import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) {
  }

  displayMessage(text: string) {
    this._snackBar.open(text, "Zamknij",
      {horizontalPosition: "center", verticalPosition: "top", duration: 3000});
  }


  displayError(text: string) {
    this._snackBar.open(text, "Zamknij",
      {horizontalPosition: "center", verticalPosition: "top", duration: 3000});
  }
}
