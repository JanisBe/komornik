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
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {UserDetailsComponent} from './component/user/user-details/user-details.component';
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {AllCategoriesComponent} from './component/category/all-categories/all-categories.component';
import {CategoryDetailsComponent} from "./component/category/category-details/category-details.component";
import {HeaderMenuComponent} from './component/common/header-menu/header-menu.component';
import {MatMenuModule} from "@angular/material/menu";
import {AllGroupsComponent} from './component/group/all-groups/all-groups.component';
import {GroupDetailsComponent} from './component/group/group-details/group-details.component';
import {MatButtonModule} from "@angular/material/button";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ConfirmationComponent} from './component/common/confirmation/confirmation.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSortModule} from "@angular/material/sort";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {MatSliderModule} from "@angular/material/slider";

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    AddGroupComponent,
    AllUsersComponent,
    LoginComponent,
    AddGroupComponent,
    AddCategoryComponent,
    AddExpenseComponent,
    AllExpensesComponent,
    UserDetailsComponent,
    AllCategoriesComponent,
    CategoryDetailsComponent,
    HeaderMenuComponent,
    AllGroupsComponent,
    GroupDetailsComponent,
    ConfirmationComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,
    MatSortModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pl-PL'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
