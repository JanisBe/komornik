import {Component} from '@angular/core';
import {Group} from "../../../model/group";
import {GroupService} from "../../../service/group.service";
import {Router} from "@angular/router";

@Component({
  selector: 'my-groups',
  templateUrl: './my-groups.component.html',
  styleUrl: './my-groups.component.scss'
})
export class MyGroupsComponent {
  allGroups: Group[];

  constructor(private groupService: GroupService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.findAllGroupsForUser();
  }

  findAllGroupsForUser() {
    this.groupService.findAllGroupsForUser().subscribe(groups => this.allGroups = groups.body!);

  }

  navigate(groupId: number) {
    this.router.navigate(['/group/details', groupId]);
  }
}
