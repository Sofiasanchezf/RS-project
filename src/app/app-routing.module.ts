import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './containers/user-list/user-list.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NewUserComponent } from './containers/new-user/new-user.component';
import { UserDetailComponent } from './containers/user-detail/user-detail.component';
import { Error404Component } from './containers/error404/error404.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'users', component: UserListComponent },
  { path: 'users/new', component: NewUserComponent },
  { path: 'users/:id', component: UserDetailComponent },
  { path: 'users/:id/edit', component: NewUserComponent },
  {path: '**', component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
