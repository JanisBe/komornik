import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButton]
})
export class ConfirmationComponent {
  constructor(
      public dialogRef: MatDialogRef<ConfirmationComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}

interface DialogData {
  content: string;
  category: string;
}
