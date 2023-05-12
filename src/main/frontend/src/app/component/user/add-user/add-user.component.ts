import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../service/user.service";
import {User} from "../../../interfaces/user";
import {SnackbarService} from "../../../service/snackbar.service";
import {Router} from "@angular/router";

@Component({
    selector: 'add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

    constructor(private userService: UserService,
                private snackbarService: SnackbarService,
                private router: Router) {
    }

    form: FormGroup;

    ngOnInit(): void {
        this.initForm();
    }

    onSubmit() {
        const user: User = this.form.value;
        this.userService.addUser(user).subscribe({
            next: (response) => {
                this.snackbarService.displayMessage(`Sukces, użytkownik ${response.name} zapisany`);
                this.onCancel();
            },
            error: () => {
                this.snackbarService.displayMessage(`Nie udało się założyć użytkownika ${user.name}`);
            }
        });
    }


    forgotPass() {

    }

    onCancel() {
        this.router.navigate(['user/list']);
    }

    private initForm() {
        this.form = new FormGroup({
            name: new FormControl(null, Validators.required),
            mail: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, Validators.required)
        });
    }
}
