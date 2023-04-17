import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) { }

  displayMessage(text: string){
    this._snackBar.open(text, "zamknij",
      {duration: 2, horizontalPosition: "center", verticalPosition: "top"});
  }
}
