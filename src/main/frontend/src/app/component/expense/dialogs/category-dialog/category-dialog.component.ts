import {Component, OnInit} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {default as categoryJson} from "./categories.json"
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatTooltip} from '@angular/material/tooltip';
import {NgFor} from '@angular/common';

@Component({
  selector: 'category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrl: './category-dialog.component.scss',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, NgFor, MatTooltip, MatIcon, MatDialogActions, MatButton]
})
export class CategoryDialogComponent implements OnInit {
  categories: CategoryJson[] = [];

  ngOnInit(): void {
    this.categories = categoryJson.mainCategories;
  }

  constructor(
    public dialogRef: MatDialogRef<CategoryDialogComponent>,) {
  }

  close() {
    this.dialogRef.close();
  }


  submit(category: CategoryJson) {
    this.dialogRef.close(category);
  }
}

export interface CategoryJson {
  id: number;
  name: string;
  icon: string;
  expanded?: boolean;
  subCategories?: CategoryJson[];
}
