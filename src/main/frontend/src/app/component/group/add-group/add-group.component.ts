import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {GroupService} from "../../../service/group.service";
import {Group} from "../../../model/group";
import {User} from "../../../model/user";
import {SnackbarService} from "../../../service/snackbar.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../service/user.service";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {CurrencyService} from "../../../service/currency.service";
import {Observable} from "rxjs";
import {CategoryService} from "../../../service/category.service";
import {Category} from "../../../model/category";
import {AuthService} from "../../../auth/auth.service";

@Component({
  selector: 'add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {
  id: number;
  editMode = false;
  groupForm: FormGroup;
  users$: Observable<User[]>;
  mail: string[] = [];
  currencies: string[] = [];
  categories$: Observable<Category[]>;
  currentUser: User;
  private userGroupAdded = 0;

  constructor(private groupService: GroupService,
              private snackbarService: SnackbarService,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private currencyService: CurrencyService,
              private categoryService: CategoryService,
              private authService: AuthService
  ) {
  }

  get usersControls() {
    return (this.groupForm.get('users') as FormArray).controls
  }

  ngOnInit() {
    this.currentUser = this.authService.user.value!;
    this.initForm();
    this.users$ = this.userService.getAllUsers();
    this.categories$ = this.categoryService.findAllCategories();
    this.currencies = this.currencyService.getAllCurrencies();
  }

  onSubmit() {
    const data = this.groupForm.value;
    let newGroup: Group = {
      groupDescription: data.description,
      users: data.users,
      name: data.name,
      defaultCurrency: data.defaultCurrency
    };
    if (!!this.id) {
      newGroup.id = this.id;
    }
    this.groupService.createGroup(newGroup).subscribe({
      next: (group) => {
        this.snackbarService.displayMessage(`Nowa grupa ${group.name} założona!`);
        // this.onCancel();
      },
      error: () => {
        this.snackbarService.displayMessage(`Nie udało się założyć grupy ${newGroup.name}`);
      }
    });

  }

  onAddUser() {
    let user;
    let email;
    if (this.userGroupAdded === 0) {
      user = this.currentUser.name;
      email = this.currentUser.mail;
    }
    (<FormArray>this.groupForm.get('users')).push(
      new FormGroup({
        username: new FormControl(user, Validators.required),
        mail: new FormControl(email, Validators.email)
      })
    );
    this.userGroupAdded++;
  }

    onDeleteUser(index: number) {
      (<FormArray>this.groupForm.get('users')).removeAt(index);
      this.userGroupAdded--;
    }

    onCancel() {
        this.router.navigate(['group/list'])
    }

    onOptionSelected(selectedUser: MatAutocompleteSelectedEvent, i: number) {
      let valueElement = <FormArray>this.groupForm.get('users') as FormArray;
      let control = valueElement.at(i) as FormGroup;
      control.patchValue({username: selectedUser.option.value.name, mail: selectedUser.option.value.mail});
    }

    private initForm() {
        let name = '';
        let groupUsers = new FormArray<FormGroup>([]);
        this.groupForm = new FormGroup({
            name: new FormControl(name, Validators.required),
            defaultCurrency: new FormControl(null),
            users: groupUsers
        });
        this.id = this.route.snapshot.params['id'];
        this.editMode = !!this.id;
        if (this.editMode) {
            this.groupService.findById(this.id).subscribe(result => {
                this.groupForm.get('name')?.patchValue(result.name);
                if (result.users) {
                    for (let user of result.users) {
                        groupUsers.push(
                            new FormGroup({
                              id: new FormControl(user.id, Validators.required),
                              username: new FormControl(user.name, Validators.required),
                              mail: new FormControl(user.mail, [Validators.required, Validators.email])
                            })
                        )
                    }
                }
            });
        } else {
            this.onAddUser();
        }
    }
}
