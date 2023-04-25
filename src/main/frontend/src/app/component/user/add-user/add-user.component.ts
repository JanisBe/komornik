import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../service/user.service";
import {User} from "../../../interfaces/user";
import {SnackbarService} from "../../../service/snackbar.service";

@Component({
  selector: 'add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit{

  constructor(private userService: UserService,
              private snackbar: SnackbarService) {
  }

  form: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    console.log(this.form);
    const user: User = this.form.value;
    this.userService.addUser(user).subscribe((response: User) => {
      if (!!response){
        this.snackbar.displayMessage(`Sukces, użytkownik ${response.name} zapisany`)
      }
    });
  }

  private initForm(){
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      mail: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    })
  }

  forgotPass() {

  }
}
