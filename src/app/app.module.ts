import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule , ReactiveFormsModule} from '@angular/forms';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule} from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HeaderComponent } from './header/header.component';
import { ContactCreateComponent } from './contacts/contact-create/contact-create.component';
import { ContactListComponent } from './contacts/contact-list/contact-list.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { NotfoundComponent } from './views/notfound/notfound.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactCreateComponent,
    ContactListComponent,
    LoginComponent,
    SignupComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
