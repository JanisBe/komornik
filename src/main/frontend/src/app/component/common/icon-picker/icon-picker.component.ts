import {Component, Inject} from '@angular/core';
import {google_icons} from './data';
import {MAT_DIALOG_DATA, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import {MatTooltip} from '@angular/material/tooltip';
import {NgFor, NgIf} from '@angular/common';
import {MatInput} from '@angular/material/input';
import {MatFormField} from '@angular/material/form-field';

@Component({
  selector: 'icon-picker',
  templateUrl: './icon-picker.component.html',
  styleUrl: './icon-picker.component.scss',
  standalone: true,
  imports: [MatFormField, MatInput, MatDialogContent, NgIf, NgFor, MatTooltip]
})
export class IconPickerComponent {
  icons = google_icons

  constructor(
    public dialogRef: MatDialogRef<IconPickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
  }

  selectIcon(iconName: string) {
    this.dialogRef.close(iconName);
  }

  submit(input: HTMLInputElement) {
    if (input.value != null) {
      this.filter(input.value)
    } else {
      this.icons = google_icons
    }
  }

  filter(query: string) {
    this.icons = google_icons.filter((ele) => {
      if (ele.includes(query.toLowerCase())) {
        return ele;
      }
      return;
    })
  }
}

interface DialogData {
  iconList?: string[]
}