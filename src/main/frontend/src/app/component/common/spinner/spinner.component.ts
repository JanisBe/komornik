import {Component} from '@angular/core';
import {LoadingService} from "../../../service/loading.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  standalone: true,
  imports: [
    NgIf
  ],
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
  constructor(protected loadingService: LoadingService) {
  }

}
