import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserDetailsComponent} from "./component/user/user-details/user-details.component";
import {AddCategoryComponent} from "./component/category/add-category/add-category.component";
import {AllCategoriesComponent} from "./component/category/all-categories/all-categories.component";
import {AllUsersComponent} from "./component/user/all-users/all-users.component";
import {AddUserComponent} from "./component/user/add-user/add-user.component";
import {AddExpenseComponent} from "./component/expense/add-expense/add-expense.component";
import {AllExpensesComponent} from "./component/expense/all-expenses/all-expenses.component";
import {AddGroupComponent} from "./component/group/add-group/add-group.component";
import {AllGroupsComponent} from "./component/group/all-groups/all-groups.component";
import {LoginComponent} from "./component/common/login/login.component";
import {ForgotPasswordComponent} from "./component/common/forgot-password/forgot-password.component";
import {DashboardComponent} from "./component/dashboard/dashboard/dashboard.component";
import {authGuard} from "./auth/auth.guard";
import {IconPickerComponent} from "./component/common/icon-picker/icon-picker.component";
import {GroupSummaryComponent} from "./component/group/group-summary/group-summary.component";
import {VerifyEmailComponent} from "./component/common/verify-email/verify-email.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'icons', component: IconPickerComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]},
  {path: 'category/details/:categoryId', component: AddCategoryComponent, canActivate: [authGuard]},
  {path: 'category/add', component: AddCategoryComponent, canActivate: [authGuard]},
  {path: 'category/list', component: AllCategoriesComponent, canActivate: [authGuard]},
  {path: 'user/details/:userId', component: UserDetailsComponent, canActivate: [authGuard]},
  {path: 'user/list', component: AllUsersComponent, canActivate: [authGuard]},
  {path: 'user/add', component: AddUserComponent},
  {path: 'verifyEmail', component: VerifyEmailComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [authGuard]},
  {path: 'group/details/:groupId', component: AddGroupComponent, canActivate: [authGuard]},
  {path: 'group/summary/:groupId/:groupName', component: GroupSummaryComponent, canActivate: [authGuard]},
  {path: 'group/list', component: AllGroupsComponent, canActivate: [authGuard]},
  {path: 'group/add', component: AddGroupComponent, canActivate: [authGuard]},
  {path: 'expense/details/:expenseId', component: AddExpenseComponent, canActivate: [authGuard]},
  {path: 'expense/list', component: AllExpensesComponent, canActivate: [authGuard]},
  {path: 'expense/list/:groupId', component: AllExpensesComponent, canActivate: [authGuard]},
  {path: 'expense/add', component: AddExpenseComponent, canActivate: [authGuard]},
  {path: 'expense/add/:groupId', component: AddExpenseComponent, canActivate: [authGuard]},
  {path: '', component: AllGroupsComponent, pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
