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

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'category/details/:categoryId', component: AddCategoryComponent},
  {path: 'category/add', component: AddCategoryComponent},
  {path: 'category/list', component: AllCategoriesComponent},
  {path: 'user/details/:userId', component: UserDetailsComponent},
  {path: 'user/list', component: AllUsersComponent},
  {path: 'user/add', component: AddUserComponent},
  {path: 'group/details/:groupId', component: AddGroupComponent},
  {path: 'group/list', component: AllGroupsComponent},
  {path: 'group/add', component: AddGroupComponent},
  {path: 'expense/details/:expenseId', component: AddExpenseComponent},
  {path: 'expense/list', component: AllExpensesComponent},
  {path: 'expense/list/:groupId', component: AllExpensesComponent},
  {path: 'expense/add', component: AddExpenseComponent},
  {path: 'expense/add/:groupId', component: AddExpenseComponent},
  {path: '', component: AllGroupsComponent, pathMatch: 'full'},

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
