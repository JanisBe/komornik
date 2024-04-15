import {APP_INITIALIZER, isDevMode, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './component/app.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {LoginComponent} from './component/common/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";
import {HeaderMenuComponent} from './component/common/header-menu/header-menu.component';
import {MatMenuModule} from "@angular/material/menu";
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
import {JwtInterceptor} from "./auth/jwt.interceptor";
import {MatChipsModule} from "@angular/material/chips";
import myLocalePl from '@angular/common/locales/pl';
import {NgOptimizedImage, registerLocaleData} from "@angular/common";
import {CategoryModule} from "./component/category/category.module";
import {ExpenseModule} from "./component/expense/expense.module";
import {GroupModule} from "./component/group/group.module";
import {UserModule} from "./component/user/user.module";
import {ForgotPasswordComponent} from './component/common/forgot-password/forgot-password.component';
import {DashboardComponent} from './component/dashboard/dashboard/dashboard.component';
import {IconPickerComponent} from './component/common/icon-picker/icon-picker.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {VerifyEmailComponent} from './component/common/verify-email/verify-email.component';
import {UserMenuComponent} from './component/common/user-menu/user-menu.component';
import {GravatarModule} from "ngx-gravatar";
import {catchError, of} from "rxjs";

registerLocaleData(myLocalePl);

function requestCsrfToken(httpClient: HttpClient) {
  return () => httpClient.get('http://localhost:8080/csrf').pipe(
    catchError(() => of(null))
  );
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderMenuComponent,
    ConfirmationComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    IconPickerComponent,
    VerifyEmailComponent,
    UserMenuComponent
  ],
  imports: [
    CategoryModule,
    ExpenseModule,
    GroupModule,
    UserModule,
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
    MatSliderModule,
    MatChipsModule,
    NgOptimizedImage,
    GravatarModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pl-PL'},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: APP_INITIALIZER, useFactory: requestCsrfToken, multi: true, deps: [HttpClient]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
