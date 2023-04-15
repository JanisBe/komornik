import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  form: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(){
    console.log(this.form);
  }

  private initForm(){
    this.form = new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'password' : new FormControl(null, Validators.required)
    })
  }

  forgotPass() {

  }
}
