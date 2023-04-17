import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {GroupService} from "../../../service/group.service";

@Component({
  selector: 'add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {
  id: number;
  editMode = false;
  groupForm: FormGroup;

  constructor(private groupService: GroupService
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
    console.log(this.groupForm);

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
