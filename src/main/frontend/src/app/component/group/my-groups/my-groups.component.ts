import {Component} from '@angular/core';
import {Group} from "../../../model/group";
import {GroupService} from "../../../service/group.service";
import {Router, RouterLink} from "@angular/router";
import {NgFor} from '@angular/common';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'my-groups',
  templateUrl: './my-groups.component.html',
  styleUrl: './my-groups.component.scss',
  standalone: true,
  imports: [RouterLink, MatIcon, NgFor]
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
