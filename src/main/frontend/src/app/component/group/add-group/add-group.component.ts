import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {GroupService} from "../../../service/group.service";
import {Group} from "../../../interfaces/group";
import {User} from "../../../interfaces/user";
import {SnackbarService} from "../../../service/snackbar.service";
import {Router} from "@angular/router";

@Component({
  selector: 'add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {
  id: number;
  editMode = false;
  groupForm: FormGroup;

  constructor(private groupService: GroupService,
              private snackbarService: SnackbarService,
              private router: Router
  ) {
  }

  get usersControls() {
    return (this.groupForm.get('users') as FormArray).controls
  }

  ngOnInit() {
    this.initForm();
    this.onAddUser();
  }

  onSubmit() {
    const data = this.groupForm.value;
    const users: [User] = data.users.map((user: User) => ({...user, password: 'test'}))
    let newGroup: Group = {
      groupDescription: data.description,
      users: users,
      name: data.name
    };

    this.groupService.createGroup(newGroup).subscribe((group) => {
      this.snackbarService.displayMessage(`Nowa kategoria ${group.name} założona!`)
    });
    this.onCancel();
  }

  onAddUser() {
    (<FormArray>this.groupForm.get('users')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        mail: new FormControl(null, [
          Validators.required,
          Validators.email
        ])
      })
    );
  }

  onDeleteUser(index: number) {
    (<FormArray>this.groupForm.get('users')).removeAt(index);
  }

  onCancel() {
    this.router.navigate(['group/list'])
  }

  private initForm() {
    let name = '';
    let users = new FormArray([]);

    this.groupForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      users: users
    });
  }
}
