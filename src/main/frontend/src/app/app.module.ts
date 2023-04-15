import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './component/app.component';
import {HttpClientModule} from "@angular/common/http";
import {AddUserComponent} from './component/user/add-user/add-user.component';
import {AllUsersComponent} from './component/user/all-users/all-users.component';
import {LoginComponent} from './component/common/login/login.component';
import {AddGroupComponent} from './component/group/add-group/add-group.component';
import {AddCategoryComponent} from './component/category/add-category/add-category.component';
import {AddExpenseComponent} from './component/expense/add-expense/add-expense.component';
import {AllExpensesComponent} from './component/expense/all-expenses/all-expenses.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    AllUsersComponent,
    LoginComponent,
    AddGroupComponent,
    AddCategoryComponent,
    AddExpenseComponent,
    AllExpensesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
