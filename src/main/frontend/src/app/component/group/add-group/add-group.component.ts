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
import {HttpErrorResponse} from "@angular/common/http";
import {IconPickerComponent} from "../../common/icon-picker/icon-picker.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {
  groupId: number;
  editMode = false;
  groupForm: FormGroup;
  users$: Observable<User[]>;
  mail: string[] = [];
  currencies: string[] = [];
  categories$: Observable<Category[]>;
  currentUser: User;
  private userGroupAdded = 0;
  isUserInGroup = false;
  noResults = false;
  groupIconName = "euro";

  constructor(private groupService: GroupService,
              private snackbarService: SnackbarService,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private currencyService: CurrencyService,
              private categoryService: CategoryService,
              private authService: AuthService,
              private dialog: MatDialog
  ) {
  }

  get usersControls() {
    return (this.groupForm.get('users') as FormArray).controls
  }

  ngOnInit() {
    this.groupId = this.route.snapshot.params['groupId'];
    this.editMode = !!this.groupId;
    this.isUserInGroup = !this.editMode;
    this.currentUser = this.authService.user.value!;
    this.initForm();
    this.users$ = this.userService.getAllUsers();
    this.categories$ = this.categoryService.findAllCategories();
    this.currencies = this.currencyService.getAllCurrencies();
  }

  onSubmit() {
    const data = this.groupForm.value;
    let newGroup: Group = {
      description: data.description,
      users: data.users,
      name: data.name,
      defaultCurrency: data.defaultCurrency
    };
    if (!!this.groupId) {
      newGroup.id = this.groupId;
    }
    this.groupService.createGroup(newGroup).subscribe({
      next: (group) => {
        this.snackbarService.displayMessage(`Nowa grupa ${group.body!.name} założona!`);
        this.onCancel();
      },
      error: (error: HttpErrorResponse) => {
        this.snackbarService.displayMessage(`Nie udało się założyć grupy ${newGroup.name}, bład ${error.message}`);
      }
    });

  }

  onAddUser() {
    let user;
    let email;
    let id;
    if (this.userGroupAdded === 0) {
      user = this.currentUser.name;
      email = this.currentUser.mail;
      id = this.currentUser.id;
    }
    (<FormArray>this.groupForm.get('users')).push(
        new FormGroup({
          id: new FormControl(id),
          name: new FormControl(user, Validators.required),
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
    control.patchValue({
      name: selectedUser.option.value.name,
      mail: selectedUser.option.value.mail,
      id: selectedUser.option.value.id
    });
    console.log(control);
  }

  private initForm() {
    let name = '';
    let groupUsers = new FormArray<FormGroup>([]);
    this.groupForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      defaultCurrency: new FormControl(null),
      users: groupUsers
    });
    if (this.editMode) {
      this.groupService.findById(this.groupId).subscribe({
        next: (group) => {
          this.isUserInGroup = group.users.map(user => user.id).includes(this.currentUser.id);
          this.groupForm.get('name')?.patchValue(group.name);
          if (group.users) {
            for (let user of group.users) {
              groupUsers.push(
                  new FormGroup({
                    id: new FormControl(user.id),
                    name: new FormControl(user.name, Validators.required),
                    mail: new FormControl(user.mail, Validators.email)
                  })
              )
            }
          }
        },
        error: () => {
          this.noResults = true;
        }
      });
    } else {
      this.onAddUser();
    }
  }

  pickIcon() {
    const dialogRef = this.dialog.open(IconPickerComponent, {
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(iconName => {
      if (iconName) {
        this.groupForm.get('categoryIcon')?.patchValue(iconName);
        this.groupIconName = iconName;
      }
    });
  }
}
