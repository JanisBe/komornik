import {Component, OnInit} from '@angular/core';
import {ConnectionService} from "./connection.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor( private http: ConnectionService) {
  }

  ngOnInit(): void {
  this.http.getData().subscribe((data) =>{
    console.log(data);
  })
  }

}
