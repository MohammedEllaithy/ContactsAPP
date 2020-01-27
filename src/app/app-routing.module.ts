import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactCreateComponent } from './contacts/contact-create/contact-create.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NotfoundComponent } from './views/notfound/notfound.component';
import { AuthGuard } from './auth/auth.guard';



const routes: Routes = [
  { path: '', component: ContactListComponent },
  // this line shows how van we use  (canActivate: [AuthGuard]) to protect our route
  // { path: "create", component: PostCreateComponent, canActivate: [AuthGuard] },
  { path: 'create', component: ContactCreateComponent  },
  { path: 'edit/:contId', component: ContactCreateComponent  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path:  '**' , component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]

})
export class AppRoutingModule { }
