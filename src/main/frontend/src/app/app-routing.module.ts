import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategoryDetailsComponent} from "./component/category/category-details/category-details.component";
import {UserDetailsComponent} from "./component/user/user-details/user-details.component";

const routes: Routes = [
    {path: 'category/details/:id', component: CategoryDetailsComponent},
    {path: 'user/details/:id', component: UserDetailsComponent},

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
