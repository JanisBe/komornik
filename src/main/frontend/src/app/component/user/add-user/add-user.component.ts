import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../service/user.service";
import {User} from "../../../model/user";
import {SnackbarService} from "../../../service/snackbar.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../auth/auth.service";

@Component({
    selector: 'add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

    constructor(private userService: UserService,
                private snackbarService: SnackbarService,
                private router: Router,
                private authService: AuthService) {
    }

    form: FormGroup;

    ngOnInit(): void {
        this.initForm();
    }

    onSubmit() {
        const user: User = this.form.value;
        this.userService.addUser(user).subscribe({
            next: (newUser) => {
                this.snackbarService.displayMessage(`Sukces, użytkownik ${newUser.name} zapisany`);
                this.authService.login(newUser.mail, newUser.password!);
                this.onCancel();
            },
            error: (err) => {
                console.log(err);
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
