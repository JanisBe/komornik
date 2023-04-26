import {Component} from '@angular/core';
import {SnackbarService} from "../../../service/snackbar.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationComponent} from "../../common/confirmation/confirmation.component";
import {GroupService} from "../../../service/group.service";
import {Group} from "../../../interfaces/group";

@Component({
  selector: 'all-groups',
  templateUrl: './all-groups.component.html',
  styleUrls: ['./all-groups.component.scss']
})
export class AllGroupsComponent {
  allGroups: [Group];
  displayedColumns: string[] = ['name', 'actions'];
  expandedUser: Group | null;

  constructor(private groupService: GroupService,
              private snackBarService: SnackbarService,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.findAll();
  }

  findAll() {
    this.groupService.findAllGroups().subscribe(res => {
        this.allGroups = res;
        console.log(res);
      }
    );

  }

  editGroup(group: Group) {
    this.groupService.editGroup(group).subscribe(res => {
      this.snackBarService.displayMessage(`Grupa ${res.name} zapisana`)
    });
  }

  deleteGroup(group: Group) {
    let dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {content: group.name, category: 'group'},
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.groupService.deleteGroup(group.id).subscribe(() => {
          this.snackBarService.displayMessage(`Użytkownik ${group.name} skasowany`);
          this.findAll();
        });
      }
    });
  }

}
