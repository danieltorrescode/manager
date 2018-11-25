import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  imports: [
    CommonModule,
		ReactiveFormsModule,
    AuthRoutingModule
  ],
  declarations: [LoginComponent, SignupComponent]
})
export class AuthModule { }
