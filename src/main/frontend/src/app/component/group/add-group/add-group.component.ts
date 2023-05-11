import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {GroupService} from "../../../service/group.service";
import {Group} from "../../../interfaces/group";
import {User} from "../../../interfaces/user";
import {SnackbarService} from "../../../service/snackbar.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../service/user.service";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {CurrencyService} from "../../../service/currency.service";
import {Observable} from "rxjs";
import {CategoryService} from "../../../service/category.service";
import {Category} from "../../../interfaces/category";

@Component({
  selector: 'add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {
  id: number;
  editMode = false;
  groupForm: FormGroup;
  users: Observable<[User]>;
  mail: string[] = [];
  currencies: string[] = [];
  categories: Observable<Category[]>;

  constructor(private groupService: GroupService,
              private snackbarService: SnackbarService,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private currencyService: CurrencyService,
              private categoryService: CategoryService
  ) {
  }

  get usersControls() {
    return (this.groupForm.get('users') as FormArray).controls
  }

  ngOnInit() {
    this.initForm();
    this.users = this.userService.findCommonFriends(10);
    this.categories = this.categoryService.findAllCategories();
    this.currencies = this.currencyService.getAllCurrencies();
  }

  onSubmit() {
    const data = this.groupForm.value;
    const users: [User] = data.users.map((user: User) => ({...user, password: 'test'}))
    let newGroup: Group = {
      groupDescription: data.description,
      users: users,
      name: data.name,
      defaultCurrency: data.defaultCurrency
    };

    this.groupService.createGroup(newGroup).subscribe((group) => {
      this.snackbarService.displayMessage(`Nowa grupa ${group.name} założona!`)
    });
    this.onCancel();
  }

  onAddUser() {
    (<FormArray>this.groupForm.get('users')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        mail: new FormControl(null, [Validators.required, Validators.email])
      })
    );
  }

  onDeleteUser(index: number) {
    (<FormArray>this.groupForm.get('users')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['group/list'])
  }

  onOptionSelected(selectedUser: MatAutocompleteSelectedEvent) {
    const foundUsers = this.users.subscribe(users => {
      users.find(user => user.name = selectedUser.option.value)
      // @ts-ignore
      // const index = users.findIndex(user => user.name === foundUsers.name);
      // console.log(index);
    });
    // this.mail[] = foundUsers.mail;


    // this.users.forEach((user, index) => this.mail[index] = user.mail)
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
                name: new FormControl(user.name, Validators.required),
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
