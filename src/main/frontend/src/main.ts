import {AppComponent} from './app/component/app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {GravatarModule} from 'ngx-gravatar';
import {NgOptimizedImage} from '@angular/common';
import {MatChipsModule} from '@angular/material/chips';
import {MatSliderModule} from '@angular/material/slider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app/app-routing.module';
import {bootstrapApplication, BrowserModule} from '@angular/platform-browser';
import {provideAnimations} from '@angular/platform-browser/animations';
import {UserModule} from './app/component/user/user.module';
import {GroupModule} from './app/component/group/group.module';
import {ExpenseModule} from './app/component/expense/expense.module';
import {CategoryModule} from './app/component/category/category.module';
import {APP_INITIALIZER, importProvidersFrom, isDevMode} from '@angular/core';
import {JwtInterceptor} from './app/auth/jwt.interceptor';
import {HTTP_INTERCEPTORS, HttpClient, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {requestCsrfToken} from "./app/component/common/csrf-token-factory";
import {provideRouter, withComponentInputBinding} from "@angular/router";
import {LoginComponent} from "./app/component/common/login/login.component";
import {IconPickerComponent} from "./app/component/common/icon-picker/icon-picker.component";
import {DashboardComponent} from "./app/component/dashboard/dashboard/dashboard.component";
import {authGuard} from "./app/auth/auth.guard";
import {AddCategoryComponent} from "./app/component/category/add-category/add-category.component";
import {AllCategoriesComponent} from "./app/component/category/all-categories/all-categories.component";
import {UserDetailsComponent} from "./app/component/user/user-details/user-details.component";
import {AllUsersComponent} from "./app/component/user/all-users/all-users.component";
import {AddUserComponent} from "./app/component/user/add-user/add-user.component";
import {VerifyEmailComponent} from "./app/component/common/verify-email/verify-email.component";
import {ForgotPasswordComponent} from "./app/component/common/forgot-password/forgot-password.component";
import {AddGroupComponent} from "./app/component/group/add-group/add-group.component";
import {GroupSummaryComponent} from "./app/component/group/group-summary/group-summary.component";
import {AllGroupsComponent} from "./app/component/group/all-groups/all-groups.component";
import {AddExpenseComponent} from "./app/component/expense/add-expense/add-expense.component";
import {AllExpensesComponent} from "./app/component/expense/all-expenses/all-expenses.component";


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(CategoryModule, ExpenseModule, GroupModule, UserModule, BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule, MatSnackBarModule, MatInputModule, MatTableModule, MatIconModule, MatSelectModule, MatMenuModule, MatButtonModule, MatDialogModule, MatSortModule, MatAutocompleteModule, MatTooltipModule, MatDatepickerModule, MatNativeDateModule, MatSliderModule, MatChipsModule, NgOptimizedImage, GravatarModule, ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })),
    {provide: MAT_DATE_LOCALE, useValue: 'pl-PL'},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: APP_INITIALIZER, useFactory: requestCsrfToken, multi: true, deps: [HttpClient]},
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter([
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
      {path: 'group/summary/:groupId', component: GroupSummaryComponent, canActivate: [authGuard]},
      {path: 'group/list', component: AllGroupsComponent, canActivate: [authGuard]},
      {path: 'group/add', component: AddGroupComponent, canActivate: [authGuard]},
      {path: 'expense/details/:expenseId', component: AddExpenseComponent, canActivate: [authGuard]},
      {path: 'expense/list', component: AllExpensesComponent, canActivate: [authGuard]},
      {path: 'expense/list/:groupId', component: AllExpensesComponent, canActivate: [authGuard]},
      {path: 'expense/add', component: AddExpenseComponent, canActivate: [authGuard]},
      {path: 'expense/add/:groupId', component: AddExpenseComponent, canActivate: [authGuard]},
      {path: '', component: AllGroupsComponent, pathMatch: 'full'},
      {path: '**', component: AllGroupsComponent, pathMatch: 'full'},

    ], withComponentInputBinding())
  ]
})
  .catch(err => console.error(err));
