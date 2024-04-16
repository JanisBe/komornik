import {Component} from '@angular/core';
import {MyGroupsComponent} from '../../group/my-groups/my-groups.component';
import {HeaderMenuComponent} from '../../common/header-menu/header-menu.component';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [RouterLink, HeaderMenuComponent, MyGroupsComponent, RouterOutlet]
})
export class DashboardComponent {
}
